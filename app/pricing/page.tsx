import type { Metadata } from "next";
import { site } from "@/config/site";
import { PricingTable } from "@/components/PricingTable";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Baseline pricing tiers (Core, Pro, Pro+, B2B) with monthly and annual plans and subscription disclosures.",
  alternates: { canonical: `${site.url}/pricing/` }
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
