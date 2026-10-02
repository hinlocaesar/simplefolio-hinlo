/**
 * First-contentful-paint under an emulated slow connection.
 *
 * Measuring against github.io is useless for A/B work: the same URL measured
 * 1.3s and 11.3s FCP minutes apart, because the path from this machine drops
 * packets (one fetch of the 18 KB document stalled for 338s). This serves
 * ./dist locally and applies fixed network conditions instead, so a change can
 * be attributed rather than guessed at.
 *
 *   node scripts/measure-fcp.mjs [runs]        # default 4
 *
 * Reports median FCP/LCP plus when the render-blocking stylesheet landed,
 * because that round trip is the thing being argued about.
 */
import { chromium } from "playwright";
import http from "node:http";
import fs from "node:fs";
import zlib from "node:zlib";
import path from "node:path";

const DIST = path.resolve("dist");
const RUNS = Number(process.argv[2] || 4);

// Roughly what the measurements to github.io showed: 200-600ms RTTs, ~1.5 Mbps.
const CONDITIONS = { latency: 250, downloadThroughput: (1.5 * 1024 * 1024) / 8, uploadThroughput: (768 * 1024) / 8 };

const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json",
  ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml",
  ".woff2": "font/woff2", ".pdf": "application/pdf",
};
const COMPRESSIBLE = new Set([".html", ".js", ".css", ".json", ".svg"]);

const server = http.createServer((req, res) => {
  let file = path.join(DIST, decodeURIComponent(req.url.split("?")[0]));
  if (!file.startsWith(DIST) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    file = path.join(DIST, "index.html");
  }
  const ext = path.extname(file);
  const headers = { "Content-Type": MIME[ext] ?? "application/octet-stream" };
  if (String(req.headers["accept-encoding"] ?? "").includes("gzip") && COMPRESSIBLE.has(ext)) {
    headers["Content-Encoding"] = "gzip";
    res.writeHead(200, headers);
    fs.createReadStream(file).pipe(zlib.createGzip()).pipe(res);
    return;
  }
  res.writeHead(200, headers);
  fs.createReadStream(file).pipe(res);
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}/`;

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
      if (last) window.__lcp = { t: Math.round(last.startTime), el: last.element ? last.element.tagName.toLowerCase() + "." + String(last.element.className).split(" ")[0] : "(node)" };
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
      kb: Math.round(performance.getEntriesByType("resource").reduce((n, r) => n + (r.transferSize || 0), 0) / 1024),
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
server.close();

const med = (key) => {
  const v = rows.map((r) => r[key]).filter((x) => x != null).sort((a, b) => a - b);
  return v.length ? v[Math.floor(v.length / 2)] : null;
};
console.log(`  median: FCP ${med("fcp")}ms   LCP ${med("lcp")}ms (${rows[0].lcpEl})   html ${med("htmlDone")}ms   css ${med("cssDone")}ms   ${rows[0].reqs} req / ${med("kb")} KB`);
