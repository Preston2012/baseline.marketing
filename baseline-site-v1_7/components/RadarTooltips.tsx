"use client";

import { useState } from "react";

const AXES = [
  {
    name: "Economic",
    short: "Economic",
    desc: "Fiscal language, market framing, cost-benefit positioning.",
  },
  {
    name: "Procedural",
    short: "Procedural",
    desc: "Process-oriented language, institutional mechanics, governance framing.",
  },
  {
    name: "Constitutional",
    short: "Constitutional",
    desc: "Rights-based framing, legal precedent, foundational principles.",
  },
  {
    name: "Personal",
    short: "Personal",
    desc: "Identity-driven language, individual narratives, emotional appeals.",
  },
  {
    name: "Security",
    short: "Security",
    desc: "Threat framing, safety language, defense and protection rhetoric.",
  },
];

/** I15: Interactive pentagon with hover tooltips on each axis.
 *  Pure CSS tooltips — no external dependencies. */
export function RadarTooltips() {
  const [active, setActive] = useState<number | null>(null);

  /* Pentagon geometry — 5 points around a center */
  const cx = 140,
    cy = 140,
    r = 100;
  const points = AXES.map((_, i) => {
    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  });

  const labelOffset = 28;
  const labelPoints = AXES.map((_, i) => {
    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    return {
      x: cx + (r + labelOffset) * Math.cos(angle),
      y: cy + (r + labelOffset) * Math.sin(angle),
    };
  });

  const polyStr = points.map((p) => `${p.x},${p.y}`).join(" ");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        margin: "16px 0",
      }}
    >
      <svg
        viewBox="0 0 280 280"
        width={280}
        height={280}
        style={{ overflow: "visible" }}
        aria-label="Framing Radar five-axis pentagon"
      >
        {/* Background pentagon outline */}
        <polygon
          points={polyStr}
          fill="none"
          stroke="rgba(45,212,191,0.15)"
          strokeWidth={1}
        />

        {/* Axis lines from center */}
        {points.map((p, i) => (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke="rgba(45,212,191,0.08)"
            strokeWidth={1}
          />
        ))}

        {/* Vertex dots + labels */}
        {points.map((p, i) => (
          <g
            key={i}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onClick={() => setActive(active === i ? null : i)}
            style={{ cursor: "pointer" }}
          >
            <circle
              cx={p.x}
              cy={p.y}
              r={active === i ? 6 : 4}
              fill={active === i ? "#2dd4bf" : "rgba(45,212,191,0.5)"}
              style={{ transition: "all 150ms" }}
            />
            <text
              x={labelPoints[i].x}
              y={labelPoints[i].y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill={active === i ? "#2dd4bf" : "rgba(182,198,214,0.6)"}
              fontSize={11}
              fontFamily="var(--font-jetbrains, monospace), monospace"
              fontWeight={500}
              style={{ transition: "fill 150ms" }}
            >
              {AXES[i].short}
            </text>
          </g>
        ))}
      </svg>

      {/* Tooltip card */}
      <div
        style={{
          minHeight: 48,
          textAlign: "center",
          maxWidth: 300,
          opacity: active !== null ? 1 : 0,
          transform: active !== null ? "translateY(0)" : "translateY(4px)",
          transition: "opacity 200ms, transform 200ms",
        }}
      >
        {active !== null && (
          <>
            <div
              className="data"
              style={{
                color: "var(--teal)",
                fontSize: 12,
                letterSpacing: "0.08em",
                marginBottom: 4,
              }}
            >
              {AXES[active].name}
            </div>
            <div className="small" style={{ opacity: 0.7 }}>
              {AXES[active].desc}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
