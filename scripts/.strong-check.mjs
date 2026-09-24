import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
await page.goto("http://localhost:8081", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(900);
await page.locator("#skills").screenshot({ path: "scripts/strong-skills.png" });
console.log(await page.evaluate(() => ({ strong: document.querySelectorAll(".tag--strong").length, overflow: document.body.scrollWidth - innerWidth })));
await browser.close();
