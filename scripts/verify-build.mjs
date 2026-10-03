/**
 * Checks a production build for the things that are easy to break silently:
 * third-party requests creeping back onto the critical path, the icon sprite
 * going stale, scroll reveals never firing, a lazily-loaded image never
 * arriving, and the phone-only portrait being fetched by visitors who will
 * never see it.
 *
 * Starts the same server `npm start` runs, so what it measures is what ships.
 * gzip is no longer emulated: Next.js compresses responses itself, so the byte
 * counts reported here are the real ones.
 *
 * Run with `npm run verify` after `npm run build`.
 *
 * Exit code is non-zero if any check fails.
 */
import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

import { startServer } from "./lib/server.mjs";

/** Next.js writes the prerendered `/` to disk; `postbuild` inlines the CSS into it. */
const PRERENDERED = path.join(".next", "server", "app", "index.html");

/**
 * Transfer budgets, in KB, split by who is responsible for the bytes.
 *
 * This was one 250 KB number when the page was a webpack bundle costing 6.5 KB of
 * JavaScript. Moving to Next.js adds React and the App Router runtime -- about
 * 140 KB transferred here, and not something this page can influence. Folding
 * that back into a single number would mean every future image or markup change
 * gets judged against a constant it can never move, so the two are now separate:
 * the framework is pinned tightly, and the page keeps the original 250 KB it
 * always had.
 */
const FRAMEWORK_BUDGET_KB = 160;
const PAGE_BUDGET_KB = 250;

const failures = [];
const check = (label, ok, detail = "") => {
  console.log(`  ${ok ? "ok  " : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures.push(label);
};

async function main() {
  const server = await startServer();
  const html = fs.readFileSync(PRERENDERED, "utf8");

  console.log("\nMarkup");
  check(
    "no third-party requests in <head>",
    !/unpkg\.com|cdnjs\.cloudflare\.com|font-awesome/.test(html)
  );
  check("no Font Awesome classes left", !/\bfa-(solid|brands|2x)\b/.test(html));
  check("icon sprite has all 10 symbols", (html.match(/<symbol id="?i-/g) ?? []).length === 10);
  check("no ScrollReveal global", !/window\.ScrollReveal/.test(html));
  // First paint costs one round trip, not two: the stylesheet is inlined by
  // scripts/inline-css.mjs during postbuild. A <link rel=stylesheet> would put
  // a whole RTT between the document arriving and anything being visible.
  check(
    "stylesheet inlined, no render-blocking <link>",
    !/<link[^>]*\brel=["']?stylesheet/i.test(html) && /<style[^>]*>/i.test(html)
  );
  // The hero backdrop is the LCP element and lives in the body. Next.js detects
  // it and emits the preload itself; it must still be the first thing in <head>.
  const preload = /<link[^>]*\brel="preload"[^>]*hero-team\.webp/i.exec(html);
  check(
    "LCP image preloaded in <head>",
    preload !== null && html.indexOf(preload[0]) < html.indexOf("<script"),
    preload?.[0]
  );
  // `.load-hidden` used to sit in the markup, so the hero stayed invisible
  // until the reveal script ran — and stayed invisible for good if it never
  // did. A stylesheet check would only prove the class is absent from the CSS,
  // so the no-JavaScript section below covers the behaviour end to end.
  check("no content hidden in markup waiting for JS", !/load-hidden/.test(html));

  const browser = await chromium.launch();

  for (const [label, viewport] of [
    ["Desktop 1440x900", { width: 1440, height: 900 }],
    ["Phone 390x844", { width: 390, height: 844 }],
  ]) {
    const page = await browser.newPage({ viewport });
    const requests = [];
    const errors = [];
    page.on("request", (r) => requests.push(r.url()));
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));

    const started = Date.now();
    await page.goto(server.url, { waitUntil: "load", timeout: 60000 });
    const loadMs = Date.now() - started;

    // The hero entrance is a 0.7s CSS animation, and the first page a fresh
    // browser opens also pays for a cold JIT and code cache -- together those
    // were enough to still be mid-animation here. Wait for the animation to
    // actually finish rather than sampling at a fixed moment, so this reports
    // whether the hero ever becomes visible instead of how fast the machine is.
    await page.evaluate(async () => {
      const el = document.querySelector(".hero-headline");
      if (!el) return;
      const deadline = performance.now() + 5000;
      while (performance.now() < deadline) {
        const running = el.getAnimations().some((a) => a.playState === "running");
        if (!running && getComputedStyle(el).opacity === "1") break;
        await new Promise((r) => setTimeout(r, 100));
      }
    });
    await page.waitForTimeout(2500);

    console.log(`\n${label}  (load ${loadMs} ms)`);
    check(
      "no third-party requests at all",
      requests.every((u) => !/unpkg|cdnjs/.test(u))
    );
    check("no JS errors", errors.length === 0, errors.slice(0, 2).join(" | "));

    const state = await page.evaluate(() => {
      const hero = document.querySelector(".hero-headline");
      const nav = performance.getEntriesByType("navigation")[0] ?? {};
      const paint = performance
        .getEntriesByType("paint")
        .find((p) => p.name === "first-contentful-paint");

      // Framework and page payload are counted apart on purpose. React and the
      // Next.js runtime are a fixed ~140 KB that this page cannot influence;
      // folding them into one number would hide a regression in the images and
      // markup, which is the part that actually changes here.
      let frameworkKb = 0;
      let pageKb = 0;
      for (const r of performance.getEntriesByType("resource")) {
        const kb = (r.transferSize || r.encodedBodySize || 0) / 1024;
        if (/\/_next\/static\//.test(r.name)) frameworkKb += kb;
        else pageKb += kb;
      }

      return {
        hero: hero
          ? `${getComputedStyle(hero).visibility}/${getComputedStyle(hero).opacity}`
          : "missing",
        fcp: paint ? Math.round(paint.startTime) : null,
        load: Math.round(nav.loadEventEnd || 0),
        frameworkKb: Math.round(frameworkKb),
        pageKb: Math.round(pageKb),
        zeroSizedIcons: [...document.querySelectorAll("svg.icon")].filter(
          (i) => i.getClientRects().length > 0 && i.getBoundingClientRect().width < 1
        ).length,
        profile: performance.getEntriesByType("resource").filter((r) => /profile/.test(r.name))
          .length,
        broken: [...document.images].filter(
          (i) => i.currentSrc && i.complete && i.naturalWidth === 0
        ).length,
      };
    });

    check("hero revealed", state.hero === "visible/1", state.hero);
    check("every visible icon has a size", state.zeroSizedIcons === 0);
    check("no image failed to decode", state.broken === 0);
    check(
      viewport.width > 600 ? "phone-only portrait not fetched" : "phone-only portrait fetched",
      viewport.width > 600 ? state.profile === 0 : state.profile === 1,
      `${state.profile} request(s)`
    );

    // Walk the page so every IntersectionObserver target gets its turn.
    await page.evaluate(async () => {
      const h = document.documentElement.scrollHeight;
      for (let y = 0; y < h; y += 500) {
        // `instant`: the page sets scroll-behavior: smooth, and a retargeted
        // smooth scroll never actually reaches the middle of the document.
        window.scrollTo({ top: y, behavior: "instant" });
        await new Promise((r) => setTimeout(r, 80));
      }
    });
    await page.waitForTimeout(2000);

    const reveals = await page.evaluate(() => {
      const rendered = [...document.querySelectorAll(".sr-item")].filter(
        (e) => e.getClientRects().length > 0
      );
      return {
        total: document.querySelectorAll(".sr-item").length,
        rendered: rendered.length,
        stuck: rendered.filter((e) => getComputedStyle(e).opacity !== "1").length,
      };
    });
    check(
      "every rendered reveal completed",
      reveals.stuck === 0,
      `${reveals.rendered - reveals.stuck}/${reveals.rendered} revealed of ${reveals.total} registered`
    );

    // The skill icons are `loading="lazy"`, so a scroll that stops short (or a
    // breakpoint that hides their section) would leave blank gaps in the tags.
    // Project thumbnails are lazy too, and the ones parked off the right edge of
    // a horizontal rail legitimately never start — so only eager images are
    // required to be done; anything deferred must at least have been marked.
    const deferred = await page.evaluate(() => {
      const imgs = [...document.images];
      return {
        eagerPending: imgs.filter((i) => i.loading !== "lazy" && !i.complete).length,
        total: imgs.length,
        tagIcons: [...document.querySelectorAll(".tag__icon")].filter((i) => i.naturalWidth > 0)
          .length,
        tagIconsTotal: document.querySelectorAll(".tag__icon").length,
      };
    });
    check(
      "every eager image finished loading",
      deferred.eagerPending === 0,
      `${deferred.eagerPending} pending of ${deferred.total}`
    );
    check(
      "every skill icon decoded",
      deferred.tagIcons === deferred.tagIconsTotal,
      `${deferred.tagIcons}/${deferred.tagIconsTotal} decoded`
    );

    check(
      "framework JS within budget",
      state.frameworkKb < FRAMEWORK_BUDGET_KB,
      `${state.frameworkKb} KB`
    );
    check("page payload within budget", state.pageKb < PAGE_BUDGET_KB, `${state.pageKb} KB`);

    await page.close();
  }

  // End-to-end proof of the markup check above: load the built page with
  // JavaScript switched off entirely. `.load-hidden` in the markup used to
  // leave the whole hero — headline, name, subtitle, CTA, facts, portrait —
  // permanently invisible here, so a visitor saw only the nav.
  const noJsContext = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1440, height: 900 },
  });
  const noJsPage = await noJsContext.newPage();
  await noJsPage.goto(server.url, { waitUntil: "load", timeout: 60000 });
  // Long enough for the 0.7s CSS entrance to have finished on its own.
  await noJsPage.waitForTimeout(1200);
  const noJs = await noJsPage.evaluate(() => {
    const shown = (sel) => {
      const el = document.querySelector(sel);
      if (!el) return "missing";
      const cs = getComputedStyle(el);
      return `${cs.visibility}/${cs.opacity}`;
    };
    return { hero: shown(".hero-headline"), about: shown(".about__summary") };
  });
  console.log("\nWithout JavaScript");
  check("hero headline visible", noJs.hero === "visible/1", noJs.hero);
  check("about summary visible", noJs.about === "visible/1", noJs.about);
  await noJsContext.close();

  await browser.close();
  await server.stop();

  console.log(failures.length ? `\n${failures.length} check(s) failed` : "\nAll checks passed");
  process.exit(failures.length ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
