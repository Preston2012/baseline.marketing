import type { Metadata } from "next";
import { site } from "@/config/site";
import { PricingTable } from "@/components/PricingTable";

export const metadata: Metadata = {
  title: "Pricing — Baseline",
  description: "Free tier with full analysis. Pro for power users. Pro+ for bill analysis and Provision Drift™. Speech measurement at every level.",
  alternates: { canonical: `${site.url}/pricing/` },
  openGraph: {
    title: "Pricing — Baseline",
    description: "Free tier with full analysis. Pro for power users. Pro+ for bill analysis and Provision Drift™.",
    images: [{ url: "/og/pricing-og.png", width: 1200, height: 630, alt: "Baseline Pricing" }],
  },
};

export default function PricingPage() {
  return (
    <section className="section" aria-label="Pricing">
      <h1 className="h2">Pricing</h1>
      <p className="p">
        Plans are purchased in-app via the App Store or Google Play. Paid tiers remove all advertising.
      </p>
      <PricingTable />
    </section>
  );
}
