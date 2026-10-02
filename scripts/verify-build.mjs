/**
 * Checks a build of `dist/` for the things that are easy to break silently:
 * third-party requests creeping back onto the critical path, the icon sprite
 * going stale, scroll reveals never firing, a lazily-loaded image never
 * arriving, and the phone-only portrait being fetched by visitors who will
 * never see it.
 *
 * Serves `dist/` on an ephemeral port with gzip on, so it measures the same
 * bytes the deploy does. Run with `npm run verify` after `npm run build`.
 *
 * Exit code is non-zero if any check fails.
 */
import { chromium } from "playwright";
import http from "node:http";
import fs from "node:fs";
import zlib from "node:zlib";
import path from "node:path";

const DIST = path.resolve("dist");

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};
const COMPRESSIBLE = new Set([".html", ".js", ".css", ".json", ".svg"]);

function serveDist() {
  const server = http.createServer((req, res) => {
    let file = path.join(DIST, decodeURIComponent(req.url.split("?")[0]));
    if (!file.startsWith(DIST) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
      file = path.join(DIST, "index.html");
    }
    const ext = path.extname(file);
    const headers = { "Content-Type": MIME[ext] ?? "application/octet-stream" };
    const gzip = String(req.headers["accept-encoding"] ?? "").includes("gzip");
    if (gzip && COMPRESSIBLE.has(ext)) {
      headers["Content-Encoding"] = "gzip";
      res.writeHead(200, headers);
      fs.createReadStream(file).pipe(zlib.createGzip()).pipe(res);
      return;
    }
    res.writeHead(200, headers);
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, "127.0.0.1", () => resolve(server)));
}

const failures = [];
const check = (label, ok, detail = "") => {
  console.log(`  ${ok ? "ok  " : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures.push(label);
};

async function main() {
  const server = await serveDist();
  const base = `http://127.0.0.1:${server.address().port}/`;
  const html = fs.readFileSync(path.join(DIST, "index.html"), "utf8");

  console.log("\nMarkup");
  check(
    "no third-party requests in <head>",
    !/unpkg\.com|cdnjs\.cloudflare\.com|font-awesome/.test(html)
  );
  check("no Font Awesome classes left", !/\bfa-(solid|brands|2x)\b/.test(html));
  // html-webpack-plugin minifies attributes down to bare values, so the quotes
  // are optional here.
  check("icon sprite has all 10 symbols", (html.match(/<symbol id="?i-/g) ?? []).length === 10);
  check("no ScrollReveal global", !/window\.ScrollReveal/.test(html));

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
    await page.goto(base, { waitUntil: "load", timeout: 60000 });
    const loadMs = Date.now() - started;
    await page.waitForTimeout(2500);

    console.log(`\n${label}  (load ${loadMs} ms)`);
    check("no third-party requests at all", requests.every((u) => !/unpkg|cdnjs/.test(u)));
    check("no JS errors", errors.length === 0, errors.slice(0, 2).join(" | "));

    const state = await page.evaluate(() => {
      const hero = document.querySelector(".hero-headline");
      const nav = performance.getEntriesByType("navigation")[0] ?? {};
      const paint = performance.getEntriesByType("paint").find((p) => p.name === "first-contentful-paint");
      return {
        hero: hero ? `${getComputedStyle(hero).visibility}/${getComputedStyle(hero).opacity}` : "missing",
        fcp: paint ? Math.round(paint.startTime) : null,
        load: Math.round(nav.loadEventEnd || 0),
        kb: Math.round(
          performance
            .getEntriesByType("resource")
            .reduce((n, r) => n + (r.transferSize || r.encodedBodySize || 0), 0) / 1024
        ),
        loadHidden: document.querySelectorAll(".load-hidden").length,
        zeroSizedIcons: [...document.querySelectorAll("svg.icon")].filter(
          (i) => i.getClientRects().length > 0 && i.getBoundingClientRect().width < 1
        ).length,
        profile: performance.getEntriesByType("resource").filter((r) => /profile/.test(r.name)).length,
        broken: [...document.images].filter(
          (i) => i.currentSrc && i.complete && i.naturalWidth === 0
        ).length,
      };
    });

    check("hero revealed", state.hero === "visible/1", state.hero);
    check("no .load-hidden left behind", state.loadHidden === 0);
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
      const rendered = [...document.querySelectorAll(".sr-item")].filter((e) => e.getClientRects().length > 0);
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
        tagIcons: [...document.querySelectorAll(".tag__icon")].filter((i) => i.naturalWidth > 0).length,
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

    check("transfer within budget", state.kb < 250, `${state.kb} KB`);

    await page.close();
  }

  await browser.close();
  server.close();

  console.log(failures.length ? `\n${failures.length} check(s) failed` : "\nAll checks passed");
  process.exit(failures.length ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
