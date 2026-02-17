'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/* ─────────────────────────────────────────────────────────
   LIVE WIDGETS — Interactive demos replacing static screenshots
   ─────────────────────────────────────────────────────────
   1. FramingRadarDemo   — 5-axis pentagon, 3 model overlays
   2. SignalPulseDemo    — Activity bars with breathing anim
   3. ConsensusBadgeDemo — Convergence ring + ratio
   ───────────────────────────────────────────────────────── */

// ── Shared constants ──
const TEAL = '#2dd4bf';
const TEAL_20 = 'rgba(45,212,191,0.2)';
const TEAL_08 = 'rgba(45,212,191,0.08)';
const AMBER = '#d4a72d';
const GUNMETAL = '#3a4a56';
const CARD_BG = '#0c1a23';
const MODEL_COLORS = [
  'rgba(45, 212, 191, 0.7)',   // GP-1 teal
  'rgba(120, 180, 255, 0.6)',  // GP-2 blue
  'rgba(200, 160, 255, 0.5)',  // GP-3 violet
];
const MODEL_LABELS = ['GP-1', 'GP-2', 'GP-3'];

// ── Utility: pentagon point ──
function pentagonPoint(cx: number, cy: number, r: number, index: number): [number, number] {
  const angle = (Math.PI * 2 * index) / 5 - Math.PI / 2;
  return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
}

function pentagonPath(cx: number, cy: number, values: number[], maxR: number): string {
  return values
    .map((v, i) => {
      const [x, y] = pentagonPoint(cx, cy, (v / 100) * maxR, i);
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ') + ' Z';
}

// ═══════════════════════════════════════════
// 1. FRAMING RADAR™ DEMO
// ═══════════════════════════════════════════
const RADAR_AXES = ['Adversarial', 'Problem ID', 'Commitment', 'Justification', 'Imperative'];

const RADAR_MODELS = [
  [78, 42, 65, 31, 58],  // GP-1
  [72, 48, 60, 35, 62],  // GP-2
  [82, 38, 58, 28, 54],  // GP-3
];
const RADAR_CONSENSUS = [77, 43, 61, 31, 58];

export function FramingRadarDemo() {
  const [animProgress, setAnimProgress] = useState(0);
  const [hoveredModel, setHoveredModel] = useState<number | null>(null);
  const [hoveredAxis, setHoveredAxis] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const cx = 140, cy = 130, maxR = 90;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        let start: number | null = null;
        const animate = (ts: number) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / 1200, 1);
          setAnimProgress(p);
          if (p < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const eased = animProgress < 1
    ? animProgress * (2 - animProgress) // ease-out quad
    : 1;

  return (
    <div
      ref={containerRef}
      style={{
        background: CARD_BG,
        padding: '16px 8px 12px',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Classification micro-stamp */}
      <div style={{
        position: 'absolute', top: 8, left: 12,
        fontFamily: 'var(--font-jetbrains, monospace)',
        fontSize: 8, letterSpacing: '0.15em',
        color: 'rgba(45,212,191,0.2)',
        textTransform: 'uppercase',
      }}>
        FRM-RDR-5AX // DEMO
      </div>

      {/* Reticle corners */}
      <div style={{ position: 'absolute', top: 6, right: 6, width: 10, height: 10, borderTop: `1px solid ${TEAL_20}`, borderRight: `1px solid ${TEAL_20}` }} />
      <div style={{ position: 'absolute', bottom: 6, left: 6, width: 10, height: 10, borderBottom: `1px solid ${TEAL_20}`, borderLeft: `1px solid ${TEAL_20}` }} />

      <svg viewBox="0 0 280 260" style={{ width: '100%', height: 'auto' }}>
        {/* Grid rings */}
        {[0.25, 0.5, 0.75, 1].map((scale) => (
          <polygon
            key={scale}
            points={Array.from({ length: 5 }, (_, i) => {
              const [x, y] = pentagonPoint(cx, cy, maxR * scale, i);
              return `${x},${y}`;
            }).join(' ')}
            fill="none"
            stroke={TEAL_08}
            strokeWidth={scale === 1 ? 1.5 : 0.5}
          />
        ))}

        {/* Axis lines */}
        {RADAR_AXES.map((_, i) => {
          const [x, y] = pentagonPoint(cx, cy, maxR, i);
          return (
            <line
              key={i}
              x1={cx} y1={cy} x2={x} y2={y}
              stroke={TEAL_08}
              strokeWidth={0.5}
            />
          );
        })}

        {/* Model overlays */}
        {RADAR_MODELS.map((values, mi) => {
          const animated = values.map(v => v * eased);
          return (
            <path
              key={mi}
              d={pentagonPath(cx, cy, animated, maxR)}
              fill={MODEL_COLORS[mi].replace(/[\d.]+\)$/, '0.08)')}
              stroke={MODEL_COLORS[mi]}
              strokeWidth={hoveredModel === mi ? 2 : 1.2}
              style={{
                opacity: hoveredModel !== null && hoveredModel !== mi ? 0.2 : 1,
                transition: 'opacity 200ms, stroke-width 200ms',
              }}
            />
          );
        })}

        {/* Consensus overlay — dashed */}
        <path
          d={pentagonPath(cx, cy, RADAR_CONSENSUS.map(v => v * eased), maxR)}
          fill="none"
          stroke={TEAL}
          strokeWidth={1.5}
          strokeDasharray="4 3"
          opacity={0.6}
        />

        {/* Axis labels */}
        {RADAR_AXES.map((label, i) => {
          const [x, y] = pentagonPoint(cx, cy, maxR + 18, i);
          return (
            <text
              key={label}
              x={x}
              y={y}
              fill={hoveredAxis === i ? TEAL : GUNMETAL}
              fontSize={9}
              fontFamily="var(--font-jetbrains, monospace)"
              fontWeight={500}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{ transition: 'fill 150ms', cursor: 'default' }}
              onMouseEnter={() => setHoveredAxis(i)}
              onMouseLeave={() => setHoveredAxis(null)}
            >
              {label.toUpperCase()}
            </text>
          );
        })}

        {/* Data point dots on consensus */}
        {RADAR_CONSENSUS.map((v, i) => {
          const [x, y] = pentagonPoint(cx, cy, (v * eased / 100) * maxR, i);
          return (
            <circle
              key={i}
              cx={x} cy={y} r={2.5}
              fill={TEAL}
              opacity={eased}
            />
          );
        })}
      </svg>

      {/* Model legend */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 12,
        marginTop: 4,
      }}>
        {MODEL_LABELS.map((label, i) => (
          <div
            key={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              cursor: 'pointer',
              opacity: hoveredModel !== null && hoveredModel !== i ? 0.3 : 1,
              transition: 'opacity 150ms',
            }}
            onMouseEnter={() => setHoveredModel(i)}
            onMouseLeave={() => setHoveredModel(null)}
          >
            <div style={{
              width: 8, height: 2,
              background: MODEL_COLORS[i],
              borderRadius: 1,
            }} />
            <span style={{
              fontFamily: 'var(--font-jetbrains, monospace)',
              fontSize: 9,
              color: GUNMETAL,
              letterSpacing: '0.05em',
            }}>
              {label}
            </span>
          </div>
        ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{
            width: 8, height: 0,
            borderTop: `1.5px dashed ${TEAL}`,
          }} />
          <span style={{
            fontFamily: 'var(--font-jetbrains, monospace)',
            fontSize: 9,
            color: GUNMETAL,
            letterSpacing: '0.05em',
          }}>
            CNS
          </span>
        </div>
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════
// 2. SIGNAL PULSE™ DEMO
// ═══════════════════════════════════════════
const PULSE_DATA = [
  { day: 'M', v: 72 }, { day: 'T', v: 45 }, { day: 'W', v: 88 },
  { day: 'T', v: 34 }, { day: 'F', v: 91 }, { day: 'S', v: 28 },
  { day: 'S', v: 53 }, { day: 'M', v: 67 }, { day: 'T', v: 82 },
  { day: 'W', v: 41 }, { day: 'T', v: 76 }, { day: 'F', v: 95 },
  { day: 'S', v: 22 }, { day: 'S', v: 38 },
];

export function SignalPulseDemo() {
  const [animProgress, setAnimProgress] = useState(0);
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        let start: number | null = null;
        const animate = (ts: number) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / 800, 1);
          setAnimProgress(p);
          if (p < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const maxH = 80;

  return (
    <div
      ref={containerRef}
      style={{
        background: CARD_BG,
        padding: '16px 12px 8px',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Classification micro-stamp */}
      <div style={{
        fontFamily: 'var(--font-jetbrains, monospace)',
        fontSize: 8, letterSpacing: '0.15em',
        color: 'rgba(45,212,191,0.2)',
        textTransform: 'uppercase',
        marginBottom: 8,
      }}>
        SIG-PLS // 14D WINDOW
      </div>

      {/* Ruler marks along top */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
        {[100, 75, 50, 25].map(v => (
          <span key={v} style={{
            fontFamily: 'var(--font-jetbrains, monospace)',
            fontSize: 7,
            color: 'rgba(45,212,191,0.15)',
          }}>
            {v}
          </span>
        ))}
      </div>

      {/* Grid lines */}
      <div style={{ position: 'relative', height: maxH + 24 }}>
        {[0, 0.25, 0.5, 0.75].map((pct) => (
          <div key={pct} style={{
            position: 'absolute',
            top: pct * maxH,
            left: 0, right: 0,
            height: 1,
            background: TEAL_08,
          }} />
        ))}

        {/* Bars */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 3,
          height: maxH,
          position: 'relative',
          zIndex: 1,
        }}>
          {PULSE_DATA.map((d, i) => {
            const h = (d.v / 100) * maxH * animProgress;
            const isHigh = d.v > 85;
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'default',
                }}
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                <div style={{
                  width: '100%',
                  maxWidth: 16,
                  height: h,
                  background: isHigh
                    ? `linear-gradient(180deg, ${AMBER}40, ${AMBER}20)`
                    : `linear-gradient(180deg, ${TEAL}40, ${TEAL}15)`,
                  borderTop: `2px solid ${isHigh ? AMBER : TEAL}`,
                  borderRadius: '2px 2px 0 0',
                  transition: hoveredBar === i ? 'none' : 'height 100ms ease-out',
                  opacity: hoveredBar !== null && hoveredBar !== i ? 0.4 : 1,
                  position: 'relative',
                }}>
                  {/* Hover tooltip */}
                  {hoveredBar === i && (
                    <div style={{
                      position: 'absolute',
                      top: -18,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontFamily: 'var(--font-jetbrains, monospace)',
                      fontSize: 9,
                      color: isHigh ? AMBER : TEAL,
                      fontWeight: 600,
                      whiteSpace: 'nowrap',
                    }}>
                      {d.v}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Day labels */}
        <div style={{
          display: 'flex',
          gap: 3,
          marginTop: 4,
        }}>
          {PULSE_DATA.map((d, i) => (
            <div key={i} style={{
              flex: 1,
              textAlign: 'center',
              fontFamily: 'var(--font-jetbrains, monospace)',
              fontSize: 7,
              color: 'rgba(45,212,191,0.2)',
              letterSpacing: '0.05em',
            }}>
              {d.day}
            </div>
          ))}
        </div>
      </div>

      {/* Footer stats */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: 8,
        paddingTop: 8,
        borderTop: `1px solid ${TEAL_08}`,
      }}>
        {[
          { label: 'AVG', value: '58.4' },
          { label: 'PEAK', value: '95' },
          { label: 'σ', value: '22.1' },
        ].map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-jetbrains, monospace)',
              fontSize: 11, fontWeight: 600,
              color: TEAL,
            }}>
              {s.value}
            </div>
            <div style={{
              fontFamily: 'var(--font-jetbrains, monospace)',
              fontSize: 7,
              color: GUNMETAL,
              letterSpacing: '0.12em',
            }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════
// 3. CONSENSUS BADGE DEMO
// ═══════════════════════════════════════════
export function ConsensusBadgeDemo() {
  const [animProgress, setAnimProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const consensus = 0.87; // 87% convergence
  const circumference = 2 * Math.PI * 52;

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        let start: number | null = null;
        const animate = (ts: number) => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / 1500, 1);
          const eased = 1 - Math.pow(1 - p, 3); // ease-out cubic
          setAnimProgress(eased);
          if (p < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const progress = consensus * animProgress;
  const displayPct = Math.round(progress * 100);

  return (
    <div
      ref={containerRef}
      style={{
        background: CARD_BG,
        padding: '20px 16px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Grid coordinates — coders/traders notice this */}
      <div style={{
        position: 'absolute', top: 8, right: 12,
        fontFamily: 'var(--font-jetbrains, monospace)',
        fontSize: 7, letterSpacing: '0.1em',
        color: 'rgba(45,212,191,0.12)',
      }}>
        0x2DD4BF
      </div>

      {/* Ring */}
      <div style={{ position: 'relative', width: 120, height: 120 }}>
        <svg viewBox="0 0 120 120" style={{ width: 120, height: 120 }}>
          {/* Background ring */}
          <circle
            cx="60" cy="60" r="52"
            fill="none"
            stroke={TEAL_08}
            strokeWidth="4"
          />
          {/* Progress ring */}
          <circle
            cx="60" cy="60" r="52"
            fill="none"
            stroke={TEAL}
            strokeWidth="4"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
            style={{ transition: 'stroke-dashoffset 50ms linear' }}
          />
          {/* Inner tick marks */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i / 24) * Math.PI * 2 - Math.PI / 2;
            const r1 = 43, r2 = i % 6 === 0 ? 39 : 41;
            return (
              <line
                key={i}
                x1={60 + r1 * Math.cos(angle)}
                y1={60 + r1 * Math.sin(angle)}
                x2={60 + r2 * Math.cos(angle)}
                y2={60 + r2 * Math.sin(angle)}
                stroke={i % 6 === 0 ? 'rgba(45,212,191,0.2)' : 'rgba(45,212,191,0.08)'}
                strokeWidth={i % 6 === 0 ? 1 : 0.5}
              />
            );
          })}
        </svg>

        {/* Center content */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            fontFamily: 'var(--font-jetbrains, monospace)',
            fontSize: 28, fontWeight: 600,
            color: TEAL,
            lineHeight: 1,
          }}>
            {displayPct}
          </div>
          <div style={{
            fontFamily: 'var(--font-jetbrains, monospace)',
            fontSize: 8,
            color: GUNMETAL,
            letterSpacing: '0.15em',
            marginTop: 2,
          }}>
            CONVERGENCE
          </div>
        </div>
      </div>

      {/* Model agreement row */}
      <div style={{
        display: 'flex',
        gap: 16,
        marginTop: 16,
        paddingTop: 12,
        borderTop: `1px solid ${TEAL_08}`,
        width: '100%',
        justifyContent: 'center',
      }}>
        {MODEL_LABELS.map((label, i) => {
          const agrees = i < 2; // GP-1 and GP-2 agree, GP-3 slight variance
          return (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                width: 8, height: 8,
                borderRadius: '50%',
                background: agrees ? TEAL : AMBER,
                margin: '0 auto 4px',
                opacity: animProgress,
              }} />
              <div style={{
                fontFamily: 'var(--font-jetbrains, monospace)',
                fontSize: 9,
                color: GUNMETAL,
                letterSpacing: '0.05em',
              }}>
                {label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Micro-data footer */}
      <div style={{
        fontFamily: 'var(--font-jetbrains, monospace)',
        fontSize: 8,
        color: 'rgba(45,212,191,0.15)',
        marginTop: 12,
        letterSpacing: '0.1em',
      }}>
        3/3 MODELS · RATIO 2.61:1 · δ 0.13
      </div>
    </div>
  );
}


// ═══════════════════════════════════════════
// SECTION RULER — hash mark divider
// ═══════════════════════════════════════════
export function SectionRuler({ label }: { label?: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        height: 20,
        margin: '8px 0',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Ruler line */}
      <div style={{
        flex: 1,
        height: 1,
        background: TEAL_08,
        position: 'relative',
      }}>
        {/* Hash ticks */}
        {Array.from({ length: 40 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${(i / 39) * 100}%`,
            top: -1,
            width: 1,
            height: i % 5 === 0 ? 6 : 3,
            background: 'rgba(45,212,191,0.12)',
          }} />
        ))}
      </div>

      {/* Center label */}
      {label && (
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'var(--bg, #081017)',
          padding: '0 12px',
          fontFamily: 'var(--font-jetbrains, monospace)',
          fontSize: 8,
          letterSpacing: '0.15em',
          color: 'rgba(45,212,191,0.25)',
          textTransform: 'uppercase',
        }}>
          {label}
        </div>
      )}
    </div>
  );
}


// ═══════════════════════════════════════════
// FILM PERFORATION BORDER
// ═══════════════════════════════════════════
export function FilmPerf({ side = 'left' }: { side?: 'left' | 'right' }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        [side]: 0,
        top: 0,
        bottom: 0,
        width: 8,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: '8px 0',
      }}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} style={{
          width: 3,
          height: 6,
          borderRadius: 1,
          background: 'rgba(45,212,191,0.06)',
        }} />
      ))}
    </div>
  );
}
