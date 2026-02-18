import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";

import { WaitlistCapture } from "@/components/WaitlistCapture";
import { SecondaryLinkButton } from "@/components/Button";
import { StoreCTA } from "@/components/StoreCTA";
import { MuseumGallery } from "@/components/MuseumGallery";
import { Card } from "@/components/Card";
import { HeroMorph } from "@/components/HeroMorph";
import { TheWall } from "@/components/TheWall";

export const metadata: Metadata = {
  title: { absolute: "Baseline | Speech you can measure." },
  description:
    "Parallel AI systems measure public speech side-by-side. Observational measurement with sources and context. Not a fact-check.",
  alternates: { canonical: `${site.url}/` },
};

export default function HomePage() {
  return (
    <>
      {/* ── WAITLIST CAPTURE — hero takeover ── */}
      <WaitlistCapture />

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
            <HeroMorph /> you can measure.
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
            What they said. How they said it.
          </p>

          {/* Teal accent rule */}
          <div
            style={{
              width: "100%",
              maxWidth: 380,
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
              textAlign: "center",
              marginTop: 8,
              color: "var(--sub)",
              fontSize: 12,
              lineHeight: 1.8,
            }}
          >
            <span className="data">Same input</span>
            <span style={{ opacity: 0.6, margin: "0 6px" }}>&bull;</span>
            <span className="data">Parallel systems</span>
            <br />
            <span className="data">
              Side-by-side results with source context
            </span>
          </div>


          {/* Store CTAs */}
          <div
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              flexWrap: "wrap",
              marginTop: 16,
            }}
          >
            <StoreCTA store="appstore" />
            <StoreCTA store="googleplay" />
          </div>

          {/* ── Teal hashmark ruler — separates "get it" from "explore it" ── */}
          <div
            aria-hidden="true"
            style={{
              position: "relative",
              height: 1,
              margin: "18px 0 16px",
              background: "rgba(45,212,191,0.06)",
            }}
          >
            {Array.from({ length: 16 }).map((_, i) => {
              const t = i / 15;
              const centerDist = Math.abs(t - 0.5) * 2;
              const alpha = 0.04 + (1 - centerDist) * 0.1;
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: `${t * 100}%`,
                    top: -1,
                    width: 1,
                    height: i % 4 === 0 ? 5 : 2,
                    background: `rgba(45,212,191,${alpha.toFixed(3)})`,
                  }}
                />
              );
            })}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: -1,
                width: 3,
                height: 3,
                borderRadius: "50%",
                background: "rgba(45,212,191,0.15)",
                transform: "translateX(-50%)",
              }}
            />
          </div>

          {/* ── Ethos — featured solo button (full-width) ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr" }}>
            <SecondaryLinkButton href="/ethos/" ariaLabel="Read our ethos">
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "var(--teal)", fontSize: 10, opacity: 0.6 }}>{"\u2726"}</span>
                Ethos
              </span>
            </SecondaryLinkButton>
          </div>

          {/* ── Nav grid — 2×2 ── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
            <SecondaryLinkButton href="/features/" ariaLabel="View features">
              Features
            </SecondaryLinkButton>
            <SecondaryLinkButton href="/pricing/" ariaLabel="View pricing">
              Pricing
            </SecondaryLinkButton>
            <SecondaryLinkButton href="/methodology/" ariaLabel="View methodology">
              Methodology
            </SecondaryLinkButton>
            <SecondaryLinkButton href="/what-we-dont-do/" ariaLabel="What we don't do">
              Our Limits
            </SecondaryLinkButton>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS — streamlined to 3 cards (was 6) per §4 ── */}
      {/* Hidden HTML comment for devs who inspect: <!-- SIGINT BRIEF // UNCLASSIFIED // FOUO --> */}
      <section className="section" aria-label="How Baseline works">
        {/* Section ruler with measurement hash marks */}
        <div aria-hidden="true" style={{ height: 1, background: 'rgba(45,212,191,0.06)', position: 'relative', marginBottom: 16 }}>
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute', left: `${(i / 23) * 100}%`, top: -1,
              width: 1, height: i % 4 === 0 ? 6 : 3,
              background: 'rgba(45,212,191,0.1)',
            }} />
          ))}
          {/* Subtle center label */}
          <div style={{
            position: 'absolute', left: '50%', transform: 'translateX(-50%)',
            background: 'var(--bg)', padding: '0 10px',
            fontFamily: 'var(--font-jetbrains, monospace)', fontSize: 7,
            letterSpacing: '0.15em', color: 'rgba(45,212,191,0.15)',
            textTransform: 'uppercase', top: -4,
          }}>
            SYS.PROCESS
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <h2 className="h2">How it works</h2>
          <Link className="small" href="/methodology/">
            Methodology
          </Link>
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
              Results displayed together with a separately computed
              consensus layer. Sources and context on every surface.
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
              position: "relative",
            }}
          >
            <img
              src="/screens/pipeline_diagram.webp"
              alt="Baseline analysis pipeline diagram"
              loading="lazy"
              style={{ width: "100%", height: "auto", display: "block", filter: "blur(6px) brightness(0.6) saturate(0.4)", WebkitFilter: "blur(6px) brightness(0.6) saturate(0.4)" }}
            />
            {/* Classification overlay */}
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 6,
              background: "rgba(0,0,0,0.15)",
            }}>
              <span className="data" style={{
                color: "rgba(45,212,191,0.4)", fontSize: 10,
                letterSpacing: "0.18em",
                border: "1px solid rgba(45,212,191,0.15)",
                borderRadius: 4, padding: "3px 10px",
                textTransform: "uppercase",
              }}>
                CLASSIFIED
              </span>
              <span className="data" style={{ color: "var(--sub)", fontSize: 9, opacity: 0.35, letterSpacing: "0.06em" }}>
                FULL PIPELINE · PRE-LAUNCH
              </span>
            </div>
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
          position: "relative",
        }}
      >
        {/* Subtle reticle corners on the counter — military/intel folks notice */}
        <div aria-hidden="true" style={{ position: 'absolute', top: 8, left: 16, width: 12, height: 12, borderTop: '1px solid rgba(45,212,191,0.06)', borderLeft: '1px solid rgba(45,212,191,0.06)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', top: 8, right: 16, width: 12, height: 12, borderTop: '1px solid rgba(45,212,191,0.06)', borderRight: '1px solid rgba(45,212,191,0.06)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 16, width: 12, height: 12, borderBottom: '1px solid rgba(45,212,191,0.06)', borderLeft: '1px solid rgba(45,212,191,0.06)' }} />
        <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, right: 16, width: 12, height: 12, borderBottom: '1px solid rgba(45,212,191,0.06)', borderRight: '1px solid rgba(45,212,191,0.06)' }} />

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
      <div style={{ textAlign: "center", padding: "32px 16px 8px", position: "relative" }}>
        {/* Film perf accents — left edge */}
        <div aria-hidden="true" style={{
          position: 'absolute', left: 0, top: 12, bottom: 12, width: 4,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center',
        }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ width: 2, height: 4, borderRadius: 1, background: 'rgba(45,212,191,0.04)' }} />
          ))}
        </div>
        <div aria-hidden="true" style={{
          position: 'absolute', right: 0, top: 12, bottom: 12, width: 4,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center',
        }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ width: 2, height: 4, borderRadius: 1, background: 'rgba(45,212,191,0.04)' }} />
          ))}
        </div>

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
