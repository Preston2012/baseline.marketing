import type { Metadata } from "next";
import { site } from "@/config/site";
import { FeaturesContent } from "@/components/FeaturesContent";

export const metadata: Metadata = {
  title: "Features",
  description:
    "Every surface. Every signal. Everything in Baseline is free. Signal metrics, feed tools, figure profiles, bill analysis, alerts and sharing.",
  alternates: { canonical: `${site.url}/features/` },
  openGraph: {
    title: "Features | Baseline",
    description:
      "Every surface. Every signal. All of it free.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Baseline" }],
  },
};

export default function FeaturesPage() {
  return (
    <>
      <section className="section" aria-label="Features header" style={{ position: 'relative' }}>
        {/* Registration dots */}
        <div aria-hidden="true" style={{ position: 'absolute', top: 8, left: 8, width: 3, height: 3, borderRadius: '50%', background: 'rgba(45,212,191,0.05)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', top: 8, right: 8, width: 3, height: 3, borderRadius: '50%', background: 'rgba(45,212,191,0.05)' }} />
        <div className="classification-stamp" style={{ marginBottom: 8 }} data-stamp="FEATURES // PRODUCT MANIFEST" />
        <h1 className="h1" style={{ fontSize: 28 }}>Every surface. Every signal.</h1>
        <p className="p" style={{ maxWidth: 640 }}>
          The full measurement stack. Signal metrics, feed tools, figure profiles, bill
          analysis, alerts and sharing, organized by category. Every feature is free.
        </p>
        <p className="small" style={{ color: "var(--sub-dim)", maxWidth: 640 }}>
          The panels on this page are illustrations drawn with sample data, not live measurements.
        </p>
      </section>

      {/* I5: Sticky scroll-spy nav + all feature sections with widget illustrations */}
      <FeaturesContent />
    </>
  );
}
