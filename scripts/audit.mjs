/**
 * Lighthouse audit against the built site.
 *
 *   node scripts/audit.mjs                    # serve ./dist and audit it
 *   node scripts/audit.mjs --url URL          # audit a running server
 *   node scripts/audit.mjs --only mobile
 *
 * Reports accessibility, SEO, best-practices and performance, and prints the
 * audits that actually failed rather than the scores alone — the scores are
 * already on the command line, and the failures are what is actionable.
 */
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";
import http from "node:http";
import fs from "node:fs";
import zlib from "node:zlib";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};

function arg(flag) {
  const i = process.argv.indexOf(flag);
  return i > -1 ? process.argv[i + 1] : undefined;
}

/** Text types worth compressing. Mirrors what GitHub Pages serves. */
const COMPRESSIBLE = new Set([".html", ".js", ".css", ".json", ".svg"]);

function serveDist() {
  const server = http.createServer((req, res) => {
    let file = path.join(DIST, decodeURIComponent(req.url.split("?")[0]));
    if (!file.startsWith(DIST)) file = path.join(DIST, "index.html");
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      file = path.join(file, "index.html");
    }
    if (!fs.existsSync(file)) {
      res.writeHead(404);
      return res.end("not found");
    }

    const ext = path.extname(file);
    const headers = { "Content-Type": MIME[ext] ?? "application/octet-stream" };

    // Serving the 84 KB HTML uncompressed measured the wrong thing entirely —
    // production has it gzipped, so the numbers would be pessimistic and
    // misleading about what to optimise.
    const accepts = String(req.headers["accept-encoding"] ?? "").includes("gzip");
    if (accepts && COMPRESSIBLE.has(ext)) {
      headers["Content-Encoding"] = "gzip";
      res.writeHead(200, headers);
      return fs.createReadStream(file).pipe(zlib.createGzip()).pipe(res);
    }

    res.writeHead(200, headers);
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve({ server, port: server.address().port }));
  });
}

async function main() {
  const explicitUrl = arg("--url");
  let server = null;
  let url = explicitUrl;
  if (!url) {
    if (!fs.existsSync(path.join(DIST, "index.html"))) {
      throw new Error("dist/index.html is missing — run `npm run build` first.");
    }
    ({ server } = await serveDist());
    url = `http://127.0.0.1:${server.address().port}/`;
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
      .filter((a) => a.score !== null && a.score < 1 && ["error", "warning", "binary"].includes(a.scoreDisplayMode))
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
    for (const id of ["first-contentful-paint", "largest-contentful-paint", "total-blocking-time", "cumulative-layout-shift", "speed-index", "interactive"]) {
      const a = lhr.audits[id];
      if (!a) continue;
      // displayValue is a preformatted string and is absent on some audits;
      // numericValue is milliseconds for everything except CLS, which is a
      // unitless ratio.
      const value = a.displayValue ?? (typeof a.numericValue === "number" ? a.numericValue.toFixed(id === "cumulative-layout-shift" ? 4 : 0) : "?");
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
      const slowest = [...requests].sort((a, b) => (b.endTime ?? 0) - (a.endTime ?? 0)).slice(0, 6);
      for (const r of slowest) {
        console.log(`  ${Math.round(r.endTime)}ms  ${(r.transferSize / 1024).toFixed(0)}KB  ${r.url.replace(lhr.finalDisplayedUrl, "") || r.url}`);
      }
    }
  } finally {
    await chrome.kill();
    server?.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
