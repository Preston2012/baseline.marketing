"use client";

import { useState } from "react";

type GalleryCard = {
  title: string;
  caption: string;
  imageSrc: string;
  imageAlt: string;
  description: string;
};

const GALLERY_CARDS: GalleryCard[] = [
  {
    title: "The Receipt™",
    caption: "Recurring patterns. Exposed over time.",
    imageSrc: "/gallery/B1_pattern_memory.webp",
    imageAlt: "The Receipt — pattern memory visualization",
    description: "A compact readout of recurring language patterns over time, with match counts shown by tier. Track how a figure's messaging evolves.",
  },
  {
    title: "Framing Radar™",
    caption: "Five dimensions. One surface.",
    imageSrc: "/gallery/B2_five_dimensions.webp",
    imageAlt: "Framing Radar — five-axis measurement",
    description: "A measurement surface for rhetorical structure across five framing dimensions. Each axis computed independently by each AI model.",
  },
  {
    title: "The Lens Lab™",
    caption: "Three lenses. One statement. You compare.",
    imageSrc: "/gallery/B3_three_lenses.webp",
    imageAlt: "The Lens Lab — multi-model comparison",
    description: "Side-by-side outputs from three AI systems, plus a separate consensus layer. Agreement surfaced. Disagreement surfaced.",
  },
  {
    title: "Signal Metrics",
    caption: "Four measurements. Zero opinions.",
    imageSrc: "/screens/A4_signal_metrics.webp",
    imageAlt: "Signal Metrics — four independent measurements",
    description: "Repetition, Novelty, Affect, Entropy — four independent measurements computed per statement. Displayed on a 0–100 scale with no thresholds.",
  },
  {
    title: "Provision Drift™",
    caption: "How far did it drift?",
    imageSrc: "/gallery/B4_distance.webp",
    imageAlt: "Provision Drift — semantic distance scoring",
    description: "Measures the semantic distance between individual provisions and a bill's stated purpose. Automated categorization, not evaluation.",
  },
  {
    title: "Consensus",
    caption: "Agreement surfaced. Disagreement surfaced.",
    imageSrc: "/gallery/B5_convergence.webp",
    imageAlt: "Consensus — model convergence visualization",
    description: "When models converge, you see it. When they diverge, you see that too. Computed after all three models return independent outputs.",
  },
];

function GalleryCardComponent({ card }: { card: GalleryCard }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => !expanded && setExpanded(true)}
      role="button"
      tabIndex={0}
      aria-label={expanded ? card.title : `Explore ${card.title}`}
      onKeyDown={(e) => { if (!expanded && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); setExpanded(true); } }}
      className="cardInteractive"
      style={{
        flex: "0 0 380px",
        scrollSnapAlign: "start",
        border: "2px solid rgba(45,212,191,0.15)",
        borderRadius: 14,
        overflow: "hidden",
        cursor: expanded ? "default" : "pointer",
        background: "#000",
        transition: "border-color 300ms ease-out",
      }}
    >
      {/* Teaser image */}
      <div style={{ height: 260, overflow: "hidden" }}>
        <img
          src={card.imageSrc}
          alt={card.imageAlt}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      {/* Card content */}
      <div style={{ padding: 16 }}>
        <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 16 }}>
          {card.title}
        </div>
        <div className="data" style={{ color: "var(--teal)", fontSize: 13, fontStyle: "italic", marginTop: 4 }}>
          {card.caption}
        </div>
        {!expanded && (
          <div className="data" style={{ color: "var(--sub)", fontSize: 11, marginTop: 8, opacity: 0.5 }}>
            ▸ Tap to explore
          </div>
        )}

        {/* Expanded detail */}
        <div
          style={{
            maxHeight: expanded ? 200 : 0,
            opacity: expanded ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 300ms ease-out, opacity 200ms ease-out 100ms",
          }}
        >
          <div style={{ borderTop: "2px solid rgba(45,212,191,0.1)", marginTop: 12, paddingTop: 12 }}>
            <p className="p" style={{ margin: 0 }}>{card.description}</p>
            <p className="small" style={{ marginTop: 10, marginBottom: 0, fontStyle: "italic", opacity: 0.6 }}>
              Observational analysis only. Not a fact-check.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductGallery() {
  return (
    <div>
      <span
        className="data"
        style={{
          color: "var(--teal)",
          fontSize: 13,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
        }}
      >
        Product Surfaces
      </span>

      <div style={{ height: 16 }} />

      {/* Horizontal scroll container */}
      <div
        style={{
          display: "flex",
          gap: 24,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          paddingBottom: 8,
        }}
        className="surface-gallery"
      >
        {GALLERY_CARDS.map((card) => (
          <GalleryCardComponent key={card.title} card={card} />
        ))}
      </div>

      <style>{`
        .surface-gallery::-webkit-scrollbar { display: none; }
        .surface-gallery { scrollbar-width: none; }
        @media (max-width: 767px) {
          .surface-gallery {
            flex-direction: column !important;
            overflow-x: visible !important;
            scroll-snap-type: none !important;
          }
          .surface-gallery > * {
            flex: 0 0 auto !important;
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
