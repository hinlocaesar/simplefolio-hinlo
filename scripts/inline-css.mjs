/**
 * Inline the emitted stylesheet into the prerendered page.
 *
 * First paint needs two sequential round trips: the document, then the
 * render-blocking stylesheet it links to. Measured locally at 250ms RTT the
 * chain reads HTML 353ms -> CSS 674ms -> FCP 792ms, so the stylesheet costs a
 * whole round trip before anything can paint. Against a real host that same hop
 * varies wildly, which is exactly the variance that makes a page feel slow.
 *
 * Inlining makes first paint depend on one request. Total bytes are unchanged
 * (the CSS is already minified and gzips to ~7 KB, which it still does inside
 * the document), and because it is the *whole* stylesheet rather than a
 * hand-picked critical subset there is no flash of unstyled content to get
 * wrong.
 *
 * Next.js 16 has an `experimental.inlineCss` flag for this, but it is marked
 * experimental, duplicates the styles between the SSR output and the RSC payload,
 * and cannot be configured per page. This is a single page, so the hand-rolled
 * version stays cheaper and is checked by `npm run verify` either way.
 *
 * Runs as `postbuild`. Fails loudly if it finds anything other than exactly one
 * stylesheet link, so a template change cannot silently ship two round trips
 * again.
 */
import fs from "node:fs";
import path from "node:path";

/**
 * The prerendered HTML. `/` is a static route, so Next.js writes it to disk at
 * build time and the server streams this exact file for every request.
 */
const PAGE = path.join(".next", "server", "app", "index.html");

if (!fs.existsSync(PAGE)) {
  throw new Error(`${PAGE} is missing - run \`next build\` first.`);
}

let html = fs.readFileSync(PAGE, "utf8");

const inlined = [];
const LINK = /<link\b[^>]*>/gi;

html = html.replace(LINK, (tag) => {
  const isStylesheet = /rel=["']?stylesheet\b/i.test(tag);
  const href = tag.match(/\bhref=["']?([^"'\s>]+)/i)?.[1];
  if (!isStylesheet || !href || !/\.css(\?|#|$)/i.test(href)) return tag;

  // `/_next/static/` is the public URL prefix for the `.next/static` directory,
  // so strip the whole prefix rather than just the leading slash.
  const file = path.join(
    ".next",
    "static",
    decodeURIComponent(href).replace(/^\/_next\/static\//, "")
  );
  if (!fs.existsSync(file)) throw new Error(`stylesheet not found: ${href} -> ${file}`);
  const css = fs.readFileSync(file, "utf8");
  if (css.includes("</style>"))
    throw new Error(`stylesheet contains a closing </style> tag: ${href}`);

  inlined.push({ href, file, raw: css.length });
  return `<style>${css}</style>`;
});

if (inlined.length !== 1) {
  throw new Error(
    `expected exactly 1 stylesheet link in ${PAGE}, found ${inlined.length}. ` +
      `If the app now emits an extra one, it needs inlining too.`
  );
}

fs.writeFileSync(PAGE, html);

// Not deleted, unlike the webpack-era equivalent: this is a single shared chunk
// under `/_next/static`, and Next.js serves that directory from disk. Removing
// it would break the client-side navigation path and any prefetch of it.

console.log(
  `inline-css: ${inlined[0].href} (${inlined[0].raw} B) -> ${path.relative(process.cwd(), PAGE)}`
);
