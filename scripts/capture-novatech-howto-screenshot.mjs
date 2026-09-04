import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url =
  "https://novatech.net/how-to-guides/find-your-kyocera-ip-address";
const outDir = path.resolve(
  __dirname,
  "../src/assets/project-images/novatech-how-to-guides"
);

async function dismissOverlays(page) {
  await page.evaluate(() => {
    for (const sel of [
      ".popup",
      ".modal",
      "[class*='popup']",
      "[class*='modal']",
      "[id*='popup']",
      "[id*='modal']",
      ".fancybox-container",
      ".mfp-wrap",
      "[aria-modal='true']",
    ]) {
      for (const el of document.querySelectorAll(sel)) {
        el.remove();
      }
    }
    for (const el of document.querySelectorAll("*")) {
      const text = (el.textContent || "").trim();
      if (
        text.length < 800 &&
        (/has now (FULLY )?merged with Novatech/i.test(text) ||
          /Exciting Update!/i.test(text) ||
          /Fill in your info to download/i.test(text) ||
          /Microsoft.?s security update/i.test(text))
      ) {
        let node = el;
        for (let i = 0; i < 10 && node.parentElement; i++) {
          const style = window.getComputedStyle(node);
          if (
            style.position === "fixed" ||
            style.position === "absolute" ||
            /overlay|popup|modal|dialog/i.test(node.className || "")
          ) {
            node.remove();
            break;
          }
          node = node.parentElement;
        }
      }
    }
    document.body.style.overflow = "auto";
  });
}

async function captureSettled(page) {
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
  await page.waitForTimeout(4000);
  await dismissOverlays(page);
  await page.waitForTimeout(500);

  // Prefer the guide article body over the full chrome/nav
  const article = page.locator("article, .entry-content, main, #content").first();
  if (await article.count()) {
    await article.scrollIntoViewIfNeeded().catch(() => {});
  }
}

async function main() {
  await mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();

  const desktopPage = await browser.newPage({
    viewport: { width: 1366, height: 900 },
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  });
  await captureSettled(desktopPage);

  // Clip to the guide content area when possible
  const content = desktopPage.locator(
    "article .entry-content, article, .help-content, main .content, #content"
  ).first();
  if (await content.count()) {
    const box = await content.boundingBox();
    if (box && box.height > 200) {
      await desktopPage.screenshot({
        path: path.join(outDir, "desktop.png"),
        clip: {
          x: Math.max(0, box.x - 24),
          y: Math.max(0, box.y - 80),
          width: Math.min(1366, box.width + 48),
          height: Math.min(900, box.height + 100),
        },
      });
    } else {
      await desktopPage.screenshot({ path: path.join(outDir, "desktop.png") });
    }
  } else {
    await desktopPage.screenshot({ path: path.join(outDir, "desktop.png") });
  }

  await desktopPage.close();
  await browser.close();
  console.log(`Screenshot saved to ${outDir}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
