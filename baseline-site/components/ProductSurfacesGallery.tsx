"use client";

import { useState } from "react";

type Surface = {
  title: string;
  caption: string;
  image: string;
  description: string;
};

const SURFACES: Surface[] = [
  {
    title: "The Receipt™",
    caption: "Recurring patterns. Exposed over time.",
    image: "/gallery/B1_pattern_memory.webp",
    description:
      "A semantic timeline tracking recurring language patterns. Match counts displayed by tier. Patterns measured — never interpreted.",
  },
  {
    title: "Framing Radar™",
    caption: "Five dimensions. One surface.",
    image: "/gallery/B2_five_dimensions.webp",
    description:
      "Pentagon chart measuring five rhetorical framing dimensions. Each axis computed independently by each AI model. Variance surfaced when models disagree.",
  },
  {
    title: "The Lens Lab™",
    caption: "Three lenses. One statement. You compare.",
    image: "/gallery/B3_three_lenses.webp",
    description:
      "Side-by-side outputs from three independent AI models. Consensus computed after all models return. No model sees another\u2019s output.",
  },
  {
    title: "Signal Metrics",
    caption: "Four measurements. Zero opinions.",
    image: "/screens/A4_signal_metrics.webp",
    description:
      "Repetition, Novelty, Affect, and Entropy — each scored 0\u2013100 with no thresholds. Every metric independent. No metric influences another.",
  },
  {
    title: "Provision Drift™",
    caption: "How far did it drift?",
    image: "/gallery/B4_distance.webp",
    description:
      "Measures semantic distance between individual provisions and a bill\u2019s stated purpose. Scored on a 0\u2013100 scale. Automated categorization — not evaluation.",
  },
  {
    title: "Consensus",
    caption: "Agreement surfaced. Disagreement surfaced.",
    image: "/gallery/B5_convergence.webp",
    description:
      "Shows model convergence on similar measurements. Disagreement triggers variance detection, not suppression. Computed after all models return independently.",
  },
];

function SurfaceCard({ surface }: { surface: Surface }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => !expanded && setExpanded(true)}
      style={{
        flex: "0 0 400px",
        scrollSnapAlign: "start",
        border: "2px solid rgba(45, 212, 191, 0.15)",
        borderRadius: 14,
        overflow: "hidden",
        cursor: expanded ? "default" : "pointer",
        transition: "border-color 300ms ease-out",
        background: "#000",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(45, 212, 191, 0.25)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(45, 212, 191, 0.15)";
      }}
    >
      {/* Teaser image */}
      <div style={{ height: expanded ? "auto" : "65%", overflow: "hidden", background: "#0c1a23" }}>
        <img
          src={surface.image}
          alt={`${surface.title} teaser`}
          loading="lazy"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* Card footer */}
      <div style={{ padding: 16 }}>
        <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 16, marginBottom: 4 }}>
          {surface.title}
        </div>
        <div
          className="data"
          style={{ color: "var(--teal)", fontSize: 13, fontStyle: "italic", marginBottom: 4 }}
        >
          &ldquo;{surface.caption}&rdquo;
        </div>
        {!expanded && (
          <div className="data" style={{ color: "var(--sub)", fontSize: 11, opacity: 0.5 }}>
            ▸ Tap to explore
          </div>
        )}

        {/* Expanded detail */}
        <div
          style={{
            maxHeight: expanded ? 300 : 0,
            opacity: expanded ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 300ms ease-out, opacity 200ms ease-out 100ms",
          }}
        >
          <div
            style={{
              borderTop: "2px solid rgba(45, 212, 191, 0.1)",
              marginTop: 8,
              paddingTop: 8,
            }}
          >
            <p className="p" style={{ margin: "0 0 8px" }}>{surface.description}</p>
            <div
              className="small"
              style={{ opacity: 0.6, fontStyle: "italic" }}
            >
              Observational analysis only. Not a fact-check.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductSurfacesGallery() {
  return (
    <section className="section" aria-label="Product surfaces gallery">
      <span
        className="data"
        style={{
          color: "var(--teal)",
          fontSize: 12,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          display: "block",
          marginBottom: 16,
        }}
      >
        PRODUCT SURFACES
      </span>

      {/* Desktop: horizontal scroll */}
      <div className="surface-gallery">
        {SURFACES.map((s) => (
          <SurfaceCard key={s.title} surface={s} />
        ))}
      </div>

      <style>{`
        .surface-gallery {
          display: flex;
          gap: 24px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding-bottom: 4px;
        }
        .surface-gallery::-webkit-scrollbar { display: none; }

        @media (max-width: 767px) {
          .surface-gallery {
            flex-direction: column;
            overflow-x: visible;
            scroll-snap-type: none;
          }
          .surface-gallery > div {
            flex: 0 0 auto !important;
            width: 100% !important;
          }
        }

        @media (min-width: 768px) and (max-width: 1024px) {
          .surface-gallery > div {
            flex: 0 0 340px !important;
          }
        }
      `}</style>
    </section>
  );
}
