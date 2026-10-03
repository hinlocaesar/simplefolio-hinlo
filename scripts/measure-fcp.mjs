/**
 * First-contentful-paint under an emulated slow connection.
 *
 * Measuring against github.io is useless for A/B work: the same URL measured
 * 1.3s and 11.3s FCP minutes apart, because the path from this machine drops
 * packets (one fetch of the 18 KB document stalled for 338s). This starts the
 * production server locally and applies fixed network conditions instead, so a
 * change can be attributed rather than guessed at.
 *
 *   node scripts/measure-fcp.mjs [runs]        # default 4
 *
 * Reports median FCP/LCP plus when the render-blocking stylesheet landed,
 * because that round trip is the thing being argued about.
 */
import { chromium } from "playwright";

import { startServer } from "./lib/server.mjs";

const RUNS = Number(process.argv[2] || 4);

// Roughly what the measurements to github.io showed: 200-600ms RTTs, ~1.5 Mbps.
const CONDITIONS = {
  latency: 250,
  downloadThroughput: (1.5 * 1024 * 1024) / 8,
  uploadThroughput: (768 * 1024) / 8,
};

const server = await startServer();
const base = server.url;

const browser = await chromium.launch();
const rows = [];

for (let run = 1; run <= RUNS; run++) {
  const context = await browser.newContext({ viewport: { width: 412, height: 823 } });
  const page = await context.newPage();
  // LCP entries are only reliably exposed to an observer; getEntriesByType
  // returns nothing for them in current Chrome, which silently loses the
  // one metric the user actually feels.
  await page.addInitScript(() => {
    window.__lcp = null;
    new PerformanceObserver((list) => {
      const last = list.getEntries().at(-1);
      if (last)
        window.__lcp = {
          t: Math.round(last.startTime),
          el: last.element
            ? last.element.tagName.toLowerCase() +
              "." +
              String(last.element.className).split(" ")[0]
            : "(node)",
        };
    }).observe({ type: "largest-contentful-paint", buffered: true });
  });
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false,
    latency: CONDITIONS.latency,
    downloadThroughput: CONDITIONS.downloadThroughput,
    uploadThroughput: CONDITIONS.uploadThroughput,
    connectionType: "cellular4g",
  });

  await page.goto(base, { waitUntil: "load", timeout: 120000 });
  await page.waitForTimeout(1500);

  const m = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    const paint = Object.fromEntries(
      performance.getEntriesByType("paint").map((p) => [p.name, Math.round(p.startTime)])
    );
    const lcpObs = window.__lcp;
    const css = performance.getEntriesByType("resource").find((r) => /\.css(\?|$)/.test(r.name));
    return {
      fcp: paint["first-contentful-paint"] ?? null,
      lcp: lcpObs ? lcpObs.t : null,
      lcpEl: lcpObs ? lcpObs.el : null,
      cssDone: css ? Math.round(css.responseEnd) : null,
      cssName: css ? css.name.split("/").pop() : "(inlined)",
      htmlDone: Math.round(nav.responseEnd),
      ttfb: Math.round(nav.responseStart),
      load: Math.round(nav.loadEventEnd),
      kb: Math.round(
        performance.getEntriesByType("resource").reduce((n, r) => n + (r.transferSize || 0), 0) /
          1024
      ),
      reqs: performance.getEntriesByType("resource").length,
    };
  });
  rows.push(m);
  console.log(
    `  run ${run}: FCP ${String(m.fcp).padStart(6)}ms   LCP ${String(m.lcp).padStart(6)}ms   html ${String(m.htmlDone).padStart(6)}ms   css ${String(m.cssDone).padStart(6)}ms (${m.cssName})   load ${m.load}ms`
  );
  await context.close();
}

await browser.close();
await server.stop();

const med = (key) => {
  const v = rows
    .map((r) => r[key])
    .filter((x) => x != null)
    .sort((a, b) => a - b);
  return v.length ? v[Math.floor(v.length / 2)] : null;
};
console.log(
  `  median: FCP ${med("fcp")}ms   LCP ${med("lcp")}ms (${rows[0].lcpEl})   html ${med("htmlDone")}ms   css ${med("cssDone")}ms   ${rows[0].reqs} req / ${med("kb")} KB`
);
