/**
 * Lighthouse audit against the built site.
 *
 *   node scripts/audit.mjs                    # serve ./dist and audit it
 *   node scripts/audit.mjs --url URL          # audit a running server
 *   node scripts/audit.mjs --only mobile
 *
 * Reports accessibility, SEO, best-practices and performance, and prints the
 * audits that actually failed rather than the scores alone — the scores are
 * already on the command line, and the failures are what is actionable.
 */
import { launch } from "chrome-launcher";
import lighthouse from "lighthouse";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};

function arg(flag) {
  const i = process.argv.indexOf(flag);
  return i > -1 ? process.argv[i + 1] : undefined;
}

function serveDist() {
  const server = http.createServer((req, res) => {
    let file = path.join(DIST, decodeURIComponent(req.url.split("?")[0]));
    if (!file.startsWith(DIST)) file = path.join(DIST, "index.html");
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
      file = path.join(file, "index.html");
    }
    if (!fs.existsSync(file)) {
      res.writeHead(404);
      return res.end("not found");
    }
    res.writeHead(200, { "Content-Type": MIME[path.extname(file)] ?? "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve({ server, port: server.address().port }));
  });
}

async function main() {
  const explicitUrl = arg("--url");
  let server = null;
  let url = explicitUrl;
  if (!url) {
    if (!fs.existsSync(path.join(DIST, "index.html"))) {
      throw new Error("dist/index.html is missing — run `npm run build` first.");
    }
    ({ server } = await serveDist());
    url = `http://127.0.0.1:${server.address().port}/`;
  }

  const chrome = await launch({ chromeFlags: ["--headless=new", "--no-sandbox"] });
  try {
    const result = await lighthouse(
      url,
      { port: chrome.port, output: "json", logLevel: "error" },
      {
        extends: "lighthouse:default",
        settings: {
          formFactor: arg("--only") === "mobile" ? "mobile" : "desktop",
          screenEmulation: { mobile: false, width: 1440, height: 900, deviceScaleFactor: 1 },
          emulatedUserAgent: false,
          throttlingMethod: "provided",
        },
      }
    );

    const lhr = result.lhr;
    for (const [key, cat] of Object.entries(lhr.categories)) {
      console.log(`\n${cat.title}: ${Math.round(cat.score * 100)}`);
    }

    const failures = Object.values(lhr.audits)
      .filter((a) => a.score !== null && a.score < 1 && ["error", "warning", "binary"].includes(a.scoreDisplayMode))
      .sort((a, b) => (a.score ?? 1) - (b.score ?? 1));

    if (!failures.length) {
      console.log("\nNo failing audits.");
    } else {
      console.log("\nFailing audits:");
      for (const audit of failures) {
        console.log(`  [${audit.scoreDisplayMode}] ${audit.id} — ${audit.title}`);
        const detail = audit.details?.items?.[0];
        if (detail?.node?.snippet) {
          console.log(`      ${detail.node.snippet.slice(0, 160)}`);
        }
      }
    }
  } finally {
    await chrome.kill();
    server?.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
