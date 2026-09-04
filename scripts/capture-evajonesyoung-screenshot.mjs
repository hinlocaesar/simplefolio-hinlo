import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = "https://evajonesyoung.wixsite.com/sweetmagic";
const outDir = path.resolve(
  __dirname,
  "../src/assets/project-images/evajonesyoung"
);

async function captureSettled(page) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForTimeout(4000);

  await page.evaluate(() => {
    for (const el of document.querySelectorAll(
      "[data-hook='consent-banner'], [id*='COOKIE'], [class*='cookie'], #WIX_ADS, [data-testid='banner'], [class*='Banner']"
    )) {
      el.remove();
    }
    for (const el of document.querySelectorAll("*")) {
      const text = (el.textContent || "").trim();
      if (
        text.length < 200 &&
        /this website was built on wix|create yours today/i.test(text)
      ) {
        let node = el;
        for (let i = 0; i < 8 && node.parentElement; i++) {
          const style = window.getComputedStyle(node);
          if (style.position === "fixed" || style.position === "sticky") {
            node.remove();
            break;
          }
          node = node.parentElement;
        }
      }
    }
  });
  await page.waitForTimeout(500);
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
