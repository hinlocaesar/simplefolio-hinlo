import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Filipino VA has not launched, so there is no public URL to point at: the
 * shots come from the local Vite dev server (see `C:\job-board` README — the
 * frontend runs on :5173, the API on :5201 and Umbraco on :7123). Start the
 * dev server first, or pass FILIPINOVA_URL to shoot another environment.
 */
const url = process.env.FILIPINOVA_URL ?? "http://localhost:5173";
const outDir = path.resolve(__dirname, "../src/assets/project-images/filipinova");
const thumbDir = path.resolve(__dirname, "../src/assets/project-images/thumbs/filipinova");

/** Card images render at 16:9, so a 16:9 viewport crops to nothing. */
const VIEWPORT = { width: 1440, height: 810 };

/**
 * The card thumbnail is the 720px rung the srcset ladder is built from;
 * `optimize-images.mjs` sources the wider rungs from the full-size sibling.
 */
const THUMB_WIDTH = 720;

async function capture(page, file, fullPage = false) {
  // Fonts must be settled or the shot catches a fallback face.
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(outDir, `${file}.png`),
    fullPage,
  });
  console.log(`  ok ${file}${fullPage ? " (full page)" : ""}`);
}

async function main() {
  mkdirSync(outDir, { recursive: true });
  mkdirSync(thumbDir, { recursive: true });

  const browser = await chromium.launch();

  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  // The SPA keeps a connection open while Vite HMR is attached, so
  // "networkidle" never settles — wait for "load" plus a delay instead.
  async function open(route) {
    await page.goto(url + route, { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(1500);
  }

  await open("/");
  await capture(page, "desktop");
  await capture(page, "home-full", true);

  await open("/jobs");
  await capture(page, "jobs");

  await browser.close();

  // Mirror every capture into thumbs/ at 720px, JPEG like the other slugs.
  for (const file of ["desktop", "jobs"]) {
    await sharp(path.join(outDir, `${file}.png`))
      .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(path.join(thumbDir, `${file}.jpg`));
    console.log(`  ok thumbs/${file}.jpg`);
  }

  console.log(`Screenshots saved to ${outDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
