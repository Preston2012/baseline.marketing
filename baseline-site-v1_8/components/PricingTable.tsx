"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "./Card";
import { TierPill } from "./TierPill";

type Billing = "monthly" | "annual";

type BulletItem = { text: string; tm?: boolean; secondary?: boolean };

type Tier = {
  id: "core" | "pro" | "pro_plus" | "b2b";
  name: string;
  monthly: string;
  annual: string;
  note?: string;
  headline: BulletItem[];
  expanded: BulletItem[];
  collapsed?: boolean;
  inherits?: string;
  cta?: boolean;
};

/* I12: headline items render solid, secondary items render dimmer */
function BulletList({ items }: { items: BulletItem[] }) {
  return (
    <ul className="p" style={{ margin: 0, paddingLeft: 18 }}>
      {items.map((b) => (
        <li
          key={b.text}
          style={{
            marginBottom: 4,
            opacity: b.secondary ? 0.6 : 1,
          }}
        >
          {b.tm ? (
            <span style={{ color: "var(--teal)" }}>{b.text}</span>
          ) : (
            b.text
          )}
        </li>
      ))}
    </ul>
  );
}

/* S6: Redacted price decode — characters scramble then resolve */
function PriceDecode({ price }: { price: string }) {
  const [display, setDisplay] = useState(price.replace(/[^\s$/]/g, "█"));
  const [decoded, setDecoded] = useState(false);
  const prevPrice = useRef(price);
  const hasRun = useRef(false);

  useEffect(() => {
    // If price changed after initial decode, just swap instantly
    if (hasRun.current && price !== prevPrice.current) {
      prevPrice.current = price;
      setDisplay(price);
      return;
    }

    if (hasRun.current) return;
    hasRun.current = true;
    prevPrice.current = price;

    const chars = price.split("");
    const current = chars.map((c) =>
      /[a-zA-Z0-9.,]/.test(c) ? "█" : c
    );

    let step = 0;
    const masked = chars
      .map((_, i) => (/[a-zA-Z0-9.,]/.test(chars[i]) ? i : -1))
      .filter((i) => i >= 0);

    const interval = setInterval(() => {
      if (step >= masked.length) {
        clearInterval(interval);
        setDecoded(true);
        return;
      }
      current[masked[step]] = chars[masked[step]];
      setDisplay(current.join(""));
      step++;
    }, 60);

    return () => clearInterval(interval);
  }, [price]);

  return (
    <span
      style={{
        transition: "color 300ms ease-out",
        color: decoded ? "var(--text)" : "var(--sub)",
      }}
    >
      {display}
    </span>
  );
}

export function PricingTable() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [expandedTiers, setExpandedTiers] = useState<Set<string>>(new Set());
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  /* I3: Staggered entrance on scroll */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const toggle = (id: string) => {
    setExpandedTiers((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const tiers: Tier[] = [
    {
      id: "core",
      name: "Core",
      monthly: "Free",
      annual: "Free",
      note: "Ad-supported (Today Feed + Search only).",
      headline: [
        { text: "The Receipt™ (3 matches)", tm: true },
        { text: "Signal Pulse™", tm: true },
        { text: "Framing Fingerprint™", tm: true },
        { text: "Baseline™ score + Delta", tm: true },
        { text: "Consensus view + Variance Detection" },
      ],
      expanded: [
        { text: "Signal Metrics (4 scores per statement)", secondary: true },
        { text: "Vote Record", secondary: true },
        { text: "Feed browse + Statement Detail", secondary: true },
        { text: "Trending Topics", secondary: true },
        { text: "\u201CWhy am I seeing this?\u201D", secondary: true },
        { text: "\u201CMeasured By\u201D attribution row", secondary: true },
        { text: "Source favicon on feed cards", secondary: true },
        { text: "Ads on Today Feed + Search", secondary: true },
      ],
    },
    {
      id: "pro",
      name: "Pro",
      monthly: "$7.99 / month",
      annual: "$59.99 / year",
      note: "$5.99/mo for first 60 days, then $7.99/mo. Includes 7-day free trial.",
      inherits: "Everything in Core, plus:",
      headline: [
        { text: "Framing Radar™", tm: true },
        { text: "Lens Lab™ (multi-model parallel)", tm: true },
        { text: "Crossfire™", tm: true },
        { text: "Constellation Nav™", tm: true },
        { text: "The Receipt™ (5 matches)", tm: true },
      ],
      expanded: [
        { text: "Historical Trends", secondary: true },
        { text: "Feed sorting (novelty, recency, signal)", secondary: true },
        { text: "Favorites + followed figures", secondary: true },
        { text: "Long-press peek preview", secondary: true },
        { text: "Double-tap annotate", secondary: true },
        { text: "100 private annotations", secondary: true },
        { text: "Export & Share with watermark", secondary: true },
        { text: "Digest notifications", secondary: true },
        { text: "No ads", secondary: true },
      ],
    },
    {
      id: "pro_plus",
      name: "Pro+",
      monthly: "$24.99 / month",
      annual: "$199.99 / year",
      collapsed: true,
      inherits: "Everything in Pro, plus:",
      headline: [
        { text: "Provision Drift™", tm: true },
        { text: "Split Microscope™", tm: true },
        { text: "Intersections Panel™", tm: true },
        { text: "Declassified Dossier™", tm: true },
        { text: "The Receipt™ (unlimited)", tm: true },
        { text: "The Receipt™ Comparison Mode", tm: true },
      ],
      expanded: [
        { text: "Bill Overview & Notable Provisions", secondary: true },
        { text: "Drift Cascade Waterfall", secondary: true },
        { text: "Drift League Table", secondary: true },
        { text: "Topic Heatmap", secondary: true },
        { text: "Divergence Sort", secondary: true },
        { text: "Shift Alert / Rhetorical Velocity", secondary: true },
        { text: "500 private annotations", secondary: true },
        { text: "Advanced notifications (per-figure, per-topic)", secondary: true },
      ],
    },
    {
      id: "b2b",
      name: "B2B",
      monthly: "Contact Us",
      annual: "Contact Us",
      note: "Annual-only. Founding Partner pricing available.",
      inherits: "Everything in Pro+, plus:",
      headline: [
        { text: "Narrative Sync™", tm: true },
        { text: "Delta Threshold Alerts", tm: true },
        { text: "Annotation Delta Cards", tm: true },
        { text: "1,000 private annotations" },
        { text: "10,000 requests/hour" },
      ],
      expanded: [
        { text: "30-day pilot included", secondary: true },
        { text: "Custom terms", secondary: true },
        { text: "Team access (coming soon)", secondary: true },
      ],
      cta: true,
    },
  ];

  const priceFor = (t: Tier) => (billing === "monthly" ? t.monthly : t.annual);

  return (
    <div ref={sectionRef}>

      {/* I6: Billing toggle with animated slide indicator */}
      <div
        aria-label="Billing period"
        role="tablist"
        style={{
          display: "inline-flex",
          gap: 6,
          padding: 6,
          borderRadius: 12,
          border: "2px solid var(--border_inactive)",
          background: "rgba(12,26,35,0.35)",
          position: "relative",
        }}
      >
        {/* I6: Sliding indicator behind active tab */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 6,
            left: billing === "monthly" ? 6 : "calc(50% + 3px)",
            width: "calc(50% - 9px)",
            height: "calc(100% - 12px)",
            background: "rgba(182,198,214,0.12)",
            border: "2px solid var(--border_inactive)",
            borderRadius: 10,
            transition: "left 200ms ease-out",
            zIndex: 0,
          }}
        />
        {(["monthly", "annual"] as Billing[]).map((b) => (
          <button
            key={b}
            type="button"
            role="tab"
            id={`billing-tab-${b}`}
            aria-selected={billing === b}
            aria-controls="pricing-panel"
            onClick={() => setBilling(b)}
            style={{
              border: "2px solid transparent",
              background: "transparent",
              color: billing === b ? "var(--text)" : "var(--sub)",
              borderRadius: 10,
              padding: "10px 12px",
              cursor: "pointer",
              fontWeight: 600,
              fontFamily: "inherit",
              minWidth: 90,
              position: "relative",
              zIndex: 1,
              transition: "color 200ms ease-out",
            }}
          >
            {b === "monthly" ? "Monthly" : "Annual"}
          </button>
        ))}
      </div>

      {/* I3: Tier cards with staggered entrance */}
      <div
        id="pricing-panel"
        role="tabpanel"
        className="grid grid_2 tier-grid handling-marks"
        style={{ marginTop: 12, alignItems: "stretch", position: "relative" }}
      >
        {/* Circuit trace: top of grid */}
        <div aria-hidden="true" style={{
          position: 'absolute', top: -1, left: '10%', right: '10%', height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(45,212,191,0.04) 25%, rgba(45,212,191,0.06) 50%, rgba(45,212,191,0.04) 75%, transparent)',
          pointerEvents: 'none',
        }} />
        {tiers.map((t, i) => {
          const isOpen = expandedTiers.has(t.id);

          const staggerStyle = {
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 400ms ease-out, transform 400ms ease-out",
            transitionDelay: `${i * 80}ms`,
          } as const;

          /* Pro+ collapsed card */
          if (t.collapsed) {
            return (
              <div key={t.id} style={staggerStyle}>
                <Card title={t.name}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <div className="data" style={{ fontSize: 16 }}>
                      <PriceDecode price={priceFor(t)} />
                    </div>
                    <TierPill tier="PRO+" />
                  </div>

                  {!isOpen && (
                    <div style={{ marginTop: 8 }}>
                      <div style={{ color: "var(--sub)", fontSize: 13, fontFamily: "var(--font-jetbrains, ui-monospace), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace", fontWeight: 500 }}>
                        More signal. Less noise.
                      </div>
                      <button
                        type="button"
                        onClick={() => toggle(t.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--teal)",
                          fontSize: 12,
                          cursor: "pointer",
                          padding: "8px 0 0",
                          fontWeight: 600,
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        See features{" "}
                        <span style={{ fontSize: 10, display: "inline-block", transition: "transform 200ms ease-out", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>&#9662;</span>
                      </button>
                    </div>
                  )}

                  {isOpen && (
                    <div style={{ marginTop: 10 }}>
                      {t.inherits && (
                        <div className="data" style={{ fontSize: 10, color: "var(--teal)", opacity: 0.6, letterSpacing: "0.08em", marginBottom: 8 }}>
                          {t.inherits}
                        </div>
                      )}
                      <BulletList items={t.headline} />
                      <div style={{ height: 8 }} />
                      <BulletList items={t.expanded} />
                      <button
                        type="button"
                        onClick={() => toggle(t.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: "var(--sub)",
                          fontSize: 11,
                          cursor: "pointer",
                          padding: "8px 0 0",
                        }}
                      >
                        Collapse
                      </button>
                    </div>
                  )}
                </Card>
              </div>
            );
          }

          /* Standard cards: Core, Pro, B2B */
          return (
            <div key={t.id} style={staggerStyle}>
              <Card title={t.name}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <div className="data" style={{ fontSize: 16 }}>
                    <PriceDecode price={priceFor(t)} />
                  </div>
                  <TierPill tier={t.id === "core" ? "CORE" : t.id === "pro" ? "PRO" : "B2B"} />
                </div>

                {t.note && (
                  <div className="small" style={{ opacity: 0.95, marginTop: 6 }}>
                    {t.note}
                  </div>
                )}

                <div style={{ height: 10 }} />
                {t.inherits && (
                  <div className="data" style={{ fontSize: 10, color: "var(--teal)", opacity: 0.6, letterSpacing: "0.08em", marginBottom: 8 }}>
                    {t.inherits}
                  </div>
                )}
                <BulletList items={t.headline} />

                {!isOpen && t.expanded.length > 0 && (
                  <button
                    type="button"
                    onClick={() => toggle(t.id)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "var(--teal)",
                      fontSize: 12,
                      cursor: "pointer",
                      padding: "8px 0 0",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    See all features{" "}
                    <span style={{ fontSize: 10, display: "inline-block", transition: "transform 200ms ease-out", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>&#9662;</span>
                  </button>
                )}

                {isOpen && (
                  <div style={{ marginTop: 8 }}>
                    <BulletList items={t.expanded} />
                    <button
                      type="button"
                      onClick={() => toggle(t.id)}
                      style={{
                        background: "none",
                        border: "none",
                        color: "var(--sub)",
                        fontSize: 11,
                        cursor: "pointer",
                        padding: "8px 0 0",
                      }}
                    >
                      Collapse
                    </button>
                  </div>
                )}

                {t.cta && (
                  <a
                    href="mailto:sales@baseline.marketing?subject=B2B%20Inquiry"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      height: 44,
                      padding: "0 20px",
                      marginTop: 14,
                      borderRadius: "var(--radius_btn)",
                      background: "var(--teal)",
                      color: "var(--bg)",
                      textDecoration: "none",
                      fontWeight: 600,
                      fontSize: 14,
                      border: "2px solid rgba(45,212,191,0.35)",
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Contact Us
                  </a>
                )}
              </Card>
            </div>
          );
        })}
      </div>

      <div style={{ height: 12 }} />

      {/* Subscription terms */}
      <Card title="Subscription terms">
        <div className="p" style={{ margin: 0 }}>
          All paid plans include a 7-day free trial. Subscriptions renew
          automatically unless cancelled at least 24 hours before the end of
          the current period. Payment is charged to your App Store or Google
          Play account at confirmation of purchase (or after the trial ends).
          You can manage or cancel your subscription in your App Store / Google
          Play account settings. Refund requests are handled by Apple or Google
          under their respective policies. B2B plans are annual-only and
          include a 30-day pilot period. Family Sharing available on iOS.
        </div>
      </Card>
    </div>
  );
}
