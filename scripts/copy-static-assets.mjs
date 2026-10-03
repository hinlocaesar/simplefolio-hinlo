/**
 * Copies the files `scripts/optimize-images.mjs` does not produce.
 *
 * Under webpack these were three `CopyWebpackPlugin` patterns. `public/` is
 * served verbatim from the site root, so the same job is now a matter of getting
 * the right files into `public/assets`:
 *
 *   - the skill icons, which are SVG and stay as authored
 *   - the favicon, which has to stay PNG for legacy tab-icon support
 *   - the downloadable résumé and certificate, which are not images at all
 *
 * "Which rasters were already emitted" is read from the manifest rather than
 * re-declared here, so this stays correct if a file is added to the passthrough
 * set over there. Runs as part of `prebuild`, after `optimize:images`.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = path.join(ROOT, "src", "assets");
const OUT_DIR = path.join(ROOT, "public", "assets");

/** Everything that is not a raster is copied through untouched. */
const RASTER = /\.(png|jpe?g|webp|gif)$/i;

const manifest = JSON.parse(await fs.readFile(path.join(OUT_DIR, "manifest.json"), "utf8"));

async function copy(from, to) {
  await fs.mkdir(path.dirname(to), { recursive: true });
  await fs.copyFile(from, to);
}

async function walk(dir, base = "") {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const copied = [];

  for (const entry of entries) {
    const rel = base ? path.join(base, entry.name) : entry.name;
    const abs = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      copied.push(...(await walk(abs, rel)));
      continue;
    }

    // A raster that the optimizer turned into a WebP is already deployed; the
    // original stays in `src/assets` only as the source for the capture scripts.
    const emitted = `/assets/${rel.replace(RASTER, "")}.webp`;
    if (RASTER.test(entry.name) && manifest[emitted]) continue;

    await copy(abs, path.join(OUT_DIR, rel));
    copied.push(rel);
  }

  return copied;
}

const copied = (await walk(SRC_DIR)).sort();

for (const rel of copied) {
  console.log(`   ${rel}`);
}
console.log(`\n  ${copied.length} static file(s) -> public/assets`);
