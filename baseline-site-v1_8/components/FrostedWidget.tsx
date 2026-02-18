'use client';

import { useState } from 'react';

/* ─────────────────────────────────────────────────────────
   FROSTED WIDGET PREVIEW — Live widget behind blur
   ─────────────────────────────────────────────────────────
   Used in features and methodology pages to give a
   frosted preview of interactive widgets. All pre-launch.
   
   Easter egg: tap/hold to partially defrost for a sneak peek.
   ───────────────────────────────────────────────────────── */

export function FrostedWidgetPreview({ children, label, tier }: { children: React.ReactNode; label?: string; tier?: string }) {
  const [peeking, setPeeking] = useState(false);

  return (
    <div
      onPointerDown={() => setPeeking(true)}
      onPointerUp={() => setPeeking(false)}
      onPointerLeave={() => setPeeking(false)}
      onPointerCancel={() => setPeeking(false)}
      style={{
        borderRadius: 10,
        overflow: "hidden",
        border: `2px solid ${peeking ? 'rgba(45,212,191,0.15)' : 'var(--border_inactive)'}`,
        position: "relative",
        background: "#0c1a23",
        cursor: "default",
        transition: "border-color 400ms ease",
      }}
    >
      <div style={{
        filter: peeking
          ? "blur(2px) brightness(0.75) saturate(0.7)"
          : "blur(6px) brightness(0.6) saturate(0.5)",
        WebkitFilter: peeking
          ? "blur(2px) brightness(0.75) saturate(0.7)"
          : "blur(6px) brightness(0.6) saturate(0.5)",
        pointerEvents: "none",
        userSelect: "none",
        WebkitUserSelect: "none" as "none",
        transition: "filter 400ms ease, -webkit-filter 400ms ease",
      }}>
        {children}
      </div>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 4,
        background: peeking ? "rgba(0,0,0,0.05)" : "rgba(0,0,0,0.15)",
        pointerEvents: "none",
        transition: "background 400ms ease",
      }}>
        {/* Mini reticle corners */}
        <div style={{ position: "absolute", top: 6, left: 6, width: 8, height: 8, borderTop: "1px solid rgba(45,212,191,0.12)", borderLeft: "1px solid rgba(45,212,191,0.12)" }} />
        <div style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderTop: "1px solid rgba(45,212,191,0.12)", borderRight: "1px solid rgba(45,212,191,0.12)" }} />
        <div style={{ position: "absolute", bottom: 6, left: 6, width: 8, height: 8, borderBottom: "1px solid rgba(45,212,191,0.12)", borderLeft: "1px solid rgba(45,212,191,0.12)" }} />
        <div style={{ position: "absolute", bottom: 6, right: 6, width: 8, height: 8, borderBottom: "1px solid rgba(45,212,191,0.12)", borderRight: "1px solid rgba(45,212,191,0.12)" }} />

        <span style={{
          fontFamily: "var(--font-jetbrains, monospace)",
          fontSize: 8, letterSpacing: "0.12em",
          color: "rgba(45,212,191,0.35)", textTransform: "uppercase",
          border: "1px solid rgba(45,212,191,0.12)",
          borderRadius: 3, padding: "2px 8px",
          textAlign: "center", maxWidth: "90%",
          opacity: peeking ? 0 : 1,
          transition: "opacity 300ms ease",
        }}>
          {label || "LIVE PREVIEW"}
        </span>
        <span style={{
          fontFamily: "var(--font-jetbrains, monospace)",
          fontSize: 7, letterSpacing: "0.1em",
          color: "rgba(45,212,191,0.2)", textTransform: "uppercase",
          opacity: peeking ? 0 : 1,
          transition: "opacity 300ms ease",
        }}>
          PRE-LAUNCH
        </span>
        {tier && (
          <span style={{
            fontFamily: "var(--font-jetbrains, monospace)",
            fontSize: 8, letterSpacing: "0.12em",
            color: "#2dd4bf", textTransform: "uppercase",
            border: "1px solid rgba(45,212,191,0.25)",
            borderRadius: 3, padding: "2px 8px", marginTop: 2,
            opacity: peeking ? 0 : 1,
            transition: "opacity 300ms ease",
          }}>
            {tier}
          </span>
        )}
      </div>
    </div>
  );
}
