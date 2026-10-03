/**
 * Lighthouse audit against the built site.
 *
 *   node scripts/audit.mjs                    # start the production server and audit it
 *   node scripts/audit.mjs --url URL          # audit a running server
 *   node scripts/audit.mjs --only mobile
 *
 * Reports accessibility, SEO, best-practices and performance, and prints the
 * audits that actually failed rather than the scores alone — the scores are
 * already on the command line, and the failures are what is actionable.
 */
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";

import { startServer } from "./lib/server.mjs";

function arg(flag) {
  const i = process.argv.indexOf(flag);
  return i > -1 ? process.argv[i + 1] : undefined;
}

async function main() {
  const explicitUrl = arg("--url");
  let server = null;
  let url = explicitUrl;
  if (!url) {
    // Audited against the real production server, so the transfer sizes and the
    // compression are the ones a visitor would get.
    server = await startServer();
    url = server.url;
  }

  const chrome = await launch({ chromeFlags: ["--headless=new", "--no-sandbox"] });
  try {
    const mobile = arg("--only") === "mobile";
    const result = await lighthouse(
      url,
      { port: chrome.port, output: "json", logLevel: "error" },
      {
        extends: "lighthouse:default",
        // Lighthouse's simulated throttling, not "provided". Without it the
        // score only reflects how busy this machine happened to be, and swings
        // by 50+ points between identical runs, which makes it useless for
        // judging whether a change helped.
        settings: {
          formFactor: mobile ? "mobile" : "desktop",
          screenEmulation: mobile
            ? { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75 }
            : { mobile: false, width: 1350, height: 940, deviceScaleFactor: 1 },
          throttlingMethod: "simulate",
        },
      }
    );

    const lhr = result.lhr;
    for (const [key, cat] of Object.entries(lhr.categories)) {
      console.log(`\n${cat.title}: ${Math.round(cat.score * 100)}`);
    }

    const failures = Object.values(lhr.audits)
      .filter(
        (a) =>
          a.score !== null &&
          a.score < 1 &&
          ["error", "warning", "binary"].includes(a.scoreDisplayMode)
      )
      .sort((a, b) => (a.score ?? 1) - (b.score ?? 1));

    if (!failures.length) {
      console.log("\nNo failing audits.");
    } else {
      console.log("\nFailing audits:");
      for (const audit of failures) {
        console.log(`  [${audit.scoreDisplayMode}] ${audit.id} — ${audit.title}`);
        const detail = audit.details?.items?.[0];
        if (detail?.node?.snippet) {
          console.log(`      ${detail.node.snippet.slice(0, 160)}`);
        }
      }
    }

    // The score alone does not say what to do. These are the numbers and the
    // opportunities that actually move it.
    console.log("\nMetrics:");
    for (const id of [
      "first-contentful-paint",
      "largest-contentful-paint",
      "total-blocking-time",
      "cumulative-layout-shift",
      "speed-index",
      "interactive",
    ]) {
      const a = lhr.audits[id];
      if (!a) continue;
      // displayValue is a preformatted string and is absent on some audits;
      // numericValue is milliseconds for everything except CLS, which is a
      // unitless ratio.
      const value =
        a.displayValue ??
        (typeof a.numericValue === "number"
          ? a.numericValue.toFixed(id === "cumulative-layout-shift" ? 4 : 0)
          : "?");
      console.log(`  ${String(value).padStart(7)}  ${a.title}`);
    }

    const opportunities = lhr.audits["opportunities"]?.details?.items ?? [];
    if (opportunities.length) {
      console.log("\nOpportunities:");
      for (const item of opportunities.slice(0, 8)) {
        console.log(`  -${Math.round(item.savingsMs)}ms  ${item.title}`);
      }
    }

    const requests = lhr.audits["network-requests"]?.details?.items ?? [];
    if (requests.length) {
      const bytes = requests.reduce((n, r) => n + (r.transferSize ?? 0), 0);
      console.log(`\nTransfer: ${(bytes / 1024).toFixed(0)} KB across ${requests.length} requests`);

      // The request count is what decides how a phone on a high-RTT link feels,
      // so break the page down into what those requests actually are before
      // looking at anything else. Bytes are usually the wrong instinct: the
      // whole skill-icon set is 53 KB but costs 57 round trips.
      const buckets = new Map();
      for (const r of requests) {
        const u = r.url.replace(lhr.finalDisplayedUrl, "");
        let name;
        if (r.resourceType === "Image") {
          if (/skill-icons\//.test(u)) name = "skill icons";
          else if (/thumbs\//.test(u)) name = "project thumbnails";
          else if (/profile/.test(u)) name = "phone portrait";
          else name = "other images";
        } else {
          const named = {
            Document: "document",
            Stylesheet: "stylesheet",
            Script: "script",
            Font: "font",
          };
          name = named[r.resourceType] ?? String(r.resourceType ?? "other").toLowerCase();
        }
        const b = buckets.get(name) ?? { n: 0, kb: 0 };
        b.n++;
        b.kb += Math.round((r.transferSize ?? 0) / 1024);
        buckets.set(name, b);
      }
      for (const [name, b] of [...buckets].sort((a, b2) => b2[1].kb - a[1].kb)) {
        console.log(`  ${String(b.n).padStart(3)} req  ${String(b.kb).padStart(4)} KB  ${name}`);
      }
    }
  } finally {
    await chrome.kill();
    await server?.stop();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
