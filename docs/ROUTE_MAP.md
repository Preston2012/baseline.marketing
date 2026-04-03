# Route Map: baseline.marketing

Every route on the site, what it does, and why it exists.

## Conversion routes

### `/` (Homepage)
Hero section with morphing headline, waitlist email capture (Supabase), app store CTAs (coming soon modals), "How it works" cards, pipeline diagram, scrolling data ticker, and the trademark feature gallery with classified/declassified reveal mechanic.

**Key components:** `WaitlistCapture`, `HeroMorph`, `StoreCTA`, `TheWall`, `MuseumGallery`

### `/features/`
Interactive showcase of every product surface. 15+ custom-built widgets demonstrating the production app UI: framing radar, signal pulse, receipt timeline, provision drift, split microscope, and more. Each widget renders live with animated data. No chart libraries.

**Key components:** `FeaturesContent`, `FeaturesNav`, `GalleryWidgets`, `LiveWidgets`

### `/pricing/`
Tiered pricing table (Core free, Pro $7.99/mo, Pro+ $24.99/mo, B2B contact). Monthly/annual toggle with animated slide indicator. Expandable feature lists per tier. Price values decode from redacted blocks on first render.

**Key components:** `PricingTable`, `TierPill`

### `/ethos/`
Editorial principles and product philosophy. Explains what Baseline measures and, critically, what it does not claim. Positioned as a trust signal for users who need to understand the product's stance before signing up.

**Key components:** `EthosContent`, `ManifestoScroll`

## Technical credibility routes

### `/methodology/`
How the multi-AI measurement system works. Covers: input normalization, independent parallel analysis, signal metrics (4 scores per statement), framing radar (5-axis), consensus computation, and display. Interactive widget demos inline.

**Key components:** `MethodologyWidgets`, `SurfaceWidgets`, `LayerWidgets`

### `/what-we-dont-do/`
Explicit product boundaries. States what Baseline is not: not a fact-checker, not a bias detector, not a political tool. Important for user trust and editorial positioning.

## Portfolio route

### `/built/`
Preston Winters portfolio page. The URL on resumes. Shows: stats grid (100K+ lines, 28 screens, 22 edge functions, 4 AI providers), system architecture pipeline, tech stack badges, multi-AI orchestration methodology, other projects (StainSlayer AI, Cyber Hornets), and contact info.

Not in primary nav. Accessible via hamburger overflow menu. Designed to be shared directly with hiring managers.

## Trust and compliance routes

These pages exist because app store submission on iOS and Google Play requires them. They also serve as trust signals for users evaluating whether to share their email or subscribe.

### `/privacy/`
Full privacy policy. Covers: data collection, usage, third-party sharing, retention, user rights, children's privacy, CCPA/GDPR compliance language.

### `/terms/`
Terms of service. Covers: acceptable use, intellectual property, disclaimers, limitation of liability, governing law.

### `/eula/`
End user license agreement. Required for app store distribution.

### `/do-not-sell-or-share/`
CCPA opt-out page. Required for California compliance.

### `/support/`
Contact information and support channels. Required by both Apple and Google for app store listings.

## Media route

### `/press/`
Press kit with downloadable brand assets (zip), brand guidelines, and contact information for media inquiries.

## Error handling

### 404 (Not Found)
Custom "Signal Lost" page with on-brand SIGINT aesthetic. Links back to homepage.

## SEO infrastructure

- `sitemap.ts`: Programmatic sitemap covering all 13 routes
- `robots.ts`: Allows all crawlers, references sitemap
- Every page has: `<title>`, `description`, `openGraph`, `twitter` metadata
- Root layout includes JSON-LD: Organization, WebSite, SoftwareApplication schemas
- Canonical URLs set on all routes via `alternates.canonical`
