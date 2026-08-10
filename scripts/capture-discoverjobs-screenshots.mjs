import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url = "https://discoverjobs.org/us/jobs";
const outDir = path.resolve(
  __dirname,
  "../src/assets/project-images/discoverjobs"
);

// Reverb/Echo websocket keeps the connection open indefinitely, so
// "networkidle" never resolves — wait for "load" plus a settle delay instead.
async function captureSettled(page) {
  await page.goto(url, { waitUntil: "load", timeout: 60000 });
  await page.waitForSelector("text=jobs posted", { timeout: 15000 }).catch(() => {});
  await page.waitForTimeout(1500);
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
