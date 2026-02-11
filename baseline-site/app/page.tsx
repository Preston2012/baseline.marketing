import type { Metadata } from "next";
import { site } from "@/config/site";

import { Card } from "@/components/Card";
import { SecondaryLinkButton } from "@/components/Button";
import { StoreCTA } from "@/components/StoreCTA";
import { FrostedFeatures } from "@/components/FrostedFeature";
import { ProductSurfacesGallery } from "@/components/ProductSurfacesGallery";

export const metadata: Metadata = {
  title: "Baseline | Speech, You Can Measure.",
  description: "Three independent AI systems measure public speech side-by-side. Observational analysis with sources and context. Not a fact-check.",
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

          <p className="p" style={{ color: "var(--text)", fontWeight: 600, marginTop: 8, marginBottom: 4 }}>
            Observational analysis only. Not a fact-check.
          </p>

          <p className="p" style={{ maxWidth: 760, marginBottom: 8 }}>
            Three AI systems. Same input. Independent outputs.
            Sources and context on every surface.
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
          <Card title="Three independent systems" className="cardInteractive">
            <p className="p redacted" style={{ margin: 0 }}>
              Identical input is processed independently by three AI systems. Outputs are displayed as returned, without editorial rewriting.
            </p>
          </Card>

          <Card title="The Receipt™" className="cardInteractive">
            <p className="p redacted" style={{ margin: 0 }}>
              A semantic timeline tracking recurring language patterns over time, with match counts shown by tier.
            </p>
          </Card>

          <Card title="Framing Radar™ (5 axes)" className="cardInteractive">
            <p className="p redacted" style={{ margin: 0 }}>
              A measurement surface for rhetorical structure across five framing dimensions.
            </p>
          </Card>

          <Card title="The Lens Lab™" className="cardInteractive">
            <p className="p redacted" style={{ margin: 0 }}>
              Side-by-side lens outputs, plus a separate consensus layer for shared patterns and variance.
            </p>
          </Card>

          <Card title="Provision Drift™" className="cardInteractive">
            <p className="p redacted" style={{ margin: 0 }}>
              Measures semantic distance between individual provisions and a bill&rsquo;s stated purpose. Scored 0-100.
            </p>
          </Card>

          <Card title="Consensus Convergence" className="cardInteractive">
            <p className="p redacted" style={{ margin: 0 }}>
              Models agree, you see it. Models disagree, you see that too. Computed after all three return independently.
            </p>
          </Card>

          <Card title="Historical Trends" className="cardInteractive">
            <p className="p redacted" style={{ margin: 0 }}>
              Measurement over time. Track how a figure&rsquo;s language patterns shift.
            </p>
          </Card>

          <Card title="Congressional Vote Record" className="cardInteractive">
            <p className="p redacted" style={{ margin: 0 }}>
              Every vote. Every bill. Every member. See exactly how each figure voted. Displayed as recorded or not recorded.
            </p>
          </Card>
        </div>
      </section>

      {/* FROSTED FEATURE DISCOVERY */}
      <FrostedFeatures />

      {/* ═══════════════════════════════════════════════
          WHAT WE MEASURE — Full measurement stack
          ═══════════════════════════════════════════════ */}
      <section className="section" aria-label="What Baseline measures">
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <span className="data" style={{ color: "var(--teal)", fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>
            Measurement Stack
          </span>
          <h2 className="h2" style={{ marginTop: 8, fontSize: 22 }}>What We Measure</h2>
          <p className="p redacted" style={{ maxWidth: 560, margin: "8px auto 0" }}>
            Every statement. Multiple measurement layers. Each metric independent.
            No metric influences another.
          </p>
        </div>

        {/* ── Signal Metrics ── */}
        <h3 className="h3">Signal Metrics</h3>
        <p className="p redacted" style={{ maxWidth: 560, marginBottom: 12 }}>
          Four independent measurements computed per statement by each AI model.
          Displayed on a 0-100 scale with no thresholds or labels.
        </p>

        <div className="grid grid_2" style={{ marginBottom: 24 }}>
          {[
            { name: "Repetition", value: 73, desc: "How closely this statement\u2019s language mirrors the figure\u2019s prior statements on the same topic." },
            { name: "Novelty", value: 41, desc: "How much new language or framing this statement introduces compared to prior patterns." },
            { name: "Affect", value: 58, desc: "The rate of emotionally charged language . Intensity markers, urgency signals, sentiment-loaded phrasing." },
            { name: "Entropy", value: 29, desc: "Topical spread of the statement. Higher values indicate multiple subjects; lower values indicate tight focus." },
          ].map((m) => (
            <div
              key={m.name}
              className="cardInteractive"
              style={{
                background: "var(--card)",
                border: "2px solid var(--border_inactive)",
                borderRadius: "var(--radius_card)",
                padding: 16,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ color: "var(--text)", fontSize: 14, fontWeight: 600 }}>{m.name}</span>
                <span className="data" style={{ color: "var(--teal)", fontSize: 13 }}>{m.value}</span>
              </div>
              {/* Mini metric bar */}
              <div style={{ height: 4, borderRadius: 2, background: "var(--border_inactive)", marginBottom: 10, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${m.value}%`, background: "var(--teal)", borderRadius: 2 }} />
              </div>
              <p className="p redacted" style={{ margin: 0, fontSize: 13 }}>{m.desc}</p>
            </div>
          ))}
        </div>

        {/* ── Consensus & Variance ── */}
        <div className="grid grid_2" style={{ marginBottom: 24 }}>
          {/* Lens Convergence */}
          <Card className="cardInteractive">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: "conic-gradient(var(--teal) 0deg 240deg, rgba(45,212,191,0.15) 240deg 360deg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <div style={{ width: 42, height: 42, borderRadius: "50%", background: "var(--card)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span className="data" style={{ color: "var(--teal)", fontSize: 16 }}>2/3</span>
                </div>
              </div>
              <div>
                <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 14 }}>Lens Convergence</div>
                <div className="small">Consensus Badge</div>
              </div>
            </div>
            <div className="redacted">
            <p className="p" style={{ margin: "0 0 8px" }}>
              Models agree? You see it. Models disagree? You see that too.
            </p>
            <p className="p" style={{ margin: 0, paddingTop: 8, borderTop: "2px solid var(--border_inactive)" }}>
              Each model processes the statement separately. None can see the
              others&#39; results. Convergence is computed after all three models
              have returned their independent outputs.
            </p>
            </div>
            <span className="redacted-label">Classified until launch</span>
          </Card>

          {/* Variance Detection */}
          <Card className="cardInteractive">
            <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Variance Detection</div>
            <div className="small" style={{ marginBottom: 12 }}>When models disagree</div>
            <div className="redacted">
            {/* Variance banner mock */}
            <div
              style={{
                background: "rgba(245,158,11,0.08)",
                border: "2px solid rgba(245,158,11,0.2)",
                borderRadius: 8,
                padding: "8px 12px",
                marginBottom: 12,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span style={{ color: "var(--warn)", fontSize: 14 }}>⚠</span>
              <span className="data" style={{ color: "var(--warn)", fontSize: 11 }}>Variance Detected</span>
            </div>
            <p className="p" style={{ margin: "0 0 10px" }}>
              When models produce significantly different framing classifications
              for the same statement, a variance banner appears. This is not an
              error. It reflects genuine measurement divergence.
            </p>
            <div className="data" style={{ fontSize: 12, lineHeight: 1.8, color: "var(--sub)" }}>
              <div>GP&nbsp;&nbsp;<span style={{ color: "var(--text)" }}>Economic</span>&nbsp;&nbsp;<span style={{ color: "var(--teal)" }}>82</span></div>
              <div>CL&nbsp;&nbsp;<span style={{ color: "var(--text)" }}>Security</span>&nbsp;&nbsp;<span style={{ color: "var(--teal)" }}>76</span></div>
              <div>GR&nbsp;&nbsp;<span style={{ color: "var(--text)" }}>Economic</span>&nbsp;&nbsp;<span style={{ color: "var(--teal)" }}>79</span></div>
            </div>
            </div>
            <span className="redacted-label">Classified until launch</span>
          </Card>
        </div>

        {/* ── Vote Record ── */}
        <h3 className="h3">Congressional Vote Record</h3>
        <p className="p redacted" style={{ maxWidth: 560, marginBottom: 12 }}>
          Every vote. Every bill. Every member. Per-figure, per-bill granularity
          across the full congressional record. See exactly how any member voted
          on any piece of legislation.
        </p>

        <div
          className="redacted"
          style={{
            background: "var(--card)",
            border: "2px solid var(--border_inactive)",
            borderRadius: "var(--radius_card)",
            padding: 16,
            maxWidth: 520,
            marginBottom: 24,
          }}
        >
          {/* Summary row */}
          <div className="data" style={{ fontSize: 12, display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
            <span style={{ color: "var(--sub)" }}>Total: <span style={{ color: "var(--text)" }}>47</span></span>
            <span style={{ color: "var(--sub)" }}>YEA: <span style={{ color: "var(--teal)" }}>32</span></span>
            <span style={{ color: "var(--sub)" }}>NAY: <span style={{ color: "var(--teal)" }}>12</span></span>
            <span style={{ color: "var(--sub)" }}>NOT VOTING: <span style={{ opacity: 0.5 }}>3</span></span>
          </div>

          {/* Mock vote rows */}
          {[
            { bill: "H.R. 1234", vote: "YEA", result: "Passed 218-212" },
            { bill: "S. 567", vote: "NAY", result: "Failed 47-53" },
            { bill: "H.R. 890", vote: "PRESENT", result: "Passed 410-3" },
          ].map((v) => (
            <div
              key={v.bill}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "8px 10px",
                background: "rgba(8,16,23,0.5)",
                borderRadius: 8,
                border: "2px solid rgba(182,198,214,0.06)",
                marginBottom: 6,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ color: "var(--text)", fontSize: 13, fontWeight: 500 }}>{v.bill}</span>
                <span
                  className="data"
                  style={{
                    color: v.vote === "PRESENT" ? "var(--sub)" : "var(--teal)",
                    fontSize: 10,
                    fontWeight: 600,
                    padding: "2px 6px",
                    borderRadius: 5,
                    border: `2px solid ${v.vote === "PRESENT" ? "var(--border_inactive)" : "rgba(45,212,191,0.3)"}`,
                  }}
                >
                  {v.vote}
                </span>
              </div>
              <span className="small" style={{ fontSize: 11 }}>{v.result}</span>
            </div>
          ))}

          <p className="small" style={{ fontStyle: "italic", marginTop: 8, marginBottom: 0, opacity: 0.6 }}>
            Teal = vote recorded&nbsp;&nbsp;•&nbsp;&nbsp;Gray = not recorded
          </p>
        </div>

        {/* ── Three-Model Pipeline ── */}
        <h3 className="h3">Three-Model Pipeline</h3>
        <p className="p redacted" style={{ maxWidth: 560, marginBottom: 12 }}>
          Every statement flows through three independent AI models. Each model receives
          identical input and returns its own measurements. No model can see another&#39;s output.
        </p>

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
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT SURFACES GALLERY — museum section */}
      <ProductSurfacesGallery />
    </>
  );
}
