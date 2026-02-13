import type { Metadata } from "next";
import { site } from "@/config/site";

import { SecondaryLinkButton } from "@/components/Button";
import { StoreCTA } from "@/components/StoreCTA";
import { MuseumGallery } from "@/components/MuseumGallery";
import { Card } from "@/components/Card";
import { HeroMorph } from "@/components/HeroMorph";
import { TheWall } from "@/components/TheWall";

export const metadata: Metadata = {
  title: "Baseline | Speech, You Can Measure.",
  description:
    "Independent AI systems measure public speech side-by-side. Observational analysis with sources and context. Not a fact-check.",
  alternates: { canonical: `${site.url}/` },
};

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      {/* I9: Hero fade-in via CSS animation */}
      <style>{`
        @keyframes heroFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
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
          backgroundPosition: "center",
          backgroundColor: "#081017",
          animation: "heroFadeIn 600ms ease-out",
        }}
        aria-label="Baseline hero"
      >
        <div
          className="reduceTransparency"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(8,16,23,0.92) 0%, rgba(8,16,23,0.85) 50%, rgba(8,16,23,0.95) 100%)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
        />

        <div style={{ position: "relative", padding: 24 }}>
          <h1 className="h1" style={{ maxWidth: 820 }}>
            <HeroMorph />, You Can Measure.
          </h1>

          <p
            className="p"
            style={{
              color: "var(--text)",
              fontWeight: 600,
              marginTop: 8,
              marginBottom: 0,
            }}
          >
            What they said. How they said it. Pure signal.
          </p>

          {/* Teal rule */}
          <div
            style={{
              width: 120,
              height: 2,
              background: "var(--teal)",
              marginTop: 12,
              marginBottom: 12,
            }}
          />

          <p
            className="small"
            style={{ fontStyle: "italic", opacity: 0.5, marginBottom: 4 }}
          >
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
              alignItems: "center",
            }}
          >
            <span className="data">Same input</span>
            <span style={{ opacity: 0.6 }}>&bull;</span>
            <span className="data">Independent systems</span>
            <span style={{ opacity: 0.6 }}>&bull;</span>
            <span className="data">
              Side-by-side outputs + source context
            </span>
          </div>

          <div style={{ height: 16 }} />

          {/* Store CTAs */}
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
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

      {/* ── HOW IT WORKS — streamlined to 3 cards (was 6) per §4 ── */}
      <section className="section" aria-label="How Baseline works">
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <h2 className="h2">How it works</h2>
          <a className="small" href="/methodology/">
            Methodology
          </a>
        </div>

        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", marginTop: 12 }}>
          <Card title="1) Ingest">
            <p className="p" style={{ margin: 0 }}>
              Public statements captured with metadata: source link,
              timestamps, figure identity, context.
            </p>
          </Card>

          <Card title="2) Analyze independently">
            <p className="p" style={{ margin: 0 }}>
              Three AI systems process every statement in parallel.
              No model sees another&rsquo;s output. Variance stays observable.
            </p>
          </Card>

          <Card title="3) Display side by side">
            <p className="p" style={{ margin: 0 }}>
              All outputs displayed together with a separately computed
              consensus layer. Sources and context visible on every surface.
            </p>
          </Card>
        </div>

        {/* ── Pipeline Visual — moved FROM press page TO here per §4 ── */}
        <div style={{ marginTop: 24 }}>
          <h3 className="h3">Pipeline</h3>

          <div
            style={{
              marginTop: 12,
              border: "2px solid var(--border_inactive)",
              borderRadius: "var(--radius_card)",
              overflow: "hidden",
              background: "var(--card)",
            }}
          >
            <img
              src="/screens/pipeline_diagram.png"
              alt="Baseline analysis pipeline diagram"
              loading="lazy"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>

          {/* Model badges */}
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              marginTop: 12,
            }}
          >
            {[
              { code: "GP", desc: "Processes each statement independently. No access to other models\u2019 outputs." },
              { code: "CL", desc: "Processes each statement independently. No access to other models\u2019 outputs." },
              { code: "GR", desc: "Processes each statement independently. No access to other models\u2019 outputs." },
            ].map((m) => (
              <div
                key={m.code}
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
                  <span className="data" style={{ color: "var(--teal)", fontSize: 15 }}>
                    {m.code}
                  </span>
                </div>
                <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 13, marginBottom: 4 }}>
                  {m.code} analysis
                </div>
                <p className="p" style={{ margin: 0, fontSize: 12 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── N3: Live statement counter ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 20,
          padding: "20px 0 8px",
        }}
      >
        {[
          { label: "figures", value: "44" },
          { label: "statements", value: "\u2014" },
          { label: "sources", value: "\u2014" },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div
              className="data"
              style={{ color: "var(--teal)", fontSize: 20, fontWeight: 600 }}
            >
              {s.value}
            </div>
            <div
              className="data"
              style={{
                color: "var(--sub)",
                fontSize: 10,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginTop: 2,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── S1: The Wall — scrolling data ticker ── */}
      <TheWall />

      {/* ── N8+N11: Breather line ── */}
      <div style={{ textAlign: "center", padding: "32px 16px 8px" }}>
        <p
          className="data"
          style={{
            color: "var(--sub)",
            fontSize: 13,
            letterSpacing: "0.04em",
            opacity: 0.6,
            margin: 0,
          }}
        >
          The system measures. It does not judge.
        </p>
      </div>

      {/* ── ™ MUSEUM GALLERY — replaces FrostedFeatures + What We Measure + ProductSurfacesGallery ── */}
      <MuseumGallery />
    </>
  );
}
