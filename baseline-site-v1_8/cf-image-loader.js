// Static image loader: serve assets from /public as-is. No Cloudflare Image
// Resizing dependency (that is a billable, per-zone feature, and 404s on free
// zones). Pre-sized variants live in /public and components reference the
// right size directly. External and data URLs pass through unchanged.
export default function imageLoader({ src }) {
  return src;
}
