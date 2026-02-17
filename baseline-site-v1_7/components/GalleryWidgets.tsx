'use client';

/* ─────────────────────────────────────────────────────────
   GALLERY WIDGETS — Interactive Feature Demonstrations
   ─────────────────────────────────────────────────────────
   9 functional widget demos for the Features page.
   These are NOT art (that's MuseumConcepts). These are
   miniature app panels showing how each surface actually
   works — with mock data, live animations, and the
   classified instrument aesthetic.

   Placed inside FrostedWidgetPreview for pre-launch blur.
   Animations tease through the frost.

   Widget Index:
   1. SignalMetricsWidget   — 4-bar signal breakdown
   2. BaselineScoreWidget   — 24hr rolling aggregate
   3. ConsensusRingWidget   — Model convergence ring
   4. ReceiptTimelineWidget — Semantic similarity timeline
   5. CrossfireWidget       — Dual-figure comparison
   6. RadarDemoWidget       — 5-axis pentagon overlay
   7. ConstellationWidget   — Figure link topology
   8. DriftWidget           — Provision drift meter
   9. LensLabWidget         — Triple-model parallel view
   ───────────────────────────────────────────────────────── */

import { useEffect, useRef, useState } from 'react';

// ── Constants ──
const T = '#2dd4bf';
const A = '#d4a72d';
const BG = '#0c1a23';
const DARK = '#081017';
const MONO = 'var(--font-jetbrains, ui-monospace, monospace)';
const BODY = 'var(--font-poppins, system-ui, sans-serif)';
const SUB = '#b6c6d6';
const TEXT = '#eaf2ff';
const BORDER = 'rgba(182,198,214,0.12)';
const TEAL_DIM = 'rgba(45,212,191,0.08)';
const TEAL_LO = 'rgba(45,212,191,0.15)';
const TEAL_MID = 'rgba(45,212,191,0.35)';

// ── Viewport trigger hook ──
function useVisible(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

// ── Cycling value hook (mock live data) ──
function useCycleValue(values: number[], intervalMs = 3000) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIdx(i => (i + 1) % values.length), intervalMs);
    return () => clearInterval(timer);
  }, [values.length, intervalMs]);
  return values[idx];
}

// ── Widget chrome wrapper ──
function WidgetFrame({
  stamp,
  children,
  height,
}: {
  stamp: string;
  children: React.ReactNode;
  height?: number;
}) {
  return (
    <div
      style={{
        background: BG,
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        padding: '8px 10px 10px',
        minHeight: height || 'auto',
      }}
    >
      {/* NATO classification stamp */}
      <div
        style={{
          fontFamily: MONO,
          fontSize: 7,
          letterSpacing: '0.15em',
          color: TEAL_LO,
          textTransform: 'uppercase',
          marginBottom: 6,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span
          style={{
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: TEAL_MID,
            display: 'inline-block',
            flexShrink: 0,
          }}
        />
        {stamp}
      </div>

      {/* Reticle corners */}
      <div style={{ position: 'absolute', top: 4, right: 4, width: 8, height: 8, borderTop: `1px solid ${TEAL_DIM}`, borderRight: `1px solid ${TEAL_DIM}` }} />
      <div style={{ position: 'absolute', bottom: 4, left: 4, width: 8, height: 8, borderBottom: `1px solid ${TEAL_DIM}`, borderLeft: `1px solid ${TEAL_DIM}` }} />
      <div style={{ position: 'absolute', bottom: 4, right: 4, width: 8, height: 8, borderBottom: `1px solid ${TEAL_DIM}`, borderRight: `1px solid ${TEAL_DIM}` }} />

      {children}

      {/* Bottom hash ruler */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 10,
          right: 10,
          height: 1,
        }}
      >
        {Array.from({ length: 16 }).map((_, i) => {
          const t = i / 15;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: `${t * 100}%`,
                bottom: 0,
                width: 1,
                height: i % 4 === 0 ? 4 : 2,
                background: `rgba(45,212,191,${0.03 + (1 - Math.abs(t - 0.5) * 2) * 0.05})`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

// ── Shared data label ──
function DataLabel({
  children,
  color,
  size,
}: {
  children: React.ReactNode;
  color?: string;
  size?: number;
}) {
  return (
    <span
      style={{
        fontFamily: MONO,
        fontSize: size || 9,
        fontWeight: 500,
        color: color || SUB,
        letterSpacing: '0.06em',
        lineHeight: 1,
      }}
    >
      {children}
    </span>
  );
}


// ═══════════════════════════════════════════════════════
// 1. SIGNAL METRICS WIDGET
//    4 independent scores per statement, animated bars
// ═══════════════════════════════════════════════════════

const SIGNAL_SETS = [
  { rep: 72, nov: 34, aff: 61, ent: 28 },
  { rep: 45, nov: 78, aff: 39, ent: 55 },
  { rep: 88, nov: 12, aff: 74, ent: 19 },
  { rep: 31, nov: 66, aff: 52, ent: 71 },
];

function SignalBar({ label, value, delay, active }: { label: string; value: number; delay: number; active: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 18 }}>
      <DataLabel size={8} color={SUB}>{label}</DataLabel>
      <div
        style={{
          flex: 1,
          height: 3,
          background: DARK,
          borderRadius: 1,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: active ? `${value}%` : '0%',
            background: `linear-gradient(90deg, ${T}, rgba(45,212,191,0.6))`,
            borderRadius: 1,
            transition: `width 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
          }}
        />
        {/* Scanline sweep on the bar */}
        {active && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              width: 20,
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(45,212,191,0.15), transparent)',
              animation: `sig-scan-${label} 4s ease-in-out infinite ${delay + 1200}ms`,
            }}
          />
        )}
      </div>
      <DataLabel size={9} color={T}>
        {active ? value : '—'}
      </DataLabel>
    </div>
  );
}

export function SignalMetricsWidget() {
  const { ref, vis } = useVisible();
  const [setIdx, setSetIdx] = useState(0);
  const [cycling, setCycling] = useState(false);

  useEffect(() => {
    if (!vis) return;
    const timer = setTimeout(() => setCycling(true), 2000);
    return () => clearTimeout(timer);
  }, [vis]);

  useEffect(() => {
    if (!cycling) return;
    const timer = setInterval(() => setSetIdx(i => (i + 1) % SIGNAL_SETS.length), 4000);
    return () => clearInterval(timer);
  }, [cycling]);

  const s = SIGNAL_SETS[setIdx];

  return (
    <WidgetFrame stamp="SIG-MTX // 4-AXIS SIGNAL DECOMPOSITION" height={160}>
      <style>{`
        @keyframes sig-scan-REP { 0%,100% { left: -20px; } 50% { left: calc(100% + 20px); } }
        @keyframes sig-scan-NOV { 0%,100% { left: -20px; } 50% { left: calc(100% + 20px); } }
        @keyframes sig-scan-AFF { 0%,100% { left: -20px; } 50% { left: calc(100% + 20px); } }
        @keyframes sig-scan-ENT { 0%,100% { left: -20px; } 50% { left: calc(100% + 20px); } }
      `}</style>
      <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '4px 0' }}>
        {/* Mock statement header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          <div style={{ width: 20, height: 20, borderRadius: '50%', border: `1.5px solid ${TEAL_LO}`, background: DARK }} />
          <div>
            <div style={{ fontFamily: BODY, fontSize: 10, color: TEXT, fontWeight: 500, lineHeight: 1.2 }}>Statement Analysis</div>
            <div style={{ fontFamily: MONO, fontSize: 7, color: SUB, opacity: 0.5, letterSpacing: '0.08em' }}>4 INDEPENDENT SCORES · 0–100</div>
          </div>
        </div>

        <SignalBar label="REP" value={s.rep} delay={0} active={vis} />
        <SignalBar label="NOV" value={s.nov} delay={80} active={vis} />
        <SignalBar label="AFF" value={s.aff} delay={160} active={vis} />
        <SignalBar label="ENT" value={s.ent} delay={240} active={vis} />

        {/* Cycling indicator */}
        <div style={{ display: 'flex', gap: 3, justifyContent: 'center', marginTop: 2 }}>
          {SIGNAL_SETS.map((_, i) => (
            <div
              key={i}
              style={{
                width: i === setIdx ? 12 : 4,
                height: 2,
                borderRadius: 1,
                background: i === setIdx ? T : TEAL_DIM,
                transition: 'all 400ms ease',
              }}
            />
          ))}
        </div>
      </div>
    </WidgetFrame>
  );
}


// ═══════════════════════════════════════════════════════
// 2. BASELINE™ SCORE WIDGET
//    24hr rolling aggregate with delta indicator
// ═══════════════════════════════════════════════════════

export function BaselineScoreWidget() {
  const { ref, vis } = useVisible();
  const score = useCycleValue([67, 71, 64, 73, 69], 5000);
  const prevScore = useCycleValue([64, 67, 71, 64, 73], 5000);
  const delta = score - prevScore;

  return (
    <WidgetFrame stamp="BSLN-AGG // 24HR ROLLING AGGREGATE" height={160}>
      <div ref={ref} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 0' }}>
        {/* Circular score display */}
        <div style={{ position: 'relative', width: 80, height: 80, marginBottom: 8 }}>
          <svg viewBox="0 0 80 80" style={{ width: '100%', height: '100%' }}>
            {/* Track ring */}
            <circle cx="40" cy="40" r="34" fill="none" stroke={TEAL_DIM} strokeWidth="2" />
            {/* Score ring */}
            <circle
              cx="40"
              cy="40"
              r="34"
              fill="none"
              stroke={T}
              strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 34}`}
              strokeDashoffset={vis ? `${2 * Math.PI * 34 * (1 - score / 100)}` : `${2 * Math.PI * 34}`}
              strokeLinecap="round"
              transform="rotate(-90 40 40)"
              style={{ transition: 'stroke-dashoffset 1.8s cubic-bezier(0.22, 1, 0.36, 1)' }}
            />
            {/* Inner reference ring */}
            <circle cx="40" cy="40" r="26" fill="none" stroke={TEAL_DIM} strokeWidth="0.5" strokeDasharray="2 4" />
            {/* Center glow */}
            <circle cx="40" cy="40" r="8" fill="rgba(45,212,191,0.04)">
              <animate attributeName="r" values="6;10;6" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="1;0.5;1" dur="3s" repeatCount="indefinite" />
            </circle>
          </svg>
          {/* Score number */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: MONO,
                fontSize: 22,
                fontWeight: 600,
                color: T,
                lineHeight: 1,
                transition: 'all 800ms ease',
              }}
            >
              {vis ? score : '—'}
            </span>
          </div>
        </div>

        {/* Label + Delta */}
        <DataLabel size={10} color={TEXT}>Baseline™</DataLabel>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3 }}>
          <DataLabel size={8} color={delta >= 0 ? T : A}>
            {delta >= 0 ? '▲' : '▼'} {Math.abs(delta)}
          </DataLabel>
          <DataLabel size={7} color={SUB}>24HR Δ</DataLabel>
        </div>

        {/* Mini sparkline */}
        <svg viewBox="0 0 120 20" style={{ width: 120, height: 20, marginTop: 6 }}>
          <polyline
            points="0,14 15,12 30,15 45,10 60,13 75,8 90,11 105,7 120,9"
            fill="none"
            stroke={TEAL_LO}
            strokeWidth="1"
          />
          <circle cx="120" cy="9" r="2" fill={T}>
            <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>
    </WidgetFrame>
  );
}


// ═══════════════════════════════════════════════════════
// 3. CONSENSUS RING WIDGET
//    Model convergence ratio visualization
// ═══════════════════════════════════════════════════════

export function ConsensusRingWidget() {
  const { ref, vis } = useVisible();
  const ratio = useCycleValue([3, 2, 3, 2, 3], 4000);

  return (
    <WidgetFrame stamp="CON-CVG // MODEL CONVERGENCE RATIO" height={160}>
      <div ref={ref} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '8px 4px' }}>
        {/* Ring */}
        <div style={{ position: 'relative', width: 72, height: 72, flexShrink: 0 }}>
          <svg viewBox="0 0 72 72" style={{ width: '100%', height: '100%' }}>
            {/* Background track */}
            <circle cx="36" cy="36" r="30" fill="none" stroke={TEAL_DIM} strokeWidth="3" />
            {/* Convergence fill — 3 segments for 3 models */}
            {[0, 1, 2].map((seg) => {
              const segLen = (2 * Math.PI * 30) / 3;
              const gap = 4;
              const active = seg < ratio;
              return (
                <circle
                  key={seg}
                  cx="36"
                  cy="36"
                  r="30"
                  fill="none"
                  stroke={active ? T : 'rgba(45,212,191,0.06)'}
                  strokeWidth="3"
                  strokeDasharray={`${segLen - gap} ${2 * Math.PI * 30 - segLen + gap}`}
                  strokeDashoffset={-seg * segLen + (2 * Math.PI * 30) / 4}
                  strokeLinecap="round"
                  style={{
                    transition: 'stroke 600ms ease',
                    opacity: vis ? 1 : 0,
                  }}
                />
              );
            })}
          </svg>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ fontFamily: MONO, fontSize: 18, fontWeight: 600, color: ratio === 3 ? T : A, lineHeight: 1, transition: 'color 600ms ease' }}>
              {ratio}/3
            </span>
          </div>
        </div>

        {/* Model status rows */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {['GP-4', 'GP-G', 'GP-C'].map((model, i) => {
            const aligned = i < ratio;
            return (
              <div key={model} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: aligned ? T : (i === 2 && ratio === 2 ? A : TEAL_DIM),
                    transition: 'background 600ms ease',
                  }}
                />
                <DataLabel size={8} color={aligned ? TEXT : SUB}>{model}</DataLabel>
                <div style={{ flex: 1 }} />
                <DataLabel size={7} color={aligned ? TEAL_MID : 'rgba(182,198,214,0.3)'}>
                  {aligned ? 'CONVERGED' : 'DIVERGENT'}
                </DataLabel>
              </div>
            );
          })}
          {/* Variance indicator — only when not 3/3 */}
          {ratio < 3 && (
            <div
              style={{
                marginTop: 2,
                padding: '2px 6px',
                background: 'rgba(212,167,45,0.06)',
                border: `1px solid rgba(212,167,45,0.12)`,
                borderRadius: 3,
                display: 'inline-flex',
                alignSelf: 'flex-start',
              }}
            >
              <DataLabel size={7} color={A}>VARIANCE DETECTED</DataLabel>
            </div>
          )}
        </div>
      </div>
    </WidgetFrame>
  );
}


// ═══════════════════════════════════════════════════════
// 4. RECEIPT™ TIMELINE WIDGET
//    Semantic similarity dots along temporal axis
// ═══════════════════════════════════════════════════════

const RECEIPT_DOTS = [
  { x: 8, sim: 0.92, date: 'FEB 14' },
  { x: 22, sim: 0.74, date: 'FEB 9' },
  { x: 38, sim: 0.81, date: 'JAN 28' },
  { x: 55, sim: 0.55, date: 'JAN 12' },
  { x: 68, sim: 0.88, date: 'DEC 30' },
  { x: 82, sim: 0.43, date: 'DEC 18' },
  { x: 94, sim: 0.67, date: 'DEC 4' },
];

export function ReceiptTimelineWidget() {
  const { ref, vis } = useVisible();

  return (
    <WidgetFrame stamp="RCPT-TL // SEMANTIC SIMILARITY TIMELINE" height={160}>
      <div ref={ref} style={{ padding: '4px 0' }}>
        {/* Mock statement preview */}
        <div style={{ marginBottom: 10 }}>
          <div style={{ fontFamily: BODY, fontSize: 10, color: TEXT, fontWeight: 500, lineHeight: 1.3 }}>
            &ldquo;We need to address this issue head-on...&rdquo;
          </div>
          <DataLabel size={7} color={SUB}>CURRENT STATEMENT · SEMANTIC MATCH SCAN</DataLabel>
        </div>

        {/* Timeline SVG */}
        <svg viewBox="0 0 300 90" style={{ width: '100%', height: 'auto', display: 'block' }}>
          {/* Horizontal reference line */}
          <line x1="10" y1="50" x2="290" y2="50" stroke={TEAL_DIM} strokeWidth="0.5" />

          {/* Hash ticks along timeline */}
          {Array.from({ length: 20 }).map((_, i) => {
            const x = 10 + (i / 19) * 280;
            return (
              <line
                key={i}
                x1={x}
                y1={48}
                x2={x}
                y2={i % 5 === 0 ? 52 : 50.5}
                stroke={TEAL_DIM}
                strokeWidth="0.5"
              />
            );
          })}

          {/* Similarity dots */}
          {RECEIPT_DOTS.map((dot, i) => {
            const cx = 10 + (dot.x / 100) * 280;
            const cy = 50 - (dot.sim - 0.5) * 60; // Higher sim = higher on chart
            const r = 2 + dot.sim * 3;
            return (
              <g
                key={i}
                style={{
                  opacity: vis ? 1 : 0,
                  transition: `opacity 600ms ease ${i * 100}ms`,
                }}
              >
                {/* Connection line to timeline */}
                <line x1={cx} y1={cy} x2={cx} y2={50} stroke={TEAL_LO} strokeWidth="0.5" strokeDasharray="2 2" />
                {/* Glow halo */}
                <circle cx={cx} cy={cy} r={r + 3} fill={`rgba(45,212,191,${dot.sim * 0.06})`} />
                {/* Dot */}
                <circle cx={cx} cy={cy} r={r} fill={T} opacity={0.3 + dot.sim * 0.5} />
                {/* Core */}
                <circle cx={cx} cy={cy} r={1} fill="#fff" opacity={0.6} />
                {/* Date label */}
                <text
                  x={cx}
                  y={68}
                  textAnchor="middle"
                  style={{ fontFamily: MONO, fontSize: 5, fill: SUB, opacity: 0.4, letterSpacing: '0.08em' }}
                >
                  {dot.date}
                </text>
                {/* Similarity score */}
                <text
                  x={cx}
                  y={cy - r - 4}
                  textAnchor="middle"
                  style={{ fontFamily: MONO, fontSize: 6, fill: T, opacity: 0.7 }}
                >
                  {dot.sim.toFixed(2)}
                </text>
              </g>
            );
          })}

          {/* "NOW" marker */}
          <line x1="15" y1="42" x2="15" y2="58" stroke={T} strokeWidth="0.5" opacity="0.3" />
          <text x="15" y="39" textAnchor="middle" style={{ fontFamily: MONO, fontSize: 5, fill: T, opacity: 0.4 }}>
            NOW
          </text>

          {/* Similarity axis label */}
          <text x="4" y="25" style={{ fontFamily: MONO, fontSize: 4, fill: SUB, opacity: 0.3, letterSpacing: '0.1em' }} transform="rotate(-90, 4, 35)">
            SIM
          </text>
        </svg>

        {/* Legend strip */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: T, opacity: 0.8 }} />
            <DataLabel size={7} color={SUB}>HIGH MATCH</DataLabel>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <div style={{ width: 3, height: 3, borderRadius: '50%', background: T, opacity: 0.3 }} />
            <DataLabel size={7} color={SUB}>LOW MATCH</DataLabel>
          </div>
          <div style={{ flex: 1 }} />
          <DataLabel size={7} color={TEAL_MID}>{RECEIPT_DOTS.length} PRIOR STATEMENTS</DataLabel>
        </div>
      </div>
    </WidgetFrame>
  );
}


// ═══════════════════════════════════════════════════════
// 5. CROSSFIRE™ WIDGET
//    Dual-figure comparison strip
// ═══════════════════════════════════════════════════════

function FigureColumn({ label, scores, color, align }: {
  label: string;
  scores: { rep: number; nov: number; aff: number; ent: number };
  color: string;
  align: 'left' | 'right';
}) {
  const bars = [
    { k: 'REP', v: scores.rep },
    { k: 'NOV', v: scores.nov },
    { k: 'AFF', v: scores.aff },
    { k: 'ENT', v: scores.ent },
  ];

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Avatar + name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, justifyContent: align === 'right' ? 'flex-end' : 'flex-start' }}>
        {align === 'left' && (
          <div style={{ width: 16, height: 16, borderRadius: '50%', border: `1.5px solid ${color}`, background: DARK }} />
        )}
        <DataLabel size={8} color={TEXT}>{label}</DataLabel>
        {align === 'right' && (
          <div style={{ width: 16, height: 16, borderRadius: '50%', border: `1.5px solid ${color}`, background: DARK }} />
        )}
      </div>
      {/* Bars */}
      {bars.map((b) => (
        <div key={b.k} style={{ display: 'flex', alignItems: 'center', gap: 4, flexDirection: align === 'right' ? 'row-reverse' : 'row' }}>
          <DataLabel size={7} color={SUB}>{b.k}</DataLabel>
          <div style={{ flex: 1, height: 2, background: DARK, borderRadius: 1, position: 'relative', overflow: 'hidden' }}>
            <div
              style={{
                position: 'absolute',
                [align === 'right' ? 'right' : 'left']: 0,
                top: 0,
                height: '100%',
                width: `${b.v}%`,
                background: color,
                borderRadius: 1,
                opacity: 0.7,
              }}
            />
          </div>
          <DataLabel size={7} color={color}>{b.v}</DataLabel>
        </div>
      ))}
    </div>
  );
}

export function CrossfireWidget() {
  const { ref, vis } = useVisible();

  return (
    <WidgetFrame stamp="XFR-CMP // DUAL FIGURE FRAMING COMPARISON" height={160}>
      <div ref={ref} style={{ padding: '4px 0', opacity: vis ? 1 : 0, transition: 'opacity 800ms ease' }}>
        {/* Topic chip */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
          <div
            style={{
              padding: '2px 8px',
              border: `1px solid ${TEAL_LO}`,
              borderRadius: 3,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <DataLabel size={7} color={TEAL_MID}>TOPIC: INFRASTRUCTURE</DataLabel>
          </div>
        </div>

        {/* Two columns with center divider */}
        <div style={{ display: 'flex', gap: 8 }}>
          <FigureColumn
            label="FIGURE A"
            scores={{ rep: 72, nov: 34, aff: 61, ent: 28 }}
            color={T}
            align="left"
          />
          {/* Center tension line */}
          <div style={{ width: 1, background: `linear-gradient(180deg, transparent, ${TEAL_LO}, transparent)`, flexShrink: 0 }} />
          <FigureColumn
            label="FIGURE B"
            scores={{ rep: 45, nov: 67, aff: 38, ent: 52 }}
            color="rgba(45,212,191,0.5)"
            align="right"
          />
        </div>

        {/* Delta summary */}
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
          <DataLabel size={7} color={SUB}>FRAMING DISTANCE: </DataLabel>
          <DataLabel size={7} color={T}>&nbsp;0.47</DataLabel>
        </div>
      </div>
    </WidgetFrame>
  );
}


// ═══════════════════════════════════════════════════════
// 6. RADAR DEMO WIDGET
//    5-axis pentagon with animated data overlay
// ═══════════════════════════════════════════════════════

function radarPt(cx: number, cy: number, r: number, i: number, total: number): [number, number] {
  const angle = (Math.PI * 2 * i) / total - Math.PI / 2;
  return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
}

const RADAR_AXES = ['ECON', 'NATL SEC', 'SOCIAL', 'ENVIRO', 'FISCAL'];
const RADAR_SETS = [
  [72, 55, 40, 28, 65],
  [45, 78, 62, 50, 33],
  [88, 35, 71, 44, 59],
];

export function RadarDemoWidget() {
  const { ref, vis } = useVisible();
  const [setIdx, setSetIdx] = useState(0);

  useEffect(() => {
    if (!vis) return;
    const timer = setInterval(() => setSetIdx(i => (i + 1) % RADAR_SETS.length), 4500);
    return () => clearInterval(timer);
  }, [vis]);

  const data = RADAR_SETS[setIdx];
  const cx = 120, cy = 100, maxR = 65;

  // Build data polygon points
  const dataPts = data.map((v, i) => {
    const [x, y] = radarPt(cx, cy, (v / 100) * maxR, i, 5);
    return `${x},${y}`;
  }).join(' ');

  return (
    <WidgetFrame stamp="FRM-RDR // 5-AXIS RHETORICAL MEASUREMENT" height={200}>
      <div ref={ref}>
        <svg viewBox="0 0 240 200" style={{ width: '100%', height: 'auto', display: 'block' }}>
          {/* Concentric pentagon guides */}
          {[0.25, 0.5, 0.75, 1].map((scale) => {
            const pts = Array.from({ length: 5 }).map((_, i) => {
              const [x, y] = radarPt(cx, cy, maxR * scale, i, 5);
              return `${x},${y}`;
            }).join(' ');
            return (
              <polygon
                key={scale}
                points={pts}
                fill="none"
                stroke={TEAL_DIM}
                strokeWidth={scale === 1 ? 0.8 : 0.4}
              />
            );
          })}

          {/* Axis lines */}
          {Array.from({ length: 5 }).map((_, i) => {
            const [x, y] = radarPt(cx, cy, maxR + 4, i, 5);
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke={TEAL_DIM}
                strokeWidth="0.4"
              />
            );
          })}

          {/* Axis labels */}
          {RADAR_AXES.map((label, i) => {
            const [x, y] = radarPt(cx, cy, maxR + 16, i, 5);
            return (
              <text
                key={label}
                x={x}
                y={y + 3}
                textAnchor="middle"
                style={{
                  fontFamily: MONO,
                  fontSize: 6,
                  fill: SUB,
                  opacity: 0.5,
                  letterSpacing: '0.08em',
                }}
              >
                {label}
              </text>
            );
          })}

          {/* Data polygon — filled + stroked */}
          <polygon
            points={dataPts}
            fill="rgba(45,212,191,0.06)"
            stroke={T}
            strokeWidth="1.2"
            strokeLinejoin="round"
            style={{
              opacity: vis ? 1 : 0,
              transition: 'all 1s cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          />

          {/* Data vertices */}
          {data.map((v, i) => {
            const [x, y] = radarPt(cx, cy, (v / 100) * maxR, i, 5);
            return (
              <g key={i}>
                <circle cx={x} cy={y} r={3} fill="rgba(45,212,191,0.1)" />
                <circle cx={x} cy={y} r={1.5} fill={T} opacity={0.8} />
              </g>
            );
          })}

          {/* Center beacon */}
          <circle cx={cx} cy={cy} r={2} fill={T} opacity={0.15}>
            <animate attributeName="r" values="1;3;1" dur="3s" repeatCount="indefinite" />
          </circle>
        </svg>

        {/* Data readout strip */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 8px', marginTop: -4 }}>
          {RADAR_AXES.map((ax, i) => (
            <div key={ax} style={{ textAlign: 'center' }}>
              <DataLabel size={9} color={T}>{data[i]}</DataLabel>
            </div>
          ))}
        </div>
      </div>
    </WidgetFrame>
  );
}


// ═══════════════════════════════════════════════════════
// 7. CONSTELLATION NAV WIDGET
//    Figure link topology map
// ═══════════════════════════════════════════════════════

const NODES = [
  { x: 120, y: 55, label: 'FIG-01', primary: true },
  { x: 55, y: 30, label: 'FIG-02', primary: false },
  { x: 190, y: 35, label: 'FIG-03', primary: false },
  { x: 40, y: 90, label: 'FIG-04', primary: false },
  { x: 195, y: 95, label: 'FIG-05', primary: false },
  { x: 85, y: 115, label: 'FIG-06', primary: false },
  { x: 155, y: 120, label: 'FIG-07', primary: false },
];

const EDGES: [number, number, number][] = [
  [0, 1, 0.8], [0, 2, 0.65], [0, 3, 0.4], [0, 4, 0.55],
  [0, 5, 0.7], [0, 6, 0.5], [1, 2, 0.3], [5, 6, 0.45],
  [3, 5, 0.35], [2, 4, 0.6],
];

export function ConstellationWidget() {
  const { ref, vis } = useVisible();
  const [activeNode, setActiveNode] = useState(0);

  useEffect(() => {
    if (!vis) return;
    const timer = setInterval(() => setActiveNode(i => (i + 1) % NODES.length), 3000);
    return () => clearInterval(timer);
  }, [vis]);

  return (
    <WidgetFrame stamp="CST-NAV // FIGURE LINK TOPOLOGY" height={160}>
      <div ref={ref}>
        <svg viewBox="0 0 240 140" style={{ width: '100%', height: 'auto', display: 'block' }}>
          {/* Edges */}
          {EDGES.map(([a, b, strength], i) => {
            const na = NODES[a], nb = NODES[b];
            const active = a === activeNode || b === activeNode;
            return (
              <line
                key={i}
                x1={na.x} y1={na.y}
                x2={nb.x} y2={nb.y}
                stroke={active ? T : TEAL_DIM}
                strokeWidth={active ? 1 : 0.5}
                opacity={vis ? (active ? 0.5 : 0.15 + strength * 0.15) : 0}
                style={{ transition: 'all 600ms ease' }}
              />
            );
          })}

          {/* Nodes */}
          {NODES.map((node, i) => {
            const active = i === activeNode;
            const connected = EDGES.some(([a, b]) => (a === activeNode && b === i) || (b === activeNode && a === i));
            return (
              <g
                key={i}
                style={{
                  opacity: vis ? 1 : 0,
                  transition: `opacity 600ms ease ${i * 80}ms`,
                }}
              >
                {/* Halo */}
                {active && (
                  <circle cx={node.x} cy={node.y} r={12} fill="none" stroke={T} strokeWidth="0.5" opacity="0.2">
                    <animate attributeName="r" values="10;15;10" dur="2.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.2;0.05;0.2" dur="2.5s" repeatCount="indefinite" />
                  </circle>
                )}
                {/* Dot */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.primary ? 5 : (active ? 4 : (connected ? 3.5 : 3))}
                  fill={active ? 'rgba(45,212,191,0.2)' : DARK}
                  stroke={active ? T : (connected ? 'rgba(45,212,191,0.4)' : TEAL_LO)}
                  strokeWidth={active ? 1.5 : 1}
                  style={{ transition: 'all 500ms ease' }}
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={1}
                  fill={active ? '#fff' : T}
                  opacity={active ? 0.8 : 0.4}
                />
                {/* Label */}
                <text
                  x={node.x}
                  y={node.y + (node.y < 60 ? -10 : 14)}
                  textAnchor="middle"
                  style={{
                    fontFamily: MONO,
                    fontSize: 5,
                    fill: active ? T : SUB,
                    opacity: active ? 0.7 : 0.3,
                    letterSpacing: '0.1em',
                    transition: 'all 500ms ease',
                  }}
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </WidgetFrame>
  );
}


// ═══════════════════════════════════════════════════════
// 8. DRIFT WIDGET
//    Provision drift semantic distance meter
// ═══════════════════════════════════════════════════════

const PROVISIONS = [
  { label: 'SEC 2(a)', drift: 0.12, desc: 'Primary allocation' },
  { label: 'SEC 4(c)', drift: 0.34, desc: 'Enforcement clause' },
  { label: 'SEC 7(b)', drift: 0.61, desc: 'Study requirement' },
  { label: 'SEC 9(a)', drift: 0.78, desc: 'Appropriation rider' },
  { label: 'SEC 11', drift: 0.89, desc: 'Appended amendment' },
];

export function DriftWidget() {
  const { ref, vis } = useVisible();

  return (
    <WidgetFrame stamp="PRV-DFT // SEMANTIC DISTANCE FROM STATED PURPOSE" height={180}>
      <div ref={ref} style={{ padding: '4px 0' }}>
        {/* Bill header */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontFamily: BODY, fontSize: 10, color: TEXT, fontWeight: 500, lineHeight: 1.2 }}>
            H.R. 0000 // Infrastructure Act
          </div>
          <DataLabel size={7} color={SUB}>PROVISION DRIFT ANALYSIS · 5 SECTIONS</DataLabel>
        </div>

        {/* Drift bars — waterfall style */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          {PROVISIONS.map((prov, i) => {
            const isHigh = prov.drift > 0.6;
            const barColor = isHigh ? A : T;
            return (
              <div
                key={prov.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  opacity: vis ? 1 : 0,
                  transition: `opacity 600ms ease ${i * 120}ms`,
                }}
              >
                <DataLabel size={7} color={SUB}>{prov.label}</DataLabel>
                <div
                  style={{
                    flex: 1,
                    height: 3,
                    background: DARK,
                    borderRadius: 1,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Reference threshold line at 0.5 */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '50%',
                      top: -1,
                      width: 1,
                      height: 5,
                      background: 'rgba(182,198,214,0.08)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      height: '100%',
                      width: vis ? `${prov.drift * 100}%` : '0%',
                      background: barColor,
                      borderRadius: 1,
                      opacity: 0.6,
                      transition: `width 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${i * 120}ms`,
                    }}
                  />
                </div>
                <DataLabel size={8} color={isHigh ? A : T}>
                  {prov.drift.toFixed(2)}
                </DataLabel>
              </div>
            );
          })}
        </div>

        {/* Drift legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8, paddingTop: 4, borderTop: `1px solid ${TEAL_DIM}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <div style={{ width: 8, height: 2, background: T, borderRadius: 1, opacity: 0.6 }} />
            <DataLabel size={7} color={SUB}>ON-PURPOSE</DataLabel>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <div style={{ width: 8, height: 2, background: A, borderRadius: 1, opacity: 0.6 }} />
            <DataLabel size={7} color={SUB}>HIGH DRIFT</DataLabel>
          </div>
          <div style={{ flex: 1 }} />
          <DataLabel size={7} color={TEAL_MID}>THRESHOLD: 0.50</DataLabel>
        </div>
      </div>
    </WidgetFrame>
  );
}


// ═══════════════════════════════════════════════════════
// 9. LENS LAB™ WIDGET
//    Triple-model parallel output comparison
// ═══════════════════════════════════════════════════════

const MODEL_OUTPUTS = [
  {
    id: 'GP-4',
    framing: 'ECONOMIC',
    rep: 72, nov: 34, aff: 61, ent: 28,
    status: 'complete',
  },
  {
    id: 'GP-G',
    framing: 'ECONOMIC',
    rep: 68, nov: 38, aff: 55, ent: 31,
    status: 'complete',
  },
  {
    id: 'GP-C',
    framing: 'POPULIST',
    rep: 74, nov: 29, aff: 72, ent: 24,
    status: 'complete',
  },
];

export function LensLabWidget() {
  const { ref, vis } = useVisible();

  return (
    <WidgetFrame stamp="LNS-LAB // 3-SYSTEM PARALLEL ANALYSIS" height={190}>
      <div ref={ref} style={{ padding: '4px 0' }}>
        {/* Pipeline header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 8 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', border: `1px solid ${TEAL_LO}`, background: DARK }} />
          <div style={{ width: 16, height: 1, background: TEAL_DIM }} />
          <div style={{ display: 'flex', gap: 2 }}>
            {[0, 1, 2].map(i => (
              <div
                key={i}
                style={{
                  width: 4,
                  height: 4,
                  borderRadius: '50%',
                  background: T,
                  opacity: 0.4,
                }}
              >
              </div>
            ))}
          </div>
          <div style={{ width: 16, height: 1, background: TEAL_DIM }} />
          <div style={{ width: 6, height: 6, borderRadius: '50%', border: `1px solid ${TEAL_LO}`, background: DARK }} />
          <DataLabel size={6} color={SUB}>&nbsp;IDENTICAL INPUT → 3 INDEPENDENT OUTPUTS</DataLabel>
        </div>

        {/* Three model columns */}
        <div style={{ display: 'flex', gap: 6 }}>
          {MODEL_OUTPUTS.map((model, mi) => {
            const isDivergent = model.framing !== MODEL_OUTPUTS[0].framing;
            return (
              <div
                key={model.id}
                style={{
                  flex: 1,
                  padding: '6px 5px',
                  border: `1px solid ${isDivergent ? 'rgba(212,167,45,0.15)' : TEAL_DIM}`,
                  borderRadius: 4,
                  background: isDivergent ? 'rgba(212,167,45,0.02)' : 'transparent',
                  opacity: vis ? 1 : 0,
                  transition: `opacity 600ms ease ${mi * 150}ms`,
                }}
              >
                {/* Model ID */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 3, marginBottom: 4 }}>
                  <div
                    style={{
                      width: 4,
                      height: 4,
                      borderRadius: '50%',
                      background: isDivergent ? A : T,
                    }}
                  />
                  <DataLabel size={8} color={TEXT}>{model.id}</DataLabel>
                </div>

                {/* Framing classification */}
                <div
                  style={{
                    padding: '1px 4px',
                    border: `1px solid ${isDivergent ? 'rgba(212,167,45,0.2)' : TEAL_LO}`,
                    borderRadius: 2,
                    display: 'inline-block',
                    marginBottom: 4,
                  }}
                >
                  <DataLabel size={6} color={isDivergent ? A : T}>{model.framing}</DataLabel>
                </div>

                {/* Mini signal bars */}
                {[
                  { k: 'R', v: model.rep },
                  { k: 'N', v: model.nov },
                  { k: 'A', v: model.aff },
                  { k: 'E', v: model.ent },
                ].map((b) => (
                  <div key={b.k} style={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: 2, height: 10 }}>
                    <DataLabel size={6} color={SUB}>{b.k}</DataLabel>
                    <div style={{ flex: 1, height: 2, background: DARK, borderRadius: 1, overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${b.v}%`,
                          height: '100%',
                          background: isDivergent ? A : T,
                          borderRadius: 1,
                          opacity: 0.5,
                        }}
                      />
                    </div>
                    <DataLabel size={6} color={isDivergent ? A : T}>{b.v}</DataLabel>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Variance callout */}
        <div
          style={{
            marginTop: 6,
            padding: '3px 6px',
            background: 'rgba(212,167,45,0.04)',
            border: `1px solid rgba(212,167,45,0.1)`,
            borderRadius: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <div style={{ width: 3, height: 3, borderRadius: '50%', background: A }} />
          <DataLabel size={7} color={A}>GP-C DIVERGENT FRAMING</DataLabel>
          <div style={{ flex: 1 }} />
          <DataLabel size={7} color={SUB}>VARIANCE SURFACED</DataLabel>
        </div>
      </div>
    </WidgetFrame>
  );
}


// ═══════════════════════════════════════════════════════
// 10. SIGNAL PULSE™ WIDGET
//     Concentric sonar rings — activity at a glance
// ═══════════════════════════════════════════════════════

export function SignalPulseWidget() {
  const { ref, vis } = useVisible();

  return (
    <WidgetFrame stamp="SIG-PLS // ACTIVITY WAVEFORM SUMMARY" height={160}>
      <style>{`
        @keyframes sp-ring1 { 0% { r: 12; opacity: 0.25; } 100% { r: 50; opacity: 0; } }
        @keyframes sp-ring2 { 0% { r: 12; opacity: 0.2; } 100% { r: 50; opacity: 0; } }
        @keyframes sp-ring3 { 0% { r: 12; opacity: 0.15; } 100% { r: 50; opacity: 0; } }
        @keyframes sp-flare { 0%,100% { opacity: 0.08; } 50% { opacity: 0.2; } }
      `}</style>
      <div ref={ref} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 0' }}>
        {/* Sonar visualization */}
        <div style={{ width: 110, height: 110, flexShrink: 0, position: 'relative' }}>
          <svg viewBox="0 0 110 110" style={{ width: '100%', height: '100%' }}>
            {/* Static reference rings */}
            {[20, 35, 50].map((r) => (
              <circle key={r} cx="55" cy="55" r={r} fill="none" stroke={TEAL_DIM} strokeWidth="0.5" />
            ))}

            {/* Horizontal flare streak */}
            <line x1="5" y1="55" x2="105" y2="55" stroke={T} strokeWidth="0.3" style={{ animation: vis ? 'sp-flare 4s ease-in-out infinite' : 'none' }} />

            {/* Animated ping rings */}
            {vis && [0, 1, 2].map((i) => (
              <circle
                key={i}
                cx="55" cy="55" r="12"
                fill="none"
                stroke={T}
                strokeWidth="1"
                style={{
                  animation: `sp-ring${i + 1} 3s ease-out infinite ${i * 1}s`,
                }}
              />
            ))}

            {/* Center beacon */}
            <circle cx="55" cy="55" r="4" fill="rgba(45,212,191,0.15)" />
            <circle cx="55" cy="55" r="2" fill={T} opacity="0.7">
              <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite" />
            </circle>

            {/* Signal spikes at cardinal points */}
            {[0, 72, 144, 216, 288].map((angle, i) => {
              const rad = (angle * Math.PI) / 180;
              const len = 8 + Math.random() * 12;
              const x1 = 55 + 14 * Math.cos(rad);
              const y1 = 55 + 14 * Math.sin(rad);
              const x2 = 55 + (14 + len) * Math.cos(rad);
              const y2 = 55 + (14 + len) * Math.sin(rad);
              return (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={T} strokeWidth="1" opacity={vis ? 0.3 + i * 0.1 : 0} style={{ transition: `opacity 800ms ease ${i * 100}ms` }} />
              );
            })}
          </svg>
        </div>

        {/* Signal readout panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
          <DataLabel size={10} color={TEXT}>Signal Pulse™</DataLabel>
          <DataLabel size={7} color={SUB}>Visual summary of signal activity at a glance</DataLabel>

          {/* Activity bars */}
          {['24HR', '7D', '30D'].map((period, i) => {
            const val = [78, 52, 64][i];
            return (
              <div key={period} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <DataLabel size={7} color={SUB}>{period}</DataLabel>
                <div style={{ flex: 1, height: 2, background: DARK, borderRadius: 1, overflow: 'hidden' }}>
                  <div style={{
                    width: vis ? `${val}%` : '0%',
                    height: '100%', background: T, borderRadius: 1, opacity: 0.5,
                    transition: `width 1.2s cubic-bezier(0.22,1,0.36,1) ${i * 150}ms`,
                  }} />
                </div>
                <DataLabel size={7} color={T}>{vis ? val : '—'}</DataLabel>
              </div>
            );
          })}

          {/* Pulse status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
            <div style={{ width: 4, height: 4, borderRadius: '50%', background: T, opacity: 0.6 }} />
            <DataLabel size={7} color={TEAL_MID}>ELEVATED ACTIVITY · ABOVE ROLLING AVG</DataLabel>
          </div>
        </div>
      </div>
    </WidgetFrame>
  );
}


// ═══════════════════════════════════════════════════════
// 11. FRAMING FINGERPRINT™ WIDGET
//     Unique rhetorical identity spiral
// ═══════════════════════════════════════════════════════

export function FingerprintWidget() {
  const { ref, vis } = useVisible();

  // Generate fingerprint rings — each with unique tilt and radius
  const rings = Array.from({ length: 9 }).map((_, i) => {
    const rx = 18 + i * 5.5;
    const ry = 12 + i * 4.8 + (i % 2 === 0 ? 2 : -1);
    const tilt = -15 + i * 8;
    return { rx, ry, tilt };
  });

  return (
    <WidgetFrame stamp="FRM-FP // AGGREGATE FRAMING IDENTITY" height={180}>
      <style>{`
        @keyframes fp-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
      <div ref={ref} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 0' }}>
        {/* Whorl visualization */}
        <div style={{ width: 120, height: 120, flexShrink: 0 }}>
          <svg viewBox="0 0 120 120" style={{
            width: '100%', height: '100%',
            animation: vis ? 'fp-rotate 60s linear infinite' : 'none',
          }}>
            {rings.map((ring, i) => (
              <ellipse
                key={i}
                cx="60" cy="60"
                rx={ring.rx} ry={ring.ry}
                fill="none"
                stroke={T}
                strokeWidth="0.6"
                opacity={vis ? 0.08 + i * 0.035 : 0}
                transform={`rotate(${ring.tilt} 60 60)`}
                style={{ transition: `opacity 800ms ease ${i * 80}ms` }}
              />
            ))}
            {/* Center identity point */}
            <circle cx="60" cy="60" r="2" fill={T} opacity={vis ? 0.6 : 0} style={{ transition: 'opacity 600ms ease' }} />
          </svg>
        </div>

        {/* Identity readout */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5 }}>
          <DataLabel size={10} color={TEXT}>Framing Fingerprint™</DataLabel>
          <DataLabel size={7} color={SUB}>Unique visual signature per figure</DataLabel>

          {/* Dominant framing axes */}
          {[
            { axis: 'ECONOMIC', pct: 38 },
            { axis: 'NATIONAL SECURITY', pct: 27 },
            { axis: 'POPULIST', pct: 19 },
            { axis: 'SOCIAL', pct: 11 },
            { axis: 'ENVIRONMENTAL', pct: 5 },
          ].map((f, i) => (
            <div key={f.axis} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <div style={{ width: 50 }}>
                <DataLabel size={6} color={SUB}>{f.axis}</DataLabel>
              </div>
              <div style={{ flex: 1, height: 2, background: DARK, borderRadius: 1, overflow: 'hidden' }}>
                <div style={{
                  width: vis ? `${f.pct * 2.5}%` : '0%',
                  height: '100%', background: T, borderRadius: 1, opacity: 0.4 + f.pct * 0.01,
                  transition: `width 1s ease ${i * 100}ms`,
                }} />
              </div>
              <DataLabel size={7} color={T}>{f.pct}%</DataLabel>
            </div>
          ))}
        </div>
      </div>
    </WidgetFrame>
  );
}


// ═══════════════════════════════════════════════════════
// 12. INTERSECTIONS PANEL™ WIDGET
//     Cross-figure framing overlap topology
// ═══════════════════════════════════════════════════════

export function IntersectionsWidget() {
  const { ref, vis } = useVisible();
  const [activeLink, setActiveLink] = useState(0);

  useEffect(() => {
    if (!vis) return;
    const timer = setInterval(() => setActiveLink(i => (i + 1) % 5), 2500);
    return () => clearInterval(timer);
  }, [vis]);

  const HUB = { x: 120, y: 65 };
  const SPOKES = [
    { x: 40, y: 30, label: 'FIG-A', overlap: 0.82 },
    { x: 200, y: 25, label: 'FIG-B', overlap: 0.67 },
    { x: 30, y: 100, label: 'FIG-C', overlap: 0.54 },
    { x: 210, y: 95, label: 'FIG-D', overlap: 0.41, dim: true },
    { x: 120, y: 120, label: 'FIG-E', overlap: 0.73 },
  ];

  return (
    <WidgetFrame stamp="INT-PNL // CROSS-FIGURE FRAMING OVERLAP" height={180}>
      <div ref={ref}>
        <svg viewBox="0 0 240 140" style={{ width: '100%', height: 'auto', display: 'block' }}>
          {/* Spoke connections */}
          {SPOKES.map((spoke, i) => {
            const active = i === activeLink;
            const isDim = spoke.dim;
            return (
              <g key={i}>
                <line
                  x1={HUB.x} y1={HUB.y} x2={spoke.x} y2={spoke.y}
                  stroke={active ? T : TEAL_DIM}
                  strokeWidth={active ? 1.2 : 0.5}
                  opacity={vis ? (active ? (isDim ? 0.3 : 0.5) : 0.15) : 0}
                  style={{ transition: 'all 500ms ease' }}
                />
                {/* Overlap strength label on active link */}
                {active && vis && (
                  <text
                    x={(HUB.x + spoke.x) / 2}
                    y={(HUB.y + spoke.y) / 2 - 5}
                    textAnchor="middle"
                    style={{ fontFamily: MONO, fontSize: 6, fill: T, opacity: isDim ? 0.4 : 0.7 }}
                  >
                    {spoke.overlap.toFixed(2)}
                  </text>
                )}
              </g>
            );
          })}

          {/* Cross-links between spokes */}
          {[[0, 4], [1, 2], [0, 2]].map(([a, b], i) => (
            <line
              key={`cross-${i}`}
              x1={SPOKES[a].x} y1={SPOKES[a].y}
              x2={SPOKES[b].x} y2={SPOKES[b].y}
              stroke={TEAL_DIM}
              strokeWidth="0.3"
              strokeDasharray="3 3"
              opacity={vis ? 0.1 : 0}
              style={{ transition: 'opacity 800ms ease 400ms' }}
            />
          ))}

          {/* Hub node */}
          <circle cx={HUB.x} cy={HUB.y} r={8} fill="rgba(45,212,191,0.06)" stroke={T} strokeWidth="1" opacity={vis ? 1 : 0} style={{ transition: 'opacity 600ms ease' }} />
          <circle cx={HUB.x} cy={HUB.y} r={2} fill={T} opacity={0.6}>
            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" />
          </circle>
          <text x={HUB.x} y={HUB.y + 16} textAnchor="middle" style={{ fontFamily: MONO, fontSize: 5, fill: T, opacity: 0.5, letterSpacing: '0.1em' }}>
            TOPIC HUB
          </text>

          {/* Spoke nodes */}
          {SPOKES.map((spoke, i) => {
            const active = i === activeLink;
            const isDim = spoke.dim;
            return (
              <g key={`node-${i}`} style={{ opacity: vis ? 1 : 0, transition: `opacity 600ms ease ${i * 80}ms` }}>
                <circle
                  cx={spoke.x} cy={spoke.y} r={active ? 5 : 4}
                  fill={active ? 'rgba(45,212,191,0.1)' : DARK}
                  stroke={active ? T : TEAL_LO}
                  strokeWidth={active ? 1.2 : 0.8}
                  opacity={isDim ? 0.5 : 1}
                  style={{ transition: 'all 400ms ease' }}
                />
                <circle cx={spoke.x} cy={spoke.y} r={1} fill={T} opacity={active ? (isDim ? 0.5 : 0.8) : 0.4} />
                <text
                  x={spoke.x} y={spoke.y + (spoke.y < 60 ? -8 : 12)}
                  textAnchor="middle"
                  style={{ fontFamily: MONO, fontSize: 5, fill: active ? T : SUB, opacity: active ? (isDim ? 0.4 : 0.6) : 0.3, letterSpacing: '0.08em', transition: 'all 400ms ease' }}
                >
                  {spoke.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </WidgetFrame>
  );
}


// ═══════════════════════════════════════════════════════
// 13. DECLASSIFIED DOSSIER™ WIDGET
//     Complete exhibit plate profile summary
// ═══════════════════════════════════════════════════════

export function DossierWidget() {
  const { ref, vis } = useVisible();

  const sections = [
    { label: 'RECEIPT™ HISTORY', count: 47, status: 'COMPILED' },
    { label: 'RADAR™ AVERAGES', count: 5, status: 'COMPUTED' },
    { label: 'SIGNAL TRENDS', count: 312, status: 'INDEXED' },
    { label: 'VOTE RECORD', count: 89, status: 'SYNCED' },
    { label: 'FINGERPRINT™', count: 1, status: 'GENERATED' },
  ];

  return (
    <WidgetFrame stamp="DCL-DOS // COMPLETE ANALYTICAL PROFILE" height={200}>
      <div ref={ref} style={{ padding: '4px 0' }}>
        {/* Dossier header — exhibit plate style */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10,
          paddingBottom: 8, borderBottom: `1px solid ${TEAL_DIM}`,
        }}>
          {/* Avatar placeholder */}
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            border: `2px solid ${TEAL_LO}`,
            background: DARK,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: TEAL_DIM }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: MONO, fontSize: 11, color: TEXT, fontWeight: 600, letterSpacing: '0.04em' }}>
              FIGURE DOSSIER
            </div>
            <DataLabel size={7} color={SUB}>DECLASSIFIED · EVERY SURFACE · ONE VIEW</DataLabel>
          </div>
          <div style={{
            padding: '2px 6px',
            border: `1px solid ${TEAL_LO}`,
            borderRadius: 3,
          }}>
            <DataLabel size={7} color={T}>PRO+</DataLabel>
          </div>
        </div>

        {/* Section manifest */}
        {sections.map((sec, i) => (
          <div
            key={sec.label}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '4px 0',
              borderBottom: i < sections.length - 1 ? `1px solid rgba(45,212,191,0.03)` : 'none',
              opacity: vis ? 1 : 0,
              transition: `opacity 500ms ease ${i * 100}ms`,
            }}
          >
            <div style={{
              width: 3, height: 3, borderRadius: '50%',
              background: T, opacity: 0.4,
            }} />
            <DataLabel size={8} color={TEXT}>{sec.label}</DataLabel>
            <div style={{ flex: 1 }} />
            <DataLabel size={7} color={SUB}>{sec.count} records</DataLabel>
            <div style={{
              padding: '1px 5px',
              border: `1px solid ${TEAL_DIM}`,
              borderRadius: 2,
            }}>
              <DataLabel size={6} color={T}>{sec.status}</DataLabel>
            </div>
          </div>
        ))}

        {/* Exhibit plate footer */}
        <div style={{
          marginTop: 8, paddingTop: 6,
          borderTop: `1px solid ${TEAL_DIM}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <DataLabel size={7} color={SUB}>AGGREGATE SURFACES: 5</DataLabel>
          <DataLabel size={7} color={SUB}>TOTAL RECORDS: 454</DataLabel>
          <DataLabel size={7} color={TEAL_MID}>EXHIBIT PLATE</DataLabel>
        </div>
      </div>
    </WidgetFrame>
  );
}
