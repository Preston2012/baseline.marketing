# baseline.marketing

Marketing and launch-readiness site for [Baseline](https://www.baseline.marketing), a political intelligence platform that measures public speech using independent AI systems.

This is not a template. It is a product engineering artifact: the go-to-market layer built before a product launch. It demonstrates how a solo developer thinks about messaging, trust, compliance, SEO, and conversion, not just code.

**Live site:** [baseline.marketing](https://www.baseline.marketing)
**Portfolio:** [baseline.marketing/built](https://www.baseline.marketing/built/)
**App architecture + code samples:** [baseline-showcase](https://github.com/Preston2012/baseline-showcase)

## What this repo demonstrates

This site is the public face of a product that is in Google Play closed testing. Building the marketing layer before launch is deliberate: app store approval requires privacy policies, terms of service, and support pages. SEO indexing takes weeks. Trust signals need to exist before users arrive.

**Frontend engineering:**
- Next.js 14 with app router, static export (`output: "export"`)
- TypeScript throughout (zero `any`, strict mode)
- Zero external UI dependencies. No Tailwind, no chart libraries, no component kits
- 15+ custom interactive widgets (radar charts, timelines, tickers, galleries) built from scratch
- Responsive design with mobile-first breakpoints
- `prefers-reduced-motion` and `prefers-reduced-transparency` support
- Custom focus rings, scrollbars, selection colors

**SEO and metadata:**
- OpenGraph and Twitter Card tags on every page
- JSON-LD structured data (Organization, WebSite, SoftwareApplication)
- Programmatic `sitemap.ts` and `robots.ts`
- Canonical URLs on all routes

**Accessibility:**
- Skip-to-content link
- `aria-label`, `aria-current`, `aria-modal` on all interactive elements
- Keyboard focus trapping in modals and mobile nav
- Escape key handling throughout

**Trust and compliance:**
- Privacy policy, Terms of Service, EULA, Support page
- Do Not Sell or Share (CCPA compliance)
- Press kit with downloadable brand assets
- All required for app store submission on iOS and Google Play

**Product thinking:**
- Waitlist capture with Supabase integration
- Tiered pricing table with billing toggle
- Feature gallery with "classified/declassified" reveal mechanic
- Methodology page explaining the multi-AI measurement approach
- `/built` portfolio page designed for hiring managers

## Route map

| Route | Purpose | Role |
|-------|---------|------|
| `/` | Hero, value prop, waitlist capture, feature gallery | Conversion |
| `/features/` | Interactive widget demos, product surfaces | Product showcase |
| `/methodology/` | How the multi-AI measurement system works | Technical credibility |
| `/ethos/` | Why Baseline exists, editorial principles | Trust signal |
| `/pricing/` | Tiered pricing (Core/Pro/Pro+/B2B) | Conversion |
| `/what-we-dont-do/` | Explicit boundaries of the product | Trust signal |
| `/built/` | Preston Winters portfolio page | Hiring signal |
| `/press/` | Press kit, brand assets | Media readiness |
| `/support/` | Contact and support information | App store requirement |
| `/privacy/` | Privacy policy | Legal/compliance |
| `/terms/` | Terms of service | Legal/compliance |
| `/eula/` | End user license agreement | Legal/compliance |
| `/do-not-sell-or-share/` | CCPA opt-out | Legal/compliance |

## Tech stack

- **Framework:** Next.js 14 (app router, static export)
- **Language:** TypeScript
- **Styling:** CSS custom properties + inline styles (no external CSS framework)
- **Fonts:** Poppins (body) + JetBrains Mono (data/code) via `next/font`
- **Images:** Next.js `<Image>` component
- **Waitlist:** Supabase REST API (publishable anon key, client-side)
- **Deployment:** Cloudflare Pages (static export)
- **Dependencies:** React, Next.js. Nothing else.

## Why static export

The site uses `output: "export"` in `next.config.js`. Every page is pre-rendered at build time into static HTML. This means:

- Zero server costs (hosted on Cloudflare Pages free tier)
- Sub-second page loads globally via CDN
- No server-side runtime to secure or monitor
- Simple deployment: `next build` produces a static `out/` directory

Dynamic features (waitlist signup) use client-side fetch to Supabase REST endpoints.

## Project structure

```
baseline-site-v1_8/
  app/                  # Next.js app router pages
    built/page.tsx      # Portfolio page (start here)
    features/page.tsx   # Interactive widget showcase
    methodology/        # Multi-AI measurement methodology
    privacy/            # Privacy policy
    terms/              # Terms of service
    ...
  components/           # React components
    MuseumGallery.tsx   # "Classified" reveal gallery
    MuseumConcepts.tsx  # 15 custom data visualization widgets
    GalleryWidgets.tsx  # Interactive chart/radar widgets
    PricingTable.tsx    # Tiered pricing with billing toggle
    WaitlistCapture.tsx # Email capture with Supabase
    Nav.tsx             # Responsive nav with keyboard traps
    ...
  config/
    site.ts             # Centralized site metadata
    brand-assets.ts     # Brand asset paths
    supabase.ts         # Supabase client config
  public/
    brand/              # Logos, badges, hero images
    screens/            # Product screenshots
```

## Local development

```bash
cd baseline-site-v1_8
npm install
npm run dev
```

Open [localhost:3000](http://localhost:3000).

## Build and deploy

```bash
cd baseline-site-v1_8
npm run build
```

Output is in `baseline-site-v1_8/out/`. Deploy to any static host.

## Related repositories

- [baseline-showcase](https://github.com/Preston2012/baseline-showcase): Architecture docs, code samples, system design
- [trading-toolkit](https://github.com/Preston2012/trading-toolkit): Python automation
- [ai-council](https://github.com/Preston2012/ai-council): Multi-model methodology

## Contact

Preston Winters
[baseline.marketing/built](https://www.baseline.marketing/built/) | [LinkedIn](https://linkedin.com/in/prestonwinters) | [Droiddna2013@gmail.com](mailto:Droiddna2013@gmail.com)
