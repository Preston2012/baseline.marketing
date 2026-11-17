"use client";

/** S1: The Wall - scrolling ticker of what Baseline measures.
 *  Each item names a real measurement in the app. No sample values. */

const TICKER_ITEMS = [
  "REPETITION \u00b7 0-100",
  "NOVELTY \u00b7 0-100",
  "AFFECT \u00b7 0-100",
  "ENTROPY \u00b7 0-100",
  "BASELINE \u00b7 24H ROLLING",
  "BASELINE DELTA \u00b7 VS 30-DAY MEAN",
  "CONSENSUS \u00b7 MODEL AGREEMENT",
  "VARIANCE \u00b7 FLAGGED WHEN MODELS DIVERGE",
  "PROVISION DRIFT \u00b7 DISTANCE FROM STATED PURPOSE",
  "FRAMING RADAR \u00b7 5 AXES",
  "MUTATION \u00b7 CHANGE BETWEEN BILL VERSIONS",
  "SPENDING SCOPE \u00b7 CBO AND EXTRACTED FIGURES",
];

/* Repeated once so the loop wraps without a gap */
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

      <div aria-hidden="true"
        style={{
          display: "flex",
          gap: 32,
          whiteSpace: "nowrap",
          animation: "wall-scroll 30s linear infinite",
          // decorative ticker
        }}
      >
        {ITEMS.map((item, i) => (
          <span
            key={i}
            className="data"
            style={{
              fontSize: 10,
              letterSpacing: "0.06em",
              color: "var(--teal-dim)",
              flexShrink: 0,
            }}
          >
            {item}
          </span>
        ))}
      </div>

      {/* Ghost reverse ticker: dimmer, slower, opposite direction */}
      <div aria-hidden="true"
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
              color: "var(--teal-dim)",
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
