'use client';

/* ─────────────────────────────────────────────────────────
   FROSTED WIDGET PREVIEW — Live widget behind blur
   ─────────────────────────────────────────────────────────
   Used in features and methodology pages to give a
   frosted preview of interactive widgets. All pre-launch.
   ───────────────────────────────────────────────────────── */

export function FrostedWidgetPreview({ children, label }: { children: React.ReactNode; label?: string }) {
  return (
    <div style={{
      borderRadius: 10,
      overflow: "hidden",
      border: "2px solid var(--border_inactive)",
      position: "relative",
      background: "#0c1a23",
    }}>
      <div style={{
        filter: "blur(6px) brightness(0.6) saturate(0.5)",
        WebkitFilter: "blur(6px) brightness(0.6) saturate(0.5)",
        pointerEvents: "none",
        userSelect: "none",
        WebkitUserSelect: "none" as "none",
      }}>
        {children}
      </div>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 4,
        background: "rgba(0,0,0,0.15)",
        pointerEvents: "none",
      }}>
        {/* Mini reticle corners */}
        <div style={{ position: "absolute", top: 6, left: 6, width: 8, height: 8, borderTop: "1px solid rgba(45,212,191,0.12)", borderLeft: "1px solid rgba(45,212,191,0.12)" }} />
        <div style={{ position: "absolute", top: 6, right: 6, width: 8, height: 8, borderTop: "1px solid rgba(45,212,191,0.12)", borderRight: "1px solid rgba(45,212,191,0.12)" }} />
        <div style={{ position: "absolute", bottom: 6, left: 6, width: 8, height: 8, borderBottom: "1px solid rgba(45,212,191,0.12)", borderLeft: "1px solid rgba(45,212,191,0.12)" }} />
        <div style={{ position: "absolute", bottom: 6, right: 6, width: 8, height: 8, borderBottom: "1px solid rgba(45,212,191,0.12)", borderRight: "1px solid rgba(45,212,191,0.12)" }} />

        <span style={{
          fontFamily: "var(--font-jetbrains, monospace)",
          fontSize: 9, letterSpacing: "0.15em",
          color: "rgba(45,212,191,0.35)", textTransform: "uppercase",
          border: "1px solid rgba(45,212,191,0.12)",
          borderRadius: 3, padding: "2px 8px",
        }}>
          {label || "LIVE PREVIEW"}
        </span>
        <span style={{
          fontFamily: "var(--font-jetbrains, monospace)",
          fontSize: 7, letterSpacing: "0.1em",
          color: "rgba(45,212,191,0.2)", textTransform: "uppercase",
        }}>
          PRE-LAUNCH
        </span>
      </div>
    </div>
  );
}
