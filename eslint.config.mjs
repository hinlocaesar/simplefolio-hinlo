import coreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

/**
 * Flat config.
 *
 * Next.js 16 ships its shareable configs as flat config arrays, so they are
 * spread in directly rather than bridged through `@eslint/eslintrc`'s `FlatCompat`
 * -- the compat layer tries to JSON-stringify the plugin objects and chokes on
 * the circular references they contain.
 *
 * `next lint` was removed in Next.js 16, so linting is the ESLint CLI directly:
 * see the `lint` script in package.json.
 */
const config = [
  {
    // Only the app itself is linted. `scripts/` is plain Node tooling that
    // predates this project moving into Next.js and is not part of the build;
    // `public/assets/` is generated output.
    ignores: [
      ".next/**",
      "dist/**",
      "node_modules/**",
      "public/assets/**",
      "scripts/**",
      "examples/**",
      "next-env.d.ts",
    ],
  },
  ...coreWebVitals,
  ...nextTypescript,

  {
    rules: {
      /**
       * Every image here ships a hand-built `srcSet` ladder from
       * `scripts/optimize-images.mjs` and `scripts/apply-srcset.mjs`, and the LCP
       * image is hand-preloaded in `<head>`. `next/image` would replace those
       * measured values with its own generic ones, so the page uses `<img>` on
       * purpose. `next.config.ts` sets `images.unoptimized` to match.
       */
      "@next/next/no-img-element": "off",
    },
  },
];

export default config;
