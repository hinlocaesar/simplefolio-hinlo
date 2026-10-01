import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Plum Village App (web edition). Pass PLUMVILLAGE_URL to shoot another
 * environment, e.g. a preview deploy of the same build.
 */
const url = process.env.PLUMVILLAGE_URL ?? "https://web.plumvillage.app/";
const outDir = path.resolve(__dirname, "../src/assets/project-images/plumvillage");
const thumbDir = path.resolve(__dirname, "../src/assets/project-images/thumbs/plumvillage");

/** Card images render at 16:9, so a 16:9 viewport crops to nothing. */
const VIEWPORT = { width: 820, height: 461 };

/**
 * The layout is a single fixed-width column, so a desktop-width viewport only
 * adds dead space either side of it. 820px is about the column's natural width
 * and fills the frame; capturing at 2x keeps the type crisp in the lightbox.
 */
const CONTEXT = { viewport: VIEWPORT, deviceScaleFactor: 2 };

/**
 * The card thumbnail is the 720px rung the srcset ladder is built from;
 * `optimize-images.mjs` sources the wider rungs from the full-size sibling.
 */
const THUMB_WIDTH = 720;

/** Routes worth showing on the card, in gallery order. */
const ROUTES = [{ file: "home", route: "/" }];

async function capture(page, file) {
  // Fonts must be settled or the shot catches a fallback face.
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, `${file}.png`) });
  console.log(`  ok ${file}`);
}

async function main() {
  mkdirSync(outDir, { recursive: true });
  mkdirSync(thumbDir, { recursive: true });

  const browser = await chromium.launch();

  const context = await browser.newContext(CONTEXT);
  const page = await context.newPage();

  async function open(route) {
    await page.goto(url.replace(/\/$/, "") + route, {
      waitUntil: "load",
      timeout: 60000,
    });
    await page.waitForTimeout(1500);
  }

  for (const { file, route } of ROUTES) {
    await open(route);
    await capture(page, file);
  }

  await browser.close();

  // Mirror every capture into thumbs/ at 720px, JPEG like the other slugs.
  for (const { file } of ROUTES) {
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
