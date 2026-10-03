<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## This project

A single-page portfolio, forked from
[Simplefolio](https://github.com/cobidev/simplefolio). One route (`/`), no data
layer, no API, no environment variables.

### The one rule that matters

**Do not turn sections into client components.** The page is 100% server-rendered
so the client bundle stays off the critical path for first paint, and the page
still works with JavaScript disabled. `components/PageBehaviour.tsx` is the only
`"use client"` module and it renders `null`.

Interactive behaviour attaches to already-rendered markup by class name, from
`components/behaviour/`:

| Module        | Drives                                 |
| ------------- | -------------------------------------- |
| `nav.ts`      | scroll shadow, mobile menu, scroll-spy |
| `carousel.ts` | horizontal project rails               |
| `lightbox.ts` | image lightbox                         |
| `reveal.ts`   | scroll entrances                       |

That is deliberate. Nothing in the markup is hidden waiting for JavaScript, so if
the bundle never runs the page is simply a static document. `npm run verify`
asserts this.

### Things that will look wrong but are not

- **`<img>`, not `next/image`.** Every image has a hand-built `srcset` from
  `scripts/optimize-images.mjs` and `scripts/apply-srcset.mjs`. `next.config.ts`
  sets `images.unoptimized` and the ESLint rule is off on purpose.
- **No hand-written `<link rel="preload">`.** Next.js 16 emits the LCP image
  preload itself. Adding one duplicates it.
- **`export default function Name() { return ( ... ) }` in every component.** No
  arrow functions, so the component names show up in stack traces and in React
  DevTools.
- **`{" "}` between inline elements.** JSX drops whitespace that touches a
  newline, which would silently remove the space in `<strong>Label:</strong> Text`.
- **`&apos;` / `&quot;` rather than `'` / `"` in JSX text.** `react/no-unescaped-entities`.
  Both decode to the same ASCII character.

### Before you commit

```bash
npm run typecheck && npm run lint && npm run format && npm run build && npm run verify
```

`npm run verify` is the one that catches real regressions — it drives a browser
against the production build and checks first-paint behaviour, the inlined
stylesheet, the LCP preload, scroll reveals, lazy images, and the no-JavaScript
render.

`npm run build` is `prebuild` (regenerate `public/assets`, re-apply `srcset`) →
`next build` → `postbuild` (inline the stylesheet). `public/assets/` is
gitignored because it is regenerated; never edit it directly, edit
`src/assets/` instead.

### Deploying

Netlify is the primary target; a container and a plain Node host also work. See
`Dockerfile` and the Deployment section of `README.md`.

`netlify.toml` is load-bearing, not boilerplate. Netlify's framework detection
_suggests_ `next build` as the build command, and that skips both halves of
`npm run build` — `prebuild` (which generates `public/assets`, so every image
404s) and `postbuild` (which inlines the stylesheet). Do not remove the
`command = "npm run build"` line.

`output: "standalone"` is opt-in via `NEXT_OUTPUT_STANDALONE`, set only by the
Dockerfile. Netlify must not have it: the OpenNext adapter packages `.next`
itself.
