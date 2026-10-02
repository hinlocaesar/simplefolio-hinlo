/**
 * What the browser sees on initial load of the live site: negotiated protocol,
 * when first paint happens relative to each render-blocking resource, and which
 * element is the LCP. Server-side latency is already known to be fine, so the
 * question this answers is how many round trips sit between "bytes available"
 * and "something on screen".
 *
 *   node scripts/load-waterfall.mjs [url] [runs]
 */
import { chromium } from "playwright";

const URL = process.argv[2] || "https://hinlocaesar.github.io/portfolio/";
const RUNS = Number(process.argv[3] || 3);

const browser = await chromium.launch();

for (let run = 1; run <= RUNS; run++) {
  const page = await browser.newPage({ viewport: { width: 1350, height: 940 } });
  // LCP is only exposed through an observer in current Chrome; reading it off
  // getEntriesByType silently reports null and hides the metric entirely.
  await page.addInitScript(() => {
    window.__lcp = null;
    new PerformanceObserver((list) => {
      const e = list.getEntries().at(-1);
      if (e) {
        window.__lcp = {
          t: Math.round(e.startTime),
          size: e.size,
          el: e.element
            ? e.element.tagName.toLowerCase() + (e.element.className ? "." + String(e.element.className).split(" ")[0] : "")
            : "(node)",
        };
      }
    }).observe({ type: "largest-contentful-paint", buffered: true });
  });
  const cdp = await page.context().newCDPSession(page);
  await cdp.send("Network.enable");

  const started = Date.now();
  await page.goto(URL, { waitUntil: "load", timeout: 90000 });
  const wallClock = Date.now() - started;

  await page.waitForTimeout(2500);

  const info = await page.evaluate(() => {
    const nav = performance.getEntriesByType("navigation")[0];
    const paint = Object.fromEntries(
      performance.getEntriesByType("paint").map((p) => [p.name, Math.round(p.startTime)])
    );
    const lcp = window.__lcp;
    const res = performance.getEntriesByType("resource");

    // Everything that could delay the first paint: stylesheets and scripts
    // linked from <head> without defer/async.
    const blocking = [...document.querySelectorAll("link[rel=stylesheet], script:not([defer]):not([async])")]
      .map((el) => ({
        tag: el.tagName.toLowerCase(),
        href: (el.href || "").split("/").pop(),
        pos: el.closest("head") ? "head" : "body",
      }));

    return {
      protocol: nav.nextHopProtocol,
      dns: Math.round(nav.domainLookupEnd - nav.domainLookupStart),
      connect: Math.round(nav.connectEnd - nav.connectStart),
      // Everything up to first byte of HTML: DNS + TCP + TLS + server think time.
      ttfb: Math.round(nav.responseStart),
      htmlDone: Math.round(nav.responseEnd),
      dcl: Math.round(nav.domContentLoadedEventEnd),
      load: Math.round(nav.loadEventEnd),
      fcp: paint["first-contentful-paint"] ?? null,
      lcpMs: lcp ? lcp.t : null,
      lcpEl: lcp ? lcp.el : null,
      lcpSize: lcp ? lcp.size : null,
      blocking,
      // Which resources finished after FCP — i.e. were they racing the paint?
      late: res
        .filter((r) => r.responseEnd > (paint["first-contentful-paint"] ?? 0))
        .slice(0, 6)
        .map((r) => ({
          t: Math.round(r.responseEnd),
          proto: r.nextHopProtocol,
          kb: Math.round((r.transferSize || r.encodedBodySize || 0) / 1024),
          name: r.name.split("/").pop().slice(0, 44),
        })),
      protocols: [...new Set([nav.nextHopProtocol, ...res.map((r) => r.nextHopProtocol)].filter(Boolean))],
      reqs: res.length,
      kb: Math.round(res.reduce((n, r) => n + (r.transferSize || 0), 0) / 1024),
    };
  });

  console.log(`\n=== run ${run}  (wall clock to load event: ${wallClock} ms) ===`);
  console.log(`  protocol      ${info.protocols.join(", ")}`);
  console.log(`  dns ${info.dns}ms  connect ${info.connect}ms  ttfb ${info.ttfb}ms  html done ${info.htmlDone}ms`);
  console.log(`  FCP ${info.fcp}ms   LCP ${info.lcpMs}ms (${info.lcpEl}, ${info.lcpSize} px)`);
  console.log(`  DCL ${info.dcl}ms  load ${info.load}ms   ${info.reqs} req / ${info.kb} KB`);
  console.log(`  head blocking: ${info.blocking.map((b) => `${b.tag}(${b.pos})`).join(", ") || "none"}`);
  for (const l of info.late) console.log(`    after FCP @${l.t}ms  ${l.kb} KB  ${l.proto}  ${l.name}`);

  await page.close();
}

await browser.close();
