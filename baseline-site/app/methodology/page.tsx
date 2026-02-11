import type { Metadata } from "next";
import { site } from "@/config/site";
import { Card } from "@/components/Card";

export const metadata: Metadata = {
  title: "How It Works | Baseline Methodology",
  description:
    "All AI models process identical input independently. Signal metrics, framing radar, semantic timelines, and consensus. All measured, never judged.",
  alternates: { canonical: `${site.url}/methodology/` },
  openGraph: {
    title: "How It Works | Baseline Methodology",
    description: "All AI models process identical input independently. Signal metrics, framing radar, semantic timelines, and consensus. All measured, never judged.",
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
        processed independently by multiple AI systems, and displayed side-by-side with source context. A separate
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
          <p className="p" style={{ margin: "0 0 8px" }}>
            Every statement enters the system the same way. One canonical input. Every model receives it identically.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Statement text captured with metadata: source link, timestamps, figure identity, context pointers</li>
              <li>Input normalized to a single canonical string before distribution</li>
              <li>No preprocessing varies between models. Identical input is the control variable.</li>
            </ul>
          </div>
          <span className="redacted-label">Classified until launch</span>
        </Card>

        <Card title="2) Independent Systems (Parallel)">
          <p className="p" style={{ margin: "0 0 8px" }}>
            All AI systems process the same input at the same time. No system can see another&rsquo;s output.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Outputs are never combined, averaged, or editorially rewritten before display</li>
              <li>Separation is structural, not optional. Variance stays observable by design.</li>
            </ul>
          </div>
          <span className="redacted-label">Classified until launch</span>
        </Card>

        <Card title="3) Side-by-Side Display + Context">
          <p className="p" style={{ margin: "0 0 8px" }}>
            Every output is displayed exactly as returned. Sources and context travel with every surface.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Context presented as supporting metadata and links. Not editorial judgment.</li>
              <li>No output is summarized, merged, or paraphrased before the user sees it.</li>
            </ul>
          </div>
          <span className="redacted-label">Classified until launch</span>
        </Card>

        <Card title="4) Consensus Layer (Computed Separately)">
          <p className="p" style={{ margin: "0 0 8px" }}>
            Consensus is computed after all independent outputs exist. It never overrides them.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Summarizes shared patterns across models and highlights where they diverge.</li>
              <li>Consensus is additive. It sits alongside individual outputs, never replaces them.</li>
            </ul>
          </div>
          <span className="redacted-label">Classified until launch</span>
        </Card>

        <Card title="5) Append-Only Records">
          <p className="p" style={{ margin: "0 0 8px" }}>
            Every input, output, and consensus result is stored as an immutable record.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Historical data preserved. Never overwritten, never retroactively edited.</li>
              <li>Supports reproducibility: the same input can be re-evaluated against stored outputs.</li>
              <li>Continuous audit trail. Every record has a timestamp and source chain.</li>
            </ul>
          </div>
          <span className="redacted-label">Classified until launch</span>
        </Card>

        <Card title="6) Sources &amp; Traceability">
          <p className="p" style={{ margin: "0 0 8px" }}>
            Every measurement links back to its origin. The system does not replace source reading.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Sources are URLs to public records, official transcripts, or verified platforms.</li>
              <li>Path back to the original statement always preserved for independent verification.</li>
            </ul>
          </div>
          <span className="redacted-label">Classified until launch</span>
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
        <Card title="The Receipt™: Semantic Similarity Timeline">
          <p className="p" style={{ margin: "0 0 8px" }}>
            Surfaces past statements by the same figure on the same topic, ranked by semantic similarity.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Similarity computed via vector embeddings. Each statement compared against the figure&rsquo;s historical corpus on that topic.</li>
              <li>Match strength scored <span className="data" style={{ color: "var(--teal)" }}>0.0-1.0</span> (cosine similarity). Tiers: Very High (&ge;0.90), High (&ge;0.75), Moderate (&ge;0.60), Low (&lt;0.60).</li>
              <li>Match counts entitlement-gated. Core: <span className="data" style={{ color: "var(--teal)" }}>3</span>, Pro: <span className="data" style={{ color: "var(--teal)" }}>5</span>, Pro+: <span className="data" style={{ color: "var(--teal)" }}>unlimited</span>.</li>
              <li>Patterns measured, not interpreted. Recurrence surfaced. Meaning left to the user.</li>
            </ul>
          </div>
          <span className="redacted-label">Classified until launch</span>
        </Card>

        <Card title="Framing Radar™: Five-Axis Rhetorical Measurement">
          <p className="p" style={{ margin: "0 0 8px" }}>
            Maps rhetorical structure across five framing dimensions. Pentagon chart rendered per model.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Five axes: <span className="data" style={{ color: "var(--teal)" }}>Adversarial/Oppositional</span>, <span className="data" style={{ color: "var(--teal)" }}>Problem Identification</span>, <span className="data" style={{ color: "var(--teal)" }}>Commitment/Forward-Looking</span>, <span className="data" style={{ color: "var(--teal)" }}>Justification/Reactive</span>, <span className="data" style={{ color: "var(--teal)" }}>Imperative/Directive</span>.</li>
              <li>Each axis computed independently per AI model.</li>
              <li>Describes rhetorical structure, not moral character. A high Adversarial score means oppositional language, not that the speaker is wrong.</li>
              <li>Variance between models on the same axis is surfaced. If two models read &ldquo;Justification&rdquo; and one reads &ldquo;Commitment,&rdquo; you see all three.</li>
            </ul>
          </div>
          <span className="redacted-label">Classified until launch</span>
        </Card>

        <Card title="The Lens Lab™: Multi-Model Comparison">
          <p className="p" style={{ margin: "0 0 8px" }}>
            Every model&rsquo;s output displayed side-by-side. Consensus computed after. Disagreement displayed, not resolved.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Outputs include: primary framing classification, signal metrics, and contextual notes.</li>
              <li>Consensus layer identifies shared patterns. Variance layer identifies divergence.</li>
              <li>Agreement and disagreement are both first-class data.</li>
            </ul>
          </div>
          <span className="redacted-label">Classified until launch</span>
        </Card>

        <Card title="Provision Drift™: Semantic Distance Scoring">
          <p className="p" style={{ margin: "0 0 8px" }}>
            Measures how far each provision drifts from a bill&rsquo;s stated purpose. Scored <span className="data" style={{ color: "var(--teal)" }}>0-100</span>.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Each provision embedded and compared against the bill&rsquo;s title and purpose clause via semantic distance.</li>
              <li>Drift tiers: <span className="data" style={{ color: "var(--teal)" }}>Low (0-25)</span>, <span className="data" style={{ color: "var(--teal)" }}>Moderate (26-50)</span>, <span className="data" style={{ color: "var(--teal)" }}>High (51-75)</span>, <span className="data" style={{ color: "var(--teal)" }}>Very High (76-100)</span>.</li>
              <li>High-drift provisions surface riders, earmarks, and thematically unrelated amendments.</li>
              <li>Source links to original bill text always provided.</li>
            </ul>
          </div>
          <span className="redacted-label">Classified until launch</span>
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
          <p className="p" style={{ margin: "0 0 8px" }}>
            Four independent scores computed per statement by each AI model. Each scored <span className="data" style={{ color: "var(--teal)" }}>0-100</span>.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li><strong style={{ color: "var(--text)" }}>Repetition:</strong> How closely language mirrors the figure&rsquo;s prior statements on the same topic.</li>
              <li><strong style={{ color: "var(--text)" }}>Novelty:</strong> How much new language or framing the statement introduces versus established patterns.</li>
              <li><strong style={{ color: "var(--text)" }}>Affect:</strong> Rate of emotionally charged language. Intensity markers, urgency signals, sentiment-loaded phrasing.</li>
              <li><strong style={{ color: "var(--text)" }}>Entropy:</strong> Topical spread. Higher = multiple subjects. Lower = tight focus.</li>
              <li>No thresholds. No labels. No metric influences another.</li>
            </ul>
          </div>
          <span className="redacted-label">Classified until launch</span>
        </Card>

        <Card title="Consensus Convergence">
          <p className="p" style={{ margin: "0 0 8px" }}>
            How many models converge on similar measurements. Shown as a ratio.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Convergence ring shows proportion of agreement (e.g., <span className="data" style={{ color: "var(--teal)" }}>2/3</span> models aligned).</li>
              <li>Computed only after all models return independently.</li>
            </ul>
          </div>
          <span className="redacted-label">Classified until launch</span>
        </Card>

        <Card title="Variance Detection">
          <p className="p" style={{ margin: "0 0 8px" }}>
            When models produce significantly different results, a variance indicator appears.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Triggered when models diverge on primary framing classification or signal metric values.</li>
              <li>Variance banner displayed prominently. Not an error. Genuine measurement divergence.</li>
              <li>Disagreement surfaced as data. Never suppressed.</li>
            </ul>
          </div>
          <span className="redacted-label">Classified until launch</span>
        </Card>

        <Card title="Congressional Vote Record">
          <p className="p" style={{ margin: "0 0 8px" }}>
            Per-member, per-bill granularity across the full congressional record.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Every vote. Every member. Every bill. Displayed as recorded (teal) or not recorded (gray).</li>
              <li>Never color-coded by position. Neutrality is structural.</li>
              <li>Tracked separately from speech metrics. Voting behavior and rhetorical behavior are independent surfaces.</li>
            </ul>
          </div>
          <span className="redacted-label">Classified until launch</span>
        </Card>

        <Card title="Historical Trends">
          <p className="p" style={{ margin: "0 0 8px" }}>
            Tracks how a figure&rsquo;s language patterns shift over time.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Signal metrics, framing axes, and similarity scores plotted across statements over weeks, months, and sessions.</li>
              <li>Trends observed, not predicted. No forecasting.</li>
            </ul>
          </div>
          <span className="redacted-label">Classified until launch</span>
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
