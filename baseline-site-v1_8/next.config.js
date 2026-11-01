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
  // No webpack hook. Next 16 builds with Turbopack, which takes the "@/*"
  // alias from the paths in tsconfig.json, and next build refuses to run
  // under Turbopack while a webpack function is present. The alias that
  // lived here covered Next 14 builds that missed the tsconfig paths.
};

module.exports = nextConfig;
