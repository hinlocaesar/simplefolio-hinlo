/**
 * Rewrites the project-card <img> tags in the components so their srcset, sizes,
 * width and height match what scripts/optimize-images.mjs actually emitted. Run
 * it after changing image sources; it is idempotent, so it also re-patches cards
 * whose attributes are already present.
 */
import fs from "node:fs";

const manifest = JSON.parse(fs.readFileSync("public/assets/manifest.json", "utf8"));

/**
 * Every file the page can render as a card thumbnail, so the patch applies to the
 * components regardless of which section a card ended up in. Only `Projects.tsx`
 * and `About.tsx` carry these today, but the tag does not care.
 */
const COMPONENTS = ["components/Projects.tsx", "components/About.tsx"];

/**
 * Mirrors `.project-card` in _projects.scss: 32rem wide by default, 34rem up to
 * the tab-land breakpoint, 79vw on phones.
 *
 * These are px on purpose. Inside a `sizes` attribute, `em` and `rem` both
 * resolve against the browser's *initial* font size (16px), not the root
 * element's, and this stylesheet sets `html { font-size: 62.5% }`. A `32rem`
 * here is therefore read as 512px, which made Chromium pick the 640w rung at
 * 1x. Breakpoints come from _mixins.scss converted at the 10px root size.
 *
 * `sizes` must over-state slightly rather than under-state: a card measured
 * 338px on a 900px viewport (the 34rem rule, plus a scrollbar gutter) but the
 * 75em breakpoint only runs to 750px, so it landed on the 320px slot and
 * fetched one rung short at 2x. The 900px cut keeps the tablet range honest.
 */
const SIZES = "(max-width: 375px) 79vw, (max-width: 900px) 340px, 320px";

/** Machine-readable record of what this script generated, for the next run. */
const STATE = "public/assets/.srcset-applied.json";

const THUMB_PREFIX = "/assets/project-images/thumbs/";

/**
 * Every file emitted for one thumb's directory+stem, ascending by width.
 * Matching is anchored on the stem followed by a non-digit, so `desktop` picks
 * up `desktop-320`/`desktop-640` but not `desktop-alt-320`.
 */
function ladderFor(base) {
  // `base` still carries the .webp extension; the ladder is keyed on the stem.
  const rel = base.slice(THUMB_PREFIX.length).replace(/\.webp$/, "");
  const dir = rel.includes("/") ? rel.slice(0, rel.lastIndexOf("/")) : "";
  const stem = dir ? rel.slice(rel.lastIndexOf("/") + 1) : rel;
  const pattern = new RegExp(
    `^${THUMB_PREFIX.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}${dir ? dir.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "/" : ""}${stem.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?:-(\\d+))?\\.webp$`
  );
  return Object.entries(manifest)
    .filter(([url]) => pattern.test(url))
    .map(([url, dim]) => ({ url, w: dim.w, h: dim.h }))
    .sort((a, b) => a.w - b.w);
}

/**
 * Matches a whole <img> element whose src points at a card thumbnail, whether
 * or not it already carries srcset, so re-runs converge on the same output.
 */
const IMG = new RegExp(
  String.raw`<img\b[^>]*?src="(${THUMB_PREFIX.replace(/\//g, "\\/")}[^"]+)"[^>]*?>`,
  "g"
);

const missing = [];
let patched = 0;

const apply = (match, src) => {
  const alt = /alt="([^"]*)"/.exec(match)?.[1] ?? "";
  // Rebuilding the tag drops any previous srcset/sizes/width/height.
  const ladder = ladderFor(src);
  if (!ladder.length) {
    missing.push(src);
    return match;
  }
  const widest = ladder[ladder.length - 1];
  const srcset = ladder.map((r) => `${r.url} ${r.w}w`).join(", ");
  patched++;
  // Indentation is left to Prettier; only the attributes matter here. React
  // spells the attribute `srcSet` and renders it back out as `srcset`.
  return (
    `<img\n` +
    `alt="${alt}"\n` +
    `src="${widest.url}"\n` +
    `srcSet="${srcset}"\n` +
    `sizes="${SIZES}"\n` +
    `width="${widest.w}"\n` +
    `height="${widest.h}"\n` +
    `loading="lazy"\n` +
    `decoding="async"\n` +
    `/>`
  );
};

/**
 * `src` is the widest rung of the ladder, which is exactly what IMG anchors on,
 * so re-runs converge on the same output and the script is safe to leave wired
 * into `prebuild`.
 */
for (const file of COMPONENTS) {
  const source = fs.readFileSync(file, "utf8");
  const next = source.replace(IMG, apply);
  if (next !== source) fs.writeFileSync(file, next, "utf8");
}

if (missing.length) {
  console.error("No manifest entries for:\n  " + missing.join("\n  "));
  process.exit(1);
}

fs.writeFileSync(
  STATE,
  JSON.stringify({ sizes: SIZES, appliedAt: new Date().toISOString() }, null, 2)
);
console.log(
  patched
    ? `wrote srcset/sizes/width/height on ${patched} card images`
    : "card images already up to date"
);
