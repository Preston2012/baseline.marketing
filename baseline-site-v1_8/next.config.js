/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: {
    // Inline critical CSS via critters. Even on static export Next will
    // emit per-page CSS as <link rel="stylesheet"> which blocks paint.
    // With critters enabled, above-fold CSS rules ship inline in the
    // document head, the rest loads async.
    optimizeCss: true,
  },
};

module.exports = nextConfig;
