import type { Metadata } from "next";
import { site } from "@/config/site";
import { EthosContent } from "@/components/EthosContent";

export const metadata: Metadata = {
  title: "Ethos",
  description:
    "Ten principles that govern everything Baseline builds, measures, and ships. Permanence, transparency, signal over noise. The brand ethos.",
  alternates: { canonical: `${site.url}/ethos/` },
  openGraph: {
    title: "Ethos | Baseline",
    description:
      "Ten principles that govern everything Baseline builds, measures, and ships.",
  },
};

export default function EthosPage() {
  return (
    <>
      <section className="section" aria-label="Ethos header">
        <div className="classification-stamp" style={{ marginBottom: 8 }}>
          BASELINE-DOCTRINE // BRAND ETHOS // v1.0
        </div>
        <h1 className="h1" style={{ fontSize: 28 }}>Ethos</h1>
        <p className="p" style={{ maxWidth: 520 }}>
          Ten principles that govern everything we build, measure, and ship.
        </p>
      </section>

      <EthosContent />
    </>
  );
}
