// Custom next/image loader routing through Cloudflare image transformations.
// Static export (output "export") disables Next's built-in optimizer, so each
// next/image request is sent to /cdn-cgi/image/ and Cloudflare returns a
// resized AVIF or WebP at the edge. Same zone only (image_resizing on).
export default function cloudflareLoader({ src, width, quality }) {
  if (src.startsWith("data:") || /^https?:\/\//.test(src)) return src;
  const q = quality || 75;
  const opts = "format=auto,width=" + width + ",quality=" + q;
  const clean = src.startsWith("/") ? src.slice(1) : src;
  return "/cdn-cgi/image/" + opts + "/" + clean;
}
