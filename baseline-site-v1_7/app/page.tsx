import type { Metadata } from "next";
import { site } from "@/config/site";

import { Card } from "@/components/Card";
import { SecondaryLinkButton } from "@/components/Button";
import { StoreCTA } from "@/components/StoreCTA";
import { FrostedFeatures } from "@/components/FrostedFeature";
import { ProductSurfacesGallery } from "@/components/ProductSurfacesGallery";

export const metadata: Metadata = {
  title: "Baseline | Speech, You Can Measure.",
  description: "Independent AI systems measure public speech side-by-side. Observational analysis with sources and context. Not a fact-check.",
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
          border: "2px solid var(--border_inactive)",
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
            background: "linear-gradient(180deg, rgba(8,16,23,0.92) 0%, rgba(8,16,23,0.85) 50%, rgba(8,16,23,0.95) 100%)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)"
          }}
        />

        <div style={{ position: "relative", padding: 24 }}>
          <h1 className="h1" style={{ maxWidth: 820 }}>
            Speech, You Can Measure.
          </h1>

          <p className="p" style={{ color: "var(--text)", fontWeight: 600, marginTop: 8, marginBottom: 0 }}>
            What they said. How they said it.
          </p>
          <div style={{ display: "inline-block" }}>
            <p className="p" style={{ color: "var(--text)", fontWeight: 600, marginTop: 4, marginBottom: 0 }}>
              Pure signal.
            </p>

            {/* Teal rule — auto-matched to "Pure signal." width */}
            <div
              style={{
                width: "100%",
                height: 2,
                background: "var(--teal)",
                marginTop: 12,
                marginBottom: 12,
              }}
            />
          </div>

          <p className="p" style={{ maxWidth: 760, marginBottom: 8 }}>
            Every verified public statement ingested, analyzed, and reduced to digestible data.
            Anomalies surfaced, never suppressed.
          </p>

          <p className="small" style={{ fontStyle: "italic", opacity: 0.5, marginBottom: 4 }}>
            Observational analysis only. Not a fact-check.
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
            <span className="data">Independent systems</span>
            <span style={{ opacity: 0.6 }}>•</span>
            <span className="data">Side-by-side outputs + source context</span>
          </div>

          <div style={{ height: 16 }} />

          {/* Conversion CTAs — official badges, Apple first per guidelines */}
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            <StoreCTA store="appstore" />
            <StoreCTA store="googleplay" />
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            <SecondaryLinkButton href="/pricing/" ariaLabel="View pricing">
              View pricing
            </SecondaryLinkButton>
            <SecondaryLinkButton href="/methodology/" ariaLabel="View methodology">
              View methodology
            </SecondaryLinkButton>
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
          Independent outputs. Side-by-side. Then consensus. Computed, not curated.
          Observational analysis only. Not a fact-check.
        </p>

        <div className="grid grid_2" style={{ marginTop: 12 }}>
          <Card title="1) Input Normalization" className="cardInteractive">
            <p className="p redacted" style={{ margin: 0 }}>
              Statement text captured with metadata: source link, timestamps, figure identity, context pointers.
            </p>
            <span className="redacted-label">Classified until launch</span>
          </Card>

          <Card title="2) Independent Systems (Parallel)" className="cardInteractive">
            <p className="p redacted" style={{ margin: 0 }}>
              All AI systems process the statement independently.
              Variance stays observable.
            </p>
            <span className="redacted-label">Classified until launch</span>
          </Card>

          <Card title="3) Side-by-Side Display + Context" className="cardInteractive">
            <p className="p redacted" style={{ margin: 0 }}>
              System outputs displayed side-by-side.
              Sources and context visible on every surface.
            </p>
            <span className="redacted-label">Classified until launch</span>
          </Card>

          <Card title="4) Consensus Layer (Computed Separately)" className="cardInteractive">
            <p className="p redacted" style={{ margin: 0 }}>
              Computed after all independent outputs exist.
              Summarizes shared patterns.
            </p>
            <span className="redacted-label">Classified until launch</span>
          </Card>

          <Card title="5) Append-Only Records" className="cardInteractive">
            <p className="p redacted" style={{ margin: 0 }}>
              Inputs, outputs, and consensus stored as immutable records.
              Supports reproducibility and auditability over time.
            </p>
            <span className="redacted-label">Classified until launch</span>
          </Card>

          <Card title="6) Sources &amp; Traceability" className="cardInteractive">
            <p className="p redacted" style={{ margin: 0 }}>
              Sources presented as URLs to public records or verified platforms.
              System does not replace source reading.
            </p>
            <span className="redacted-label">Classified until launch</span>
          </Card>
        </div>

        {/* ── Pipeline Visual ── */}
        <div style={{ marginTop: 24 }}>
          <h3 className="h3">Pipeline</h3>
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
            {[
              { code: "GP", desc: "Independent measurement from the first AI system." },
              { code: "CL", desc: "Independent measurement from the second AI system." },
              { code: "GR", desc: "Independent measurement from the third AI system." },
            ].map((m) => (
              <div
                key={m.code}
                className="cardInteractive"
                style={{
                  background: "var(--card)",
                  border: "2px solid var(--border_inactive)",
                  borderRadius: "var(--radius_card)",
                  padding: 16,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    border: "2px solid rgba(45,212,191,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 10px",
                  }}
                >
                  <span className="data" style={{ color: "var(--teal)", fontSize: 15 }}>{m.code}</span>
                </div>
                <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 13, marginBottom: 4 }}>
                  {m.code} analysis
                </div>
                <p className="p redacted" style={{ margin: 0, fontSize: 12 }}>{m.desc}</p>
                <span className="redacted-label">Classified until launch</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FROSTED FEATURE DISCOVERY */}
      <FrostedFeatures />

      {/* ═══════════════════════════════════════════════
          WHAT WE MEASURE
          ═══════════════════════════════════════════════ */}
      <section className="section" aria-label="What Baseline measures">
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <span className="data" style={{ color: "var(--teal)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>
            Measurement Stack
          </span>
          <h2 className="h2" style={{ marginTop: 8, fontSize: 22 }}>What We Measure</h2>
        </div>

        <div className="grid grid_2">
          {/* ── Signal Metrics ── */}
          <Card title="Signal Metrics" className="cardInteractive">
            <p className="p" style={{ margin: "0 0 8px" }}>
              Four independent scores per statement. Repetition, Novelty, Affect, Entropy. Each 0-100.
            </p>
            <div className="redacted">
              <p className="p" style={{ margin: 0 }}>
                No thresholds. No labels. No metric influences another. Displayed without interpretation.
              </p>
            </div>
            <span className="redacted-label">Classified until launch</span>
          </Card>

          {/* ── Consensus Convergence ── */}
          <Card title="Consensus Convergence" className="cardInteractive">
            <p className="p" style={{ margin: "0 0 8px" }}>
              How many models landed in the same place. Displayed as a ratio.
            </p>
            <div className="redacted">
              <p className="p" style={{ margin: 0 }}>
                Computed only after all models return independently. Never pre-negotiated.
              </p>
            </div>
            <span className="redacted-label">Classified until launch</span>
          </Card>

          {/* ── Variance Detection ── */}
          <Card title="Variance Detection" className="cardInteractive">
            <p className="p" style={{ margin: "0 0 4px" }}>
              When models disagree, you see it.
            </p>
            <p className="p" style={{ margin: "0 0 8px", fontStyle: "italic", opacity: 0.7 }}>
              Surfaced, never suppressed.
            </p>
            <div className="redacted">
              <p className="p" style={{ margin: 0 }}>
                Triggered when models produce significantly different classifications for the same statement. Reflects genuine measurement divergence.
              </p>
            </div>
            <span className="redacted-label">Classified until launch</span>
          </Card>

          {/* ── Congressional Vote Record ── */}
          <Card title="Congressional Vote Record" className="cardInteractive">
            <p className="p" style={{ margin: "0 0 8px" }}>
              Every vote. Every bill. Every member. Recorded or not recorded.
            </p>
            <div className="redacted">
              <p className="p" style={{ margin: 0 }}>
                Per-member, per-bill granularity across the full congressional record. Never color-coded by position.
              </p>
            </div>
            <span className="redacted-label">Classified until launch</span>
          </Card>

          {/* ── Historical Trends ── */}
          <Card title="Historical Trends" className="cardInteractive">
            <p className="p" style={{ margin: "0 0 4px" }}>
              Language patterns over time.
            </p>
            <p className="p" style={{ margin: "0 0 8px", fontStyle: "italic", opacity: 0.7 }}>
              Measured, not predicted.
            </p>
            <div className="redacted">
              <p className="p" style={{ margin: 0 }}>
                Signal metrics, framing axes, and similarity scores plotted across statements. Tracks how a figure&rsquo;s rhetorical patterns shift over weeks, months, and sessions.
              </p>
            </div>
            <span className="redacted-label">Classified until launch</span>
          </Card>
        </div>

        {/* Section disclaimer */}
        <div
          className="small"
          style={{ opacity: 0.5, fontStyle: "italic", marginTop: 16, textAlign: "center" }}
        >
          Observational analysis only. Not a fact-check.
        </div>
      </section>

      {/* PRODUCT SURFACES GALLERY — museum section */}
      <ProductSurfacesGallery />
    </>
  );
}
