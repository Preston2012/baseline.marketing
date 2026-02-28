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
      className="scanline-ghost intel-dot-grid"
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
      {/* Registration dots */}
      <div style={{ position: 'absolute', top: 4, left: 4, width: 3, height: 3, borderRadius: '50%', background: 'rgba(45,212,191,0.05)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 4, right: 4, width: 3, height: 3, borderRadius: '50%', background: 'rgba(45,212,191,0.05)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 4, left: 4, width: 3, height: 3, borderRadius: '50%', background: 'rgba(45,212,191,0.05)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 4, right: 4, width: 3, height: 3, borderRadius: '50%', background: 'rgba(45,212,191,0.05)', pointerEvents: 'none' }} />
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

      {/* Ghost reverse ticker: dimmer, slower, opposite direction */}
      <div
        style={{
          display: "flex",
          gap: 40,
          whiteSpace: "nowrap",
          animation: "wall-scroll-reverse 45s linear infinite",
          marginTop: 4,
        }}
      >
        {ITEMS.map((item, i) => (
          <span
            key={`g-${i}`}
            className="data"
            style={{
              fontSize: 8,
              letterSpacing: "0.08em",
              color: "rgba(45, 212, 191, 0.07)",
              flexShrink: 0,
            }}
          >
            {item}
          </span>
        ))}
      </div>

      {/* Circuit pulse nodes: 3 evenly spaced */}
      {[25, 50, 75].map(pct => (
        <div key={pct} aria-hidden="true" style={{
          position: 'absolute', left: `${pct}%`, top: '50%', width: 4, height: 4,
          borderRadius: '50%', background: 'rgba(45,212,191,0.06)',
          transform: 'translate(-50%, -50%)',
          animation: 'circuit-pulse 4s ease-in-out infinite',
          animationDelay: `${(pct - 25) * 30}ms`,
          pointerEvents: 'none',
        }} />
      ))}

      <style>{`
        @keyframes wall-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes wall-scroll-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @keyframes circuit-pulse {
          0%, 100% { opacity: 0.04; }
          50% { opacity: 0.15; }
        }
      `}</style>
    </div>
  );
}
