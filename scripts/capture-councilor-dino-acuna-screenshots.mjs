import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const url = process.env.COUNCILOR_DINO_ACUNA_URL ?? "https://hinlocaesar.github.io/councilor-dino-acuna/";
const outDir = path.resolve(__dirname, "../src/assets/project-images/councilor-dino-acuna");
const thumbDir = path.resolve(__dirname, "../src/assets/project-images/thumbs/councilor-dino-acuna");

const VIEWPORT = { width: 1440, height: 810 };
const THUMB_WIDTH = 720;

async function capture(page, file) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(600);
  await page.screenshot({ path: path.join(outDir, `${file}.png`) });
  console.log(`  ok ${file}`);
}

async function main() {
  mkdirSync(outDir, { recursive: true });
  mkdirSync(thumbDir, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  async function open(route) {
    await page.goto(url.replace(/\/$/, "") + route, {
      waitUntil: "load",
      timeout: 60000,
    });
    await page.waitForTimeout(1500);
  }

  await open("/");
  await capture(page, "desktop");

  await browser.close();

  await sharp(path.join(outDir, "desktop.png"))
    .resize({ width: THUMB_WIDTH, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(path.join(thumbDir, "desktop.jpg"));
  console.log(`  ok thumbs/desktop.jpg`);

  console.log(`Screenshots saved to ${outDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});