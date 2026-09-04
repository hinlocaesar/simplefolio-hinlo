import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = "https://sweetmagicpopcorn.com/";
const outDir = path.resolve(
  __dirname,
  "../src/assets/project-images/sweetmagicpopcorn"
);

async function captureSettled(page) {
  await page.goto(url, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2500);

  await page.evaluate(() => {
    const banner =
      document.querySelector('[data-aid="FOOTER_COOKIE_BANNER_RENDERED"]') ||
      document.querySelector(".widget-cookie-banner");
    if (banner) banner.remove();
  });
  await page.waitForTimeout(300);
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();

  const desktopPage = await browser.newPage({
    viewport: { width: 1366, height: 767 },
  });
  await captureSettled(desktopPage);
  await desktopPage.screenshot({ path: path.join(outDir, "desktop.png") });
  await desktopPage.close();

  await browser.close();
  console.log(`Screenshot saved to ${outDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
