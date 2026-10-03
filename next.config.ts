import type { NextConfig } from "next";

/**
 * `output: "standalone"` emits a second, self-contained copy of the app under
 * `.next/standalone`: its own traced `node_modules` and a `server.js` that boots
 * with nothing but Node.
 *
 * It is opt-in because only some hosts want it. The container image sets
 * `NEXT_OUTPUT_STANDALONE=true` (see the Dockerfile). Netlify must not: its
 * OpenNext adapter packages `.next` into a serverless function itself, so the
 * traced copy is dead weight in the build -- time and disk nothing ever reads.
 * Leaving it off by default keeps `next build` output to exactly what the host
 * asked for.
 */
const standalone = process.env.NEXT_OUTPUT_STANDALONE === "true";

const nextConfig: NextConfig = {
  ...(standalone ? { output: "standalone" as const } : {}),

  /**
   * The stylesheet is still the pre-modularisation SCSS tree, kept as-is so the
   * design is not disturbed by the framework migration. Dart Sass has deprecated
   * `@import` in favour of `@use`, but converting the partial graph would mean
   * namespacing every variable and mixin -- a rewrite with no visual payoff and
   * real risk of silently changed output. The warnings are silenced here so a
   * build stays quiet until someone chooses to do that migration on purpose.
   */
  sassOptions: {
    silenceDeprecations: ["import", "global-builtin", "color-functions", "legacy-js-api"],
  },

  /**
   * Deliberately *not* using `next/image`.
   *
   * Every image on this page already has a `srcset` ladder with `sizes` computed
   * against the actual rendered width, a pre-compressed WebP source built by
   * `scripts/optimize-images.mjs`, and the LCP image hand-preloaded in `<head>`.
   * `next/image` would re-derive all of that from `width`/`height` props and
   * serve AVIF/WebP through its own optimizer, replacing measured decisions with
   * generic ones.
   */
  images: {
    unoptimized: true,
  },

  /** No trailing slash anywhere; `/` is the whole site. */
  trailingSlash: false,

  reactStrictMode: true,
};

export default nextConfig;
