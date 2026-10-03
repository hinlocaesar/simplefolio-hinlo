/**
 * Generates the deployable image set under `public/assets`.
 *
 * Next.js serves `public/` verbatim from the site root, so the directory a
 * browser requests (`/assets/foo.webp`) is the directory this writes
 * (`public/assets/foo.webp`) -- there is no copy step in between.
 *
 * The originals in `src/assets` stay untouched so the `scripts/capture-*.mjs`
 * screenshot helpers can keep overwriting them. This script re-encodes every
 * raster asset as WebP at a width that matches how large the image is actually
 * rendered. That mirrored layout is what lets a component reference
 * `assets/foo.png` as `assets/foo.webp` with a one-to-one rename.
 *
 * Run automatically by `npm run build` (see the `prebuild` script).
 */
import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = path.join(ROOT, "src", "assets");
const OUT_DIR = path.join(ROOT, "public", "assets");

const RASTER = /\.(png|jpe?g|webp)$/i;

/** Favicons have to stay PNG for legacy/tab-icon support. */
const PASSTHROUGH = new Set(["favicon.png", path.join("project-images", "favicon.png")]);

/**
 * Ceiling on the long edge. The default is generous because most of these are
 * only opened in the lightbox on a large screen; the per-file entries below cap
 * the images that are in the initial viewport, where every kilobyte counts.
 */
const DEFAULT_MAX_WIDTH = 1600;

/**
 * Project card thumbnails get a `srcset` ladder instead of a single file.
 * Cards are 32rem (320px) wide on desktop and 34rem on tablet, but `79vw` on
 * phones, which reaches ~470px on a 600px viewport. So 320/640/960 covers 1x
 * desktop, 2x desktop, and 2x/3x large-phone without a single oversized
 * download. The top rung comes from the full-size capture, not the 720px thumb.
 */
const THUMB_WIDTHS = [320, 640, 960, 1280];

/**
 * No card is ever wider than ~470px CSS, and even at 3x that is ~1410px. This
 * ceiling keeps a 1366px capture from being offered as a 1366px rung when
 * 1280 already covers the largest realistic case.
 */
const THUMB_WIDTH_CEILING = 1280;

/** Keyed by the source path, relative to `src/assets`, with forward slashes. */
const MAX_WIDTH = {
  // Renders as a decorative background, and is already only 892px wide.
  "hero-team.png": 1200,
  // Mobile-only hero portrait, shown inside a 96px circle that is scaled 2.45x.
  // The visible region is ~44% of the frame, so 480px still covers the circle at
  // DPR 3 (212 source px for 288 device px) and measures *sharper* than the old
  // 900px build at DPR 2. 900px was 185KB for a 96px circle — 58% of the whole
  // phone page. 480px is 66KB.
  "profile.jpg": 480,
  // Small badge in the credentials section.
  "credentials/laravel-architect-badge.png": 512,
};

/** Photographs tolerate a lower quality than flat UI art, which needs crisp text. */
const PHOTO = /photo|profile|board-mention|portrait|team-photo/i;
const PHOTO_QUALITY = 72;
const FLAT_QUALITY = 82;

const isThumb = (relPath) => relPath.split(path.sep).includes("thumbs");

/**
 * The widths to emit for one source image, plus the filename stem each is
 * written to. The widest keeps the bare name so `<img src>` stays a one-to-one
 * rename of the source; narrower rungs get a `-<width>` suffix.
 */
function variantsFor(relPath, sourceWidth, ladderWidth) {
  if (!isThumb(relPath)) {
    return [
      { width: MAX_WIDTH[relPath.split(path.sep).join("/")] ?? DEFAULT_MAX_WIDTH, suffix: "" },
    ];
  }
  // Rungs at or below the best available source width only: upscaling would add
  // bytes without adding detail. The top rung is the standard width that fits,
  // or the source width itself when that sits between two rungs, so a 952px
  // capture offers 952px rather than stopping short at 640.
  const cap = ladderWidth ?? sourceWidth;
  const widths = THUMB_WIDTHS.filter((w) => w <= cap);
  const top = Math.min(cap, THUMB_WIDTH_CEILING);
  if (top > (widths[widths.length - 1] ?? 0)) widths.push(top);
  return widths.map((width, i) => ({
    width,
    suffix: i === widths.length - 1 ? "" : `-${width}`,
  }));
}

/**
 * The `thumbs/<slug>/<stem>` cards have a full-resolution sibling at
 * `<slug>/<stem>`, sometimes under a different extension (the thumb is usually
 * a .jpg derived from a .png screenshot). Resolving it lets the widest rungs be
 * rendered from the real capture instead of being capped at the thumb's 720px.
 */
function findFullSizeSibling(relPath, all) {
  const parts = relPath.split(path.sep);
  const thumbsAt = parts.indexOf("thumbs");
  // `.../thumbs/<slug>/<stem>` -> `<slug>/<stem>`, with the extension dropped so
  // a .jpg thumb still matches its .png original. Everything before `thumbs`
  // (i.e. `project-images`) is carried over to keep the comparison aligned.
  const stem = parts
    .slice(thumbsAt + 2)
    .join("/")
    .replace(/\.[^.]+$/, "");
  const wanted = [...parts.slice(0, thumbsAt), parts[thumbsAt + 1], stem].join("/");

  const match = all.find((candidate) => {
    if (!RASTER.test(candidate)) return false;
    const segments = candidate.split(path.sep);
    if (segments.includes("thumbs")) return false;
    // Compare on directories and extensionless basename so platform separators
    // and differing extensions do not matter.
    const dirs = segments.slice(0, -1).join("/");
    const base = segments[segments.length - 1].replace(/\.[^.]+$/, "");
    return `${dirs}/${base}` === wanted.split(path.sep).join("/");
  });
  return match ? path.join(SRC_DIR, match) : null;
}

async function collect(dir, base = "") {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const rel = base ? path.join(base, entry.name) : entry.name;
    // `opt` is our own output; never read it back in.
    if (rel === "opt") continue;
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await collect(abs, rel)));
    else if (RASTER.test(entry.name) && !PASSTHROUGH.has(rel)) files.push(rel);
  }
  return files;
}

async function main() {
  await fs.rm(OUT_DIR, { recursive: true, force: true });

  const files = (await collect(SRC_DIR)).sort();
  const rows = [];
  let before = 0;
  let after = 0;

  for (const rel of files) {
    const src = path.join(SRC_DIR, rel);
    const quality = PHOTO.test(rel) ? PHOTO_QUALITY : FLAT_QUALITY;
    const originalBytes = (await fs.stat(src)).size;
    const { width: sourceWidth } = await sharp(src).metadata();

    // Cards render up to ~470px on a large phone at 3x, so when a full-size
    // sibling exists the wide rungs come from it rather than the 720px thumb.
    const sibling = isThumb(rel) ? findFullSizeSibling(rel, files) : null;
    const ladderWidth = sibling ? (await sharp(sibling).metadata()).width : sourceWidth;

    const variants = variantsFor(rel, sourceWidth, ladderWidth);
    // For a single-rung image this is the bare name, so the template's
    // `assets/foo.png` -> `assets/foo.webp` rename keeps working unchanged.
    const stem = rel.replace(RASTER, "");

    const emitted = [];
    for (const { width, suffix } of variants) {
      const dest = path.join(OUT_DIR, `${stem}${suffix}.webp`);
      await fs.mkdir(path.dirname(dest), { recursive: true });

      // Rungs at or below the thumb's own width use the thumb; wider ones need
      // the full-size capture, since upscaling a 720px thumb is a no-op.
      const input = width > sourceWidth && sibling ? sibling : src;

      let info;
      try {
        info = await sharp(input)
          .rotate()
          .resize({ width, withoutEnlargement: true })
          .webp({ quality, effort: 6, smartSubsample: true })
          .toFile(dest);
      } catch (error) {
        throw new Error(`Failed to optimize ${rel} (${width}px): ${error.message}`);
      }

      const optimizedBytes = (await fs.stat(dest)).size;

      // Re-encoding an already-compressed WebP can come out larger, in which
      // case the original bytes are the better artifact. Only meaningful for
      // single-variant images: a narrow rung is always smaller than its source.
      const revert = variants.length === 1 && optimizedBytes >= originalBytes;
      if (revert) await fs.copyFile(src, dest);

      const bytes = revert ? originalBytes : optimizedBytes;
      before += originalBytes;
      after += bytes;
      emitted.push({
        path: path.relative(OUT_DIR, dest).split(path.sep).join("/"),
        width: info.width,
        height: info.height,
        bytes,
        kept: revert,
      });
    }

    rows.push({ rel, originalKB: originalBytes / 1024, originalBytes, variants: emitted });
  }

  // The manifest is what keeps hand-written `srcset` attributes honest: the
  // components must declare the widths that actually exist on disk. Keys are
  // root-absolute because that is the URL a browser requests.
  const manifest = Object.fromEntries(
    rows.flatMap((row) =>
      row.variants.map((v) => [`/assets/${v.path}`, { w: v.width, h: v.height }])
    )
  );
  await fs.writeFile(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));

  rows.sort((a, b) => b.originalKB - a.originalKB);
  console.log("   before      after   saved  size          file");
  for (const row of rows) {
    const widest = row.variants[row.variants.length - 1];
    const emittedBytes = row.variants.reduce((sum, v) => sum + v.bytes, 0);
    const size =
      row.variants.length > 1
        ? `${row.variants.map((v) => v.width).join("/")}px`.padEnd(13)
        : `${widest.width}x${widest.height}`.padEnd(13);
    // A ladder is a menu, not a bundle: compare the total on disk against the
    // original, and separately show what the widest rung costs a visitor.
    const saved = `${Math.round((1 - emittedBytes / row.originalBytes) * 100)}%`.padStart(5);
    const top = row.variants.length > 1 ? ` (widest ${Math.round(widest.bytes / 1024)} KB)` : "";
    console.log(
      `${String(Math.round(row.originalKB)).padStart(7)} KB ${String(Math.round(emittedBytes / 1024)).padStart(7)} KB ${saved}  ${size} ${row.rel}${top}`
    );
  }
  console.log(
    `\n  ${rows.length} images -> ${rows.reduce((n, r) => n + r.variants.length, 0)} files, ${(before / 1024 / 1024).toFixed(2)} MB of originals -> ${(after / 1024 / 1024).toFixed(2)} MB deployed`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
