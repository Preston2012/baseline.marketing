import type { Metadata } from "next";
import { site } from "@/config/site";
import { Card } from "@/components/Card";

export const metadata: Metadata = {
  title: "Press",
  description:
    "Media resources for Baseline. The first observational speech measurement platform using independent AI systems.",
  alternates: { canonical: `${site.url}/press/` },
  openGraph: {
    title: "Press | Baseline",
    description:
      "Media resources for Baseline. The first observational speech measurement platform using independent AI systems.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Baseline Press",
      },
    ],
  },
};

export default function PressPage() {
  return (
    <section className="section" aria-label="Press">
      {/* Classification micro-stamp */}
      <div className="classification-stamp" style={{ marginBottom: 8 }}>
        BASELINE-PRESS // UNCLASSIFIED // PUBLIC RELEASE
      </div>

      <h1 className="h1" style={{ fontSize: 28 }}>Press</h1>

      <p className="p" style={{ maxWidth: 760 }}>
        Baseline is a measurement surface for public speech: identical inputs
        processed by multiple independent AI systems, displayed side-by-side
        with a separate consensus layer. Sources and context are always
        visible. Observational analysis only. Not a fact-check.
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
            <a href="/brand/wordmark.png" download>
              Wordmark (PNG, 358&times;100)
            </a>{" "}
            &bull;{" "}
            <a href="/brand/ba_mark.png" download>
              Mark (PNG, 48&times;48)
            </a>{" "}
            &bull;{" "}
            <a href="/brand/hero_skyline.jpg" download>
              Hero image (JPG, 1920w)
            </a>
          </p>
          {/* N6: One-click press kit download */}
          <div style={{ marginTop: 12 }}>
            <a
              href="/baseline-press-kit.zip"
              download
              className="cardInteractive"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 14px",
                border: "2px solid var(--border_inactive)",
                borderRadius: 8,
                color: "var(--teal)",
                fontSize: 12,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              &#8595; Download Press Kit (.zip)
            </a>
          </div>
        </Card>

        <Card title="Core features">
          <p className="p" style={{ margin: 0 }}>
            Baseline™ · The Receipt™ · Framing Radar™ · Lens Lab™ · Crossfire™ ·
            Signal Pulse™ · Framing Fingerprint™ · Constellation Nav™ ·
            Provision Drift™ · Split Microscope™ · Intersections Panel™ ·
            Declassified Dossier™ · Narrative Sync™
          </p>
        </Card>
      </div>

      {/* Pipeline diagram + screenshots moved to Home (§9) and Features (§5) respectively */}
    </section>
  );
}
