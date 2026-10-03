/**
 * Does the hero still appear when the JavaScript bundle is late?
 *
 * This is the failure the site actually shipped with: `.load-hidden` sat in the
 * markup, so the headline — the largest contentful paint — could not render
 * until sr.js downloaded and executed. Against github.io that measured as a
 * blank hero for 16.5s while the HTML had already been complete for 16.4s.
 *
 * The bundle is held back for 6s while the rest of the page loads normally,
 * and the hero is inspected at 1.5s — well inside the window where a
 * markup-hidden implementation would still be blank.
 *
 * Chrome is warmed with one throwaway load first: on a genuinely cold browser
 * the first page of a run paints ~1.8s late regardless of what the markup
 * says, which produces a confident failure for entirely unrelated reasons.
 *
 *   node scripts/hero-without-bundle.mjs
 */
import { chromium } from "playwright";
import { spawn } from "node:child_process";

const DELAY_MS = 6000;
const CHECK_AT_MS = 1500;

const srv = spawn(process.execPath, ["scripts/serve.mjs"], { stdio: "ignore" });
await new Promise((r) => setTimeout(r, 2500));
const BASE = "http://127.0.0.1:4173/";

const browser = await chromium.launch();

// Warm-up load, unmeasured. Without this the first paint of the first page
// lands around 1.8s for reasons that have nothing to do with this site.
const warm = await browser.newPage();
await warm.goto(BASE, { waitUntil: "load" });
await warm.waitForTimeout(1500);
await warm.close();

const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await context.newPage();

await page.route("**/*.bundle.js", async (route) => {
  await new Promise((r) => setTimeout(r, DELAY_MS));
  await route.continue();
});

await page.addInitScript(() => {
  window.__lcp = null;
  window.__heroAnim = "not-queried";
  new PerformanceObserver((list) => {
    const e = list.getEntries().at(-1);
    if (e) {
      window.__lcp = {
        t: Math.round(e.startTime),
        el: e.element ? e.element.tagName.toLowerCase() + "." + String(e.element.className).split(" ")[0] : "(node)",
      };
    }
  }).observe({ type: "largest-contentful-paint", buffered: true });
});

const startedAt = Date.now();
await page.goto(BASE, { waitUntil: "commit" });
await page.waitForSelector(".hero-headline");
await page.waitForTimeout(CHECK_AT_MS);

const probe = () =>
  page.evaluate(() => {
    const h = document.querySelector(".hero-headline");
    const cs = getComputedStyle(h);
    // The animation's own clock says whether it has run, which distinguishes
    // "CSS never applied" from "CSS applied but Chrome has not painted yet".
    const anim = document.getAnimations().find((a) => a.animationName === "hero-in");
    return {
      state: `${cs.visibility}/${cs.opacity}`,
      srRunning: document.querySelectorAll(".sr-item").length,
      anim: anim ? `${anim.playState} @${Math.round(anim.currentTime ?? 0)}ms` : "none",
      fcp: Math.round(
        performance.getEntriesByType("paint").find((p) => p.name === "first-contentful-paint")?.startTime ?? -1
      ),
      lcp: window.__lcp,
      parsed: document.readyState,
    };
  });

const early = await probe();
console.log(`bundle delayed ${DELAY_MS}ms, hero inspected ${Date.now() - startedAt}ms in:`);
console.log(`  hero-headline    ${early.state}`);
console.log(`  hero-in animation ${early.anim}`);
console.log(`  sr.js running?   ${early.srRunning}`);
console.log(`  readyState       ${early.parsed}`);
console.log(`  FCP              ${early.fcp}ms`);
console.log(`  LCP              ${early.lcp ? `${early.lcp.t}ms (${early.lcp.el})` : "not yet painted"}`);

await page.waitForTimeout(DELAY_MS - CHECK_AT_MS + 4000);
const late = await probe();
console.log(`\nafter the bundle finally runs:`);
console.log(`  hero-headline    ${late.state}`);
console.log(`  hero-in animation ${late.anim}`);
console.log(`  FCP              ${late.fcp}ms`);
console.log(`  LCP              ${late.lcp ? `${late.lcp.t}ms (${late.lcp.el})` : "none"}`);

// The claim under test is that the hero is fully painted *before* sr.js runs,
// so the assertion reads the early snapshot, not the late one.
const ok = early.state === "visible/1" && early.srRunning === 0;
console.log(
  `\n${ok ? "PASS" : "FAIL"} — hero ${early.state} at ${CHECK_AT_MS}ms with sr.js ${early.srRunning === 0 ? "not yet running" : "already running"}` +
    (late.lcp ? `; LCP is ${late.lcp.el} @${late.lcp.t}ms` : "; LCP never painted")
);

await browser.close();
srv.kill();
process.exit(ok ? 0 : 1);
