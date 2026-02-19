"use client";

import { useState, useCallback, Fragment, type ReactNode } from "react";
import { TierPill } from "./TierPill";
import { FeaturesNav, type TierFilter } from "./FeaturesNav";
import { FrostedWidgetPreview } from "./FrostedWidget";
import { SignalMetricsWidget, BaselineScoreWidget, ConsensusRingWidget, ReceiptTimelineWidget, CrossfireWidget, RadarDemoWidget, ConstellationWidget, DriftWidget, LensLabWidget, SignalPulseWidget, FingerprintWidget, IntersectionsWidget, DossierWidget, SplitMicroscopeWidget, NarrativeSyncWidget, BaselineDeltaWidget, VarianceDetectionWidget, HistoricalTrendsWidget, TopicHeatmapWidget, ShiftAlertWidget } from "./GalleryWidgets";

/* ─────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────── */

type Tier = "CORE" | "PRO" | "PRO+" | "B2B";

type Feature = {
  name: string;
  desc: string;
  tier: Tier;
  /** Frosted widget label (shown inside widget frame) */
  widgetLabel?: string;
  /** Widget component — if present, renders as combo */
  widget?: ReactNode;
  /** Span full width (2 columns) */
  wide?: boolean;
};

/* ─────────────────────────────────────────────────────────
   SECTION DATA — ordered CORE → PRO → PRO+ → B2B
   Features with widgets become combos (widget + card info
   in one frame). Features without stay as regular cards.
   ───────────────────────────────────────────────────────── */

const SIGNALS: Feature[] = [
  { name: "Signal Metrics", desc: "Repetition, Novelty, Affect, Entropy. Four independent scores per statement, each 0\u2013100.", tier: "CORE",
    widgetLabel: "SIGNAL METRICS \u00b7 4-AXIS DECOMPOSITION", widget: <SignalMetricsWidget /> },
  { name: "Baseline\u2122", desc: "Figure-level 24-hour rolling aggregate. The reference signal for each figure.", tier: "CORE",
    widgetLabel: "BASELINE\u2122 \u00b7 24HR ROLLING AGGREGATE", widget: <BaselineScoreWidget /> },
  { name: "Baseline Delta", desc: "How far a statement\u2019s signal metrics deviate from the figure\u2019s historical average. Measures shift, not position.", tier: "CORE",
    widgetLabel: "BASELINE DELTA \u00b7 DEVIATION GAUGE", widget: <BaselineDeltaWidget /> },
  { name: "Consensus Convergence", desc: "How often models agree. Shown as a simple ratio.", tier: "CORE",
    widgetLabel: "CONSENSUS \u00b7 MODEL CONVERGENCE", widget: <ConsensusRingWidget /> },
  { name: "Variance Detection", desc: "When models disagree, you see it. Displayed, never hidden.", tier: "CORE",
    widgetLabel: "VARIANCE \u00b7 MODEL DISAGREEMENT SURFACING", widget: <VarianceDetectionWidget /> },
  { name: "Lens Lab\u2122", desc: "Independent AI models running in parallel. Same statement, separate measurements.", tier: "PRO",
    widgetLabel: "LENS LAB\u2122 \u00b7 3-SYSTEM PARALLEL ANALYSIS", widget: <LensLabWidget />, wide: true },
  { name: "Historical Trends", desc: "Language patterns over time. Measured, not predicted.", tier: "PRO",
    widgetLabel: "HISTORICAL \u00b7 SIGNAL PATTERNS OVER TIME", widget: <HistoricalTrendsWidget /> },
  { name: "Divergence Sort", desc: "Sort by lowest consensus first. See where measurements diverge most.", tier: "PRO+" },
  { name: "Split Microscope\u2122", desc: "Side-by-side model output comparison. See exactly where measurements diverge.", tier: "PRO+",
    widgetLabel: "SPLIT MICROSCOPE\u2122 \u00b7 DIVERGENCE VIEW", widget: <SplitMicroscopeWidget /> },
];

const FEED: Feature[] = [
  { name: "Feed Browse + Statement Detail", desc: "Access every analyzed statement with full source context.", tier: "CORE" },
  { name: "Trending Topics", desc: "Topic chips showing what\u2019s active now.", tier: "CORE" },
  { name: "\u201CWhy am I seeing this?\u201D", desc: "See why this statement is in your feed.", tier: "CORE" },
  { name: "Model Attribution", desc: "See which models produced each measurement.", tier: "CORE" },
  { name: "The Receipt\u2122", desc: "The full statement exhibit: measurements, sources, and a semantic similarity timeline.", tier: "CORE",
    widgetLabel: "THE RECEIPT\u2122 \u00b7 STATEMENT EXHIBIT", widget: <ReceiptTimelineWidget /> },
  { name: "Feed Sorting", desc: "Sort by novelty, recency, or signal strength.", tier: "PRO" },
  { name: "Long-press Peek Preview", desc: "Press and hold to preview a statement without navigating.", tier: "PRO" },
  { name: "Double-tap Annotate", desc: "Quick-annotate any statement with a double tap.", tier: "PRO" },
  { name: "Crossfire\u2122", desc: "Two figures. One surface. Direct framing comparison.", tier: "PRO",
    widgetLabel: "CROSSFIRE\u2122 \u00b7 DUAL FIGURE COMPARISON", widget: <CrossfireWidget /> },
];

const FIGURES: Feature[] = [
  { name: "Figure Profiles", desc: "Every tracked figure with their full measurement history.", tier: "CORE" },
  { name: "\u201CStatements This Week\u201D Badge", desc: "Recent statement count per figure.", tier: "CORE" },
  { name: "\u201CSilent Vote\u201D Indicator", desc: "Shown when a figure discussed a bill but has no recorded vote.", tier: "CORE" },
  { name: "Framing Fingerprint\u2122", desc: "Aggregate framing tendencies rendered as a unique visual signature.", tier: "CORE",
    widgetLabel: "FRAMING FINGERPRINT\u2122 \u00b7 RHETORICAL IDENTITY", widget: <FingerprintWidget /> },
  { name: "Signal Pulse\u2122", desc: "Visual summary of signal activity at a glance.", tier: "CORE",
    widgetLabel: "SIGNAL PULSE\u2122 \u00b7 ACTIVITY WAVEFORM", widget: <SignalPulseWidget /> },
  { name: "Favorites & Followed Figures", desc: "Pin figures to your feed for faster access.", tier: "PRO" },
  { name: "Framing Radar\u2122", desc: "Five-axis rhetorical measurement rendered as a pentagon. One shape per figure.", tier: "PRO",
    widgetLabel: "FRAMING RADAR\u2122 \u00b7 5-AXIS MEASUREMENT", widget: <RadarDemoWidget /> },
  { name: "Constellation Nav\u2122", desc: "Data-infused dot navigation between figures, topics, and framing patterns.", tier: "PRO",
    widgetLabel: "CONSTELLATION NAV\u2122 \u00b7 FIGURE TOPOLOGY", widget: <ConstellationWidget /> },
  { name: "Topic Heatmap", desc: "Figures \u00d7 topics grid. See who talks about what, and how much.", tier: "PRO+",
    widgetLabel: "TOPIC HEATMAP \u00b7 COVERAGE DENSITY", widget: <TopicHeatmapWidget /> },
  { name: "Intersections Panel\u2122", desc: "Cross-figure pattern map. See where rhetoric overlaps across figures.", tier: "PRO+",
    widgetLabel: "INTERSECTIONS PANEL\u2122 \u00b7 FRAMING OVERLAP", widget: <IntersectionsWidget /> },
  { name: "Declassified Dossier\u2122", desc: "Complete analytical profile. Every surface, one view.", tier: "PRO+",
    widgetLabel: "DECLASSIFIED DOSSIER\u2122 \u00b7 EXHIBIT PLATE PROFILE", widget: <DossierWidget />, wide: true },
];

const BILLS: Feature[] = [
  { name: "Congressional Vote Record", desc: "Every vote. Every bill. Every member. Recorded or not recorded.", tier: "CORE" },
  { name: "Bill Overview & Notable Provisions", desc: "Structured summaries of legislation with provision-level detail.", tier: "PRO+" },
  { name: "Provision Resonance Links", desc: "Cross-references between provisions that share framing or topic overlap.", tier: "PRO+" },
  { name: "Drift Cascade Waterfall", desc: "Visualize how provisions drift from purpose, ranked by distance.", tier: "PRO+" },
  { name: "Drift League Table", desc: "Bills ranked by aggregate provision drift.", tier: "PRO+" },
  { name: "Provision Drift\u2122", desc: "Semantic distance between provisions and a bill\u2019s stated purpose.", tier: "PRO+",
    widgetLabel: "PROVISION DRIFT\u2122 \u00b7 SEMANTIC DISTANCE", widget: <DriftWidget /> },
];

const TOOLS: Feature[] = [
  { name: "Private Annotations", desc: "Core: 0 \u00b7 Pro: 100 \u00b7 Pro+: 500 \u00b7 B2B: 1,000", tier: "CORE" },
  { name: "Request a Figure", desc: "Don\u2019t see someone? Request a figure for tracking.", tier: "CORE" },
  { name: "How Is This Measured?", desc: "Info sheets on every analysis surface explaining the methodology behind each measurement.", tier: "CORE" },
  { name: "First Measurement Guide", desc: "Quick walkthrough on your first measurement screen.", tier: "CORE" },
  { name: "Export & Share", desc: "Museum-grade export with branded watermark. Pro and above.", tier: "PRO" },
  { name: "Ghost Export", desc: "Then vs. now: export a figure\u2019s measurements at two points in time.", tier: "PRO" },
  { name: "Copy with Citation", desc: "One-tap copy with automatic attribution footer.", tier: "PRO" },
  { name: "Drift-infused Watermark", desc: "Export watermark shows the statement\u2019s drift score.", tier: "PRO" },
  { name: "Digest Notifications", desc: "Daily/weekly digests. Pro and above.", tier: "PRO" },
  { name: "Advanced Notifications", desc: "Per-figure, per-topic alerts with higher frequency.", tier: "PRO+" },
  { name: "Shift Alert", desc: "Triggered when a figure\u2019s language shifts significantly within 24 hours.", tier: "PRO+",
    widgetLabel: "SHIFT ALERT \u00b7 24HR SPIKE DETECTION", widget: <ShiftAlertWidget /> },
  { name: "Delta Threshold Alerts", desc: "User-set per-figure thresholds. Precision monitoring.", tier: "B2B" },
  { name: "Annotation Delta Cards", desc: "Track how model agreement on your annotations changes over time.", tier: "B2B" },
  { name: "Narrative Sync\u2122", desc: "Cross-figure framing convergence detection.", tier: "B2B",
    widgetLabel: "NARRATIVE SYNC\u2122 \u00b7 CONVERGENCE DETECTION", widget: <NarrativeSyncWidget /> },
];

/* ─────────────────────────────────────────────────────────
   TIER FILTER LOGIC
   ───────────────────────────────────────────────────────── */

const TIER_HIERARCHY: Record<TierFilter, Tier[]> = {
  ALL: ["CORE", "PRO", "PRO+", "B2B"],
  CORE: ["CORE"],
  PRO: ["CORE", "PRO"],
  "PRO+": ["CORE", "PRO", "PRO+", "B2B"],
};

/* ─────────────────────────────────────────────────────────
   FEATURE CARD — plain card (no widget)
   ───────────────────────────────────────────────────────── */

function FeatureCard({ f }: { f: Feature }) {
  return (
    <div
      style={{
        background: "var(--card)",
        border: "2px solid var(--border_inactive)",
        borderRadius: "var(--radius_card)",
        padding: 16,
      }}
    >
      <div style={{ color: "var(--text)", fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
        {f.name}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <TierPill tier={f.tier} />
      </div>
      <p className="p" style={{ margin: 0, filter: "blur(5px)", WebkitFilter: "blur(5px)", userSelect: "none", WebkitUserSelect: "none" }}>
        {f.desc}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   WIDGET CARD — frosted widget on top, card info below,
   one unified frame. One feature, one representation.
   Easter egg: tap/hold widget area to partially defrost.
   ───────────────────────────────────────────────────────── */

function WidgetCard({ f }: { f: Feature }) {
  const [peeking, setPeeking] = useState(false);

  return (
    <div
      style={{
        background: "var(--card)",
        border: `2px solid ${peeking ? 'rgba(45,212,191,0.15)' : 'var(--border_inactive)'}`,
        borderRadius: "var(--radius_card)",
        overflow: "hidden",
        transition: "border-color 400ms ease",
      }}
    >
      {/* Widget preview area */}
      <div
        style={{ position: "relative", cursor: "default" }}
        onPointerDown={() => setPeeking(true)}
        onPointerUp={() => setPeeking(false)}
        onPointerLeave={() => setPeeking(false)}
        onPointerCancel={() => setPeeking(false)}
      >
        <div style={{
          filter: peeking
            ? "blur(2px) brightness(0.75) saturate(0.7)"
            : "blur(6px) brightness(0.6) saturate(0.5)",
          WebkitFilter: peeking
            ? "blur(2px) brightness(0.75) saturate(0.7)"
            : "blur(6px) brightness(0.6) saturate(0.5)",
          pointerEvents: "none",
          userSelect: "none",
          WebkitUserSelect: "none" as "none",
          transition: "filter 400ms ease, -webkit-filter 400ms ease",
        }}>
          {f.widget}
        </div>
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: 4,
          background: peeking ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0.15)",
          pointerEvents: "none",
          transition: "background 400ms ease",
        }}>
          {/* Mini reticle corners */}
          <div style={{ position: "absolute", top: 6, left: 6, width: 8, height: 8, borderTop: "1px solid rgba(45,212,191,0.12)", borderLeft: "1px solid rgba(45,212,191,0.12)" }} />
          <div style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderTop: "1px solid rgba(45,212,191,0.12)", borderRight: "1px solid rgba(45,212,191,0.12)" }} />
          <div style={{ position: "absolute", bottom: 6, left: 6, width: 8, height: 8, borderBottom: "1px solid rgba(45,212,191,0.12)", borderLeft: "1px solid rgba(45,212,191,0.12)" }} />
          <div style={{ position: "absolute", bottom: 6, right: 6, width: 8, height: 8, borderBottom: "1px solid rgba(45,212,191,0.12)", borderRight: "1px solid rgba(45,212,191,0.12)" }} />

          <span style={{
            fontFamily: "var(--font-jetbrains, monospace)",
            fontSize: 8, letterSpacing: "0.12em",
            color: "rgba(45,212,191,0.35)", textTransform: "uppercase",
            border: "1px solid rgba(45,212,191,0.12)",
            borderRadius: 3, padding: "2px 8px",
            textAlign: "center", maxWidth: "90%",
            opacity: peeking ? 0 : 1,
            transition: "opacity 300ms ease",
          }}>
            {f.widgetLabel || "LIVE PREVIEW"}
          </span>
          <span style={{
            fontFamily: "var(--font-jetbrains, monospace)",
            fontSize: 7, letterSpacing: "0.1em",
            color: "rgba(45,212,191,0.2)", textTransform: "uppercase",
            opacity: peeking ? 0 : 1,
            transition: "opacity 300ms ease",
          }}>
            PRE-LAUNCH
          </span>
        </div>
      </div>

      {/* Card info area — seamless below the widget */}
      <div style={{ padding: 16, borderTop: "1px solid var(--border_inactive)" }}>
        <div style={{ color: "var(--text)", fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
          {f.name}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <TierPill tier={f.tier} />
        </div>
        <p className="p" style={{ margin: 0, filter: "blur(5px)", WebkitFilter: "blur(5px)", userSelect: "none", WebkitUserSelect: "none" }}>
          {f.desc}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   SECTION GRID — renders features in order, combos and
   plain cards mixed in one continuous grid.
   Wide items break out of the 2-col grid.
   ───────────────────────────────────────────────────────── */

function SectionGrid({ items, filter }: { items: Feature[]; filter: TierFilter }) {
  const visibleTiers = TIER_HIERARCHY[filter];
  const filtered = items.filter((f) => visibleTiers.includes(f.tier));

  if (filtered.length === 0) {
    return (
      <div className="data" style={{ color: "var(--sub)", fontSize: 12, opacity: 0.5, padding: "20px 0", textAlign: "center" }}>
        No features in this tier for this category.
      </div>
    );
  }

  // Split into chunks: consecutive non-wide items go into grid rows,
  // wide items break out as full-width between grid chunks.
  const chunks: { wide: boolean; items: Feature[] }[] = [];

  for (const f of filtered) {
    if (f.wide) {
      chunks.push({ wide: true, items: [f] });
    } else {
      const last = chunks[chunks.length - 1];
      if (last && !last.wide) {
        last.items.push(f);
      } else {
        chunks.push({ wide: false, items: [f] });
      }
    }
  }

  return (
    <div style={{ marginTop: 12 }}>
      {chunks.map((chunk, ci) => {
        if (chunk.wide) {
          const f = chunk.items[0];
          return (
            <div key={f.name} style={{ marginTop: ci > 0 ? 12 : 0 }}>
              {f.widget ? <WidgetCard f={f} /> : <FeatureCard f={f} />}
            </div>
          );
        }

        return (
          <div
            key={`grid-${ci}`}
            className="grid grid_2"
            style={{ marginTop: ci > 0 ? 12 : 0 }}
          >
            {chunk.items.map((f) => (
              <div key={f.name}>
                {f.widget ? <WidgetCard f={f} /> : <FeatureCard f={f} />}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   SECTION DIVIDER — hashmark ruler
   ───────────────────────────────────────────────────────── */

function SectionDivider() {
  return (
    <div aria-hidden="true" style={{ height: 1, background: "rgba(45,212,191,0.04)", position: "relative" }}>
      {Array.from({ length: 24 }).map((_, i) => {
        const t = i / 23;
        const a = 0.02 + (1 - Math.abs(t - 0.5) * 2) * 0.06;
        return <div key={i} style={{ position: "absolute", left: `${t * 100}%`, top: -1, width: 1, height: i % 6 === 0 ? 5 : 2, background: `rgba(45,212,191,${a.toFixed(4)})` }} />;
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   FIGURE ROSTER
   ───────────────────────────────────────────────────────── */

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

function FigureRoster() {
  return (
    <div style={{ marginBottom: 20 }}>
      <p className="p" style={{ maxWidth: 640, marginBottom: 12 }}>
        <span className="data" style={{ color: "var(--teal)" }}>44 figures</span>{" "}
        tracked at launch across five categories. Roster expands over time.
        Congressional members sync automatically via Congress.gov.
      </p>

      {FIGURE_CATEGORIES.map((cat) => (
        <div key={cat.label} style={{ marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
            <span className="data" style={{ color: "var(--sub)", fontSize: 11, letterSpacing: "0.1em" }}>
              {cat.label}
            </span>
            <span className="data" style={{ color: "var(--teal)", fontSize: 11 }}>
              {cat.count}
            </span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
            {cat.names.map((name, i) => (
              <Fragment key={name}>
                {name.startsWith("Office of") && !cat.names[i - 1]?.startsWith("Office of") && (
                  <span className="data" style={{ fontSize: 9, opacity: 0.3, letterSpacing: "0.08em", width: "100%", marginTop: 4 }}>
                    INSTITUTIONAL FEEDS
                  </span>
                )}
                <span style={{
                  display: "inline-block", padding: "6px 10px",
                  border: "2px solid var(--border_inactive)", borderRadius: 8,
                  fontSize: 12, color: "var(--text)", background: "var(--card)",
                  whiteSpace: "nowrap",
                  filter: "blur(5px)", WebkitFilter: "blur(5px)",
                  userSelect: "none", WebkitUserSelect: "none",
                }}>
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
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN EXPORT
   ───────────────────────────────────────────────────────── */

export function FeaturesContent() {
  const [tier, setTier] = useState<TierFilter>("ALL");
  const handleTier = useCallback((t: TierFilter) => setTier(t), []);

  return (
    <>
      <FeaturesNav onTierChange={handleTier} />

      <section id="signals" className="section" aria-label="Signal features">
        <span className="section-label">SIGNALS</span>
        <SectionGrid items={SIGNALS} filter={tier} />
        <div className="small" style={{ fontStyle: "italic", opacity: 0.5, marginTop: 12 }}>
          Observational analysis only. Not a fact-check.
        </div>
      </section>

      <SectionDivider />

      <section id="feed" className="section" aria-label="Feed features">
        <span className="section-label">FEED</span>
        <SectionGrid items={FEED} filter={tier} />
      </section>

      <SectionDivider />

      <section id="figures" className="section" aria-label="Figure features">
        <span className="section-label">FIGURES</span>
        <FigureRoster />
        <SectionGrid items={FIGURES} filter={tier} />
      </section>

      <SectionDivider />

      <section id="bills" className="section" aria-label="Bill features">
        <span className="section-label">BILLS</span>
        <SectionGrid items={BILLS} filter={tier} />
        <div className="small" style={{ fontStyle: "italic", opacity: 0.5, marginTop: 12 }}>
          Observational analysis only. Not a fact-check.
        </div>
      </section>

      <SectionDivider />

      <section id="tools" className="section" aria-label="Tool features">
        <span className="section-label">TOOLS</span>
        <SectionGrid items={TOOLS} filter={tier} />
      </section>
    </>
  );
}
