'use client';

/* ─────────────────────────────────────────────────────────
   LIVE WIDGETS — Analytical Methodology Demonstrations
   ─────────────────────────────────────────────────────────
   Animated demos for the Methodology page showing HOW
   the measurement pipeline works. Analytical, not flashy.
   Complements the "How It Works" cards with visual proof.

   Widget Index:
   1. PipelineWidget       — Input → parallel models → outputs
   2. DeltaComputeWidget   — Current vs rolling avg = delta
   3. ConsensusAssemblyWidget — Outputs → convergence ratio
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
  const [step, setStep] = useState(0); // 0=idle, 1=input, 2=extraction, 3=processing, 4=outputs

  useEffect(() => {
    if (!vis) return;
    const timers = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1000),
      setTimeout(() => setStep(3), 1800),
      setTimeout(() => setStep(4), 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [vis]);

  const models = [
    { id: 'GP', color: T },
    { id: 'CL', color: T },
    { id: 'GR', color: T },
  ];

  return (
    <WidgetFrame stamp="METH-PIPE // INPUT → EXTRACTION → PARALLEL ANALYSIS → OUTPUT">
      <div ref={ref} style={{ padding: '6px 0' }}>

        {/* Step 1: Input normalization */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10,
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
            <DataLabel size={8} color={step >= 1 ? TEXT : SUB}>RAW SOURCE INPUT</DataLabel>
            <DataLabel size={7} color={SUB}>Public statement ingested from source</DataLabel>
          </div>
          <DataLabel size={7} color={step >= 1 ? T : TEAL_DIM}>
            {step >= 1 ? '✓ CAPTURED' : '—'}
          </DataLabel>
        </div>

        {/* Flow line: input → extraction */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 6px' }}>
          <div style={{
            width: 1, height: 12,
            background: step >= 2 ? `linear-gradient(180deg, ${T}, ${TEAL_LO})` : TEAL_DIM,
            transition: 'background 600ms ease',
          }} />
        </div>

        {/* Step 2: Gemini extraction/structuring */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10,
          padding: '5px 6px',
          border: `1px solid ${step >= 2 ? TEAL_LO : TEAL_DIM}`,
          borderRadius: 4,
          opacity: step >= 2 ? 1 : 0.15,
          transition: 'all 600ms ease',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {step === 2 && (
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 1,
              background: `linear-gradient(90deg, transparent, ${T}, transparent)`,
              animation: 'live-scan-ext 1.2s ease-in-out infinite',
            }} />
          )}
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            background: step >= 3 ? T : (step >= 2 ? 'rgba(45,212,191,0.4)' : TEAL_DIM),
            transition: 'background 400ms ease',
          }} />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1 }}>
            <DataLabel size={8} color={step >= 2 ? TEXT : SUB}>EXTRACTION · STRUCTURING</DataLabel>
            <DataLabel size={6} color={step >= 2 ? SUB : TEAL_DIM}>Gemini · Normalize → canonical format</DataLabel>
          </div>
          <DataLabel size={7} color={step >= 3 ? T : (step >= 2 ? 'rgba(45,212,191,0.5)' : TEAL_DIM)}>
            {step >= 3 ? '✓ STRUCTURED' : (step >= 2 ? 'EXTRACTING' : '—')}
          </DataLabel>
        </div>

        {/* Flow line: extraction → split */}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 6px' }}>
          <div style={{
            width: 1, height: 12,
            background: step >= 3 ? `linear-gradient(180deg, ${T}, ${TEAL_LO})` : TEAL_DIM,
            transition: 'background 600ms ease',
          }} />
        </div>

        {/* Step 3: Parallel analysis model lanes */}
        <div style={{ display: 'flex', gap: 6 }}>
          {models.map((model, mi) => (
            <div
              key={model.id}
              style={{
                flex: 1,
                padding: '6px 5px',
                border: `1px solid ${step >= 3 ? TEAL_LO : TEAL_DIM}`,
                borderRadius: 4,
                textAlign: 'center',
                opacity: step >= 3 ? 1 : 0.15,
                transition: `all 600ms ease ${mi * 150}ms`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Processing scanline */}
              {step === 3 && (
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: `linear-gradient(90deg, transparent, ${T}, transparent)`,
                  animation: `live-scan-${mi} 1.5s ease-in-out infinite ${mi * 200}ms`,
                }} />
              )}

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3, marginBottom: 3 }}>
                <div style={{
                  width: 4, height: 4, borderRadius: '50%',
                  background: step >= 4 ? T : (step >= 3 ? 'rgba(45,212,191,0.4)' : TEAL_DIM),
                  transition: 'background 400ms ease',
                }} />
                <DataLabel size={8} color={TEXT}>{model.id}</DataLabel>
              </div>

              <DataLabel size={7} color={step >= 4 ? T : (step >= 3 ? 'rgba(45,212,191,0.5)' : SUB)}>
                {step >= 4 ? 'COMPLETE' : (step >= 3 ? 'ANALYZING' : 'STANDBY')}
              </DataLabel>

              {/* Mini output preview */}
              {step >= 4 && (
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
            background: step >= 4 ? `linear-gradient(180deg, ${TEAL_LO}, ${T})` : TEAL_DIM,
            transition: 'background 600ms ease',
          }} />
        </div>

        {/* Step 4: Output display */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '4px 6px',
          border: `1px solid ${step >= 4 ? TEAL_LO : TEAL_DIM}`,
          borderRadius: 4,
          opacity: step >= 4 ? 1 : 0.15,
          transition: 'all 600ms ease',
        }}>
          <DataLabel size={8} color={step >= 4 ? TEXT : SUB}>SIDE-BY-SIDE DISPLAY</DataLabel>
          <div style={{ flex: 1 }} />
          <DataLabel size={7} color={step >= 4 ? T : TEAL_DIM}>
            {step >= 4 ? 'INDEPENDENT OUTPUTS' : '—'}
          </DataLabel>
        </div>

        {/* Principle callout */}
        <div style={{ marginTop: 8, textAlign: 'center' }}>
          <DataLabel size={7} color={TEAL_MID}>NO MODEL SEES ANOTHER&apos;S OUTPUT · SEPARATION IS STRUCTURAL</DataLabel>
        </div>
      </div>

      <style>{`
        @keyframes live-scan-ext { 0%,100% { transform: translateX(-100%); } 50% { transform: translateX(100%); } }
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
    { id: 'GP', framing: 'ECONOMIC', scores: [72, 34, 61, 28] },
    { id: 'CL', framing: 'ECONOMIC', scores: [68, 38, 55, 31] },
    { id: 'GR', framing: 'POPULIST', scores: [74, 29, 72, 24] },
  ];

  return (
    <WidgetFrame stamp="METH-CON // INDEPENDENT OUTPUTS → CONVERGENCE RATIO">
      <div ref={ref} style={{ padding: '4px 0' }}>

        {/* Phase 1: Independent outputs */}
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
              <DataLabel size={7} color={T}>GP + CL ALIGNED</DataLabel>
              <DataLabel size={7} color={A}>GR DIVERGENT</DataLabel>
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

