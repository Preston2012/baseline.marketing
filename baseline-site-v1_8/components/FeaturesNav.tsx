"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const SECTIONS = [
  { id: "signals", label: "Signals" },
  { id: "feed", label: "Feed" },
  { id: "figures", label: "Figures" },
  { id: "bills", label: "Bills" },
  { id: "tools", label: "Tools" },
];

const NAV_TOP = 56; // main nav height

/** I5: Fixed section nav with scroll spy.
 *  Uses position:fixed to avoid ancestor overflow issues. */
export function FeaturesNav() {
  const [active, setActive] = useState("signals");
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
      {/* Sentinel - marks the nav's natural document position */}
      <div ref={sentinelRef} style={{ height: 0 }} />

      {/* Spacer - prevents content jump when nav becomes fixed */}
      {pinned && <div style={{ height: navH }} />}

      <div
        ref={navRef}
        style={{
          position: pinned ? "fixed" : "relative",
          top: pinned ? NAV_TOP : undefined,
          left: 0,
          right: 0,
          width: pinned ? undefined : "100vw",
          marginLeft: pinned ? undefined : "calc(-50vw + 50%)",
          zIndex: 90,
          background: "rgba(0, 0, 0, 0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border_inactive)",
          padding: "10px 16px",
          marginBottom: pinned ? 0 : 16,
        }}
      >
        {/* Constrain content to container width */}
        <div
          style={{
            maxWidth: 1040,
            margin: "0 auto",
            padding: "0 4px",
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
                  padding: "0 6px",
                  minHeight: 44,
                  minWidth: 44,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "color 150ms, border-color 150ms",
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
