"use client";

import { useState, useEffect, useRef } from "react";

const SECTIONS = [
  { id: "surfaces", label: "™ Surfaces" },
  { id: "signals", label: "Signals" },
  { id: "feed", label: "Feed" },
  { id: "figures", label: "Figures" },
  { id: "bills", label: "Bills" },
  { id: "tools", label: "Tools" },
];

const TIER_OPTIONS = ["ALL", "CORE", "PRO", "PRO+"] as const;
type TierFilter = (typeof TIER_OPTIONS)[number];

/** I5: Sticky section nav with scroll spy.
 *  I11: Tier filter pills. */
export function FeaturesNav({
  onTierChange,
}: {
  onTierChange: (tier: TierFilter) => void;
}) {
  const [active, setActive] = useState("surfaces");
  const [tier, setTier] = useState<TierFilter>("ALL");
  const navRef = useRef<HTMLDivElement>(null);

  /* I5: Scroll spy — track which section is in view */
  useEffect(() => {
    const handler = () => {
      const offset = 160; // main nav (56) + features nav (~90) + margin
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
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = navRef.current?.offsetHeight ?? 90;
      const top = el.getBoundingClientRect().top + window.scrollY - 56 - navHeight - 16;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={navRef}
      style={{
        position: "sticky",
        top: 56, // below main nav
        zIndex: 90,
        background: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border_inactive)",
        padding: "10px 0",
        marginBottom: 16,
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
  );
}

export type { TierFilter };
