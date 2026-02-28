import type { Metadata } from "next";
import { site } from "@/config/site";
import { PricingTable } from "@/components/PricingTable";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Speech measurement at every level. Parallel AI systems. Semantic similarity, framing metrics, and provision drift. Core free. Pro $7.99/mo. Pro+ $24.99/mo.",
  alternates: { canonical: `${site.url}/pricing/` },
  openGraph: {
    title: "Pricing | Baseline",
    description: "Speech measurement at every level. Parallel AI systems, semantic similarity, framing metrics, and provision drift. Core free. Pro $7.99/mo. Pro+ $24.99/mo.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Baseline Pricing" }],
  },
};

export default function PricingPage() {
  return (
    <section className="section" aria-label="Pricing" style={{ position: 'relative' }}>
      {/* Registration dots */}
      <div aria-hidden="true" style={{ position: 'absolute', top: 8, left: 8, width: 3, height: 3, borderRadius: '50%', background: 'rgba(45,212,191,0.05)' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: 8, right: 8, width: 3, height: 3, borderRadius: '50%', background: 'rgba(45,212,191,0.05)' }} />

      <h1 className="h1" style={{ fontSize: 28 }}>Pricing</h1>
      <p className="p">
        Plans are purchased in-app via the App Store or Google Play. Paid tiers remove all advertising.
      </p>
      <PricingTable />
    </section>
  );
}
