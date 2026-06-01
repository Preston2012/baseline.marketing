const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./cf-image-loader.js",
  },
  experimental: {
    // Inline critical CSS via critters. Even on static export Next will
    // emit per-page CSS as <link rel="stylesheet"> which blocks paint.
    // With critters enabled, above-fold CSS rules ship inline in the
    // document head, the rest loads async.
    optimizeCss: true,
  },
  // Explicit webpack alias for the "@/*" import pattern. tsconfig.json
  // declares paths but some Next 14 / webpack 5 builds fail to wire it
  // through, leaving every Client Component boundary unable to resolve
  // `@/components/*` and `@/config/*`. Setting the alias on webpack
  // directly guarantees resolution in all environments (Vercel CI,
  // local Linux, local Mac, and various Node versions).
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
};

module.exports = nextConfig;
