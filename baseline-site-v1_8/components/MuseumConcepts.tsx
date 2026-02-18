'use client';

/* ─────────────────────────────────────────────────────────
   MUSEUM CONCEPTS V2 — Gallery Art for ™ Surfaces
   ─────────────────────────────────────────────────────────
   Each piece: minimal geometry, vast darkness, teal glow
   at intersection points, per-piece CSS animation.
   NO labels. NO legends. NO text. NO data.
   Signal emerging from darkness.
   
   Reference: GPT concept images B1–B13
   ───────────────────────────────────────────────────────── */

import { useEffect, useRef, useState } from 'react';

const T = '#2dd4bf';
const MONO = 'var(--font-jetbrains, monospace)';
const BG = '#0c1a23';

// ── Shared wrapper: stamp + reticle corners ──
function ConceptWrap({ stamp, children }: { stamp: string; children: React.ReactNode }) {
  return (
    <div style={{ background: BG, width: '100%', position: 'relative', overflow: 'hidden', padding: '10px 8px 6px' }}>
      <div style={{ fontFamily: MONO, fontSize: 7, letterSpacing: '0.15em', color: 'rgba(45,212,191,0.15)', textTransform: 'uppercase', marginBottom: 6 }}>
        {stamp}
      </div>
      <div style={{ position: 'absolute', top: 5, right: 5, width: 8, height: 8, borderTop: '1px solid rgba(45,212,191,0.08)', borderRight: '1px solid rgba(45,212,191,0.08)' }} />
      <div style={{ position: 'absolute', bottom: 5, left: 5, width: 8, height: 8, borderBottom: '1px solid rgba(45,212,191,0.08)', borderLeft: '1px solid rgba(45,212,191,0.08)' }} />
      {children}
    </div>
  );
}

// ── Pentagon point helper ──
function pPt(cx: number, cy: number, r: number, i: number): [number, number] {
  const a = (Math.PI * 2 * i) / 5 - Math.PI / 2;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
}

// ── Viewport-triggered animation hook ──
function useVisible() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}


// ═══════════════════════════════════════════
// 1. BASELINE™ — The Measurement Stack
// ═══════════════════════════════════════════
// Three signal lines converging to center glow
export function BaselineConcept() {
  const { ref, vis } = useVisible();
  return (
    <ConceptWrap stamp="BSLN-SYS // SIGNAL STACK">
      <div ref={ref}>
        <style>{`
          @keyframes bsln-breathe { 0%,100% { opacity: 0.5; } 50% { opacity: 0.85; } }
          .bsln-core { animation: bsln-breathe 3s ease-in-out infinite; }
          .bsln-line { stroke-dasharray: 600; stroke-dashoffset: 600; }
          .bsln-line.on { transition: stroke-dashoffset 1.8s ease-out; stroke-dashoffset: 0; }
        `}</style>
        <svg viewBox="0 0 360 200" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <radialGradient id="bsln-g1" cx="50%" cy="50%" r="25%">
              <stop offset="0%" stopColor={T} stopOpacity="0.15" />
              <stop offset="60%" stopColor={T} stopOpacity="0.04" />
              <stop offset="100%" stopColor={T} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="bsln-flare" cx="50%" cy="50%" r="8%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.3" />
              <stop offset="40%" stopColor={T} stopOpacity="0.15" />
              <stop offset="100%" stopColor={T} stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="180" cy="100" r="90" fill="url(#bsln-g1)" />

          {[-18, 0, 18].map((offset, i) => (
            <path key={i}
              className={`bsln-line${vis ? ' on' : ''}`}
              style={{ transitionDelay: `${i * 200}ms` }}
              d={`M 20 ${100 + offset * 2.5} Q 100 ${100 + offset * 1.2} 180 100 Q 260 ${100 - offset * 1.2} 340 ${100 - offset * 2.5}`}
              fill="none" stroke={T}
              strokeWidth={i === 1 ? 1.2 : 0.6}
              opacity={i === 1 ? 0.3 : 0.15}
            />
          ))}

          <circle cx="180" cy="100" r="12" fill="url(#bsln-flare)" />
          <circle className="bsln-core" cx="180" cy="100" r="4" fill={T} opacity="0.5" />
          <line x1="40" y1="100" x2="320" y2="100" stroke={T} strokeWidth="0.3" opacity="0.06" />

          {/* Hashmark measurement rulers — distinguishes from Sync */}
          {Array.from({ length: 15 }, (_, i) => {
            const x = 60 + i * 16;
            const h = i % 4 === 0 ? 5 : 2;
            return <line key={i} x1={x} y1={100 - h} x2={x} y2={100 + h} stroke={T} strokeWidth="0.3" opacity="0.04" />;
          })}
        </svg>
      </div>
    </ConceptWrap>
  );
}


// ═══════════════════════════════════════════
// 2. THE RECEIPT™ — Pattern Memory
// ═══════════════════════════════════════════
// Ref B1: Wave line with glow at crossing nodes
export function ReceiptConcept() {
  const { ref, vis } = useVisible();
  return (
    <ConceptWrap stamp="RCPT-TML // PATTERN MEMORY">
      <div ref={ref}>
        <style>{`
          @keyframes rcpt-glow { 0%,100% { opacity: 0.4; } 50% { opacity: 0.8; } }
          .rcpt-wave { stroke-dasharray: 500; stroke-dashoffset: 500; }
          .rcpt-wave.on { transition: stroke-dashoffset 2.2s ease-out; stroke-dashoffset: 0; }
          .rcpt-node { animation: rcpt-glow 2.5s ease-in-out infinite; }
        `}</style>
        <svg viewBox="0 0 360 200" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <radialGradient id="rcpt-flare" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.25" />
              <stop offset="30%" stopColor={T} stopOpacity="0.15" />
              <stop offset="100%" stopColor={T} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="rcpt-amb" cx="50%" cy="52%" r="20%">
              <stop offset="0%" stopColor={T} stopOpacity="0.08" />
              <stop offset="100%" stopColor={T} stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="180" cy="105" r="80" fill="url(#rcpt-amb)" />
          <line x1="30" y1="105" x2="330" y2="105" stroke={T} strokeWidth="0.5" opacity="0.12" />

          <path
            className={`rcpt-wave${vis ? ' on' : ''}`}
            d="M 30 105 Q 90 70 150 105 Q 210 140 270 105 Q 300 88 330 105"
            fill="none" stroke={T} strokeWidth="1" opacity="0.3"
          />

          <circle cx="150" cy="105" r="14" fill="url(#rcpt-flare)" />
          <circle className="rcpt-node" cx="150" cy="105" r="2.5" fill={T} opacity="0.5" />

          <circle cx="270" cy="105" r="10" fill="url(#rcpt-flare)" />
          <circle className="rcpt-node" cx="270" cy="105" r="2" fill={T} opacity="0.35" style={{ animationDelay: '0.8s' }} />
        </svg>
      </div>
    </ConceptWrap>
  );
}


// ═══════════════════════════════════════════
// 3. SIGNAL PULSE™ — Radar Ping
// ═══════════════════════════════════════════
// Ref B7: Concentric circles, center flare, sonar
export function SignalPulseConcept() {
  const { ref, vis } = useVisible();
  return (
    <ConceptWrap stamp="SIG-PLS // WAVEFORM">
      <div ref={ref}>
        <style>{`
          @keyframes spls-ring { 0% { r: 10; opacity: 0.25; stroke-width: 0.8; } 100% { r: 90; opacity: 0; stroke-width: 0.2; } }
          @keyframes spls-core { 0%,100% { opacity: 0.5; } 50% { opacity: 0.9; } }
          .spls-ping { animation: spls-ring 3.5s ease-out infinite; }
          .spls-center { animation: spls-core 2s ease-in-out infinite; }
        `}</style>
        <svg viewBox="0 0 360 200" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <radialGradient id="spls-flare" cx="50%" cy="50%" r="6%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.35" />
              <stop offset="50%" stopColor={T} stopOpacity="0.15" />
              <stop offset="100%" stopColor={T} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="spls-amb" cx="50%" cy="50%" r="35%">
              <stop offset="0%" stopColor={T} stopOpacity="0.06" />
              <stop offset="100%" stopColor={T} stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="180" cy="100" r="95" fill="url(#spls-amb)" />

          {[30, 55, 80].map((r, i) => (
            <circle key={i} cx="180" cy="100" r={r} fill="none" stroke={T}
              strokeWidth={i === 0 ? 0.8 : 0.4} opacity={0.08 + i * 0.03}
            />
          ))}

          {vis && [0, 1.2, 2.4].map((delay, i) => (
            <circle key={`p${i}`} className="spls-ping" cx="180" cy="100" r="10"
              fill="none" stroke={T} strokeWidth="0.8"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}

          <line x1="145" y1="100" x2="215" y2="100" stroke={T} strokeWidth="0.5" opacity="0.2" />
          <circle cx="180" cy="100" r="16" fill="url(#spls-flare)" />
          <circle className="spls-center" cx="180" cy="100" r="3" fill={T} opacity="0.6" />
        </svg>
      </div>
    </ConceptWrap>
  );
}


// ═══════════════════════════════════════════
// 4. FRAMING FINGERPRINT™ — Rhetorical Identity
// ═══════════════════════════════════════════
// Ref B10: Spiral whorl, slow rotation, center glow
export function FingerprintConcept() {
  const { ref, vis } = useVisible();
  return (
    <ConceptWrap stamp="FRM-FPR // IDENTITY SIGNATURE">
      <div ref={ref}>
        <style>{`
          @keyframes fp-rotate { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          @keyframes fp-core { 0%,100% { opacity: 0.4; } 50% { opacity: 0.7; } }
          .fp-whorl { transform-origin: 180px 100px; }
          .fp-whorl.on { animation: fp-rotate 60s linear infinite; }
          .fp-center { animation: fp-core 3s ease-in-out infinite; }
        `}</style>
        <svg viewBox="0 0 360 200" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <radialGradient id="fp-flare" cx="50%" cy="50%" r="8%">
              <stop offset="0%" stopColor={T} stopOpacity="0.2" />
              <stop offset="100%" stopColor={T} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="fp-amb" cx="50%" cy="50%" r="30%">
              <stop offset="0%" stopColor={T} stopOpacity="0.06" />
              <stop offset="100%" stopColor={T} stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="180" cy="100" r="90" fill="url(#fp-amb)" />

          <g className={`fp-whorl${vis ? ' on' : ''}`}>
            {Array.from({ length: 9 }, (_, i) => {
              const rx = 12 + i * 8;
              const ry = 8 + i * 7.5;
              const tilt = -15 + i * 3;
              const cx = 180 + Math.sin(i * 1.3) * 2;
              const cy = 100 + Math.cos(i * 0.9) * 1.5;
              return (
                <ellipse key={i}
                  cx={cx} cy={cy} rx={rx} ry={ry}
                  fill="none" stroke={T}
                  strokeWidth={i < 3 ? 0.8 : 0.5}
                  opacity={0.06 + (i < 4 ? i * 0.02 : (9 - i) * 0.015)}
                  transform={`rotate(${tilt} ${cx} ${cy})`}
                />
              );
            })}
          </g>

          <circle cx="180" cy="100" r="18" fill="url(#fp-flare)" />
          <circle className="fp-center" cx="180" cy="100" r="2.5" fill={T} opacity="0.5" />
        </svg>
      </div>
    </ConceptWrap>
  );
}


// ═══════════════════════════════════════════
// 5. FRAMING RADAR™ — Five-Axis Pentagon
// ═══════════════════════════════════════════
// Ref B2: Clean pentagon + 5 axis lines, center glow
export function RadarConcept() {
  const { ref, vis } = useVisible();
  const cx = 180, cy = 100, R = 65;
  return (
    <ConceptWrap stamp="FRM-RDR // 5-AXIS PENTAGON">
      <div ref={ref}>
        <style>{`
          @keyframes rdr-breathe { 0%,100% { opacity: 0.18; } 50% { opacity: 0.28; } }
          @keyframes rdr-core { 0%,100% { opacity: 0.3; } 50% { opacity: 0.7; } }
          .rdr-pent { stroke-dasharray: 400; stroke-dashoffset: 400; }
          .rdr-pent.on { transition: stroke-dashoffset 2s ease-out; stroke-dashoffset: 0; }
          .rdr-breathe { animation: rdr-breathe 4s ease-in-out infinite; }
          .rdr-center { animation: rdr-core 2.5s ease-in-out infinite; }
        `}</style>
        <svg viewBox="0 0 360 200" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <radialGradient id="rdr-flare" cx="50%" cy="50%" r="8%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.2" />
              <stop offset="50%" stopColor={T} stopOpacity="0.1" />
              <stop offset="100%" stopColor={T} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="rdr-amb" cx="50%" cy="50%" r="28%">
              <stop offset="0%" stopColor={T} stopOpacity="0.06" />
              <stop offset="100%" stopColor={T} stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx={cx} cy={cy} r="90" fill="url(#rdr-amb)" />

          {Array.from({ length: 5 }, (_, i) => {
            const [x, y] = pPt(cx, cy, R, i);
            return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={T} strokeWidth="0.4" opacity="0.1" />;
          })}

          <polygon
            className={`rdr-pent${vis ? ' on' : ''}`}
            points={Array.from({ length: 5 }, (_, i) => pPt(cx, cy, R, i).join(',')).join(' ')}
            fill="none" stroke={T} strokeWidth="1" opacity="0.22"
          />

          <polygon
            className="rdr-breathe"
            points={Array.from({ length: 5 }, (_, i) => pPt(cx, cy, R * 0.45, i).join(',')).join(' ')}
            fill="none" stroke={T} strokeWidth="0.5"
          />

          {Array.from({ length: 5 }, (_, i) => {
            const [x, y] = pPt(cx, cy, R, i);
            return <circle key={i} cx={x} cy={y} r="1.5" fill={T} opacity="0.2" />;
          })}

          <circle cx={cx} cy={cy} r="14" fill="url(#rdr-flare)" />
          <circle className="rdr-center" cx={cx} cy={cy} r="3" fill={T} opacity="0.4" />
        </svg>
      </div>
    </ConceptWrap>
  );
}


// ═══════════════════════════════════════════
// 6. LENS LAB™ — Three Systems
// ═══════════════════════════════════════════
// Ref B3: Y-junction — 3 lines meeting at bright center
export function LensLabConcept() {
  const { ref, vis } = useVisible();
  return (
    <ConceptWrap stamp="LNS-LAB // 3-SYS PARALLEL">
      <div ref={ref}>
        <style>{`
          @keyframes lens-pulse { 0%,100% { opacity: 0.5; } 50% { opacity: 0.9; } }
          .lens-ray { stroke-dasharray: 200; stroke-dashoffset: 200; }
          .lens-ray.on { transition: stroke-dashoffset 1.5s ease-out; stroke-dashoffset: 0; }
          .lens-core { animation: lens-pulse 2.5s ease-in-out infinite; }
        `}</style>
        <svg viewBox="0 0 360 200" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <radialGradient id="lens-flare" cx="50%" cy="42%" r="10%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.3" />
              <stop offset="40%" stopColor={T} stopOpacity="0.15" />
              <stop offset="100%" stopColor={T} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="lens-amb" cx="50%" cy="42%" r="25%">
              <stop offset="0%" stopColor={T} stopOpacity="0.08" />
              <stop offset="100%" stopColor={T} stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="180" cy="84" r="80" fill="url(#lens-amb)" />

          {/* Faint concentric calibration rings */}
          {[22, 44, 66].map((r, i) => (
            <circle key={i} cx="180" cy="84" r={r} fill="none" stroke={T}
              strokeWidth="0.3" opacity={0.03 + i * 0.01} strokeDasharray={i === 1 ? 'none' : '1 3'} />
          ))}

          {[
            { x: 180, y: 9 },
            { x: 115, y: 121.5 },
            { x: 245, y: 121.5 },
          ].map((end, i) => (
            <g key={i}>
              <line
                className={`lens-ray${vis ? ' on' : ''}`}
                style={{ transitionDelay: `${i * 250}ms` }}
                x1="180" y1="84" x2={end.x} y2={end.y}
                stroke={T} strokeWidth={0.7} opacity="0.2"
              />
              {/* Endpoint dots */}
              <circle cx={end.x} cy={end.y} r="1.5" fill={T} opacity="0.15" />
            </g>
          ))}

          <circle cx="180" cy="84" r="18" fill="url(#lens-flare)" />
          <circle className="lens-core" cx="180" cy="84" r="3.5" fill={T} opacity="0.6" />
        </svg>
      </div>
    </ConceptWrap>
  );
}


// ═══════════════════════════════════════════
// 7. CROSSFIRE™ — Dual Figure Comparison
// ═══════════════════════════════════════════
// Ref B6: Two angular brackets facing each other, connected
export function CrossfireConcept() {
  const { ref, vis } = useVisible();
  return (
    <ConceptWrap stamp="XFR-CMP // DUAL FIGURE">
      <div ref={ref}>
        <style>{`
          @keyframes xfr-tension { 0%,100% { opacity: 0.2; } 50% { opacity: 0.35; } }
          @keyframes xfr-core { 0%,100% { opacity: 0.4; } 50% { opacity: 0.8; } }
          .xfr-bracket { stroke-dasharray: 300; stroke-dashoffset: 300; }
          .xfr-bracket.on { transition: stroke-dashoffset 1.6s ease-out; stroke-dashoffset: 0; }
          .xfr-line { animation: xfr-tension 3s ease-in-out infinite; }
          .xfr-node { animation: xfr-core 2s ease-in-out infinite; }
        `}</style>
        <svg viewBox="0 0 360 200" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <radialGradient id="xfr-glow-l" cx="33%" cy="50%" r="12%">
              <stop offset="0%" stopColor={T} stopOpacity="0.12" />
              <stop offset="100%" stopColor={T} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="xfr-glow-r" cx="67%" cy="50%" r="12%">
              <stop offset="0%" stopColor={T} stopOpacity="0.12" />
              <stop offset="100%" stopColor={T} stopOpacity="0" />
            </radialGradient>
          </defs>

          <rect x="0" y="0" width="360" height="200" fill="url(#xfr-glow-l)" />
          <rect x="0" y="0" width="360" height="200" fill="url(#xfr-glow-r)" />

          <path
            className={`xfr-bracket${vis ? ' on' : ''}`}
            d="M 75 60 L 100 60 L 135 100 L 100 140 L 75 140"
            fill="none" stroke={T} strokeWidth="0.7" opacity="0.2"
          />

          <path
            className={`xfr-bracket${vis ? ' on' : ''}`}
            style={{ transitionDelay: '300ms' }}
            d="M 285 60 L 260 60 L 225 100 L 260 140 L 285 140"
            fill="none" stroke={T} strokeWidth="0.7" opacity="0.2"
          />

          <line className="xfr-line" x1="135" y1="100" x2="225" y2="100" stroke={T} strokeWidth="0.6" />

          <circle className="xfr-node" cx="135" cy="100" r="2.5" fill={T} opacity="0.5" />
          <circle className="xfr-node" cx="225" cy="100" r="2.5" fill={T} opacity="0.5" style={{ animationDelay: '1s' }} />
          <circle cx="180" cy="100" r="1.5" fill={T} opacity="0.15" />

          {/* Faint scanline hash marks along tension line */}
          {Array.from({ length: 7 }, (_, i) => {
            const x = 145 + i * 10;
            return <line key={i} x1={x} y1="97" x2={x} y2="103" stroke={T} strokeWidth="0.25" opacity="0.05" />;
          })}
        </svg>
      </div>
    </ConceptWrap>
  );
}


// ═══════════════════════════════════════════
// 8. CONSTELLATION NAV™ — Star Path
// ═══════════════════════════════════════════
// Ref B11: Glowing dots connected by hairlines, branching
export function ConstellationConcept() {
  const { ref, vis } = useVisible();
  const stars = [
    { x: 55, y: 50, r: 3.5 },
    { x: 110, y: 68, r: 2.5 },
    { x: 155, y: 78, r: 2.5 },
    { x: 195, y: 88, r: 3 },
    { x: 230, y: 100, r: 2.5 },
    { x: 255, y: 118, r: 2 },
    { x: 235, y: 140, r: 2 },
    { x: 305, y: 70, r: 4 },
  ];
  const edges = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[4,7]];

  return (
    <ConceptWrap stamp="CNST-NAV // TOPOLOGY">
      <div ref={ref}>
        <style>{`
          @keyframes cst-twinkle { 0%,100% { opacity: 0.3; } 50% { opacity: 0.7; } }
          .cst-edge { stroke-dasharray: 200; stroke-dashoffset: 200; }
          .cst-edge.on { transition: stroke-dashoffset 2s ease-out; stroke-dashoffset: 0; }
          .cst-star { animation: cst-twinkle 3s ease-in-out infinite; }
        `}</style>
        <svg viewBox="0 0 360 200" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <radialGradient id="cst-amb" cx="50%" cy="50%" r="35%">
              <stop offset="0%" stopColor={T} stopOpacity="0.04" />
              <stop offset="100%" stopColor={T} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="cst-star-g" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={T} stopOpacity="0.5" />
              <stop offset="100%" stopColor={T} stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="180" cy="100" r="100" fill="url(#cst-amb)" />

          {edges.map(([a, b], i) => (
            <line key={i}
              className={`cst-edge${vis ? ' on' : ''}`}
              style={{ transitionDelay: `${i * 150}ms` }}
              x1={stars[a].x} y1={stars[a].y} x2={stars[b].x} y2={stars[b].y}
              stroke={T} strokeWidth="0.4" opacity="0.12"
            />
          ))}

          {stars.map((s, i) => (
            <g key={i}>
              <circle cx={s.x} cy={s.y} r={s.r * 3} fill="url(#cst-star-g)" opacity="0.3" />
              <circle className="cst-star" cx={s.x} cy={s.y} r={s.r} fill={T}
                style={{ animationDelay: `${i * 0.4}s`, animationDuration: `${2.5 + i * 0.3}s` }}
              />
            </g>
          ))}
        </svg>
      </div>
    </ConceptWrap>
  );
}


// ═══════════════════════════════════════════
// 9. PROVISION DRIFT™ — Semantic Distance
// ═══════════════════════════════════════════
// Ref B4: Two diverging lines (teal + amber) with measurement
export function DriftConcept() {
  const { ref, vis } = useVisible();
  return (
    <ConceptWrap stamp="PRV-DFT // DRIFT CASCADE">
      <div ref={ref}>
        <style>{`
          @keyframes dft-measure { 0%,100% { opacity: 0.15; } 50% { opacity: 0.3; } }
          .dft-line { stroke-dasharray: 400; stroke-dashoffset: 400; }
          .dft-line.on { transition: stroke-dashoffset 2s ease-out; stroke-dashoffset: 0; }
          .dft-measure { animation: dft-measure 3s ease-in-out infinite; }
        `}</style>
        <svg viewBox="0 0 360 200" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <radialGradient id="dft-node" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={T} stopOpacity="0.4" />
              <stop offset="100%" stopColor={T} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="dft-amber" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#d4a72d" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#d4a72d" stopOpacity="0" />
            </radialGradient>
          </defs>

          <line className={`dft-line${vis ? ' on' : ''}`}
            x1="50" y1="110" x2="310" y2="55"
            stroke={T} strokeWidth="0.8" opacity="0.25"
          />

          <line className={`dft-line${vis ? ' on' : ''}`}
            style={{ transitionDelay: '400ms' }}
            x1="50" y1="110" x2="310" y2="150"
            stroke="#d4a72d" strokeWidth="0.7" opacity="0.2"
          />

          <line className="dft-measure" x1="200" y1="75" x2="200" y2="135" stroke={T} strokeWidth="0.4" strokeDasharray="2 2" />

          {/* Measurement ticks along dashed line */}
          {[80, 95, 110, 125].map((y, i) => (
            <line key={i} x1="197" y1={y} x2="203" y2={y} stroke={T} strokeWidth="0.3" opacity="0.08" />
          ))}

          {/* Origin crosshair */}
          <line x1="44" y1="110" x2="56" y2="110" stroke={T} strokeWidth="0.3" opacity="0.08" />
          <line x1="50" y1="104" x2="50" y2="116" stroke={T} strokeWidth="0.3" opacity="0.08" />

          <circle cx="310" cy="55" r="6" fill="url(#dft-node)" />
          <circle cx="310" cy="55" r="2" fill={T} opacity="0.4" />

          <circle cx="310" cy="150" r="6" fill="url(#dft-amber)" />
          <circle cx="310" cy="150" r="2" fill="#d4a72d" opacity="0.35" />

          <circle cx="50" cy="110" r="8" fill="url(#dft-node)" />
          <circle cx="50" cy="110" r="2.5" fill={T} opacity="0.3" />
        </svg>
      </div>
    </ConceptWrap>
  );
}


// ═══════════════════════════════════════════
// 10. SPLIT MICROSCOPE™ — Variance Cross
// ═══════════════════════════════════════════
// Ref B8: Vertical parallels + horizontal crossbar, glow at intersections
export function MicroscopeConcept() {
  const { ref, vis } = useVisible();
  return (
    <ConceptWrap stamp={`SPLT-\u03BC // DIVERGENCE MAP`}>
      <div ref={ref}>
        <style>{`
          @keyframes spm-scan { 0% { transform: translateY(-40px); opacity: 0; } 30% { opacity: 0.15; } 70% { opacity: 0.15; } 100% { transform: translateY(40px); opacity: 0; } }
          @keyframes spm-node { 0%,100% { opacity: 0.4; } 50% { opacity: 0.8; } }
          .spm-line { stroke-dasharray: 200; stroke-dashoffset: 200; }
          .spm-line.on { transition: stroke-dashoffset 1.4s ease-out; stroke-dashoffset: 0; }
          .spm-scan { animation: spm-scan 4s ease-in-out infinite; transform-origin: center; }
          .spm-node { animation: spm-node 2.5s ease-in-out infinite; }
        `}</style>
        <svg viewBox="0 0 360 200" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <radialGradient id="spm-flare" cx="50%" cy="50%" r="10%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.2" />
              <stop offset="50%" stopColor={T} stopOpacity="0.1" />
              <stop offset="100%" stopColor={T} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="spm-amb" cx="50%" cy="50%" r="20%">
              <stop offset="0%" stopColor={T} stopOpacity="0.06" />
              <stop offset="100%" stopColor={T} stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="180" cy="100" r="80" fill="url(#spm-amb)" />

          <line className={`spm-line${vis ? ' on' : ''}`}
            x1="165" y1="30" x2="165" y2="170" stroke={T} strokeWidth="0.6" opacity="0.18" />

          <line className={`spm-line${vis ? ' on' : ''}`} style={{ transitionDelay: '200ms' }}
            x1="195" y1="30" x2="195" y2="170" stroke={T} strokeWidth="0.6" opacity="0.18" />

          <line className={`spm-line${vis ? ' on' : ''}`} style={{ transitionDelay: '500ms' }}
            x1="80" y1="100" x2="280" y2="100" stroke={T} strokeWidth="0.5" opacity="0.15" />

          <path d="M 165 92 L 155 100 L 165 108" fill="none" stroke={T} strokeWidth="0.5" opacity="0.2" />
          <path d="M 195 92 L 205 100 L 195 108" fill="none" stroke={T} strokeWidth="0.5" opacity="0.2" />

          <circle cx="180" cy="100" r="18" fill="url(#spm-flare)" />
          <circle className="spm-node" cx="180" cy="100" r="2.5" fill={T} opacity="0.5" />

          {vis && <line className="spm-scan" x1="80" y1="100" x2="280" y2="100" stroke={T} strokeWidth="0.3" opacity="0.15" />}
        </svg>
      </div>
    </ConceptWrap>
  );
}


// ═══════════════════════════════════════════
// 11. INTERSECTIONS PANEL™ — Hub & Spoke
// ═══════════════════════════════════════════
// Ref B9: Central hub with radiating connections, one amber outlier
export function IntersectionsConcept() {
  const { ref, vis } = useVisible();
  const hub = { x: 165, y: 95 };
  const nodes = [
    { x: 105, y: 48, amber: false },
    { x: 195, y: 42, amber: false },
    { x: 270, y: 85, amber: true },
    { x: 100, y: 135, amber: false },
    { x: 205, y: 140, amber: false },
  ];

  return (
    <ConceptWrap stamp="XSCT-PNL // LINK TOPOLOGY">
      <div ref={ref}>
        <style>{`
          @keyframes xpn-hub { 0%,100% { opacity: 0.5; } 50% { opacity: 0.85; } }
          @keyframes xpn-orbit { 0%,100% { opacity: 0.25; } 50% { opacity: 0.55; } }
          .xpn-edge { stroke-dasharray: 200; stroke-dashoffset: 200; }
          .xpn-edge.on { transition: stroke-dashoffset 1.8s ease-out; stroke-dashoffset: 0; }
          .xpn-hub { animation: xpn-hub 2.5s ease-in-out infinite; }
          .xpn-sat { animation: xpn-orbit 3s ease-in-out infinite; }
        `}</style>
        <svg viewBox="0 0 360 200" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <radialGradient id="xpn-teal-g" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={T} stopOpacity="0.5" />
              <stop offset="100%" stopColor={T} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="xpn-amber-g" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#d4a72d" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#d4a72d" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="xpn-amb" cx="46%" cy="47%" r="30%">
              <stop offset="0%" stopColor={T} stopOpacity="0.05" />
              <stop offset="100%" stopColor={T} stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx={hub.x} cy={hub.y} r="90" fill="url(#xpn-amb)" />

          {nodes.map((n, i) => (
            <line key={i}
              className={`xpn-edge${vis ? ' on' : ''}`}
              style={{ transitionDelay: `${i * 200}ms` }}
              x1={hub.x} y1={hub.y} x2={n.x} y2={n.y}
              stroke={n.amber ? '#d4a72d' : T} strokeWidth="0.4" opacity="0.12"
            />
          ))}

          {nodes.map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r="7" fill={n.amber ? 'url(#xpn-amber-g)' : 'url(#xpn-teal-g)'} />
              <circle className="xpn-sat" cx={n.x} cy={n.y} r={n.amber ? 3 : 2.5}
                fill={n.amber ? '#d4a72d' : T}
                style={{ animationDelay: `${i * 0.5}s` }}
              />
            </g>
          ))}

          <circle cx={hub.x} cy={hub.y} r="10" fill="url(#xpn-teal-g)" />
          <circle className="xpn-hub" cx={hub.x} cy={hub.y} r="3.5" fill={T} opacity="0.6" />
        </svg>
      </div>
    </ConceptWrap>
  );
}


// ═══════════════════════════════════════════
// 12. DECLASSIFIED DOSSIER™ — Exhibit Plate
// ═══════════════════════════════════════════
// Ref B12: Tilted document with redaction bars, corner glow
export function DossierConcept() {
  const { ref, vis } = useVisible();
  return (
    <ConceptWrap stamp="DCLS-DSR // EXHIBIT PLATE">
      <div ref={ref}>
        <style>{`
          @keyframes dsr-float { 0%,100% { transform: translateY(0px) rotate(-4deg); } 50% { transform: translateY(-3px) rotate(-4deg); } }
          @keyframes dsr-dot { 0%,100% { opacity: 0.3; } 50% { opacity: 0.7; } }
          .dsr-doc { transform: rotate(-4deg); transform-origin: center; }
          .dsr-doc.on { animation: dsr-float 5s ease-in-out infinite; }
          .dsr-dot { animation: dsr-dot 2.5s ease-in-out infinite; }
        `}</style>
        <svg viewBox="0 0 360 200" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <radialGradient id="dsr-amb" cx="50%" cy="50%" r="25%">
              <stop offset="0%" stopColor={T} stopOpacity="0.05" />
              <stop offset="100%" stopColor={T} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="dsr-corner" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={T} stopOpacity="0.4" />
              <stop offset="100%" stopColor={T} stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="180" cy="100" r="90" fill="url(#dsr-amb)" />

          <g className={`dsr-doc${vis ? ' on' : ''}`}>
            <rect x="120" y="30" width="120" height="150" rx="2"
              fill="none" stroke={T} strokeWidth="0.5" opacity="0.1" />

            <rect x="120" y="30" width="120" height="150" rx="2"
              fill={T} opacity="0.015" />

            {[
              { y: 55, w: 80 },
              { y: 72, w: 95 },
              { y: 89, w: 60 },
              { y: 106, w: 85 },
              { y: 123, w: 70 },
              { y: 140, w: 50 },
            ].map((bar, i) => (
              <rect key={i}
                x={130} y={bar.y} width={bar.w} height={8} rx="1"
                fill="#000" opacity="0.6"
                stroke="rgba(45,212,191,0.04)" strokeWidth="0.3"
              />
            ))}

            {Array.from({ length: 15 }, (_, i) => (
              <line key={i}
                x1="238" y1={35 + i * 10} x2={i % 3 === 0 ? '242' : '240'} y2={35 + i * 10}
                stroke={T} strokeWidth="0.3" opacity="0.06"
              />
            ))}

            <circle cx="120" cy="30" r="6" fill="url(#dsr-corner)" />
            <circle className="dsr-dot" cx="120" cy="30" r="2" fill={T} />
          </g>
        </svg>
      </div>
    </ConceptWrap>
  );
}


// ═══════════════════════════════════════════
// 13. NARRATIVE SYNC™ — Convergence Lines
// ═══════════════════════════════════════════
// Ref B13: Multiple parallel lines converging to single bright point
export function SyncConcept() {
  const { ref, vis } = useVisible();
  const lines = [
    { yL: 78, yR: 82 },
    { yL: 88, yR: 92 },
    { yL: 98, yR: 100 },
    { yL: 108, yR: 108 },
    { yL: 118, yR: 115 },
    { yL: 125, yR: 120 },
  ];

  return (
    <ConceptWrap stamp="NRT-SYN // CONVERGENCE DETECTION">
      <div ref={ref}>
        <style>{`
          @keyframes syn-converge { 0%,100% { opacity: 0.12; } 50% { opacity: 0.25; } }
          @keyframes syn-core { 0%,100% { opacity: 0.5; } 50% { opacity: 0.9; } }
          .syn-strand { stroke-dasharray: 400; stroke-dashoffset: 400; }
          .syn-strand.on { transition: stroke-dashoffset 2s ease-out; stroke-dashoffset: 0; }
          .syn-core { animation: syn-core 3s ease-in-out infinite; }
          .syn-strands { animation: syn-converge 4s ease-in-out infinite; }
        `}</style>
        <svg viewBox="0 0 360 200" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <defs>
            <radialGradient id="syn-flare" cx="50%" cy="50%" r="8%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.3" />
              <stop offset="40%" stopColor={T} stopOpacity="0.15" />
              <stop offset="100%" stopColor={T} stopOpacity="0" />
            </radialGradient>
            <radialGradient id="syn-amb" cx="50%" cy="50%" r="20%">
              <stop offset="0%" stopColor={T} stopOpacity="0.08" />
              <stop offset="100%" stopColor={T} stopOpacity="0" />
            </radialGradient>
          </defs>

          <circle cx="180" cy="100" r="80" fill="url(#syn-amb)" />

          <g className="syn-strands">
            {lines.map((l, i) => (
              <path key={i}
                className={`syn-strand${vis ? ' on' : ''}`}
                style={{ transitionDelay: `${i * 120}ms` }}
                d={`M 30 ${l.yL} Q 130 ${l.yL} 180 100 Q 230 ${200 - l.yR} 330 ${l.yR}`}
                fill="none" stroke={T} strokeWidth={i === 2 || i === 3 ? 0.8 : 0.5}
                opacity="0.15"
              />
            ))}
          </g>

          <circle cx="180" cy="100" r="16" fill="url(#syn-flare)" />

          {/* Horizontal flare streak through convergence */}
          <line x1="140" y1="100" x2="220" y2="100" stroke={T} strokeWidth="0.4" opacity="0.15" />

          {/* Film perforation marks — top and bottom edges */}
          {Array.from({ length: 8 }, (_, i) => {
            const x = 70 + i * 32;
            return (
              <g key={i}>
                <rect x={x} y="8" width="4" height="2" rx="0.5" fill={T} opacity="0.03" />
                <rect x={x} y="190" width="4" height="2" rx="0.5" fill={T} opacity="0.03" />
              </g>
            );
          })}

          <circle className="syn-core" cx="180" cy="100" r="3.5" fill={T} opacity="0.6" />
        </svg>
      </div>
    </ConceptWrap>
  );
}
