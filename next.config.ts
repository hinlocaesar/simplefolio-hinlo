import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * A self-contained server in `.next/standalone`: its own minimal `node_modules`
   * and a `server.js` that boots with nothing but Node and the app directory.
   * That is what `scripts/start.mjs` runs and what the Dockerfile ships.
   */
  output: "standalone",

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
