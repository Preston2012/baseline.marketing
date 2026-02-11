import type { Metadata } from "next";
import { site } from "@/config/site";
import { Card } from "@/components/Card";

export const metadata: Metadata = {
  title: "How It Works — Baseline Methodology",
  description:
    "Three AI models process identical input independently. Signal metrics, framing radar, semantic timelines, and consensus — all measured, never judged.",
  alternates: { canonical: `${site.url}/methodology/` },
  openGraph: {
    title: "How It Works — Baseline Methodology",
    description: "Three AI models process identical input independently. Signal metrics, framing radar, semantic timelines, and consensus — all measured, never judged.",
    images: [{ url: "/og/methodology-og.png", width: 1200, height: 630, alt: "Baseline Methodology" }],
  },
};

export default function MethodologyPage() {
  return (
    <section className="section" aria-label="Methodology">
      <h1 className="h2">Methodology</h1>

      <p className="p" style={{ color: "var(--text)", fontWeight: 600, marginTop: 12 }}>
        Observational analysis only. Not a fact-check.
      </p>

      <p className="p" style={{ maxWidth: 820 }}>
        Baseline is a measurement surface for public speech. A statement is captured from a verified public source,
        processed independently by three AI systems, and displayed side-by-side with source context. A separate
        consensus layer is computed after independent outputs are produced.
      </p>

      <div style={{ height: 24 }} />

      {/* ═══════════════════════════════════════════════════════
          SECTION 1: HOW IT WORKS
          ═══════════════════════════════════════════════════════ */}
      <span
        className="data"
        style={{
          color: "var(--teal)",
          fontSize: 11,
          letterSpacing: 2,
          textTransform: "uppercase",
          display: "block",
          marginBottom: 14,
        }}
      >
        How It Works
      </span>

      <div className="grid" style={{ gap: 16 }}>
        <Card title="1) Input Normalization">
          <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
            <li>Statement text captured with metadata — source link, timestamps, figure identity, context pointers</li>
            <li>Input normalized to a single canonical string</li>
            <li>Every AI system receives identical input</li>
          </ul>
        </Card>

        <Card title="2) Three Independent Systems (Parallel)">
          <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
            <li>Three AI systems process the statement independently</li>
            <li>Outputs are never combined before display</li>
            <li>No manual rewriting applied to model outputs</li>
            <li>Separation preserved — variance stays observable</li>
          </ul>
        </Card>

        <Card title="3) Side-by-Side Display + Context">
          <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
            <li>System outputs displayed side-by-side</li>
            <li>Sources and context visible on every surface</li>
            <li>Context presented as supporting metadata and links — not editorial judgment</li>
          </ul>
        </Card>

        <Card title="4) Consensus Layer (Computed Separately)">
          <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
            <li>Computed after all independent outputs exist</li>
            <li>Summarizes shared patterns and highlights variance</li>
            <li>Never overrides individual model outputs</li>
          </ul>
        </Card>

        <Card title="5) Append-Only Records">
          <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
            <li>Inputs, outputs, and consensus stored as immutable records</li>
            <li>Supports reproducibility and auditability over time</li>
            <li>Historical data preserved — never overwritten</li>
          </ul>
        </Card>

        <Card title="6) Sources & Traceability">
          <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
            <li>Sources presented as URLs to public records or verified platforms</li>
            <li>Path back to origin always preserved for user verification</li>
            <li>System does not replace source reading</li>
          </ul>
        </Card>
      </div>

      <div style={{ height: 32 }} />

      {/* ═══════════════════════════════════════════════════════
          SECTION 2: PROPRIETARY MEASUREMENT SURFACES
          ═══════════════════════════════════════════════════════ */}
      <span
        className="data"
        style={{
          color: "var(--teal)",
          fontSize: 11,
          letterSpacing: 2,
          textTransform: "uppercase",
          display: "block",
          marginBottom: 14,
        }}
      >
        Proprietary Measurement Surfaces
      </span>

      <div className="grid" style={{ gap: 16 }}>
        <Card title="The Receipt™ — Semantic Similarity Timeline">
          <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
            <li>Tracks recurring language patterns across a figure&rsquo;s statements over time</li>
            <li>Semantic similarity computed via vector embeddings</li>
            <li>Match counts displayed by tier — Core: 3, Pro: 5, Pro+: unlimited</li>
            <li>Patterns measured, not interpreted</li>
          </ul>
        </Card>

        <Card title="Framing Radar™ — Five-Axis Rhetorical Measurement">
          <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
            <li>Pentagon chart across five dimensions: Adversarial/Oppositional, Problem Identification, Commitment/Forward-Looking, Justification/Reactive, Imperative/Directive</li>
            <li>Describes rhetorical structure — not moral character</li>
            <li>Each axis computed independently per AI model</li>
            <li>Variance between models surfaced, not hidden</li>
          </ul>
        </Card>

        <Card title="The Lens Lab™ — Multi-Model Comparison">
          <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
            <li>Side-by-side outputs from three independent AI systems</li>
            <li>No model sees another&rsquo;s output</li>
            <li>Consensus layer computed after all models return</li>
            <li>Disagreement is displayed — not resolved</li>
          </ul>
        </Card>

        <Card title="Provision Drift™ — Semantic Distance Scoring">
          <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
            <li>Measures semantic distance between individual provisions and a bill&rsquo;s stated purpose</li>
            <li>Each provision scored 0&ndash;100: Low (0&ndash;25), Moderate (26&ndash;50), High (51&ndash;75), Very High (76&ndash;100)</li>
            <li>Automated categorization only — not an evaluation of legislative quality</li>
            <li>Source links to original bill text always provided</li>
          </ul>
        </Card>
      </div>

      <div style={{ height: 32 }} />

      {/* ═══════════════════════════════════════════════════════
          SECTION 3: MEASUREMENT LAYERS
          ═══════════════════════════════════════════════════════ */}
      <span
        className="data"
        style={{
          color: "var(--teal)",
          fontSize: 11,
          letterSpacing: 2,
          textTransform: "uppercase",
          display: "block",
          marginBottom: 14,
        }}
      >
        Measurement Layers
      </span>

      <div className="grid" style={{ gap: 16 }}>
        <Card title="Signal Metrics">
          <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
            <li><strong>Repetition</strong> — How closely language mirrors the figure&rsquo;s prior statements on the same topic</li>
            <li><strong>Novelty</strong> — How much new language or framing a statement introduces</li>
            <li><strong>Affect</strong> — Rate of emotionally charged language, intensity markers, urgency signals</li>
            <li><strong>Entropy</strong> — Topical spread. Higher = multiple subjects. Lower = tight focus</li>
            <li>Each scored 0&ndash;100 with no thresholds or labels</li>
          </ul>
        </Card>

        <Card title="Consensus Convergence">
          <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
            <li>Displays how many models converge on similar measurements</li>
            <li>Convergence ring shows proportion of agreement (e.g., 2/3)</li>
            <li>Computed only after all models return independently</li>
          </ul>
        </Card>

        <Card title="Variance Detection">
          <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
            <li>Triggered when models produce significantly different classifications</li>
            <li>Variance banner displayed — not an error, reflects genuine measurement divergence</li>
            <li>Disagreement surfaced, never suppressed</li>
          </ul>
        </Card>

        <Card title="Congressional Vote Record">
          <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
            <li>Per-member, per-bill granularity across the full congressional record</li>
            <li>Votes displayed as recorded (teal) or not recorded (gray) — never color-coded by position</li>
            <li>Tracked separately from speech metrics</li>
          </ul>
        </Card>

        <Card title="Historical Trends">
          <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
            <li>Measurement over time — tracks how a figure&rsquo;s language patterns shift</li>
            <li>Signal metrics, framing axes, and similarity scores plotted across statements</li>
            <li>Trends observed, not predicted</li>
          </ul>
        </Card>
      </div>

      <div style={{ height: 18 }} />

      <p className="p">
        This methodology page is a high-level description of the measurement surfaces. Specific feature limits and
        subscription details are listed on the <a href="/pricing/">Pricing</a> page.
      </p>
    </section>
  );
}
