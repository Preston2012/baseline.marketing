"use client";

import { useState } from "react";

type Surface = {
  title: string;
  caption: string;
  image: string;
  placard: string;
};

const SURFACES: Surface[] = [
  {
    title: "The Receipt™",
    caption: "Pattern memory for public speech.",
    image: "/gallery/B1_pattern_memory.webp",
    placard: "Semantic timeline. Recurring language tracked across every statement. Match counts by tier.",
  },
  {
    title: "Framing Radar™",
    caption: "Five axes. One pentagon. Every model.",
    image: "/gallery/B2_five_dimensions.webp",
    placard: "Rhetorical structure measured across five dimensions. Each axis computed independently per model.",
  },
  {
    title: "The Lens Lab™",
    caption: "Three systems. Side by side. You decide.",
    image: "/gallery/B3_three_lenses.webp",
    placard: "Independent outputs displayed together. Consensus computed after. No model sees another.",
  },
  {
    title: "Provision Drift™",
    caption: "Semantic distance. Scored.",
    image: "/gallery/B4_distance.webp",
    placard: "Measures how far each provision drifts from a bill\u2019s stated purpose. Categorized, not judged.",
  },
  {
    title: "Consensus",
    caption: "Convergence is computed. Not curated.",
    image: "/gallery/B5_convergence.webp",
    placard: "Models agree, you see it. Models disagree, you see that too. Variance detected, never suppressed.",
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
          style={{ color: "var(--teal)", fontSize: 13, marginBottom: 4 }}
        >
          <span>{surface.caption}</span>
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
            <p className="p redacted" style={{ margin: 0, fontWeight: 500 }}>{surface.placard}</p>
            <span className="redacted-label">Classified until launch</span>
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

      {/* Section-level disclaimer */}
      <div
        className="small"
        style={{ opacity: 0.5, fontStyle: "italic", marginTop: 16, textAlign: "center" }}
      >
        Observational analysis only. Not a fact-check.
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
