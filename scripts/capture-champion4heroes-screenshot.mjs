import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = "https://hinlocaesar.github.io/champion-4-heroes/";
const outDir = path.resolve(
  __dirname,
  "../src/assets/project-images/champion4heroes"
);
const thumbDir = path.resolve(
  __dirname,
  "../src/assets/project-images/thumbs/champion4heroes"
);

const VIEWPORT = { width: 1366, height: 767 };
const THUMB_WIDTH = 720;

async function captureSettled(page) {
  await page.goto(url, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2000);
}

// Reveal-on-scroll elements stay hidden until they enter the viewport, so walk
// the page before capturing to make sure the hero renders fully settled.
async function settleReveals(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 120));
    }
    window.scrollTo(0, 0);
    await new Promise((resolve) => setTimeout(resolve, 300));
  });
}

async function buildThumb(browser, pngPath, outPath) {
  const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
  const dataUri = `data:image/png;base64,${(await fs.readFile(pngPath)).toString("base64")}`;

  const thumb = await page.evaluate(
    async ({ src, width }) => {
      const image = new Image();
      image.src = src;
      await image.decode();

      const height = Math.round(image.naturalHeight * (width / image.naturalWidth));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, width, height);

      return canvas.toDataURL("image/jpeg", 0.82).split(",")[1];
    },
    { src: dataUri, width: THUMB_WIDTH }
  );

  await fs.writeFile(outPath, Buffer.from(thumb, "base64"));
  await page.close();
}

async function main() {
  await fs.mkdir(outDir, { recursive: true });
  await fs.mkdir(thumbDir, { recursive: true });

  const browser = await chromium.launch();

  const desktopPage = await browser.newPage({ viewport: VIEWPORT });
  await captureSettled(desktopPage);
  await settleReveals(desktopPage);

  const fullPath = path.join(outDir, "desktop.png");
  await desktopPage.screenshot({ path: fullPath });
  await desktopPage.close();

  await buildThumb(browser, fullPath, path.join(thumbDir, "desktop.jpg"));

  await browser.close();
  console.log(`Screenshot saved to ${fullPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
