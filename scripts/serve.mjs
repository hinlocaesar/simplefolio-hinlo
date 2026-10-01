/**
 * Static preview server for the built site.
 *
 *   npm run serve            # http://127.0.0.1:4173
 *   npm run serve -- 8080    # pick a port
 *
 * Serves `dist` with the same MIME types and gzip that production does, so what
 * you see here matches what GitHub Pages will serve rather than the development
 * bundle. Use `npm start` when you actually want to edit styles.
 */
import http from "node:http";
import fs from "node:fs";
import zlib from "node:zlib";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.resolve(__dirname, "../dist");
const PORT = Number(process.argv[2]) || 4173;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".pdf": "application/pdf",
};

const COMPRESSIBLE = new Set([".html", ".js", ".css", ".json", ".svg"]);

if (!fs.existsSync(path.join(DIST, "index.html"))) {
  console.error("dist/index.html is missing — run `npm run build` first.");
  process.exit(1);
}

const server = http.createServer((req, res) => {
  let file = path.join(DIST, decodeURIComponent(req.url.split("?")[0]));

  // Never serve outside dist, however the path is spelled.
  if (!file.startsWith(DIST)) file = path.join(DIST, "index.html");
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    file = path.join(file, "index.html");
  }
  if (!fs.existsSync(file)) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    return res.end("Not found");
  }

  const ext = path.extname(file);
  const headers = { "Content-Type": MIME[ext] ?? "application/octet-stream" };

  if (String(req.headers["accept-encoding"] ?? "").includes("gzip") && COMPRESSIBLE.has(ext)) {
    headers["Content-Encoding"] = "gzip";
    res.writeHead(200, headers);
    return fs.createReadStream(file).pipe(zlib.createGzip()).pipe(res);
  }

  res.writeHead(200, headers);
  fs.createReadStream(file).pipe(res);
});

// Bound to all interfaces rather than loopback so the server is reachable as
// localhost, 127.0.0.1, or the machine's LAN address — loopback-only binding
// refuses connections when the browser arrives from WSL, a container, or a
// forwarded port, which is a confusing way to lose a preview.
server.listen(PORT, "0.0.0.0", () => {
  const { port } = server.address();
  console.log(`Serving dist/ (gzip enabled)\n`);

  const urls = [`http://localhost:${port}/`, `http://127.0.0.1:${port}/`];

  // LAN address, so the site is reachable from another device on the network.
  for (const addresses of Object.values(os.networkInterfaces())) {
    for (const address of addresses ?? []) {
      if (address.family === "IPv4" && !address.internal) {
        urls.push(`http://${address.address}:${port}/`);
      }
    }
  }

  for (const url of urls) console.log(`  ${url}`);
  console.log(`\nCtrl+C to stop.`);
});
