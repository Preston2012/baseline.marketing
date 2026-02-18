"use client";

import { useState, useCallback, Fragment } from "react";
import { Card } from "./Card";
import { TierPill } from "./TierPill";
import { FeaturesNav, type TierFilter } from "./FeaturesNav";
import { FrostedWidgetPreview } from "./FrostedWidget";
import { SignalMetricsWidget, BaselineScoreWidget, ConsensusRingWidget, ReceiptTimelineWidget, CrossfireWidget, RadarDemoWidget, ConstellationWidget, DriftWidget, LensLabWidget, SignalPulseWidget, FingerprintWidget, IntersectionsWidget, DossierWidget } from "./GalleryWidgets";

type FeatureItem = {
  name: string;
  desc: string;
  tier: "CORE" | "PRO" | "PRO+" | "B2B";
};

const SIGNALS: FeatureItem[] = [
  { name: "Signal Metrics", desc: "Repetition, Novelty, Affect, Entropy. Four independent scores per statement, each 0\u2013100.", tier: "CORE" },
  { name: "Baseline\u2122", desc: "Figure-level 24-hour rolling aggregate. The reference signal for each figure.", tier: "CORE" },
  { name: "Baseline Delta", desc: "How far a statement\u2019s signal metrics deviate from the figure\u2019s historical average. Measures shift, not position.", tier: "CORE" },
  { name: "Consensus Convergence", desc: "How many models landed in the same place. Displayed as a ratio with a visual confidence ring.", tier: "CORE" },
  { name: "Variance Detection", desc: "When models disagree, you see it. Surfaced, never suppressed.", tier: "CORE" },
  { name: "Lens Lab\u2122", desc: "Three AI models running in parallel. Same statement, three independent measurements.", tier: "PRO" },
  { name: "Historical Trends", desc: "Language patterns over time. Measured, not predicted.", tier: "PRO" },
  { name: "Divergence Sort", desc: "Sort by lowest consensus first. See where models diverge most.", tier: "PRO+" },
  { name: "Split Microscope\u2122", desc: "Side-by-side model output comparison. See exactly where measurements diverge.", tier: "PRO+" },
];

const FEED: FeatureItem[] = [
  { name: "The Receipt\u2122", desc: "The full statement exhibit: measurements, sources, and a semantic similarity timeline.", tier: "CORE" },
  { name: "Feed Browse + Statement Detail", desc: "Access every analyzed statement with full source context.", tier: "CORE" },
  { name: "Trending Topics", desc: "Topic chips showing what\u2019s active now.", tier: "CORE" },
  { name: "\u201CWhy am I seeing this?\u201D", desc: "See why this statement is in your feed.", tier: "CORE" },
  { name: "Model Attribution", desc: "See which models produced each measurement.", tier: "CORE" },
  { name: "Feed Sorting", desc: "Sort by novelty, recency, or signal strength.", tier: "PRO" },
  { name: "Crossfire\u2122", desc: "Two figures. One surface. Direct framing comparison.", tier: "PRO" },
  { name: "Long-press Peek Preview", desc: "Press and hold to preview a statement without navigating.", tier: "PRO" },
  { name: "Double-tap Annotate", desc: "Quick-annotate any statement with a double tap.", tier: "PRO" },
];

const FIGURES: FeatureItem[] = [
  { name: "Figure Profiles", desc: "Every tracked figure with their full measurement history.", tier: "CORE" },
  { name: "Framing Fingerprint\u2122", desc: "Aggregate framing tendencies rendered as a unique visual signature.", tier: "CORE" },
  { name: "Signal Pulse\u2122", desc: "Visual summary of signal activity at a glance.", tier: "CORE" },
  { name: "\u201CStatements This Week\u201D Badge", desc: "Recent statement count per figure.", tier: "CORE" },
  { name: "\u201CSilent Vote\u201D Indicator", desc: "Displayed when a figure discussed a bill but has no recorded vote.", tier: "CORE" },
  { name: "Framing Radar\u2122", desc: "Five-axis rhetorical measurement rendered as a pentagon. One shape per figure.", tier: "PRO" },
  { name: "Favorites & Followed Figures", desc: "Pin figures to your feed for faster access.", tier: "PRO" },
  { name: "Constellation Nav\u2122", desc: "Data-infused dot navigation between figures, topics, and framing patterns.", tier: "PRO" },
  { name: "Topic Heatmap", desc: "Figures \u00d7 topics grid. See who talks about what, and how much.", tier: "PRO+" },
  { name: "Intersections Panel\u2122", desc: "Cross-figure link topology. See where rhetoric overlaps across figures.", tier: "PRO+" },
  { name: "Declassified Dossier\u2122", desc: "Complete analytical profile. Every surface, one view.", tier: "PRO+" },
];

const BILLS: FeatureItem[] = [
  { name: "Congressional Vote Record", desc: "Every vote. Every bill. Every member. Recorded or not recorded.", tier: "CORE" },
  { name: "Bill Overview & Notable Provisions", desc: "Structured summaries of legislation with provision-level detail.", tier: "PRO+" },
  { name: "Provision Drift\u2122", desc: "Semantic distance between provisions and a bill\u2019s stated purpose.", tier: "PRO+" },
  { name: "Provision Resonance Links", desc: "Cross-references between provisions that share framing or topic overlap.", tier: "PRO+" },
  { name: "Drift Cascade Waterfall", desc: "Visualize how provisions drift from purpose, ranked by distance.", tier: "PRO+" },
  { name: "Drift League Table", desc: "Bills ranked by aggregate provision drift.", tier: "PRO+" },
];

const TOOLS: FeatureItem[] = [
  { name: "Private Annotations", desc: "Core: 0 \u00b7 Pro: 100 \u00b7 Pro+: 500 \u00b7 B2B: 1,000", tier: "CORE" },
  { name: "Request a Figure", desc: "Don\u2019t see someone? Request a figure for tracking.", tier: "CORE" },
  { name: "How Is This Measured?", desc: "Info sheets on every analysis surface explaining the methodology behind each measurement.", tier: "CORE" },
  { name: "First Measurement Guide", desc: "Quick walkthrough on your first measurement screen.", tier: "CORE" },
  { name: "Export & Share", desc: "Museum-grade export with branded watermark. Pro and above.", tier: "PRO" },
  { name: "Ghost Export", desc: "Then vs. now \u2014 export a figure\u2019s measurements at two points in time.", tier: "PRO" },
  { name: "Copy with Citation", desc: "One-tap copy with automatic attribution footer.", tier: "PRO" },
  { name: "Drift-infused Watermark", desc: "Export watermark shows the statement\u2019s drift score.", tier: "PRO" },
  { name: "Digest Notifications", desc: "Daily/weekly digests. Pro and above.", tier: "PRO" },
  { name: "Advanced Notifications", desc: "Per-figure, per-topic alerts with higher frequency.", tier: "PRO+" },
  { name: "Shift Alert", desc: "Triggered when a figure\u2019s language shifts significantly within 24 hours.", tier: "PRO+" },
  { name: "Narrative Sync\u2122", desc: "Cross-figure framing convergence detection.", tier: "B2B" },
  { name: "Delta Threshold Alerts", desc: "User-set per-figure thresholds. Precision monitoring.", tier: "B2B" },
  { name: "Annotation Delta Cards", desc: "Track how model agreement on your annotations changes over time.", tier: "B2B" },
];

/* Tier hierarchy for "PRO" filter showing PRO + PRO+ */
const TIER_HIERARCHY: Record<TierFilter, string[]> = {
  ALL: ["CORE", "PRO", "PRO+", "B2B"],
  CORE: ["CORE"],
  PRO: ["CORE", "PRO"],
  "PRO+": ["CORE", "PRO", "PRO+", "B2B"],
};

function FeatureGrid({
  items,
  filter,
}: {
  items: FeatureItem[];
  filter: TierFilter;
}) {
  const filtered =
    filter === "ALL"
      ? items
      : items.filter((f) => TIER_HIERARCHY[filter].includes(f.tier));

  if (filtered.length === 0) {
    return (
      <div
        className="data"
        style={{
          color: "var(--sub)",
          fontSize: 12,
          opacity: 0.5,
          padding: "20px 0",
          textAlign: "center",
        }}
      >
        No features in this tier for this category.
      </div>
    );
  }

  return (
    <div className="grid grid_2" style={{ marginTop: 12 }}>
      {filtered.map((f) => {
        return (
          <Card key={f.name} title={f.name}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
              }}
            >
              <TierPill tier={f.tier} />
            </div>
            <p className="p" style={{ margin: 0, filter: "blur(5px)", WebkitFilter: "blur(5px)", userSelect: "none", WebkitUserSelect: "none" }}>
              {f.desc}
            </p>
          </Card>
        );
      })}
    </div>
  );
}

const FIGURE_CATEGORIES = [
  {
    label: "U.S. POLITICS",
    count: 19,
    names: [
      "Donald Trump", "Joe Biden", "J.D. Vance", "Kamala Harris",
      "RFK Jr.", "Marjorie Taylor Greene", "Alexandria Ocasio-Cortez",
      "Bernie Sanders", "Elizabeth Warren", "Nancy Pelosi",
      "Mitch McConnell", "Chuck Schumer", "Hakeem Jeffries",
      "Mike Johnson", "Gavin Newsom", "Ron DeSantis",
      "Vivek Ramaswamy", "Office of the President", "Office of the Vice President",
    ],
  },
  {
    label: "GLOBAL POLITICS", count: 8,
    names: ["Xi Jinping", "Vladimir Putin", "Volodymyr Zelenskyy", "Narendra Modi", "Benjamin Netanyahu", "Emmanuel Macron", "Javier Milei", "Keir Starmer"],
  },
  {
    label: "TECH", count: 7,
    names: ["Sam Altman", "Elon Musk", "Jensen Huang", "Mark Zuckerberg", "Sundar Pichai", "Dario Amodei", "Satya Nadella"],
  },
  {
    label: "CRYPTO & WEB3", count: 6,
    names: ["Vitalik Buterin", "Charles Hoskinson", "Brian Armstrong", "Changpeng Zhao (CZ)", "Michael Saylor", "Anatoly Yakovenko"],
  },
  {
    label: "MEDIA & FINANCE", count: 4,
    names: ["Joe Rogan", "Tucker Carlson", "Lex Fridman", "Larry Fink"],
  },
];

export function FeaturesContent() {
  const [tier, setTier] = useState<TierFilter>("ALL");
  const handleTier = useCallback((t: TierFilter) => setTier(t), []);

  return (
    <>
      <FeaturesNav onTierChange={handleTier} />

      {/* SIGNALS */}
      <section id="signals" className="section" aria-label="Signal features">
        <span className="section-label">SIGNALS</span>
        <FeatureGrid items={SIGNALS} filter={tier} />
        <div className="grid_2" style={{ display: "grid", gap: 12, marginTop: 16 }}>
          <FrostedWidgetPreview label="SIGNAL METRICS · 4-AXIS DECOMPOSITION" tier="CORE">
            <SignalMetricsWidget />
          </FrostedWidgetPreview>
          <FrostedWidgetPreview label="BASELINE™ · 24HR ROLLING AGGREGATE" tier="CORE">
            <BaselineScoreWidget />
          </FrostedWidgetPreview>
        </div>
        <div style={{ marginTop: 16 }}>
          <FrostedWidgetPreview label="CONSENSUS · MODEL CONVERGENCE" tier="CORE">
            <ConsensusRingWidget />
          </FrostedWidgetPreview>
        </div>
        <div style={{ marginTop: 16 }}>
          <FrostedWidgetPreview label="LENS LAB™ · 3-SYSTEM PARALLEL ANALYSIS" tier="PRO">
            <LensLabWidget />
          </FrostedWidgetPreview>
        </div>
        <div
          className="small"
          style={{ fontStyle: "italic", opacity: 0.5, marginTop: 12 }}
        >
          Observational analysis only. Not a fact-check.
        </div>
      </section>

      {/* Section hash ruler */}
      <div aria-hidden="true" style={{ height: 1, background: "rgba(45,212,191,0.04)", position: "relative", margin: "0 0 0" }}>
        {Array.from({ length: 24 }).map((_, i) => {
          const t = i / 23;
          const a = 0.02 + (1 - Math.abs(t - 0.5) * 2) * 0.06;
          return <div key={i} style={{ position: "absolute", left: `${t * 100}%`, top: -1, width: 1, height: i % 6 === 0 ? 5 : 2, background: `rgba(45,212,191,${a.toFixed(4)})` }} />;
        })}
      </div>

      {/* FEED */}
      <section id="feed" className="section" aria-label="Feed features">
        <span className="section-label">FEED</span>
        <FeatureGrid items={FEED} filter={tier} />
        <div className="grid_2" style={{ display: "grid", gap: 12, marginTop: 16 }}>
          <FrostedWidgetPreview label="THE RECEIPT™ · STATEMENT EXHIBIT" tier="CORE">
            <ReceiptTimelineWidget />
          </FrostedWidgetPreview>
          <FrostedWidgetPreview label="CROSSFIRE™ · DUAL FIGURE COMPARISON" tier="PRO">
            <CrossfireWidget />
          </FrostedWidgetPreview>
        </div>
      </section>

      <div aria-hidden="true" style={{ height: 1, background: "rgba(45,212,191,0.04)", position: "relative" }}>
        {Array.from({ length: 24 }).map((_, i) => {
          const t = i / 23;
          const a = 0.02 + (1 - Math.abs(t - 0.5) * 2) * 0.06;
          return <div key={i} style={{ position: "absolute", left: `${t * 100}%`, top: -1, width: 1, height: i % 6 === 0 ? 5 : 2, background: `rgba(45,212,191,${a.toFixed(4)})` }} />;
        })}
      </div>

      {/* FIGURES */}
      <section id="figures" className="section" aria-label="Figure features">
        <span className="section-label">FIGURES</span>

        <div style={{ marginBottom: 20 }}>
          <p className="p" style={{ maxWidth: 640, marginBottom: 12 }}>
            <span className="data" style={{ color: "var(--teal)" }}>
              44 figures
            </span>{" "}
            tracked at launch across five categories. Roster expands over time.
            Congressional members sync automatically via Congress.gov.
          </p>

          {FIGURE_CATEGORIES.map((cat) => (
            <div key={cat.label} style={{ marginBottom: 16 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 8,
                  marginBottom: 8,
                }}
              >
                <span
                  className="data"
                  style={{
                    color: "var(--sub)",
                    fontSize: 11,
                    letterSpacing: "0.1em",
                  }}
                >
                  {cat.label}
                </span>
                <span
                  className="data"
                  style={{ color: "var(--teal)", fontSize: 11 }}
                >
                  {cat.count}
                </span>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
                {cat.names.map((name, i) => (
                  <Fragment key={name}>
                    {name.startsWith("Office of") && !cat.names[i - 1]?.startsWith("Office of") && (
                      <span
                        className="data"
                        style={{
                          fontSize: 9,
                          opacity: 0.3,
                          letterSpacing: "0.08em",
                          width: "100%",
                          marginTop: 4,
                        }}
                      >
                        INSTITUTIONAL FEEDS
                      </span>
                    )}
                    <span
                      style={{
                        display: "inline-block",
                        padding: "6px 10px",
                        border: "2px solid var(--border_inactive)",
                        borderRadius: 8,
                        fontSize: 12,
                        color: "var(--text)",
                        background: "var(--card)",
                        whiteSpace: "nowrap",
                        filter: "blur(5px)",
                        WebkitFilter: "blur(5px)",
                        userSelect: "none",
                        WebkitUserSelect: "none",
                      }}
                    >
                      {name}
                    </span>
                  </Fragment>
                ))}
              </div>
            </div>
          ))}

          <p className="small" style={{ opacity: 0.5, marginTop: 12 }}>
            Request a figure for tracking in-app. Roster updates over time
            based on source availability.
          </p>
        </div>

        <FeatureGrid items={FIGURES} filter={tier} />
        <div style={{ marginTop: 16 }}>
          <FrostedWidgetPreview label="SIGNAL PULSE™ · ACTIVITY WAVEFORM" tier="CORE">
            <SignalPulseWidget />
          </FrostedWidgetPreview>
        </div>
        <div className="grid_2" style={{ display: "grid", gap: 12, marginTop: 16 }}>
          <FrostedWidgetPreview label="FRAMING RADAR™ · 5-AXIS MEASUREMENT" tier="PRO">
            <RadarDemoWidget />
          </FrostedWidgetPreview>
          <FrostedWidgetPreview label="FRAMING FINGERPRINT™ · RHETORICAL IDENTITY" tier="CORE">
            <FingerprintWidget />
          </FrostedWidgetPreview>
        </div>
        <div className="grid_2" style={{ display: "grid", gap: 12, marginTop: 16 }}>
          <FrostedWidgetPreview label="CONSTELLATION NAV™ · FIGURE TOPOLOGY" tier="PRO">
            <ConstellationWidget />
          </FrostedWidgetPreview>
          <FrostedWidgetPreview label="INTERSECTIONS PANEL™ · FRAMING OVERLAP" tier="PRO+">
            <IntersectionsWidget />
          </FrostedWidgetPreview>
        </div>
        <div style={{ marginTop: 16 }}>
          <FrostedWidgetPreview label="DECLASSIFIED DOSSIER™ · EXHIBIT PLATE PROFILE" tier="PRO+">
            <DossierWidget />
          </FrostedWidgetPreview>
        </div>
      </section>

      <div aria-hidden="true" style={{ height: 1, background: "rgba(45,212,191,0.04)", position: "relative" }}>
        {Array.from({ length: 24 }).map((_, i) => {
          const t = i / 23;
          const a = 0.02 + (1 - Math.abs(t - 0.5) * 2) * 0.06;
          return <div key={i} style={{ position: "absolute", left: `${t * 100}%`, top: -1, width: 1, height: i % 6 === 0 ? 5 : 2, background: `rgba(45,212,191,${a.toFixed(4)})` }} />;
        })}
      </div>

      {/* BILLS */}
      <section id="bills" className="section" aria-label="Bill features">
        <span className="section-label">BILLS</span>
        <FeatureGrid items={BILLS} filter={tier} />
        <div style={{ marginTop: 16 }}>
          <FrostedWidgetPreview label="PROVISION DRIFT™ · SEMANTIC DISTANCE" tier="PRO+">
            <DriftWidget />
          </FrostedWidgetPreview>
        </div>
        <div
          className="small"
          style={{ fontStyle: "italic", opacity: 0.5, marginTop: 12 }}
        >
          Observational analysis only. Not a fact-check.
        </div>
      </section>

      <div aria-hidden="true" style={{ height: 1, background: "rgba(45,212,191,0.04)", position: "relative" }}>
        {Array.from({ length: 24 }).map((_, i) => {
          const t = i / 23;
          const a = 0.02 + (1 - Math.abs(t - 0.5) * 2) * 0.06;
          return <div key={i} style={{ position: "absolute", left: `${t * 100}%`, top: -1, width: 1, height: i % 6 === 0 ? 5 : 2, background: `rgba(45,212,191,${a.toFixed(4)})` }} />;
        })}
      </div>

      {/* TOOLS */}
      <section id="tools" className="section" aria-label="Tool features">
        <span className="section-label">TOOLS</span>
        <FeatureGrid items={TOOLS} filter={tier} />
      </section>
    </>
  );
}
