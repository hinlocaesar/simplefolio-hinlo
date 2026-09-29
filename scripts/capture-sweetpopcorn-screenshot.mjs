import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = "https://hinlocaesar.github.io/sweet-popcorn/";
const outDir = path.resolve(
  __dirname,
  "../src/assets/project-images/sweetpopcorn"
);
const thumbDir = path.resolve(
  __dirname,
  "../src/assets/project-images/thumbs/sweetpopcorn"
);

const VIEWPORT = { width: 1366, height: 767 };
const THUMB_WIDTH = 720;

async function captureSettled(page) {
  await page.goto(url, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2000);
}

// Reveal-on-scroll elements stay hidden until they enter the viewport, so walk
// the page before capturing to make sure the hero renders fully settled.
//
// This site sets `html { scroll-behavior: smooth }`, which makes every
// programmatic scrollTo animate: the loop's next step fires before the
// previous one lands, and the final scrollTo(0, 0) was still mid-flight when
// the screenshot was taken (a capture cropped below the header). Force the
// instant behaviour for the walk, then wait for the .reveal transitions to
// finish rather than guessing at a delay.
async function settleReveals(page) {
  await page.evaluate(async () => {
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";

    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 120));
    }
    window.scrollTo(0, 0);

    const deadline = Date.now() + 4000;
    while (Date.now() < deadline) {
      const pending = [...document.querySelectorAll(".reveal")].filter(
        (el) => Number(getComputedStyle(el).opacity) < 0.99
      );
      if (!pending.length) break;
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    await new Promise((resolve) => setTimeout(resolve, 300));

    root.style.scrollBehavior = previousBehavior;
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

  // Guard against any stray scroll position: the capture must be the top of
  // the page, header included.
  await desktopPage.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
  });
  await desktopPage.waitForFunction(() => window.scrollY === 0);
  await desktopPage.waitForTimeout(300);

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
