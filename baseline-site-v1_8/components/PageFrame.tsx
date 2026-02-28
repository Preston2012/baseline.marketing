'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

/* ─────────────────────────────────────────────────────────
   PAGE FRAME — Viewport reticles + gradient hash marks
   ─────────────────────────────────────────────────────────
   Brand-level ambient treatment. Fades in on mount.
   Excluded on: legal, privacy, terms, eula, pricing,
   do-not-sell pages.
   ───────────────────────────────────────────────────────── */

const EXCLUDED = ['/privacy', '/terms', '/eula', '/do-not-sell-or-share', '/pricing'];

const RETICLE_SIZE = 20;
const INSET = 12;
const RETICLE_ALPHA = 0.06;
const HASH_EDGE_ALPHA = 0.025;
const HASH_CENTER_ALPHA = 0.08;

function gradientAlpha(t: number): number {
  const centerDist = Math.abs(t - 0.5) * 2;
  return HASH_EDGE_ALPHA + (1 - centerDist) * (HASH_CENTER_ALPHA - HASH_EDGE_ALPHA);
}

export function PageFrame() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  // Don't render on excluded pages
  const excluded = EXCLUDED.some(p => pathname.startsWith(p));

  useEffect(() => {
    if (excluded) return;
    const t = setTimeout(() => setVisible(true), 400);
    return () => clearTimeout(t);
  }, [excluded]);

  if (excluded) return null;

  const rc = `rgba(45,212,191,${RETICLE_ALPHA})`;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 50,
        opacity: visible ? 1 : 0,
        transition: 'opacity 1.2s ease-out',
      }}
    >
      {/* Corner reticles */}
      <div style={{ position: 'absolute', top: INSET, left: INSET, width: RETICLE_SIZE, height: RETICLE_SIZE, borderTop: `1px solid ${rc}`, borderLeft: `1px solid ${rc}` }} />
      <div style={{ position: 'absolute', top: INSET, right: INSET, width: RETICLE_SIZE, height: RETICLE_SIZE, borderTop: `1px solid ${rc}`, borderRight: `1px solid ${rc}` }} />
      <div style={{ position: 'absolute', bottom: INSET, left: INSET, width: RETICLE_SIZE, height: RETICLE_SIZE, borderBottom: `1px solid ${rc}`, borderLeft: `1px solid ${rc}` }} />
      <div style={{ position: 'absolute', bottom: INSET, right: INSET, width: RETICLE_SIZE, height: RETICLE_SIZE, borderBottom: `1px solid ${rc}`, borderRight: `1px solid ${rc}` }} />

      {/* Registration dots: inside each reticle corner */}
      <div style={{ position: 'absolute', top: INSET + 3, left: INSET + 3, width: 3, height: 3, borderRadius: '50%', background: `rgba(45,212,191,${RETICLE_ALPHA * 0.8})` }} />
      <div style={{ position: 'absolute', top: INSET + 3, right: INSET + 3, width: 3, height: 3, borderRadius: '50%', background: `rgba(45,212,191,${RETICLE_ALPHA * 0.8})` }} />
      <div style={{ position: 'absolute', bottom: INSET + 3, left: INSET + 3, width: 3, height: 3, borderRadius: '50%', background: `rgba(45,212,191,${RETICLE_ALPHA * 0.8})` }} />
      <div style={{ position: 'absolute', bottom: INSET + 3, right: INSET + 3, width: 3, height: 3, borderRadius: '50%', background: `rgba(45,212,191,${RETICLE_ALPHA * 0.8})` }} />

      {/* Top hash marks */}
      <div style={{ position: 'absolute', top: INSET, left: INSET + RETICLE_SIZE + 8, right: INSET + RETICLE_SIZE + 8, height: 1 }}>
        {Array.from({ length: 24 }).map((_, i) => {
          const t = i / 23;
          const a = gradientAlpha(t);
          return <div key={`t${i}`} style={{ position: 'absolute', left: `${t * 100}%`, top: 0, width: 1, height: i % 6 === 0 ? 6 : 3, background: `rgba(45,212,191,${a.toFixed(4)})` }} />;
        })}
      </div>

      {/* Bottom hash marks */}
      <div style={{ position: 'absolute', bottom: INSET, left: INSET + RETICLE_SIZE + 8, right: INSET + RETICLE_SIZE + 8, height: 1 }}>
        {Array.from({ length: 24 }).map((_, i) => {
          const t = i / 23;
          const a = gradientAlpha(t);
          return <div key={`b${i}`} style={{ position: 'absolute', left: `${t * 100}%`, bottom: 0, width: 1, height: i % 6 === 0 ? 6 : 3, background: `rgba(45,212,191,${a.toFixed(4)})` }} />;
        })}
      </div>

      {/* Left hash marks */}
      <div style={{ position: 'absolute', left: INSET, top: INSET + RETICLE_SIZE + 8, bottom: INSET + RETICLE_SIZE + 8, width: 1 }}>
        {Array.from({ length: 18 }).map((_, i) => {
          const t = i / 17;
          const a = gradientAlpha(t);
          return <div key={`l${i}`} style={{ position: 'absolute', top: `${t * 100}%`, left: 0, height: 1, width: i % 4 === 0 ? 6 : 3, background: `rgba(45,212,191,${a.toFixed(4)})` }} />;
        })}
      </div>

      {/* Right hash marks */}
      <div style={{ position: 'absolute', right: INSET, top: INSET + RETICLE_SIZE + 8, bottom: INSET + RETICLE_SIZE + 8, width: 1 }}>
        {Array.from({ length: 18 }).map((_, i) => {
          const t = i / 17;
          const a = gradientAlpha(t);
          return <div key={`r${i}`} style={{ position: 'absolute', top: `${t * 100}%`, right: 0, height: 1, width: i % 4 === 0 ? 6 : 3, background: `rgba(45,212,191,${a.toFixed(4)})` }} />;
        })}
      </div>
    </div>
  );
}
