"use client";

/** S1: The Wall — scrolling redacted data ticker.
 *  Pre-launch: atmospheric redacted data flowing past.
 *  Post-launch: replace with real aggregated stats. */

const TICKER_ITEMS = [
  "SEMANTIC_SIMILARITY: ████",
  "FRAMING_AXIS_3: ████",
  "NOVELTY_SCORE: ██.█",
  "AFFECT_DELTA: ████",
  "CONSENSUS: █/█",
  "ENTROPY: ██.██",
  "REPETITION_INDEX: ████",
  "PROVISION_DRIFT: ██.█σ",
  "RHETORICAL_VELOCITY: ████",
  "MODEL_VARIANCE: ████",
  "STATEMENT_COUNT: ████",
  "CONVERGENCE_RATIO: █.██",
];

/* Duplicate for seamless loop */
const ITEMS = [...TICKER_ITEMS, ...TICKER_ITEMS];

export function TheWall() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: "100%",
        overflow: "hidden",
        borderTop: "1px solid rgba(45, 212, 191, 0.08)",
        borderBottom: "1px solid rgba(45, 212, 191, 0.08)",
        padding: "10px 0",
        background: "rgba(0, 0, 0, 0.4)",
        position: "relative",
      }}
    >
      {/* Left/right fade masks */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 60,
          background: "linear-gradient(90deg, var(--bg), transparent)",
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 60,
          background: "linear-gradient(270deg, var(--bg), transparent)",
          zIndex: 1,
        }}
      />

      <div
        style={{
          display: "flex",
          gap: 32,
          whiteSpace: "nowrap",
          animation: "wall-scroll 30s linear infinite",
        }}
      >
        {ITEMS.map((item, i) => (
          <span
            key={i}
            className="data"
            style={{
              fontSize: 10,
              letterSpacing: "0.06em",
              color: "rgba(45, 212, 191, 0.2)",
              flexShrink: 0,
            }}
          >
            {item}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes wall-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
