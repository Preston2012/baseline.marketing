'use client';

/* ─────────────────────────────────────────────────────────
   LIVE WIDGETS — Analytical Methodology Demonstrations
   ─────────────────────────────────────────────────────────
   3 animated demos for the Methodology page showing HOW
   the measurement pipeline works. Analytical, not flashy.
   Complements the "How It Works" cards with visual proof.

   Widget Index:
   1. PipelineWidget       — Input → 3 parallel models → outputs
   2. DeltaComputeWidget   — Current vs rolling avg = delta
   3. ConsensusAssemblyWidget — 3 outputs → convergence ratio
   ───────────────────────────────────────────────────────── */

import { useEffect, useRef, useState } from 'react';

const T = '#2dd4bf';
const A = '#d4a72d';
const BG = '#0c1a23';
const DARK = '#081017';
const MONO = 'var(--font-jetbrains, ui-monospace, monospace)';
const SUB = '#b6c6d6';
const TEXT = '#eaf2ff';
const TEAL_DIM = 'rgba(45,212,191,0.08)';
const TEAL_LO = 'rgba(45,212,191,0.15)';
const TEAL_MID = 'rgba(45,212,191,0.35)';

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

function WidgetFrame({ stamp, children }: { stamp: string; children: React.ReactNode }) {
  return (
    <div style={{ background: BG, width: '100%', position: 'relative', overflow: 'hidden', padding: '8px 10px 10px' }}>
      <div style={{ fontFamily: MONO, fontSize: 7, letterSpacing: '0.15em', color: TEAL_LO, textTransform: 'uppercase', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 4, height: 4, borderRadius: '50%', background: TEAL_MID, display: 'inline-block', flexShrink: 0 }} />
        {stamp}
      </div>
      <div style={{ position: 'absolute', top: 4, right: 4, width: 8, height: 8, borderTop: `1px solid ${TEAL_DIM}`, borderRight: `1px solid ${TEAL_DIM}` }} />
      <div style={{ position: 'absolute', bottom: 4, left: 4, width: 8, height: 8, borderBottom: `1px solid ${TEAL_DIM}`, borderLeft: `1px solid ${TEAL_DIM}` }} />
      <div style={{ position: 'absolute', bottom: 4, right: 4, width: 8, height: 8, borderBottom: `1px solid ${TEAL_DIM}`, borderRight: `1px solid ${TEAL_DIM}` }} />
      {children}
      <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 10, right: 10, height: 1 }}>
        {Array.from({ length: 16 }).map((_, i) => {
          const t = i / 15;
          return <div key={i} style={{ position: 'absolute', left: `${t * 100}%`, bottom: 0, width: 1, height: i % 4 === 0 ? 4 : 2, background: `rgba(45,212,191,${0.03 + (1 - Math.abs(t - 0.5) * 2) * 0.05})` }} />;
        })}
      </div>
    </div>
  );
}

function DataLabel({ children, color, size }: { children: React.ReactNode; color?: string; size?: number }) {
  return (
    <span style={{ fontFamily: MONO, fontSize: size || 9, fontWeight: 500, color: color || SUB, letterSpacing: '0.06em', lineHeight: 1 }}>
      {children}
    </span>
  );
}


// ═══════════════════════════════════════════════════════
// 1. PIPELINE WIDGET
//    Input → 3 Parallel Models → Independent Outputs
//    Animated step-by-step data flow
// ═══════════════════════════════════════════════════════

export function PipelineWidget() {
  const { ref, vis } = useVisible();
  const [step, setStep] = useState(0); // 0=idle, 1=input, 2=processing, 3=outputs

  useEffect(() => {
    if (!vis) return;
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1200),
      setTimeout(() => setStep(3), 2400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [vis]);

  const models = [
    { id: 'GP-4', color: T },
    { id: 'GP-G', color: T },
    { id: 'GP-C', color: T },
  ];

  return (
    <WidgetFrame stamp="METH-PIPE // INPUT → PARALLEL ANALYSIS → OUTPUT">
      <div ref={ref} style={{ padding: '6px 0' }}>

        {/* Step 1: Input normalization */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12,
          opacity: step >= 1 ? 1 : 0.15,
          transition: 'opacity 600ms ease',
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            border: `1.5px solid ${step >= 1 ? T : TEAL_DIM}`,
            background: step >= 1 ? 'rgba(45,212,191,0.1)' : DARK,
            transition: 'all 600ms ease',
          }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <DataLabel size={8} color={step >= 1 ? TEXT : SUB}>CANONICAL INPUT</DataLabel>
            <DataLabel size={7} color={SUB}>Normalized statement · identical to all models</DataLabel>
          </div>
          <DataLabel size={7} color={step >= 1 ? T : TEAL_DIM}>
            {step >= 1 ? '✓ READY' : '—'}
          </DataLabel>
        </div>

        {/* Flow line: input → split */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 8px' }}>
          <div style={{
            width: 1, height: 16,
            background: step >= 2 ? `linear-gradient(180deg, ${T}, ${TEAL_LO})` : TEAL_DIM,
            transition: 'background 600ms ease',
          }} />
        </div>

        {/* Step 2: Three parallel model lanes */}
        <div style={{ display: 'flex', gap: 6 }}>
          {models.map((model, mi) => (
            <div
              key={model.id}
              style={{
                flex: 1,
                padding: '6px 5px',
                border: `1px solid ${step >= 2 ? TEAL_LO : TEAL_DIM}`,
                borderRadius: 4,
                textAlign: 'center',
                opacity: step >= 2 ? 1 : 0.15,
                transition: `all 600ms ease ${mi * 150}ms`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Processing scanline */}
              {step === 2 && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: `linear-gradient(90deg, transparent, ${T}, transparent)`,
                  animation: `live-scan-${mi} 1.5s ease-in-out infinite ${mi * 200}ms`,
                }} />
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, marginBottom: 3 }}>
                <div style={{
                  width: 4, height: 4, borderRadius: '50%',
                  background: step >= 3 ? T : (step >= 2 ? 'rgba(45,212,191,0.4)' : TEAL_DIM),
                  transition: 'background 400ms ease',
                }} />
                <DataLabel size={8} color={TEXT}>{model.id}</DataLabel>
              </div>

              <DataLabel size={7} color={step >= 3 ? T : (step >= 2 ? 'rgba(45,212,191,0.5)' : SUB)}>
                {step >= 3 ? 'COMPLETE' : (step >= 2 ? 'PROCESSING' : 'STANDBY')}
              </DataLabel>

              {/* Mini output preview */}
              {step >= 3 && (
                <div style={{ marginTop: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
                  {[0.6, 0.8, 0.4, 0.7].map((w, bi) => (
                    <div
                      key={bi}
                      style={{
                        width: `${w * 16}px`,
                        height: 2,
                        background: T,
                        borderRadius: 1,
                        opacity: 0.4,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Flow line: outputs → display */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0' }}>
          <div style={{
            width: 1, height: 12,
            background: step >= 3 ? `linear-gradient(180deg, ${TEAL_LO}, ${T})` : TEAL_DIM,
            transition: 'background 600ms ease',
          }} />
        </div>

        {/* Step 3: Output display */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '4px 6px',
          border: `1px solid ${step >= 3 ? TEAL_LO : TEAL_DIM}`,
          borderRadius: 4,
          opacity: step >= 3 ? 1 : 0.15,
          transition: 'all 600ms ease',
        }}>
          <DataLabel size={8} color={step >= 3 ? TEXT : SUB}>SIDE-BY-SIDE DISPLAY</DataLabel>
          <div style={{ flex: 1 }} />
          <DataLabel size={7} color={step >= 3 ? T : TEAL_DIM}>
            {step >= 3 ? '3/3 INDEPENDENT OUTPUTS' : '—'}
          </DataLabel>
        </div>

        {/* Principle callout */}
        <div style={{ marginTop: 8, textAlign: 'center' }}>
          <DataLabel size={7} color={TEAL_MID}>NO MODEL SEES ANOTHER&apos;S OUTPUT · SEPARATION IS STRUCTURAL</DataLabel>
        </div>
      </div>

      <style>{`
        @keyframes live-scan-0 { 0%,100% { transform: translateX(-100%); } 50% { transform: translateX(100%); } }
        @keyframes live-scan-1 { 0%,100% { transform: translateX(-100%); } 50% { transform: translateX(100%); } }
        @keyframes live-scan-2 { 0%,100% { transform: translateX(-100%); } 50% { transform: translateX(100%); } }
      `}</style>
    </WidgetFrame>
  );
}


// ═══════════════════════════════════════════════════════
// 2. DELTA COMPUTE WIDGET
//    Current score vs rolling average → delta
// ═══════════════════════════════════════════════════════

const DELTA_METRICS = [
  { label: 'REP', current: 72, avg: 58 },
  { label: 'NOV', current: 34, avg: 41 },
  { label: 'AFF', current: 61, avg: 45 },
  { label: 'ENT', current: 28, avg: 33 },
];

export function DeltaComputeWidget() {
  const { ref, vis } = useVisible();
  const [showDelta, setShowDelta] = useState(false);

  useEffect(() => {
    if (!vis) return;
    const timer = setTimeout(() => setShowDelta(true), 1800);
    return () => clearTimeout(timer);
  }, [vis]);

  return (
    <WidgetFrame stamp="METH-DELTA // CURRENT − ROLLING AVG = Δ">
      <div ref={ref} style={{ padding: '4px 0' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <DataLabel size={8} color={TEXT}>DELTA COMPUTATION</DataLabel>
          <div style={{ flex: 1 }} />
          <DataLabel size={7} color={SUB}>PER-METRIC · PER-FIGURE</DataLabel>
        </div>

        {/* Column headers */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 4, padding: '0 0 4px', borderBottom: `1px solid ${TEAL_DIM}` }}>
          <div style={{ width: 28 }} />
          <div style={{ flex: 1, textAlign: 'center' }}><DataLabel size={7} color={SUB}>CURRENT</DataLabel></div>
          <div style={{ width: 10, textAlign: 'center' }}><DataLabel size={7} color={SUB}>−</DataLabel></div>
          <div style={{ flex: 1, textAlign: 'center' }}><DataLabel size={7} color={SUB}>ROLLING AVG</DataLabel></div>
          <div style={{ width: 10, textAlign: 'center' }}><DataLabel size={7} color={SUB}>=</DataLabel></div>
          <div style={{ flex: 1, textAlign: 'center' }}><DataLabel size={7} color={T}>DELTA</DataLabel></div>
        </div>

        {/* Metric rows */}
        {DELTA_METRICS.map((m, i) => {
          const delta = m.current - m.avg;
          const isPositive = delta > 0;
          return (
            <div
              key={m.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                padding: '5px 0',
                borderBottom: i < DELTA_METRICS.length - 1 ? `1px solid ${TEAL_DIM}` : 'none',
                opacity: vis ? 1 : 0,
                transition: `opacity 600ms ease ${i * 100}ms`,
              }}
            >
              <div style={{ width: 28 }}>
                <DataLabel size={8} color={SUB}>{m.label}</DataLabel>
              </div>

              {/* Current score bar */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'center' }}>
                <div style={{ width: 40, height: 3, background: DARK, borderRadius: 1, overflow: 'hidden' }}>
                  <div style={{
                    width: vis ? `${m.current}%` : '0%',
                    height: '100%', background: T, borderRadius: 1, opacity: 0.6,
                    transition: `width 1s ease ${i * 80}ms`,
                  }} />
                </div>
                <DataLabel size={8} color={TEXT}>{m.current}</DataLabel>
              </div>

              <div style={{ width: 10, textAlign: 'center' }}><DataLabel size={8} color={SUB}>−</DataLabel></div>

              {/* Rolling avg bar */}
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'center' }}>
                <div style={{ width: 40, height: 3, background: DARK, borderRadius: 1, overflow: 'hidden' }}>
                  <div style={{
                    width: vis ? `${m.avg}%` : '0%',
                    height: '100%', background: TEAL_MID, borderRadius: 1, opacity: 0.4,
                    transition: `width 1s ease ${i * 80 + 400}ms`,
                  }} />
                </div>
                <DataLabel size={8} color={SUB}>{m.avg}</DataLabel>
              </div>

              <div style={{ width: 10, textAlign: 'center' }}><DataLabel size={8} color={SUB}>=</DataLabel></div>

              {/* Delta result */}
              <div style={{ flex: 1, textAlign: 'center' }}>
                <span style={{
                  fontFamily: MONO, fontSize: 10, fontWeight: 600,
                  color: showDelta ? (isPositive ? T : A) : 'transparent',
                  transition: 'color 500ms ease',
                }}>
                  {isPositive ? '+' : ''}{delta}
                </span>
              </div>
            </div>
          );
        })}

        {/* Principle */}
        <div style={{ marginTop: 8, textAlign: 'center' }}>
          <DataLabel size={7} color={TEAL_MID}>POSITIVE Δ = ELEVATED · NEGATIVE Δ = BELOW TYPICAL · ZERO = ON BASELINE</DataLabel>
        </div>
      </div>
    </WidgetFrame>
  );
}


// ═══════════════════════════════════════════════════════
// 3. CONSENSUS ASSEMBLY WIDGET
//    3 independent outputs → convergence computation
// ═══════════════════════════════════════════════════════

export function ConsensusAssemblyWidget() {
  const { ref, vis } = useVisible();
  const [phase, setPhase] = useState(0); // 0=idle, 1=outputs received, 2=comparing, 3=result

  useEffect(() => {
    if (!vis) return;
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2800),
    ];
    return () => timers.forEach(clearTimeout);
  }, [vis]);

  const modelResults = [
    { id: 'GP-4', framing: 'ECONOMIC', scores: [72, 34, 61, 28] },
    { id: 'GP-G', framing: 'ECONOMIC', scores: [68, 38, 55, 31] },
    { id: 'GP-C', framing: 'POPULIST', scores: [74, 29, 72, 24] },
  ];

  return (
    <WidgetFrame stamp="METH-CON // INDEPENDENT OUTPUTS → CONVERGENCE RATIO">
      <div ref={ref} style={{ padding: '4px 0' }}>

        {/* Phase 1: Three independent outputs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 8 }}>
          {modelResults.map((model, mi) => {
            const divergent = model.framing !== modelResults[0].framing;
            return (
              <div
                key={model.id}
                style={{
                  flex: 1,
                  padding: '4px 4px',
                  border: `1px solid ${phase >= 1 ? (divergent && phase >= 2 ? 'rgba(212,167,45,0.15)' : TEAL_LO) : TEAL_DIM}`,
                  borderRadius: 3,
                  background: divergent && phase >= 2 ? 'rgba(212,167,45,0.02)' : 'transparent',
                  opacity: phase >= 1 ? 1 : 0.15,
                  transition: `all 600ms ease ${mi * 120}ms`,
                  textAlign: 'center',
                }}
              >
                <DataLabel size={7} color={TEXT}>{model.id}</DataLabel>
                <div style={{ marginTop: 2 }}>
                  <DataLabel size={6} color={divergent && phase >= 2 ? A : T}>{model.framing}</DataLabel>
                </div>
                {/* Mini score dots */}
                <div style={{ display: 'flex', gap: 1, justifyContent: 'center', marginTop: 3 }}>
                  {model.scores.map((s, si) => (
                    <div
                      key={si}
                      style={{
                        width: 3, height: 3, borderRadius: '50%',
                        background: divergent && phase >= 2 ? A : T,
                        opacity: 0.2 + (s / 100) * 0.5,
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Phase 2: Comparison arrows */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 8,
          opacity: phase >= 2 ? 1 : 0,
          transition: 'opacity 600ms ease',
        }}>
          <div style={{ width: 20, height: 1, background: T, opacity: 0.3 }} />
          <DataLabel size={7} color={phase >= 2 ? T : SUB}>
            {phase >= 2 ? 'COMPARING OUTPUTS' : '—'}
          </DataLabel>
          <div style={{ width: 20, height: 1, background: T, opacity: 0.3 }} />
        </div>

        {/* Phase 3: Convergence result */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '6px 8px',
          border: `1px solid ${phase >= 3 ? TEAL_LO : TEAL_DIM}`,
          borderRadius: 4,
          opacity: phase >= 3 ? 1 : 0.15,
          transition: 'all 600ms ease',
        }}>
          {/* Mini convergence ring */}
          <svg viewBox="0 0 32 32" style={{ width: 32, height: 32, flexShrink: 0 }}>
            <circle cx="16" cy="16" r="12" fill="none" stroke={TEAL_DIM} strokeWidth="2" />
            {[0, 1, 2].map((seg) => {
              const segLen = (2 * Math.PI * 12) / 3;
              const gap = 3;
              const active = seg < 2; // 2/3 converged
              return (
                <circle
                  key={seg}
                  cx="16" cy="16" r="12"
                  fill="none"
                  stroke={phase >= 3 ? (active ? T : 'rgba(212,167,45,0.3)') : TEAL_DIM}
                  strokeWidth="2"
                  strokeDasharray={`${segLen - gap} ${2 * Math.PI * 12 - segLen + gap}`}
                  strokeDashoffset={-seg * segLen + (2 * Math.PI * 12) / 4}
                  strokeLinecap="round"
                  style={{ transition: 'stroke 600ms ease' }}
                />
              );
            })}
            <text x="16" y="18" textAnchor="middle" style={{ fontFamily: MONO, fontSize: 8, fontWeight: 600, fill: phase >= 3 ? A : SUB }}>
              2/3
            </text>
          </svg>

          <div style={{ flex: 1 }}>
            <DataLabel size={9} color={TEXT}>CONVERGENCE RESULT</DataLabel>
            <div style={{ marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
              <DataLabel size={7} color={T}>GP-4 + GP-G ALIGNED</DataLabel>
              <DataLabel size={7} color={A}>GP-C DIVERGENT</DataLabel>
            </div>
          </div>
        </div>

        {/* Principle */}
        <div style={{ marginTop: 8, textAlign: 'center' }}>
          <DataLabel size={7} color={TEAL_MID}>CONSENSUS IS ADDITIVE · NEVER OVERRIDES INDIVIDUAL OUTPUTS</DataLabel>
        </div>
      </div>
    </WidgetFrame>
  );
}


// ═══════════════════════════════════════════════════════
// 4. SPLIT MICROSCOPE™ WIDGET
//    Analytical: how variance is surfaced between models
// ═══════════════════════════════════════════════════════

const MICRO_METRICS = ['REP', 'NOV', 'AFF', 'ENT'];
const MODEL_A_VALS = [72, 34, 55, 28];
const MODEL_B_VALS = [68, 38, 58, 31];
const MODEL_C_VALS = [74, 29, 72, 24]; // Divergent on AFF

export function SplitMicroscopeWidget() {
  const { ref, vis } = useVisible();
  const [highlightIdx, setHighlightIdx] = useState(-1);

  useEffect(() => {
    if (!vis) return;
    // Highlight divergent metric (AFF) after initial reveal
    const timer = setTimeout(() => setHighlightIdx(2), 2200);
    return () => clearTimeout(timer);
  }, [vis]);

  return (
    <WidgetFrame stamp="METH-SPL // WHERE MODELS DIVERGE">
      <div ref={ref} style={{ padding: '4px 0' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
          <DataLabel size={8} color={TEXT}>SPLIT MICROSCOPE™</DataLabel>
          <div style={{ flex: 1 }} />
          <DataLabel size={7} color={SUB}>SIDE-BY-SIDE DIVERGENCE VIEW</DataLabel>
        </div>

        {/* Three-model comparison grid */}
        <div style={{ display: 'flex', gap: 2, marginBottom: 6 }}>
          {/* Row headers */}
          <div style={{ width: 28, display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 18 }}>
            {MICRO_METRICS.map((m) => (
              <div key={m} style={{ height: 16, display: 'flex', alignItems: 'center' }}>
                <DataLabel size={7} color={SUB}>{m}</DataLabel>
              </div>
            ))}
          </div>

          {/* Model columns */}
          {[
            { id: 'GP-4', vals: MODEL_A_VALS },
            { id: 'GP-G', vals: MODEL_B_VALS },
            { id: 'GP-C', vals: MODEL_C_VALS },
          ].map((model, mi) => {
            const isDivergentModel = mi === 2;
            return (
              <div
                key={model.id}
                style={{
                  flex: 1, padding: '4px 3px',
                  border: `1px solid ${isDivergentModel && highlightIdx >= 0 ? 'rgba(212,167,45,0.15)' : TEAL_DIM}`,
                  borderRadius: 3,
                  background: isDivergentModel && highlightIdx >= 0 ? 'rgba(212,167,45,0.02)' : 'transparent',
                  opacity: vis ? 1 : 0,
                  transition: `all 600ms ease ${mi * 120}ms`,
                }}
              >
                <div style={{ textAlign: 'center', marginBottom: 4 }}>
                  <DataLabel size={7} color={isDivergentModel && highlightIdx >= 0 ? A : TEXT}>{model.id}</DataLabel>
                </div>
                {model.vals.map((val, vi) => {
                  const isHighlight = vi === highlightIdx;
                  const isDivergentCell = isDivergentModel && isHighlight;
                  const deviation = isDivergentModel ? Math.abs(val - MODEL_A_VALS[vi]) : 0;
                  return (
                    <div key={vi} style={{
                      height: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: isDivergentCell ? 'rgba(212,167,45,0.06)' : 'transparent',
                      borderRadius: 2,
                      transition: 'background 500ms ease',
                    }}>
                      <DataLabel size={9} color={isDivergentCell ? A : T}>{val}</DataLabel>
                      {isDivergentCell && deviation > 10 && (
                        <DataLabel size={6} color={A}>&nbsp;+{deviation}</DataLabel>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Divergence callout */}
        {highlightIdx >= 0 && (
          <div style={{
            padding: '3px 6px',
            background: 'rgba(212,167,45,0.04)',
            border: `1px solid rgba(212,167,45,0.1)`,
            borderRadius: 3,
            display: 'flex', alignItems: 'center', gap: 4,
            opacity: vis ? 1 : 0,
            transition: 'opacity 600ms ease 2500ms',
          }}>
            <div style={{ width: 3, height: 3, borderRadius: '50%', background: A }} />
            <DataLabel size={7} color={A}>AFF DIVERGENCE: GP-C +17 vs GP-4</DataLabel>
            <div style={{ flex: 1 }} />
            <DataLabel size={7} color={SUB}>SURFACED · NOT SUPPRESSED</DataLabel>
          </div>
        )}

        <div style={{ marginTop: 6, textAlign: 'center' }}>
          <DataLabel size={7} color={TEAL_MID}>WHEN MODELS DISAGREE · YOU SEE IT</DataLabel>
        </div>
      </div>
    </WidgetFrame>
  );
}


// ═══════════════════════════════════════════════════════
// 5. NARRATIVE SYNC™ WIDGET
//    Analytical: how convergence detection works (B2B)
// ═══════════════════════════════════════════════════════

const SYNC_FIGURES = [
  { label: 'FIG-01', strand: [0.2, 0.25, 0.35, 0.50, 0.62, 0.71, 0.78] },
  { label: 'FIG-02', strand: [0.8, 0.72, 0.60, 0.55, 0.64, 0.70, 0.76] },
  { label: 'FIG-03', strand: [0.5, 0.48, 0.52, 0.58, 0.65, 0.72, 0.77] },
];

export function NarrativeSyncWidget() {
  const { ref, vis } = useVisible();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!vis) return;
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 2000),
      setTimeout(() => setPhase(3), 3200),
    ];
    return () => timers.forEach(clearTimeout);
  }, [vis]);

  const W = 220, H = 90;
  const PAD_X = 20, PAD_Y = 10;

  return (
    <WidgetFrame stamp="METH-NSC // CROSS-FIGURE FRAMING CONVERGENCE">
      <div ref={ref} style={{ padding: '4px 0' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
          <DataLabel size={8} color={TEXT}>NARRATIVE SYNC™</DataLabel>
          <div style={{ flex: 1 }} />
          <div style={{ padding: '1px 5px', border: `1px solid ${TEAL_LO}`, borderRadius: 2 }}>
            <DataLabel size={6} color={T}>B2B</DataLabel>
          </div>
        </div>

        {/* Convergence strands */}
        <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
          {/* Time axis */}
          <line x1={PAD_X} y1={H - PAD_Y} x2={W - PAD_X} y2={H - PAD_Y} stroke={TEAL_DIM} strokeWidth="0.5" />
          {Array.from({ length: 7 }).map((_, i) => {
            const x = PAD_X + (i / 6) * (W - PAD_X * 2);
            return <line key={i} x1={x} y1={H - PAD_Y - 2} x2={x} y2={H - PAD_Y + 1} stroke={TEAL_DIM} strokeWidth="0.5" />;
          })}

          {/* Convergence zone highlight */}
          {phase >= 2 && (
            <rect
              x={PAD_X + (4 / 6) * (W - PAD_X * 2)}
              y={PAD_Y}
              width={(2 / 6) * (W - PAD_X * 2)}
              height={H - PAD_Y * 2}
              fill="rgba(45,212,191,0.03)"
              stroke={TEAL_LO}
              strokeWidth="0.5"
              strokeDasharray="3 3"
              rx="2"
              opacity={phase >= 2 ? 1 : 0}
              style={{ transition: 'opacity 600ms ease' }}
            />
          )}

          {/* Figure strands */}
          {SYNC_FIGURES.map((fig, fi) => {
            const points = fig.strand.map((v, i) => {
              const x = PAD_X + (i / 6) * (W - PAD_X * 2);
              const y = PAD_Y + (1 - v) * (H - PAD_Y * 2);
              return `${x},${y}`;
            }).join(' ');
            return (
              <polyline
                key={fi}
                points={points}
                fill="none"
                stroke={T}
                strokeWidth="1"
                opacity={phase >= 1 ? 0.2 + fi * 0.15 : 0}
                style={{ transition: `opacity 800ms ease ${fi * 200}ms` }}
              />
            );
          })}

          {/* Convergence junction node */}
          {phase >= 3 && (
            <g>
              <circle
                cx={PAD_X + (6 / 6) * (W - PAD_X * 2)}
                cy={PAD_Y + (1 - 0.77) * (H - PAD_Y * 2)}
                r="4"
                fill="rgba(45,212,191,0.15)"
                stroke={T}
                strokeWidth="1"
              >
                <animate attributeName="r" values="3;5;3" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <text
                x={PAD_X + (6 / 6) * (W - PAD_X * 2) - 12}
                y={PAD_Y + (1 - 0.77) * (H - PAD_Y * 2) - 7}
                style={{ fontFamily: MONO, fontSize: 5, fill: T, opacity: 0.6 }}
              >
                SYNC
              </text>
            </g>
          )}

          {/* Figure labels */}
          {SYNC_FIGURES.map((fig, fi) => {
            const y = PAD_Y + (1 - fig.strand[0]) * (H - PAD_Y * 2);
            return (
              <text
                key={fi}
                x={PAD_X - 3}
                y={y + 2}
                textAnchor="end"
                style={{ fontFamily: MONO, fontSize: 5, fill: SUB, opacity: phase >= 1 ? 0.4 : 0, transition: 'opacity 600ms ease' }}
              >
                {fig.label}
              </text>
            );
          })}

          {/* Time labels */}
          <text x={PAD_X} y={H - 2} style={{ fontFamily: MONO, fontSize: 4, fill: SUB, opacity: 0.3 }}>T-6</text>
          <text x={W - PAD_X} y={H - 2} textAnchor="end" style={{ fontFamily: MONO, fontSize: 4, fill: SUB, opacity: 0.3 }}>NOW</text>
        </svg>

        {/* Result callout */}
        <div style={{
          marginTop: 6, padding: '3px 6px',
          border: `1px solid ${phase >= 3 ? TEAL_LO : TEAL_DIM}`,
          borderRadius: 3,
          display: 'flex', alignItems: 'center', gap: 4,
          opacity: phase >= 3 ? 1 : 0.15,
          transition: 'all 600ms ease',
        }}>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: T, opacity: 0.6 }}>
            {phase >= 3 && <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />}
          </div>
          <DataLabel size={7} color={T}>CONVERGENCE DETECTED</DataLabel>
          <div style={{ flex: 1 }} />
          <DataLabel size={7} color={SUB}>3 FIGURES · 6-DAY WINDOW</DataLabel>
        </div>

        <div style={{ marginTop: 6, textAlign: 'center' }}>
          <DataLabel size={7} color={TEAL_MID}>CORRELATION SURFACED AS SIGNAL · CAUSATION NOT IMPLIED</DataLabel>
        </div>
      </div>
    </WidgetFrame>
  );
}
