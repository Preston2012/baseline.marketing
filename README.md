# baseline.marketing

Marketing, launch-readiness, and portfolio site for [Baseline](https://www.baseline.marketing): a political intelligence platform that measures public speech using independent AI systems.

This is not a template or a landing page. It is a product engineering artifact: the complete go-to-market surface built by a solo developer before product launch. Every page exists for a reason: app store compliance, SEO indexing, trust signaling, conversion, or portfolio presentation.

**Live site:** [baseline.marketing](https://www.baseline.marketing)
**Portfolio:** [baseline.marketing/built](https://www.baseline.marketing/built/)
**Architecture:** [baseline-showcase](https://github.com/Preston2012/baseline-showcase)

## Why this site exists

Building the marketing layer before launch is deliberate:

- **App store compliance.** Apple and Google require privacy policies, terms of service, EULA, and support pages before app approval. All four exist here and are custom-written for Baseline's data model.
- **Trust and transparency.** Seven pages dedicated to trust: ethos, methodology, operational boundaries, privacy, terms, EULA, and CCPA opt-out. Users and hiring managers can verify exactly what Baseline does and does not do.
- **Conversion funnel.** Waitlist capture (Supabase), tiered pricing, interactive feature demos, and methodology walkthroughs. Every page moves a visitor toward understanding or signing up.
- **SEO foundation.** OpenGraph, Twitter Cards, JSON-LD structured data, programmatic sitemap, canonical URLs. Indexing takes weeks. The earlier this exists, the better.
- **Portfolio showcase.** The `/built` page is designed to be the URL on resumes. It presents engineering work, build methodology, and contact info for hiring managers evaluating Founding AI Product Engineer candidates.

## Technical highlights

- **Next.js 14** with app router and static export (`output: "export"`)
- **TypeScript** throughout (zero `any`, strict mode)
- **Zero external UI dependencies.** No Tailwind, no chart libraries, no component kits
- **22 custom interactive widgets** (radar charts, timelines, tickers, signal gauges, heatmaps, constellation maps) built from scratch with vanilla React and CSS
- **Responsive design** with mobile-first breakpoints
- **Accessibility:** skip-to-content, `aria-label`/`aria-current`/`aria-modal`, keyboard focus trapping, escape key handling, `prefers-reduced-motion` support
- **SEO:** OpenGraph + Twitter Card tags on every page, JSON-LD (Organization, WebSite, SoftwareApplication), programmatic `sitemap.ts` and `robots.ts`, canonical URLs on all routes
- **Static hosting** on Cloudflare Pages (zero server costs, sub-second loads via CDN)

## Route map

13 routes, each serving a specific role in the launch surface:

| Route | Purpose | Role |
|-------|---------|------|
| `/` | Hero, value prop, waitlist capture, feature gallery | Conversion |
| `/features/` | 22 interactive widget demos, product surfaces | Product showcase |
| `/methodology/` | Multi-AI measurement system explained | Technical credibility |
| `/ethos/` | Ten editorial principles | Trust signal |
| `/pricing/` | Tiered pricing (Core/Pro/Pro+/B2B) with billing toggle | Conversion |
| `/what-we-dont-do/` | Explicit operational boundaries | Trust signal |
| `/built/` | Preston Winters portfolio page | Hiring signal |
| `/press/` | Press kit with downloadable brand assets | Media readiness |
| `/support/` | Contact, support channels | App store requirement |
| `/privacy/` | Full privacy policy (CCPA + GDPR) | Legal/compliance |
| `/terms/` | Terms of service | Legal/compliance |
| `/eula/` | End user license agreement | Legal/compliance |
| `/do-not-sell-or-share/` | CCPA opt-out | Legal/compliance |

Full route details: [docs/ROUTE_MAP.md](docs/ROUTE_MAP.md)

## Tech stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (app router, static export) |
| Language | TypeScript (strict mode) |
| Styling | CSS custom properties + inline styles (no framework) |
| Fonts | Poppins + JetBrains Mono via `next/font` |
| Images | Next.js `<Image>` component |
| Waitlist | Supabase REST API (client-side, anon key) |
| Hosting | Cloudflare Pages (static) |
| Dependencies | React 18, Next.js 14, TypeScript. Nothing else. |

## Project structure

```
baseline-site-v1_8/
  app/                    # Next.js app router (14 routes)
    page.tsx              # Homepage
    built/page.tsx        # Portfolio page (the resume URL)
    features/page.tsx     # Interactive widget showcase
    methodology/page.tsx  # Multi-AI measurement methodology
    pricing/page.tsx      # Tiered pricing table
    ethos/page.tsx        # Editorial principles
    what-we-dont-do/      # Operational boundaries
    privacy/              # Privacy policy
    terms/                # Terms of service
    eula/                 # End user license agreement
    do-not-sell-or-share/ # CCPA opt-out
    support/              # Contact and support
    press/                # Press kit
    layout.tsx            # Root layout (JSON-LD, nav, footer)
    sitemap.ts            # Programmatic sitemap
    robots.ts             # Robots config
  components/             # 26 React components
    GalleryWidgets.tsx    # 22 interactive data visualization widgets
    MuseumConcepts.tsx    # Concept art for trademark surfaces
    MuseumGallery.tsx     # Classified/declassified reveal gallery
    FeaturesContent.tsx   # Feature cards with widget integration
    PricingTable.tsx      # Tiered pricing with billing toggle
    WaitlistCapture.tsx   # Email capture (Supabase)
    Nav.tsx               # Responsive nav with keyboard traps
    SiteFooter.tsx        # Footer with all route links
    EthosContent.tsx      # Ten brand principles
    ManifestoScroll.tsx   # Scroll-pinned statement manifesto
  config/
    site.ts               # Centralized site metadata
    brand-assets.ts       # Brand asset paths
    supabase.ts           # Supabase client config
  public/
    brand/                # Logos, badges, hero image
    screens/              # Product screenshots
    og.png                # OpenGraph image (1200x630)
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

Output is in `baseline-site-v1_8/out/`. Deploy to any static host (Cloudflare Pages, Netlify, Vercel, S3).

## Related

- [baseline-showcase](https://github.com/Preston2012/baseline-showcase): Architecture docs, code samples, system design
- [trading-toolkit](https://github.com/Preston2012/trading-toolkit): Python automation
- [ai-council](https://github.com/Preston2012/ai-council): Multi-model methodology
- Contact: [Droiddna2013@gmail.com](mailto:Droiddna2013@gmail.com)

## Contact

Preston Winters
[baseline.marketing/built](https://www.baseline.marketing/built/) | [LinkedIn](https://linkedin.com/in/prestonwinters) | [GitHub](https://github.com/Preston2012) | [Droiddna2013@gmail.com](mailto:Droiddna2013@gmail.com)


---

## Other work by the author

- **[Demiurge](https://github.com/Preston2012/demi).** Open-source memory engine for AI agents.
- **[Ouroboros](https://github.com/Preston2012/ouroboros).** Governance architecture for the AI era.
- **[AI Council](https://github.com/Preston2012/ai-council).** Multi-model orchestration methodology.

[Preston Winters](https://github.com/Preston2012) · [preston@baseline.marketing](mailto:preston@baseline.marketing)
