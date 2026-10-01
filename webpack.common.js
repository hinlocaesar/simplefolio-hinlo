const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/index.js",
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: {
              // Keep `src`/`href` values exactly as authored. Left on, the
              // loader resolves every <img src> through the module graph, which
              // emits a second content-hashed copy of each image alongside the
              // ones CopyWebpackPlugin provides for the `data-lightbox` paths.
              // The template is the single source of truth for these URLs.
              sources: false,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|webp|gif|svg)$/i,
        type: "asset/resource",
      },
      // Self-hosted variable fonts. Emitted through the asset pipeline so the
      // woff2 files get content-hashed and can be cached indefinitely, instead
      // of shipping as loose files from the template directory.
      {
        test: /\.(woff2?)$/i,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name].[contenthash][ext]",
        },
      },
      {
        test: /\.(docx)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // Project images are referenced as static `assets/...` paths in
    // template.html rather than imported in JS, so copy them manually.
    //
    // `src/assets/opt` is the compressed WebP set produced by
    // `scripts/optimize-images.mjs` (wired to `prebuild`). The full-resolution
    // originals live in `src/assets` for the screenshot helpers to write to,
    // and are deliberately NOT copied — deploying them is what made the page
    // so slow. Icons, the favicon, and the downloadable documents are the only
    // other things that need shipping.
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/assets/opt", to: "assets" },
        { from: "src/assets/skill-icons", to: "assets/skill-icons" },
        { from: "src/assets/favicon.png", to: "assets/favicon.png" },
        {
          from: "src/assets",
          to: "assets",
          globOptions: {
            // Catch the case variants too: `fast-glob` matches case-sensitively,
            // and several originals are named `.PNG`.
            ignore: [
              "**/opt/**",
              "**/skill-icons/**",
              "**/*.{png,PNG,jpg,JPG,jpeg,JPEG,webp,WEBP,gif,GIF}",
              "favicon.png",
            ],
          },
        },
      ],
    }),
  ],
};
