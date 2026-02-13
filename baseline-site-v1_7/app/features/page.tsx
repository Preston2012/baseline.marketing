import type { Metadata } from "next";
import { site } from "@/config/site";
import { MuseumGallery } from "@/components/MuseumGallery";
import { FeaturesContent } from "@/components/FeaturesContent";

export const metadata: Metadata = {
  title: "Features | Baseline",
  description:
    "Every surface. Every signal. Explore Baseline's full product tour — trademark features, signal metrics, feed tools, figure profiles, bill analysis, and more.",
  alternates: { canonical: `${site.url}/features/` },
  openGraph: {
    title: "Features | Baseline",
    description:
      "Every surface. Every signal. Explore Baseline's full product tour.",
  },
};

export default function FeaturesPage() {
  return (
    <>
      <section className="section" aria-label="Features header">
        <h1 className="h1" style={{ fontSize: 28 }}>Every surface. Every signal.</h1>
        <p className="p" style={{ maxWidth: 640 }}>
          The full measurement stack. Trademark surfaces, signal metrics, feed tools, figure
          profiles, bill analysis, and export controls — organized by category.
        </p>
      </section>

      {/* ™ SURFACES — full gallery */}
      <div id="surfaces">
        <MuseumGallery />
      </div>

      {/* I5: Sticky scroll-spy nav + I11: Tier filter + all feature sections */}
      <FeaturesContent />
    </>
  );
}
