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

      {/* Audit fix: disclaimer immediately after H1, before any other content */}
      <p className="p" style={{ color: "var(--text)", fontWeight: 600, marginTop: 12 }}>
        Observational analysis only. Not a fact-check.
      </p>

      <p className="p" style={{ maxWidth: 820 }}>
        Baseline is a measurement surface for public speech. A statement is captured from a verified public source,
        processed independently by three AI systems, and displayed side-by-side with source context. A separate
        consensus layer is computed after independent outputs are produced and displayed.
      </p>

      <div
        style={{
          borderRadius: 14,
          border: "2px solid var(--border_inactive)",
          overflow: "hidden",
          background: "rgba(12,26,35,0.55)"
        }}
      >
        {/* Audit fix: aria-describedby for pipeline diagram accessibility */}
        <img
          src="/screens/pipeline_diagram.png"
          alt="Baseline pipeline diagram"
          loading="lazy"
          aria-describedby="pipeline-desc"
        />
      </div>

      {/* Visually hidden text description for screen readers */}
      <p
        id="pipeline-desc"
        style={{ position: "absolute", left: -9999, top: "auto", width: 1, height: 1, overflow: "hidden" }}
      >
        Diagram summary: statement input is captured with source and context, normalized, processed independently
        by three systems, displayed side-by-side, then a separate consensus layer is computed and stored as an
        append-only artifact.
      </p>

      <div style={{ height: 18 }} />

      {/* Audit fix: gap 16px (was 12px) */}
      <div className="grid" style={{ gap: 16 }}>
        <Card title="1) Input normalization">
          <p className="p" style={{ margin: 0 }}>
            The system captures the statement text plus metadata (source link, timestamps, figure identity, and context
            pointers). The input text passed to analysis systems is normalized to a single canonical string, so each
            system receives identical input.
          </p>
        </Card>

        <Card title="2) Independent processing (parallel)">
          <p className="p" style={{ margin: 0 }}>
            Three AI systems process the statement independently. Outputs are never combined before display. This
            preserves separation between lenses and makes variance observable. No manual rewriting is applied to model
            outputs.
          </p>
        </Card>

        <Card title="3) Display: side-by-side + context">
          <p className="p" style={{ margin: 0 }}>
            The app displays system outputs side-by-side, with sources and context visible. Context is presented as
            supporting metadata and links, not as editorial judgment.
          </p>
        </Card>

        <Card title="4) Consensus layer (computed separately)">
          <p className="p" style={{ margin: 0 }}>
            After independent outputs exist, a consensus layer is computed as a separate surface. Consensus summarizes
            shared patterns and highlights variance, without overriding individual outputs.
          </p>
        </Card>

        <Card title="Framing Radar™ (five axes)">
          <p className="p" style={{ margin: 0 }}>
            Baseline includes a framing measurement surface across five axes:
            Adversarial/Oppositional, Problem Identification, Commitment/Forward-Looking, Justification/Reactive, and
            Imperative/Directive. These axes describe rhetorical structure, not moral character.
          </p>
        </Card>

        <Card title="Append-only records and traceability">
          <p className="p" style={{ margin: 0 }}>
            Baseline artifacts are designed to be immutable once written: the system stores inputs, outputs, and
            consensus as append-only records. This supports reproducibility and auditability over time.
          </p>
        </Card>

        <Card title="Sources and context handling">
          <p className="p" style={{ margin: 0 }}>
            Sources are presented as URLs to public records or verified platforms. The system does not replace source
            reading; it preserves the path back to origin for verification by the user.
          </p>
        </Card>

        <Card title="Provision Drift™ (semantic distance)">
          <p className="p" style={{ margin: 0 }}>
            Provision Drift™ measures the semantic distance between individual provisions and a bill&rsquo;s stated
            purpose. Each provision is scored on a 0&ndash;100 scale: 0&ndash;25 Low, 26&ndash;50 Moderate,
            51&ndash;75 High, 76&ndash;100 Very High. This is automated categorization only &mdash; not an
            evaluation of legislative quality. Source links to original bill text are always provided.
          </p>
        </Card>
      </div>

      <div style={{ height: 18 }} />

      <p className="p">
        This methodology page is a high-level description of the measurement surfaces. Specific feature limits and
        subscription details are listed on the Pricing page.
      </p>
    </section>
  );
}
