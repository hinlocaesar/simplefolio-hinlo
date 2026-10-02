/**
 * Inline the emitted stylesheet into dist/index.html.
 *
 * First paint currently needs two sequential round trips: the document, then
 * the render-blocking stylesheet it links to. Measured locally at 250ms RTT the
 * chain reads HTML 353ms -> CSS 674ms -> FCP 792ms, so the stylesheet costs a
 * whole round trip before anything can paint. Against github.io that same hop
 * measured between 124ms and 1895ms depending on how the connection was
 * behaving, which is exactly the variance that makes a page feel slow.
 *
 * Inlining makes first paint depend on one request. Total bytes are unchanged
 * (the CSS is already minified and gzips to ~7 KB, which it still does inside
 * the document), and because it is the *whole* stylesheet rather than a
 * hand-picked critical subset there is no flash of unstyled content to get
 * wrong.
 *
 * Runs as `postbuild`. Fails loudly if it finds anything other than exactly one
 * stylesheet link, so a template change cannot silently ship two round trips
 * again.
 */
import fs from "node:fs";
import path from "node:path";

const DIST = path.resolve("dist");
const INDEX = path.join(DIST, "index.html");

let html = fs.readFileSync(INDEX, "utf8");

const inlined = [];
const LINK = /<link\b[^>]*>/gi;

html = html.replace(LINK, (tag) => {
  const isStylesheet = /rel=["']?stylesheet\b/i.test(tag);
  const href = tag.match(/\bhref=["']?([^"'\s>]+)/i)?.[1];
  if (!isStylesheet || !href || !/\.css(\?|#|$)/i.test(href)) return tag;

  const file = path.join(DIST, decodeURIComponent(href.split(/[?#]/)[0]));
  if (!fs.existsSync(file)) throw new Error(`stylesheet not found in dist: ${href}`);
  const css = fs.readFileSync(file, "utf8");
  if (css.includes("</style>")) throw new Error(`stylesheet contains a closing </style> tag: ${href}`);

  inlined.push({ href, file, raw: css.length });
  return `<style>${css}</style>`;
});

if (inlined.length !== 1) {
  throw new Error(
    `expected exactly 1 stylesheet link in dist/index.html, found ${inlined.length}. ` +
      `If the template now emits an extra one, it needs inlining too.`
  );
}

fs.writeFileSync(INDEX, html);

// Unreferenced once inlined; leaving it in dist would deploy a file nothing
// asks for and leave the next reader wondering which one actually applies.
fs.rmSync(inlined[0].file);

console.log(
  `inline-css: ${path.relative(process.cwd(), inlined[0].file)} (${inlined[0].raw} B) -> index.html`
);
