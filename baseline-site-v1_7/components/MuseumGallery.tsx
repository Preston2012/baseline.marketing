"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { TierPill } from "./TierPill";
import { FramingRadarDemo, SignalPulseDemo, ConsensusBadgeDemo } from "./LiveWidgets";

type MuseumItem = {
  title: string;
  tagline: string;
  tier: "CORE" | "PRO" | "PRO+" | "B2B";
  image?: string;
  liveWidget?: "radar" | "pulse" | "consensus";
  placard: string;
};

const GALLERY: MuseumItem[] = [
  { title: "The Receipt\u2122", tagline: "Recurring patterns. Measured over time.", tier: "CORE", image: "/gallery/B1_pattern_memory.webp", placard: "Match tiers surface the strongest patterns. History doesn\u2019t disappear." },
  { title: "Signal Pulse\u2122", tagline: "The signal at a glance.", tier: "CORE", liveWidget: "pulse", placard: "Visual summary of signal activity. No analysis required to read it." },
  { title: "Framing Fingerprint\u2122", tagline: "A figure\u2019s rhetorical identity.", tier: "CORE", liveWidget: "consensus", placard: "Aggregate framing tendencies rendered as a unique visual signature." },
  { title: "Framing Radar\u2122", tagline: "Five axes. One pentagon. Every model.", tier: "PRO", liveWidget: "radar", placard: "Overlay the models and the structure of the statement reveals itself." },
  { title: "Lens Lab\u2122", tagline: "Three systems. Side by side. You decide.", tier: "PRO", image: "/gallery/B3_three_lenses.webp", placard: "Consensus is computed after, displayed alongside, never merged." },
  { title: "Crossfire\u2122", tagline: "Two figures. One surface. Direct comparison.", tier: "PRO", image: "/gallery/B6_crossfire.png", placard: "Side-by-side framing comparison across any two tracked figures." },
  { title: "Constellation Nav\u2122", tagline: "Navigate the network.", tier: "PRO", image: "/gallery/B11_constellation_nav.png", placard: "Explore connections between figures, topics, and framing patterns." },
  { title: "Provision Drift\u2122", tagline: "How far did it drift?", tier: "PRO+", image: "/gallery/B4_distance.webp", placard: "Measures semantic distance between provisions and a bill\u2019s stated purpose." },
  { title: "Split Microscope\u2122", tagline: "Where models diverge.", tier: "PRO+", image: "/gallery/B8_split_microscope.png", placard: "Detailed variance breakdown when independent systems disagree." },
  { title: "Intersections Panel\u2122", tagline: "Cross-linking patterns.", tier: "PRO+", image: "/gallery/B9_intersections.png", placard: "Surfaces shared framing and topic overlaps across figures and time." },
  { title: "Declassified Dossier\u2122", tagline: "The full exhibit plate.", tier: "PRO+", image: "/gallery/B12_declassified_dossier.png", placard: "Complete analytical profile for a single figure. Every surface, one view." },
  { title: "Narrative Sync\u2122", tagline: "Cross-figure framing convergence.", tier: "B2B", image: "/gallery/B13_narrative_sync.png", placard: "Detects when independent figures begin using similar framing simultaneously." },
];

const INJECTED_STYLES = `
@keyframes vault-trace { 0% { clip-path: inset(0 100% 100% 0); border-color: rgba(45,212,191,0.6); } 25% { clip-path: inset(0 0 100% 0); } 50% { clip-path: inset(0 0 0 0); border-color: rgba(45,212,191,0.4); } 100% { clip-path: inset(0 0 0 0); border-color: rgba(45,212,191,0.15); } }
@keyframes scan-line { 0% { left: -100%; } 100% { left: 100%; } }
`;

function LiveWidgetRenderer({ type }: { type: "radar" | "pulse" | "consensus" }) {
  switch (type) {
    case "radar": return <FramingRadarDemo />;
    case "pulse": return <SignalPulseDemo />;
    case "consensus": return <ConsensusBadgeDemo />;
  }
}

function MuseumCard({ item, index, onReveal }: { item: MuseumItem; index: number; onReveal: () => void }) {
  const [revealed, setRevealed] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isLive = !!item.liveWidget;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const handleReveal = useCallback(() => {
    if (revealed || unlocking) return;
    setUnlocking(true);
    setTimeout(() => { setRevealed(true); setUnlocking(false); onReveal(); }, 350);
  }, [revealed, unlocking, onReveal]);

  return (
    <div ref={cardRef} role="button" tabIndex={0} onClick={handleReveal}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); handleReveal(); } }}
      aria-label={revealed ? `${item.title} — revealed` : `${item.title} — tap to reveal`}
      className="museum-card"
      style={{
        flex: "0 0 360px", scrollSnapAlign: "start",
        border: "2px solid rgba(45,212,191,0.15)", borderRadius: 14,
        overflow: "hidden", cursor: revealed ? "default" : "pointer",
        background: "#000", position: "relative",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 400ms ease-out, transform 400ms ease-out, border-color 300ms ease-out",
        transitionDelay: `${index * 40}ms`,
        animation: unlocking ? "vault-trace 350ms ease-out forwards" : "none",
      }}>

      {/* Film perforations on live cards */}
      {isLive && [0, 1].map(side => (
        <div key={side} aria-hidden="true" style={{
          position: "absolute", [side === 0 ? "left" : "right"]: 0, top: 0, bottom: 0, width: 6,
          display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center",
          padding: "12px 0", zIndex: 2, pointerEvents: "none",
        }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ width: 2, height: 5, borderRadius: 1, background: "rgba(45,212,191,0.06)" }} />
          ))}
        </div>
      ))}

      {/* Visual area */}
      <div style={{ position: "relative", overflow: "hidden", minHeight: 200, background: "#0c1a23", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {isLive ? (
          <div style={{ width: "100%", transition: "filter 400ms, opacity 400ms", filter: revealed ? "none" : "blur(8px) brightness(0.6)", opacity: revealed ? 1 : 0.7 }}>
            <LiveWidgetRenderer type={item.liveWidget!} />
          </div>
        ) : (
          <img src={item.image} alt={`${item.title}`} loading="lazy"
            style={{ width: "100%", height: "auto", display: "block", transition: "filter 400ms", filter: revealed ? "none" : "blur(12px) brightness(0.7)" }} />
        )}

        {/* Overlay badge */}
        <div style={{
          position: "absolute", inset: 0,
          background: revealed ? "transparent" : "rgba(0,0,0,0.3)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10,
          opacity: revealed ? 0 : 1, pointerEvents: revealed ? "none" : "auto",
          transition: "opacity 400ms, background 400ms",
        }}>
          <span className="data" style={{
            color: "rgba(45,212,191,0.6)", fontSize: 10, letterSpacing: "0.18em",
            border: "1px solid rgba(45,212,191,0.2)", borderRadius: 4,
            padding: "3px 10px", textTransform: "uppercase", position: "relative", overflow: "hidden",
          }}>
            <span style={{
              position: "absolute", top: 0, left: "-100%", width: "100%", height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(45,212,191,0.15), transparent)",
              animation: "scan-line 2.5s ease-in-out infinite",
            }} />
            {isLive ? "LIVE DEMO" : "CLASSIFIED"}
          </span>
          <span className="data" style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, letterSpacing: "0.05em" }}>
            &#9656; {isLive ? "TAP TO INTERACT" : "CLEARANCE REQUIRED"}
          </span>
        </div>

        {!revealed && !unlocking && (
          <div style={{ position: "absolute", inset: 0, border: "2px solid rgba(45,212,191,0.03)", borderRadius: 12, animation: "museum-breathe 3s ease-in-out infinite", pointerEvents: "none" }} />
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ color: "var(--text)", fontWeight: 600, fontSize: 16 }}>{item.title}</span>
          <TierPill tier={item.tier} />
          {isLive && (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 4, padding: "1px 6px", borderRadius: 4,
              border: "1px solid rgba(45,212,191,0.15)", fontSize: 8,
              fontFamily: "var(--font-jetbrains, monospace)", color: "rgba(45,212,191,0.5)",
              letterSpacing: "0.1em", textTransform: "uppercase",
            }}>
              <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#2dd4bf", animation: "museum-breathe 2s ease-in-out infinite" }} />
              LIVE
            </span>
          )}
        </div>
        <div className="data" style={{ color: "var(--teal)", fontSize: 13, marginBottom: revealed ? 12 : 4 }}>{item.tagline}</div>
        {!revealed && <div className="data" style={{ color: "var(--sub)", fontSize: 11, opacity: 0.5 }}>&#9656; CLEARANCE REQUIRED</div>}
        <div style={{ maxHeight: revealed ? 300 : 0, opacity: revealed ? 1 : 0, overflow: "hidden", transition: "max-height 300ms, opacity 200ms 100ms" }}>
          <div style={{ borderTop: "2px solid rgba(45,212,191,0.1)", marginTop: 8, paddingTop: 8 }}>
            <p className="p" style={{ margin: 0, fontWeight: 500 }}>{item.placard}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MuseumGallery() {
  const [revealedCount, setRevealedCount] = useState(0);
  const [currentDot, setCurrentDot] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const allDeclassified = revealedCount >= GALLERY.length;

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;
    const handleScroll = () => {
      const cardWidth = 360 + 20;
      setCurrentDot(Math.min(Math.round(el.scrollLeft / cardWidth), GALLERY.length - 1));
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="section" aria-label="Trademark feature gallery">
      <style>{INJECTED_STYLES}</style>

      <h2 className="data" style={{
        color: "var(--teal)", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase",
        display: "block", margin: 0, marginBlockEnd: 16, transition: "all 300ms",
      }}>
        {allDeclassified ? "ALL DECLASSIFIED" : "\u2122 SURFACES"}
        {allDeclassified && <span style={{ display: "inline-block", width: 6, height: 6, background: "var(--teal)", borderRadius: "50%", marginLeft: 8, verticalAlign: "middle", animation: "museum-breathe 2s ease-in-out infinite" }} />}
      </h2>

      {/* Hash mark ruler */}
      <div aria-hidden="true" style={{ height: 1, background: "rgba(45,212,191,0.06)", position: "relative", marginBottom: 16 }}>
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} style={{ position: "absolute", left: `${(i / 29) * 100}%`, top: -1, width: 1, height: i % 5 === 0 ? 5 : 2, background: "rgba(45,212,191,0.1)" }} />
        ))}
      </div>

      <div className="museum-gallery" ref={galleryRef}>
        {GALLERY.map((item, i) => (
          <MuseumCard key={item.title} item={item} index={i} onReveal={() => setRevealedCount(c => c + 1)} />
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 12 }} aria-hidden="true">
        {GALLERY.map((_, i) => (
          <div key={i} style={{
            width: currentDot === i ? 16 : 6, height: 6, borderRadius: 3,
            background: currentDot === i ? "var(--teal)" : "rgba(45,212,191,0.15)",
            border: currentDot === i ? "none" : "1px solid rgba(45,212,191,0.1)",
            transition: "all 200ms",
          }} />
        ))}
      </div>

      <div className="small" style={{ opacity: 0.5, fontStyle: "italic", marginTop: 16, textAlign: "center" }}>
        Observational analysis only. Not a fact-check.
      </div>
    </section>
  );
}
