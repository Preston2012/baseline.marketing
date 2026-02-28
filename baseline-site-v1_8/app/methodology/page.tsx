import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { Card } from "@/components/Card";
import { SurfaceWidgets, LayerWidgets } from "@/components/MethodologyWidgets";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "All AI models process identical input independently. Signal metrics, framing radar, semantic timelines, and consensus. All measured, never judged.",
  alternates: { canonical: `${site.url}/methodology/` },
  openGraph: {
    title: "How It Works | Baseline Methodology",
    description: "All AI models process identical input independently. Signal metrics, framing radar, semantic timelines, and consensus. All measured, never judged.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Baseline Methodology" }],
  },
};

export default function MethodologyPage() {
  return (
    <section className="section intel-dot-grid" aria-label="Methodology" style={{ position: 'relative' }}>
      {/* Registration dots */}
      <div aria-hidden="true" style={{ position: 'absolute', top: 8, left: 8, width: 3, height: 3, borderRadius: '50%', background: 'rgba(45,212,191,0.05)' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: 8, right: 8, width: 3, height: 3, borderRadius: '50%', background: 'rgba(45,212,191,0.05)' }} />

      <div className="classification-stamp" style={{ marginBottom: 8 }}>
        SIGINT-METHODOLOGY // UNCLASSIFIED // FOUO
      </div>

      <h1 className="h1" style={{ fontSize: 28 }}>Methodology</h1>

      <p className="p" style={{ color: "var(--text)", fontWeight: 600, marginTop: 12 }}>
        Observational analysis only. Not a fact-check.
      </p>

      <p className="p" style={{ maxWidth: 820 }}>
        Baseline™ is a measurement surface for public speech. A statement is captured from a verified public source,
        processed independently by multiple AI systems, and displayed side-by-side with source context. A separate
        consensus layer is computed after independent outputs are produced.
      </p>

      <div style={{ height: 24 }} />

      {/* ═══════════════════════════════════════════════════════
          SECTION 1: HOW IT WORKS
          ═══════════════════════════════════════════════════════ */}
      <span className="section-label">
        How It Works
      </span>

      <div className="grid" style={{ gap: 16 }}>
        <Card title="1) Input Normalization">
          <p className="p" style={{ margin: "0 0 8px" }}>
            Every statement enters the system the same way. One standardized input. Every model receives it identically.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Statement text captured with source link, timestamp, speaker identity, and context</li>
              <li>Input standardized to a single format before processing</li>
              <li>No preprocessing varies between models. Every model gets exactly the same input.</li>
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
              <li>Separation is structural, not optional. You always see the variance.</li>
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
              <li>Context presented as supporting information and links. Not editorial judgment.</li>
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
              <li>Any statement can be re-evaluated against its stored outputs.</li>
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

      <div style={{ height: 32, borderBottom: "2px solid var(--border_inactive)", position: "relative" }}>
        {/* Hash mark ruler */}
        <div aria-hidden="true" style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 1 }}>
          {Array.from({ length: 30 }).map((_, i) => {
            const t = i / 29;
            const centerDist = Math.abs(t - 0.5) * 2;
            const alpha = 0.03 + (1 - centerDist) * 0.07;
            return <div key={i} style={{ position: "absolute", left: `${t * 100}%`, bottom: 0, width: 1, height: i % 5 === 0 ? 5 : 2, background: `rgba(45,212,191,${alpha.toFixed(3)})` }} />;
          })}
        </div>
        {/* Classification stamp */}
        <div className="classification-stamp" style={{ position: "absolute", bottom: 4, right: 0 }}>
          SIGINT-METH-01 // UNCLASSIFIED
        </div>
      </div>
      <div style={{ height: 24 }} />

      {/* ═══════════════════════════════════════════════════════
          THE METRIC
          ═══════════════════════════════════════════════════════ */}
      <span className="section-label">
        The Metric
      </span>

      <Card title="Baseline™: 24-Hour Rolling Aggregate">
        <p className="p" style={{ margin: "0 0 8px" }}>
          The figure-level brand metric. A single score representing overall signal activity across the trailing 24-hour window.
        </p>
        <div className="redacted">
          <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
            <li>Computed as a rolling average of signal activity per figure over the most recent 24 hours.</li>
            <li>Displayed on feed cards and figure profiles. Provides at-a-glance signal read without drilling into individual statements.</li>
            <li>Baseline Delta measures deviation from the rolling average: positive = elevated, negative = below typical, zero = on baseline.</li>
            <li>Updated continuously. Not a rating, not an opinion. A measurement of how active and how varied the signal is.</li>
          </ul>
        </div>
        <span className="redacted-label">Classified until launch</span>
      </Card>

      <div style={{ height: 24 }} />

      {/* ═══════════════════════════════════════════════════════
          SECTION 2: PROPRIETARY MEASUREMENT SURFACES
          ═══════════════════════════════════════════════════════ */}
      <span className="section-label">
        Proprietary Measurement Surfaces
      </span>

      <div className="grid" style={{ gap: 16 }}>
        <Card title="The Receipt™: Statement Exhibit">
          <p className="p" style={{ margin: "0 0 8px" }}>
            Surfaces past statements by the same figure on the same topic, ranked by semantic similarity.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Each statement is compared against everything the figure has previously said on that topic.</li>
              <li>Match strength scored <span className="data" style={{ color: "var(--teal)" }}>0.0-1.0</span> (semantic similarity). Tiers: Very High (&ge;0.90), High (&ge;0.75), Moderate (&ge;0.60), Low (&lt;0.60).</li>
              <li>Match limits vary by tier. Core: <span className="data" style={{ color: "var(--teal)" }}>3</span>, Pro: <span className="data" style={{ color: "var(--teal)" }}>5</span>, Pro+: <span className="data" style={{ color: "var(--teal)" }}>unlimited</span>.</li>
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
              <li>Variance between models on the same axis is shown. If models disagree on &ldquo;Justification&rdquo; vs &ldquo;Commitment,&rdquo; you see each one.</li>
            </ul>
          </div>
          <span className="redacted-label">Classified until launch</span>
        </Card>

        <Card title="Lens Lab™: Multi-Model Comparison">
          <p className="p" style={{ margin: "0 0 8px" }}>
            Every model&rsquo;s output displayed side-by-side. Consensus computed after. Disagreement displayed, not resolved.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Outputs include: primary framing classification, signal metrics, and contextual notes.</li>
              <li>Consensus layer identifies shared patterns. Variance layer identifies divergence.</li>
              <li>Agreement and disagreement are both treated as signal.</li>
            </ul>
          </div>
          <span className="redacted-label">Classified until launch</span>
        </Card>

        <Card title="Provision Drift™: Semantic Distance Scoring">
          <p className="p" style={{ margin: "0 0 4px" }}>
            Measures how far each provision drifts from a bill&rsquo;s stated purpose.
          </p>
          <p className="p" style={{ margin: "0 0 8px", fontStyle: "italic", opacity: 0.7 }}>
            Scored <span className="data" style={{ color: "var(--teal)" }}>0-100</span>.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Each provision measured against the bill&rsquo;s title and purpose clause by semantic distance.</li>
              <li>Drift tiers: <span className="data" style={{ color: "var(--teal)" }}>Low (0-25)</span>, <span className="data" style={{ color: "var(--teal)" }}>Moderate (26-50)</span>, <span className="data" style={{ color: "var(--teal)" }}>High (51-75)</span>, <span className="data" style={{ color: "var(--teal)" }}>Very High (76-100)</span>.</li>
              <li>High-drift provisions surface riders, earmarks, and thematically distant amendments.</li>
              <li>Source links to original bill text always provided.</li>
            </ul>
          </div>
          <span className="redacted-label">Classified until launch</span>
        </Card>

        <Card title="Crossfire™: Side-by-Side Figure Comparison">
          <p className="p" style={{ margin: "0 0 8px" }}>
            Two figures on the same topic, same surface. Direct framing comparison without editorial selection.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Shared-topic matching via semantic overlap on the same legislative or policy subject.</li>
              <li>Framing differences presented side-by-side. No &ldquo;winner&rdquo; declared.</li>
            </ul>
          </div>
          <span className="redacted-label">Classified until launch</span>
        </Card>

        <Card title="Signal Pulse™: Activity Signal">
          <p className="p" style={{ margin: "0 0 8px" }}>
            Pulsing avatar ring on feed cards and figure profiles indicating recent signal activity level.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Driven by statement volume and signal variance in the trailing window.</li>
              <li>Visual-only. No analysis required to read it.</li>
            </ul>
          </div>
          <span className="redacted-label">Classified until launch</span>
        </Card>

        <Card title="Framing Fingerprint™: Rhetorical Identity">
          <p className="p" style={{ margin: "0 0 8px" }}>
            Aggregate framing tendencies rendered as a unique visual signature per figure.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Computed from historical Framing Radar&trade; axis averages.</li>
              <li>Each figure&rsquo;s fingerprint is distinct and evolves over time.</li>
            </ul>
          </div>
          <span className="redacted-label">Classified until launch</span>
        </Card>

        <Card title="Constellation Nav™: Data-Infused Navigation">
          <p className="p" style={{ margin: "0 0 8px" }}>
            Dot-based navigation between figures, topics, and framing patterns. Each node sized and colored by activity.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Connections mapped from shared topics and framing similarity.</li>
              <li>Navigation, not analysis. Explore, don&rsquo;t interpret.</li>
            </ul>
          </div>
          <span className="redacted-label">Classified until launch</span>
        </Card>

        <Card title="Split Microscope™: Variance Strip">
          <p className="p" style={{ margin: "0 0 8px" }}>
            Detailed variance breakdown inside Lens Lab&trade; when independent systems disagree.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Highlights the specific words, phrases, and axis scores where models diverge.</li>
              <li>Disagreement is data. Shown in detail.</li>
            </ul>
          </div>
          <span className="redacted-label">Classified until launch</span>
        </Card>

        <Card title="Intersections Panel™: Cross-Link Chips">
          <p className="p" style={{ margin: "0 0 8px" }}>
            Shows shared framing and topic overlaps across figures and time on Statement Detail.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Links statements by topic, framing signature, and timing.</li>
              <li>Tappable chips navigate to related statements.</li>
            </ul>
          </div>
          <span className="redacted-label">Classified until launch</span>
        </Card>

        <Card title="Declassified Dossier™: Exhibit Plate Profile">
          <p className="p" style={{ margin: "0 0 8px" }}>
            Complete analytical profile for a single figure. Every measurement surface consolidated into one view.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Aggregates The Receipt&trade; history, Framing Radar&trade; averages, signal trends, and vote record.</li>
              <li>Exhibit plate format: museum-grade presentation of longitudinal data.</li>
            </ul>
          </div>
          <span className="redacted-label">Classified until launch</span>
        </Card>

        <Card title="Narrative Sync™: Cross-Figure Framing Convergence">
          <p className="p" style={{ margin: "0 0 8px" }}>
            Detects when independent figures begin using similar framing simultaneously. B2B exclusive.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Measures framing similarity across figures within defined time windows.</li>
              <li>Convergence presented as a signal. Causation is not implied.</li>
            </ul>
          </div>
          <span className="redacted-label">Classified until launch</span>
        </Card>
      </div>

      <SurfaceWidgets />

      <div style={{ height: 32, borderBottom: "2px solid var(--border_inactive)", position: "relative" }}>
        <div aria-hidden="true" style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 1 }}>
          {Array.from({ length: 30 }).map((_, i) => {
            const t = i / 29;
            const centerDist = Math.abs(t - 0.5) * 2;
            const alpha = 0.03 + (1 - centerDist) * 0.07;
            return <div key={i} style={{ position: "absolute", left: `${t * 100}%`, bottom: 0, width: 1, height: i % 5 === 0 ? 5 : 2, background: `rgba(45,212,191,${alpha.toFixed(3)})` }} />;
          })}
        </div>
        <div className="classification-stamp" style={{ position: "absolute", bottom: 4, right: 0 }}>
          SIGINT-METH-02 // SURFACES
        </div>
      </div>
      <div style={{ height: 24 }} />

      {/* ═══════════════════════════════════════════════════════
          SECTION 3: MEASUREMENT LAYERS
          ═══════════════════════════════════════════════════════ */}
      <span className="section-label">
        Measurement Layers
      </span>

      <div className="grid" style={{ gap: 16 }}>
        <Card title="Signal Metrics">
          <p className="p" style={{ margin: "0 0 4px" }}>
            Four independent scores computed per statement by each AI model.
          </p>
          <p className="p" style={{ margin: "0 0 8px", fontStyle: "italic", opacity: 0.7 }}>
            Each scored <span className="data" style={{ color: "var(--teal)" }}>0-100</span>.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li><strong style={{ color: "var(--text)" }}>Repetition:</strong> How closely language mirrors the figure&rsquo;s prior statements on the same topic.</li>
              <li><strong style={{ color: "var(--text)" }}>Novelty:</strong> How much new language or framing the statement introduces versus established patterns.</li>
              <li><strong style={{ color: "var(--text)" }}>Affect:</strong> Rate of emotionally charged language. Intensity markers, urgency signals, sentiment-loaded phrasing.</li>
              <li><strong style={{ color: "var(--text)" }}>Entropy:</strong> Topical spread. Higher = multiple subjects. Lower = tight focus.</li>
            </ul>
          </div>
          <span className="redacted-label">Classified until launch</span>
        </Card>

        <Card title="Baseline Delta">
          <p className="p" style={{ margin: "0 0 8px" }}>
            How far a statement&rsquo;s signal metrics deviate from the figure&rsquo;s historical average.
          </p>
          <div className="redacted">
            <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
              <li>Each metric measured against the figure&rsquo;s own rolling average.</li>
              <li>Positive means elevated signal. Negative means below typical. Zero means on baseline.</li>
              <li>Measures shift, not position. A high Affect score is context. A high Affect delta is signal.</li>
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
              <li>Disagreement displayed as data. Never suppressed.</li>
            </ul>
          </div>
          <span className="redacted-label">Classified until launch</span>
        </Card>

        <Card title="Congressional Vote Record">
          <p className="p" style={{ margin: "0 0 8px" }}>
            Per-member, per-bill detail across the full congressional record.
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

      <LayerWidgets />

      <div style={{ height: 18 }} />

      <p className="p">
        This methodology page is a high-level description of the measurement surfaces. Specific feature limits and
        subscription details are listed on the <Link href="/pricing/">Pricing</Link> page.
      </p>
    </section>
  );
}
