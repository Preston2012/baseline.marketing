# Baseline Marketing Site (Static Export)

## Quick start

```bash
npm install
npm run dev
```

## Static export build

```bash
npm run build
# Next.js outputs static files into ./out
```

## Deploy

Upload the contents of `out/` to any static host (Vercel, Cloudflare Pages, Netlify, GitHub Pages, etc).

## Assets required

Ensure these exist before building:

- `public/brand/wordmark.png`
- `public/brand/hero_skyline.jpg`
- `public/brand/ba_mark.png`
- `public/screens/framing_radar.png`
- `public/screens/pipeline_diagram.png`
- `public/og.png`
- `public/favicon.ico`
- `public/apple-touch-icon.png`

## Notes

- `robots.txt` and `sitemap.xml` are provided as static fallbacks in `/public` for export reliability.
- Legal pages (Privacy, Terms, EULA, Do Not Sell or Share) are complete and ready for App Store / Google Play submission.
- All pricing, trial, and subscription disclosures are included per Apple/Google requirements.
