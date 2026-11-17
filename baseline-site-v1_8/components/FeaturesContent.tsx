"use client";

import { Fragment, type ReactNode } from "react";
import { FeaturesNav } from "./FeaturesNav";
import { SignalMetricsWidget, BaselineScoreWidget, ConsensusRingWidget, ReceiptTimelineWidget, CrossfireWidget, RadarDemoWidget, ConstellationWidget, DriftWidget, LensLabWidget, SignalPulseWidget, FingerprintWidget, IntersectionsWidget, DossierWidget, SplitMicroscopeWidget, NarrativeSyncWidget, BaselineDeltaWidget, VarianceDetectionWidget, HistoricalTrendsWidget, TopicHeatmapWidget, ShiftAlertWidget, MutationTimelineWidget, SpendingScopeWidget } from "./GalleryWidgets";

/* ─────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────── */

type Feature = {
  name: string;
  desc: string;
  /** Widget label */
  widgetLabel?: string;
  /** Widget component - if present, renders as combo */
  widget?: ReactNode;
  /** Span full width (2 columns) */
  wide?: boolean;
};

/* ─────────────────────────────────────────────────────────
   SECTION DATA
   Every feature is free. Features with widgets become combos (widget + card info
   in one frame). Features without stay as regular cards.
   ───────────────────────────────────────────────────────── */

const SIGNALS: Feature[] = [
  { name: "Signal Metrics", desc: "Repetition, Novelty, Affect, Entropy. Four independent scores per statement, each 0\u2013100.",
    widgetLabel: "SIGNAL METRICS \u00b7 4-AXIS DECOMPOSITION", widget: <SignalMetricsWidget /> },
  { name: "Baseline\u2122", desc: "Figure-level 24-hour rolling aggregate. The reference signal for each figure.",
    widgetLabel: "BASELINE\u2122 \u00b7 24HR ROLLING AGGREGATE", widget: <BaselineScoreWidget /> },
  { name: "Baseline Delta", desc: "How far today\u2019s score deviates from the figure\u2019s rolling average. Measures shift, not position.",
    widgetLabel: "BASELINE DELTA \u00b7 DEVIATION GAUGE", widget: <BaselineDeltaWidget /> },
  { name: "Consensus Convergence", desc: "How closely multiple AI systems agree on scores.",
    widgetLabel: "CONSENSUS \u00b7 MODEL CONVERGENCE", widget: <ConsensusRingWidget /> },
  { name: "Variance Detection", desc: "Flags when AI systems meaningfully disagree. Displayed, never hidden.",
    widgetLabel: "VARIANCE \u00b7 MODEL DISAGREEMENT SURFACING", widget: <VarianceDetectionWidget /> },
  { name: "Lens Lab\u2122", desc: "Independent AI models running in parallel. Same statement, separate measurements.",
    widgetLabel: "LENS LAB\u2122 \u00b7 MULTI-SYSTEM PARALLEL ANALYSIS", widget: <LensLabWidget />, wide: true },
  { name: "Historical Trends", desc: "Track how a figure\u2019s signals change over time. Measured, not predicted.",
    widgetLabel: "HISTORICAL \u00b7 SIGNAL PATTERNS OVER TIME", widget: <HistoricalTrendsWidget /> },
  { name: "Divergence Sort", desc: "Sort by lowest consensus first. See where measurements diverge most." },
  { name: "Split Microscope\u2122", desc: "Detailed variance breakdown when models disagree. See exactly where measurements diverge.",
    widgetLabel: "SPLIT MICROSCOPE\u2122 \u00b7 DIVERGENCE VIEW", widget: <SplitMicroscopeWidget /> },
];

const FEED: Feature[] = [
  { name: "Feed Browse + Statement Detail", desc: "Access every analyzed statement with full source context." },
  { name: "Trending Topics", desc: "Topics generating the most measurement activity." },
  { name: "\u201CWhy am I seeing this?\u201D", desc: "See why this statement is in your feed." },
  { name: "Model Attribution", desc: "See which models produced each measurement." },
  { name: "The Receipt\u2122", desc: "The full statement exhibit: measurements, sources, and a semantic similarity timeline.",
    widgetLabel: "THE RECEIPT\u2122 \u00b7 STATEMENT EXHIBIT", widget: <ReceiptTimelineWidget /> },
  { name: "Feed Sorting", desc: "Sort by novelty, recency, or signal strength." },
  { name: "Crossfire\u2122", desc: "Two figures. One surface. Direct framing comparison.",
    widgetLabel: "CROSSFIRE\u2122 \u00b7 DUAL FIGURE COMPARISON", widget: <CrossfireWidget /> },
];

const FIGURES: Feature[] = [
  { name: "Figure Profiles", desc: "Every tracked figure with their full measurement history." },
  { name: "\u201CStatements This Week\u201D Badge", desc: "Recent statement count per figure." },
  { name: "\u201CSilent Vote\u201D Indicator", desc: "Shown when a figure discussed a bill but has no recorded vote." },
  { name: "Framing Fingerprint\u2122", desc: "Aggregate framing tendencies rendered as a unique visual signature.",
    widgetLabel: "FRAMING FINGERPRINT\u2122 \u00b7 RHETORICAL IDENTITY", widget: <FingerprintWidget /> },
  { name: "Signal Pulse\u2122", desc: "Activity ring on every figure avatar. Faster pulse means more statements measured recently.",
    widgetLabel: "SIGNAL PULSE\u2122 \u00b7 ACTIVITY WAVEFORM", widget: <SignalPulseWidget /> },
  { name: "Favorites & Followed Figures", desc: "Follow figures. Their statements surface earlier in your feed." },
  { name: "Framing Radar\u2122", desc: "Five-axis rhetorical measurement rendered as a pentagon. One shape per figure.",
    widgetLabel: "FRAMING RADAR\u2122 \u00b7 5-AXIS MEASUREMENT", widget: <RadarDemoWidget /> },
  { name: "Topic Heatmap", desc: "Visual density map of a figure\u2019s topic coverage.",
    widgetLabel: "TOPIC HEATMAP \u00b7 COVERAGE DENSITY", widget: <TopicHeatmapWidget /> },
  { name: "Intersections Panel\u2122", desc: "Cross-figure pattern map. See where rhetoric overlaps across figures.",
    widgetLabel: "INTERSECTIONS PANEL\u2122 \u00b7 FRAMING OVERLAP", widget: <IntersectionsWidget /> },
  { name: "Declassified Dossier\u2122", desc: "Complete analytical profile. Every surface, one view.",
    widgetLabel: "DECLASSIFIED DOSSIER\u2122 \u00b7 EXHIBIT PLATE PROFILE", widget: <DossierWidget />, wide: true },
];

const BILLS: Feature[] = [
  { name: "Congressional Vote Record", desc: "Every vote. Every bill. Every member. Recorded or not recorded." },
  { name: "Bill Overview & Notable Provisions", desc: "Structured summaries of legislation with provision-level detail." },
  { name: "Drift Cascade Waterfall", desc: "Visualize how provisions drift from purpose, ranked by distance." },
  { name: "Drift League Table", desc: "Bills ranked by aggregate provision drift." },
  { name: "Provision Drift\u2122", desc: "Semantic distance between provisions and a bill\u2019s stated purpose.",
    widgetLabel: "PROVISION DRIFT\u2122 \u00b7 SEMANTIC DISTANCE", widget: <DriftWidget /> },
  { name: "Mutation Timeline\u2122", desc: "How bill provisions change across legislative versions. Each mutation measured, each splice detected.",
    widgetLabel: "MUTATION TIMELINE\u2122 \u00b7 GENOME SEQUENCER", widget: <MutationTimelineWidget />, wide: true },
  { name: "Spending Scope\u2122", desc: "Spending data tied to bills and provisions. CBO scores, extracted figures, every dollar surfaced.",
    widgetLabel: "SPENDING SCOPE\u2122 \u00b7 FISCAL SONAR STATION", widget: <SpendingScopeWidget />, wide: true },
];

const TOOLS: Feature[] = [
  { name: "Request a Figure", desc: "Don\u2019t see someone? Request a figure for tracking." },
  { name: "How Is This Measured?", desc: "Info sheets on every analysis surface explaining the methodology behind each measurement." },
  { name: "First Measurement Guide", desc: "Quick walkthrough on your first measurement screen." },
  { name: "Export & Share", desc: "Save analyses as shareable images with a timestamp and source attribution." },
  { name: "Copy with Citation", desc: "Copy a statement with the speaker, the date and an attribution line." },
  { name: "Digest Notifications", desc: "A daily digest of the top statements for your watchlist." },
  { name: "Advanced Notifications", desc: "Granular control over every alert category." },
  { name: "Shift Alert", desc: "Notified when a followed figure\u2019s baseline shifts significantly.",
    widgetLabel: "SHIFT ALERT \u00b7 24HR SPIKE DETECTION", widget: <ShiftAlertWidget /> },
  { name: "Delta Threshold Alerts", desc: "Custom alert thresholds per signal axis." },
  { name: "Narrative Sync\u2122", desc: "Cross-figure framing convergence detection.",
    widgetLabel: "NARRATIVE SYNC\u2122 \u00b7 CONVERGENCE DETECTION", widget: <NarrativeSyncWidget /> },
];

/* ─────────────────────────────────────────────────────────
   FEATURE CARD - plain card (no widget)
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
      <p className="p" style={{ margin: 0 }}>
        {f.desc}
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   WIDGET CARD - widget on top, card info below,
   one unified frame. One feature, one representation.
   ───────────────────────────────────────────────────────── */

function WidgetCard({ f }: { f: Feature }) {
  return (
    <div
      style={{
        background: "var(--card)",
        border: "2px solid var(--border_inactive)",
        borderRadius: "var(--radius_card)",
        overflow: "hidden",
      }}
    >
      {/* Widget illustration */}
      <div style={{ position: "relative" }}>
        <div style={{ pointerEvents: "none", userSelect: "none" }}>
          {f.widget}
        </div>
        {/* Subtle reticle corners */}
        <div style={{ position: "absolute", top: 6, left: 6, width: 8, height: 8, borderTop: "1px solid rgba(45,212,191,0.12)", borderLeft: "1px solid rgba(45,212,191,0.12)" }} />
        <div style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderTop: "1px solid rgba(45,212,191,0.12)", borderRight: "1px solid rgba(45,212,191,0.12)" }} />
        <div style={{ position: "absolute", bottom: 6, left: 6, width: 8, height: 8, borderBottom: "1px solid rgba(45,212,191,0.12)", borderLeft: "1px solid rgba(45,212,191,0.12)" }} />
        <div style={{ position: "absolute", bottom: 6, right: 6, width: 8, height: 8, borderBottom: "1px solid rgba(45,212,191,0.12)", borderRight: "1px solid rgba(45,212,191,0.12)" }} />
      </div>

      {/* Card info area */}
      <div style={{ padding: 16, borderTop: "1px solid var(--border_inactive)" }}>
        <div style={{ color: "var(--text)", fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
          {f.name}
        </div>
        <p className="p" style={{ margin: 0 }}>
          {f.desc}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   SECTION GRID - renders features in order, combos and
   plain cards mixed in one continuous grid.
   Wide items break out of the 2-col grid.
   ───────────────────────────────────────────────────────── */

function SectionGrid({ items }: { items: Feature[] }) {
  const filtered = items;

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
   SECTION DIVIDER - hashmark ruler
   ───────────────────────────────────────────────────────── */

function SectionDivider() {
  return (
    <div aria-hidden="true" style={{ height: 1, background: "rgba(45,212,191,0.04)", position: "relative" }}>
      {Array.from({ length: 24 }).map((_, i) => {
        const t = i / 23;
        const a = 0.02 + (1 - Math.abs(t - 0.5) * 2) * 0.06;
        return <div key={i} style={{ position: "absolute", left: `${t * 100}%`, top: -1, width: 1, height: i % 6 === 0 ? 5 : 2, background: `rgba(45,212,191,${a.toFixed(4)})` }} />;
      })}
      {/* Circuit trace node: center */}
      <div style={{ position: 'absolute', left: '50%', top: -2, width: 5, height: 5, borderRadius: '50%', background: 'rgba(45,212,191,0.07)', transform: 'translateX(-50%)' }} />
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
        <span className="data" style={{ color: "var(--teal)" }}>44 named figures</span>{" "}
        across five categories. Congressional vote records come from Congress.gov.
        The roster grows over time.
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
                  <span className="data" style={{ fontSize: 9, color: "var(--sub-dim)", letterSpacing: "0.08em", width: "100%", marginTop: 4 }}>
                    INSTITUTIONAL FEEDS
                  </span>
                )}
                <span style={{
                  display: "inline-block", padding: "6px 10px",
                  border: "2px solid var(--border_inactive)", borderRadius: 8,
                  fontSize: 12, color: "var(--text)", background: "var(--card)",
                  whiteSpace: "nowrap",
                }}>
                  {name}
                </span>
              </Fragment>
            ))}
          </div>
        </div>
      ))}

      <p className="small" style={{ color: "var(--sub-dim)", marginTop: 12 }}>
        Request a figure for tracking in the app. The roster grows
        based on source availability.
      </p>
    </div>
  );
}


const PLANNED = [
  "Provision Resonance Links",
  "Constellation Nav\u2122",
  "Long-press Peek Preview",
  "Double-tap Annotate",
  "Private Annotations",
  "Annotation Delta Cards",
  "Ghost Export",
  "Drift-infused Watermark",
];

function PlannedList() {
  return (
    <div style={{ marginTop: 24 }}>
      <span className="section-label">PLANNED</span>
      <p className="p" style={{ maxWidth: 640, marginTop: 8, marginBottom: 12 }}>
        Not in the app yet. These are on the list.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {PLANNED.map((name) => (
          <span key={name} style={{
            display: "inline-block", padding: "6px 10px",
            border: "2px solid var(--border_inactive)", borderRadius: 8,
            fontSize: 12, color: "var(--text)", background: "var(--card)",
          }}>
            {name}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN EXPORT
   ───────────────────────────────────────────────────────── */

export function FeaturesContent() {
  return (
    <>
      <FeaturesNav />

      <section id="signals" className="section" aria-label="Signal features">
        <span className="section-label">SIGNALS</span>
        <SectionGrid items={SIGNALS} />
        <div className="small" style={{ fontStyle: "italic", color: "var(--sub-dim)", marginTop: 12 }}>
          Observational analysis only. Not a fact-check.
        </div>
      </section>

      <SectionDivider />

      <section id="feed" className="section" aria-label="Feed features">
        <span className="section-label">FEED</span>
        <SectionGrid items={FEED} />
      </section>

      <SectionDivider />

      <section id="figures" className="section" aria-label="Figure features">
        <span className="section-label">FIGURES</span>
        <FigureRoster />
        <SectionGrid items={FIGURES} />
      </section>

      <SectionDivider />

      <section id="bills" className="section" aria-label="Bill features">
        <span className="section-label">BILLS</span>
        <SectionGrid items={BILLS} />
        <div className="small" style={{ fontStyle: "italic", color: "var(--sub-dim)", marginTop: 12 }}>
          Observational analysis only. Not a fact-check.
        </div>
      </section>

      <SectionDivider />

      <section id="tools" className="section" aria-label="Tool features">
        <span className="section-label">TOOLS</span>
        <SectionGrid items={TOOLS} />
        <PlannedList />
      </section>
    </>
  );
}
