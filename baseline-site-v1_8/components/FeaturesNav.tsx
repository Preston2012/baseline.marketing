"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const SECTIONS = [
  { id: "signals", label: "Signals" },
  { id: "feed", label: "Feed" },
  { id: "figures", label: "Figures" },
  { id: "bills", label: "Bills" },
  { id: "tools", label: "Tools" },
];

const TIER_OPTIONS = ["ALL", "CORE", "PRO", "PRO+"] as const;
type TierFilter = (typeof TIER_OPTIONS)[number];

const NAV_TOP = 56; // main nav height

/** I5: Fixed section nav with scroll spy.
 *  I11: Tier filter pills.
 *  Uses position:fixed to avoid ancestor overflow issues. */
export function FeaturesNav({
  onTierChange,
}: {
  onTierChange: (tier: TierFilter) => void;
}) {
  const [active, setActive] = useState("signals");
  const [tier, setTier] = useState<TierFilter>("ALL");
  const [pinned, setPinned] = useState(false);
  const [navH, setNavH] = useState(0);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  /* Measure nav height for spacer */
  useEffect(() => {
    if (navRef.current) setNavH(navRef.current.offsetHeight);
  }, []);

  /* Pin when sentinel scrolls past main nav */
  useEffect(() => {
    const handler = () => {
      if (sentinelRef.current) {
        const rect = sentinelRef.current.getBoundingClientRect();
        setPinned(rect.top <= NAV_TOP);
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* I5: Scroll spy */
  useEffect(() => {
    const handler = () => {
      const offset = NAV_TOP + navH + 20;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.getBoundingClientRect().top <= offset) {
          setActive(SECTIONS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [navH]);

  const scrollTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        const top =
          el.getBoundingClientRect().top + window.scrollY - NAV_TOP - navH - 16;
        window.scrollTo({ top, behavior: "smooth" });
      }
    },
    [navH]
  );

  return (
    <>
      {/* Sentinel — marks the nav's natural document position */}
      <div ref={sentinelRef} style={{ height: 0 }} />

      {/* Spacer — prevents content jump when nav becomes fixed */}
      {pinned && <div style={{ height: navH }} />}

      <div
        ref={navRef}
        style={{
          position: pinned ? "fixed" : "relative",
          top: pinned ? NAV_TOP : undefined,
          left: pinned ? 0 : undefined,
          right: pinned ? 0 : undefined,
          zIndex: 90,
          background: "rgba(0, 0, 0, 0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border_inactive)",
          padding: pinned ? "10px 16px" : "10px 0",
          marginBottom: pinned ? 0 : 16,
        }}
      >
        {/* Constrain content to container width when fixed */}
        <div
          style={{
            maxWidth: 1040,
            margin: "0 auto",
          }}
        >
          {/* I5: Section links */}
          <div
            style={{
              display: "flex",
              gap: 16,
              overflowX: "auto",
              paddingBottom: 8,
              scrollbarWidth: "none",
            }}
            className="noSelect"
          >
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollTo(s.id)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-jetbrains, monospace), monospace",
                  fontSize: 11,
                  fontWeight: 500,
                  letterSpacing: "0.06em",
                  whiteSpace: "nowrap",
                  color: active === s.id ? "var(--teal)" : "var(--sub)",
                  borderBottom:
                    active === s.id
                      ? "2px solid var(--teal)"
                      : "2px solid transparent",
                  paddingBottom: 4,
                  padding: "0 0 4px",
                  transition: "color 150ms, border-color 150ms",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* I11: Tier filter pills */}
          <div style={{ display: "flex", gap: 6, marginTop: 4 }}>
            {TIER_OPTIONS.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => {
                  setTier(t);
                  onTierChange(t);
                }}
                style={{
                  background:
                    tier === t ? "rgba(45, 212, 191, 0.12)" : "transparent",
                  border:
                    tier === t
                      ? "1px solid rgba(45, 212, 191, 0.3)"
                      : "1px solid var(--border_inactive)",
                  borderRadius: 6,
                  padding: "4px 10px",
                  fontSize: 10,
                  fontFamily: "var(--font-jetbrains, monospace), monospace",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  color: tier === t ? "var(--teal)" : "var(--sub)",
                  cursor: "pointer",
                  transition: "all 150ms",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export type { TierFilter };
