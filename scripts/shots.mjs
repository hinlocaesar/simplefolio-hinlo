/**
 * Visual review helper: screenshots the built site at the three widths that
 * matter so a change can actually be looked at before it is committed.
 *
 *   node scripts/shots.mjs              # serve ./dist and shoot it
 *   node scripts/shots.mjs --url URL    # shoot an already-running server
 *   node scripts/shots.mjs --only hero  # one viewport: desktop | tablet | mobile
 *
 * Output lands in `scripts/shots/` (gitignored).
 *
 * A full-page capture of a long single page comes back downscaled and unreadable,
 * so `--section <id>` is the default way to review: it scrolls that section to
 * the top of the viewport and shoots exactly what a visitor would see, at a
 * scale where type and spacing can actually be judged.
 */
import { chromium } from "playwright";
import http from "node:http";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const OUT = path.join(__dirname, "shots");

/** Mirrors the breakpoints used across the SCSS layer. */
const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 834, height: 1112 },
  mobile: { width: 390, height: 844 },
};

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
};

function arg(flag) {
  const i = process.argv.indexOf(flag);
  return i > -1 ? process.argv[i + 1] : undefined;
}

/**
 * Minimal static server for `dist`. The dev server already exists for authoring,
 * but review shots want the real production output.
 */
function serveDist() {
  const server = http.createServer((req, res) => {
    const urlPath = decodeURIComponent(req.url.split("?")[0]);
    let file = path.join(DIST, urlPath);
    // Keep requests inside dist regardless of how the path is spelled.
    if (!file.startsWith(DIST)) file = path.join(DIST, "index.html");
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      file = path.join(file, "index.html");
    }
    if (!fs.existsSync(file)) {
      res.writeHead(404);
      return res.end("not found");
    }
    res.writeHead(200, { "Content-Type": MIME[path.extname(file)] ?? "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve({ server, port: server.address().port }));
  });
}

async function main() {
  await fsp.mkdir(OUT, { recursive: true });

  const explicitUrl = arg("--url");
  let server = null;
  let base = explicitUrl;
  if (!base) {
    if (!fs.existsSync(path.join(DIST, "index.html"))) {
      throw new Error("dist/index.html is missing — run `npm run build` first.");
    }
    ({ server } = await serveDist());
    base = `http://127.0.0.1:${server.address().port}/`;
  }

  const only = arg("--only");
  const sectionId = arg("--section");
  const browser = await chromium.launch();

  for (const [name, viewport] of Object.entries(VIEWPORTS)) {
    if (only && only !== name) continue;

    const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
    await page.goto(base, { waitUntil: "load", timeout: 60000 });

    // Fonts settle asynchronously; a shot taken too early catches fallback faces.
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(700);

    if (sectionId) {
      // Park the section at the top of the viewport. The fixed nav sits over the
      // first `scroll-margin-top` worth of pixels, so offset by the nav height
      // instead of letting the heading hide underneath it.
      const offset = await page.evaluate(() => {
        const nav = document.querySelector("header, .nav, nav");
        return nav ? Math.round(nav.getBoundingClientRect().height) : 0;
      });
      await page.evaluate(
        ({ id, offset }) => {
          const el = document.getElementById(id);
          if (el) window.scrollTo({ top: el.offsetTop - offset, behavior: "instant" });
        },
        { id: sectionId, offset }
      );
      await page.waitForTimeout(900);
    } else {
      // Reveal-on-scroll elements stay hidden until they intersect the viewport,
      // so walk the page once before capturing the full-page shot.
      await page.evaluate(async () => {
        const step = window.innerHeight;
        for (let y = 0; y < document.body.scrollHeight; y += step) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
        await new Promise((r) => setTimeout(r, 400));
      });
    }

    const out = path.join(OUT, `${sectionId ?? "page"}-${name}.png`);
    await page.screenshot({ path: out, fullPage: !sectionId });
    console.log(`  ok ${path.relative(ROOT, out)}`);
    await page.close();
  }

  await browser.close();
  server?.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
