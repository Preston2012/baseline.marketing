import type { Metadata } from "next";
import { site } from "@/config/site";
import { ScreenshotGrid } from "@/components/ScreenshotGrid";
import { Card } from "@/components/Card";

export const metadata: Metadata = {
  title: "Press | Baseline",
  description: "Media resources for Baseline. The first observational speech measurement platform using three independent AI systems.",
  alternates: { canonical: `${site.url}/press/` },
  openGraph: {
    title: "Press | Baseline",
    description: "Media resources for Baseline. The first observational speech measurement platform using three independent AI systems.",
    images: [{ url: "/og/press-og.png", width: 1200, height: 630, alt: "Baseline Press" }],
  },
};

export default function PressPage() {
  return (
    <section className="section" aria-label="Press">
      <h1 className="h2">Press</h1>

      <p className="p" style={{ maxWidth: 760 }}>
        Baseline is a measurement surface for public speech: identical inputs processed by three independent AI systems,
        displayed side-by-side with a separate consensus layer. Sources and context are always visible.
        Observational analysis only. Not a fact-check.
      </p>

      <div className="grid grid_2" style={{ marginTop: 12 }}>
        <Card title="Press contact">
          <p className="p" style={{ margin: 0 }}>
            Press inquiries:{" "}
            <a href={`mailto:${site.contact.press}`}>{site.contact.press}</a>
          </p>
        </Card>

        <Card title="Brand assets">
          <p className="p" style={{ margin: 0 }}>
            <a href="/brand/wordmark.png" download>Wordmark</a> •{" "}
            <a href="/brand/ba_mark.png" download>Mark</a> •{" "}
            <a href="/brand/hero_skyline.jpg" download>Hero image</a>
          </p>
        </Card>

        <Card title="Core features">
          <p className="p" style={{ margin: 0 }}>
            The Receipt™ · Framing Radar™ · The Lens Lab™ · Signal Metrics · Provision Drift™ · Congressional Vote Tracking · Consensus Badge
          </p>
        </Card>
      </div>

      <div style={{ height: 18 }} />

      <h2 className="h2">Screens</h2>
      <p className="p">Representative measurement surfaces.</p>
      <ScreenshotGrid />
    </section>
  );
}
