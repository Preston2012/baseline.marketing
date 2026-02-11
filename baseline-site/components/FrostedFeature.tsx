"use client";

import { useState } from "react";

type Feature = {
  title: string;
  tagline: string;
  image: string;
  details: string[];
};

const FEATURES: Feature[] = [
  {
    title: "The Receipt™",
    tagline: "Recurring patterns. Measured over time.",
    image: "/screens/A1_receipt_timeline.webp",
    details: [
      "Tracks recurring language patterns across statements over time.",
      "Patterns are measured, not interpreted. You decide what they mean.",
    ],
  },
  {
    title: "Framing Radar™",
    tagline: "Five dimensions. One surface.",
    image: "/screens/A2_framing_radar_5axis.webp",
    details: [
      "Each axis computed independently per AI model.",
      "Variance between models is surfaced, not hidden.",
    ],
  },
  {
    title: "The Lens Lab™",
    tagline: "Three lenses. One statement. You compare.",
    image: "/screens/A3_lens_lab.webp",
    details: [
      "Side-by-side outputs from independent AI models.",
      "No model sees another\u2019s output.",
    ],
  },
  {
    title: "Provision Drift™",
    tagline: "How far did it drift?",
    image: "/screens/A5_provision_drift.webp",
    details: [
      "Measures semantic distance between provisions and a bill\u2019s stated purpose.",
    ],
  },
];

function FrostedCard({ feature }: { feature: Feature }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <div
      onClick={() => !revealed && setRevealed(true)}
      style={{
        background: "var(--card)",
        border: "2px solid rgba(45, 212, 191, 0.15)",
        borderRadius: 14,
        overflow: "hidden",
        cursor: revealed ? "default" : "pointer",
        transition: "border-color 300ms ease-out",
      }}
      onMouseEnter={(e) => {
        if (!revealed) (e.currentTarget as HTMLElement).style.borderColor = "rgba(45, 212, 191, 0.25)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(45, 212, 191, 0.15)";
      }}
    >
      {/* Image container with frost overlay */}
      <div style={{ position: "relative", overflow: "hidden", minHeight: 200, background: "#0c1a23" }}>
        <img
          src={feature.image}
          alt={`${feature.title} measurement surface`}
          loading="lazy"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            transition: "filter 400ms ease-out",
            filter: revealed ? "none" : "blur(12px) brightness(0.7)",
          }}
        />
        {/* Frost overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0, 0, 0, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: revealed ? 0 : 1,
            pointerEvents: revealed ? "none" : "auto",
            transition: "opacity 400ms ease-out",
          }}
        >
          <span
            className="data"
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: 14,
              letterSpacing: "0.05em",
            }}
          >
            Tap to reveal
          </span>
        </div>

        {/* Teal breathe border */}
        {!revealed && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              border: "2px solid rgba(45, 212, 191, 0.03)",
              borderRadius: 12,
              animation: "frost-breathe 3s ease-in-out infinite",
              pointerEvents: "none",
            }}
          />
        )}
      </div>

      {/* Text content */}
      <div style={{ padding: 16 }}>
        <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 16, marginBottom: 4 }}>
          {feature.title}
        </div>
        <div
          className="data"
          style={{
            color: "var(--teal)",
            fontSize: 13,
            marginBottom: revealed ? 12 : 0,
          }}
        >
          <span>{feature.tagline}</span>
        </div>

        {/* Expanded details */}
        <div
          style={{
            maxHeight: revealed ? 300 : 0,
            opacity: revealed ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 400ms ease-out, opacity 300ms ease-out 100ms",
          }}
        >
          <ul className="p redacted" style={{ margin: "8px 0 0", paddingLeft: 18 }}>
            {feature.details.map((d) => (
              <li key={d} style={{ marginBottom: 4 }}>{d}</li>
            ))}
          </ul>
          <span className="redacted-label">Classified until launch</span>
        </div>
      </div>
    </div>
  );
}

export function FrostedFeatures() {
  return (
    <section className="section" aria-label="Feature discovery">
      <span
        className="data"
        style={{
          color: "var(--teal)",
          fontSize: 11,
          letterSpacing: 2,
          textTransform: "uppercase",
          display: "block",
          marginBottom: 12,
        }}
      >
        Feature Surfaces
      </span>

      <div className="grid grid_2">
        {FEATURES.map((f) => (
          <FrostedCard key={f.title} feature={f} />
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
        @keyframes frost-breathe {
          0%, 100% { border-color: rgba(45, 212, 191, 0.03); }
          50% { border-color: rgba(45, 212, 191, 0.08); }
        }
      `}</style>
    </section>
  );
}
