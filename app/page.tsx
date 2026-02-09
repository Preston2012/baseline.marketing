import type { Metadata } from "next";
import { site } from "@/config/site";

import { Card } from "@/components/Card";
import { SecondaryLinkButton } from "@/components/Button";
import { StoreCTA } from "@/components/StoreCTA";
import { ScreenshotGrid } from "@/components/ScreenshotGrid";

export const metadata: Metadata = {
  title: site.tagline,
  description: site.description,
  alternates: { canonical: `${site.url}/` }
};

export default function HomePage() {
  return (
    <>
      {/* HERO */}
      <section
        className="section"
        style={{
          position: "relative",
          minHeight: 420,
          borderRadius: 18,
          overflow: "hidden",
          border: "1px solid var(--border_inactive)",
          backgroundImage: "url(/brand/hero_skyline.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        aria-label="Baseline hero"
      >
        <div
          className="reduceTransparency"
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(8,16,23,0.70)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)"
          }}
        />

        <div style={{ position: "relative", padding: 24 }}>
          <h1 className="h1" style={{ maxWidth: 820 }}>
            Speech, You Can Measure.
          </h1>

          {/* Audit fix: disclaimer immediately adjacent to H1, above fold */}
          <p className="p" style={{ color: "var(--text)", fontWeight: 600, marginTop: 8, marginBottom: 4 }}>
            Observational analysis only. Not a fact-check.
          </p>

          <p className="p" style={{ maxWidth: 760, marginBottom: 8 }}>
            Baseline performs observational analysis of public speech using three independent AI systems.
            Inputs are identical. Outputs are displayed side-by-side with sources and context.
          </p>

          {/* Instrument micro-row */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
              marginTop: 8,
              color: "var(--sub)",
              fontSize: 12,
              alignItems: "center"
            }}
          >
            <span className="data">Same input</span>
            <span style={{ opacity: 0.6 }}>•</span>
            <span className="data">Three independent systems</span>
            <span style={{ opacity: 0.6 }}>•</span>
            <span className="data">Side-by-side outputs + source context</span>
          </div>

          <div style={{ height: 16 }} />

          {/* Conversion CTAs */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <StoreCTA variant="primary" label="Download on the App Store" />
            <StoreCTA variant="secondary" label="Get it on Google Play" />

            <SecondaryLinkButton href="/pricing/" ariaLabel="View pricing">
              View pricing
            </SecondaryLinkButton>
            <SecondaryLinkButton href="/methodology/" ariaLabel="View methodology">
              View methodology
            </SecondaryLinkButton>
          </div>

          <div style={{ height: 18 }} />

          {/* Above-fold product visual */}
          <div
            style={{
              borderRadius: 14,
              border: "1px solid var(--border_inactive)",
              overflow: "hidden",
              background: "rgba(12,26,35,0.55)"
            }}
          >
            {/* Audit fix: removed opacity: 0.98 */}
            <img
              src="/screens/framing_radar.png"
              alt="Framing Radar measurement surface"
              loading="eager"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" aria-label="How Baseline works">
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
          <h2 className="h2">How it works</h2>
          <a className="small" href="/methodology/">
            Methodology
          </a>
        </div>

        <p className="p" style={{ maxWidth: 760 }}>
          Baseline displays independent outputs side-by-side, then computes a separate consensus layer.
          Sources and context are always shown. Observational analysis only. Not a fact-check.
        </p>

        <div className="grid grid_2" style={{ marginTop: 12 }}>
          <Card title="Three independent systems" className="cardInteractive">
            <p className="p" style={{ margin: 0 }}>
              Identical input is processed independently by three AI systems. Outputs are displayed as returned, without editorial rewriting.
            </p>
          </Card>

          <Card title="The Receipt™" className="cardInteractive">
            <p className="p" style={{ margin: 0 }}>
              A compact readout of recurring language patterns over time, with match counts shown by tier.
            </p>
          </Card>

          <Card title="Framing Radar™ (5 axes)" className="cardInteractive">
            <p className="p" style={{ margin: 0 }}>
              A measurement surface for rhetorical structure across five framing dimensions.
            </p>
          </Card>

          <Card title="The Lens Lab™" className="cardInteractive">
            <p className="p" style={{ margin: 0 }}>
              Side-by-side lens outputs, plus a separate consensus layer for shared patterns and variance.
            </p>
          </Card>
        </div>

        <div style={{ height: 12 }} />

        {/* Pipeline diagram */}
        <div
          style={{
            borderRadius: 14,
            border: "1px solid var(--border_inactive)",
            overflow: "hidden",
            background: "rgba(12,26,35,0.55)"
          }}
        >
          <img
            src="/screens/pipeline_diagram.png"
            alt="Pipeline diagram"
            loading="lazy"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </section>

      {/* SCREENSHOTS */}
      <section className="section" aria-label="Screenshots">
        <h2 className="h2">Product surfaces</h2>
        <p className="p">Representative measurement surfaces from the app.</p>
        <ScreenshotGrid />
      </section>
    </>
  );
}
