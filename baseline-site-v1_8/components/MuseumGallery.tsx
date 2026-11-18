"use client";

import { useState, useRef, useEffect } from "react";
import {
  BaselineConcept, ReceiptConcept, SignalPulseConcept, FingerprintConcept,
  RadarConcept, LensLabConcept, CrossfireConcept,
  DriftConcept, MicroscopeConcept, IntersectionsConcept, DossierConcept, SyncConcept,
  MutationTimelineConcept, SpendingScopeConcept,
} from "./MuseumConcepts";

type MuseumItem = {
  title: string;
  tagline: string;
  concept: keyof typeof CONCEPT_MAP;
  placard: string;
};

const CONCEPT_MAP = {
  baseline: BaselineConcept,
  receipt: ReceiptConcept,
  pulse: SignalPulseConcept,
  fingerprint: FingerprintConcept,
  radar: RadarConcept,
  lenslab: LensLabConcept,
  crossfire: CrossfireConcept,
  drift: DriftConcept,
  microscope: MicroscopeConcept,
  intersections: IntersectionsConcept,
  dossier: DossierConcept,
  sync: SyncConcept,
  mutation: MutationTimelineConcept,
  spending: SpendingScopeConcept,
} as const;

const GALLERY: MuseumItem[] = [
  { title: "Baseline\u2122", tagline: "Pure signal. No noise.", concept: "baseline", placard: "The measurement stack. Parallel AI systems, side-by-side results, source context on every surface." },
  { title: "The Receipt\u2122", tagline: "Recurring patterns. Measured over time.", concept: "receipt", placard: "Match strength surfaces the strongest patterns. History doesn\u2019t disappear." },
  { title: "Signal Pulse\u2122", tagline: "The signal at a glance.", concept: "pulse", placard: "Visual summary of signal activity. No analysis required to read it." },
  { title: "Framing Fingerprint\u2122", tagline: "A figure\u2019s rhetorical identity.", concept: "fingerprint", placard: "Aggregate framing tendencies rendered as a unique visual signature." },
  { title: "Framing Radar\u2122", tagline: "Five axes. One pentagon. Every model.", concept: "radar", placard: "Overlay the models and the structure of the statement reveals itself." },
  { title: "Lens Lab\u2122", tagline: "Independent systems. Side-by-side. You decide.", concept: "lenslab", placard: "Consensus is computed after, displayed alongside, never merged." },
  { title: "Crossfire\u2122", tagline: "Two figures. One surface. Direct comparison.", concept: "crossfire", placard: "Side-by-side framing comparison across any two tracked figures." },
  { title: "Provision Drift\u2122", tagline: "How far did it drift?", concept: "drift", placard: "Measures semantic distance between provisions and a bill\u2019s stated purpose." },
  { title: "Split Microscope\u2122", tagline: "Where models diverge.", concept: "microscope", placard: "Detailed variance breakdown when independent systems disagree." },
  { title: "Intersections Panel\u2122", tagline: "Cross-linking patterns.", concept: "intersections", placard: "Shows shared framing and topic overlaps across figures and time." },
  { title: "Declassified Dossier\u2122", tagline: "The full exhibit plate.", concept: "dossier", placard: "Complete analytical profile for a single figure. Every surface, one view." },
  { title: "Mutation Timeline\u2122", tagline: "The legislative genome, sequenced.", concept: "mutation", placard: "How bill provisions change across legislative versions. Each mutation measured, each splice detected." },
  { title: "Spending Scope\u2122", tagline: "Fiscal depth, measured.", concept: "spending", placard: "Spending data tied to bills and provisions. CBO scores, extracted figures, every dollar surfaced." },
  { title: "Narrative Sync\u2122", tagline: "Cross-figure framing convergence.", concept: "sync", placard: "Detects when independent figures begin using similar framing simultaneously." },
];

const INJECTED_STYLES = `
@keyframes vault-trace { 0% { clip-path: inset(0 100% 100% 0); border-color: rgba(45,212,191,0.6); } 25% { clip-path: inset(0 0 100% 0); } 50% { clip-path: inset(0 0 0 0); border-color: rgba(45,212,191,0.4); } 100% { clip-path: inset(0 0 0 0); border-color: rgba(45,212,191,0.15); } }
@keyframes scan-line { 0% { left: -100%; } 100% { left: 100%; } }
`;

function ConceptRenderer({ type }: { type: keyof typeof CONCEPT_MAP }) {
  const Component = CONCEPT_MAP[type];
  return <Component />;
}

function MuseumCard({ item, index }: { item: MuseumItem; index: number }) {
  const [visible, setVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={cardRef} role="group"
      aria-label={item.title}
      className="museum-card"
      style={{
        flex: "0 0 340px", minWidth: 340, scrollSnapAlign: "start",
        border: "2px solid rgba(45,212,191,0.15)", borderRadius: 14,
        overflow: "hidden", cursor: "default",
        background: "#000", position: "relative",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 400ms ease-out, transform 400ms ease-out, border-color 300ms ease-out",
        transitionDelay: `${index * 40}ms`,
      }}>

      {/* Film perforations - all cards are exhibit pieces */}
      {[0, 1].map(side => (
        <div key={side} aria-hidden="true" style={{
          position: "absolute", [side === 0 ? "left" : "right"]: 0, top: 0, bottom: 0, width: 6,
          display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center",
          padding: "12px 0", zIndex: 2, pointerEvents: "none",
        }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ width: 2, height: 5, borderRadius: 1, background: "rgba(45,212,191,0.05)" }} />
          ))}
        </div>
      ))}

      {/* Visual area - coded concept art */}
      <div style={{ position: "relative", overflow: "hidden", minHeight: 200, background: "#0c1a23", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "100%" }}>
          <ConceptRenderer type={item.concept} />
        </div>

      </div>

      {/* Footer */}
      <div style={{ padding: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
          <span style={{ color: "var(--text)", fontWeight: 600, fontSize: 16 }}>{item.title}</span>
        </div>
        <div className="data" style={{ color: "var(--teal)", fontSize: 13, marginBottom: 12 }}>{item.tagline}</div>
        <div>
          <div style={{ borderTop: "2px solid rgba(45,212,191,0.1)", marginTop: 8, paddingTop: 8 }}>
            <p className="p" style={{ margin: 0, fontWeight: 500 }}>{item.placard}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MuseumGallery() {
  const [currentDot, setCurrentDot] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = galleryRef.current;
    if (!el) return;
    const handleScroll = () => {
      const cardWidth = 360;
      const maxScroll = el.scrollWidth - el.clientWidth;
      // If within 20px of the end, snap to last dot
      if (maxScroll - el.scrollLeft < 20) {
        setCurrentDot(GALLERY.length - 1);
      } else {
        setCurrentDot(Math.min(Math.round(el.scrollLeft / cardWidth), GALLERY.length - 1));
      }
    };
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="section scanline-ghost" aria-label="Trademark feature gallery" style={{ position: 'relative' }}>
      <style>{INJECTED_STYLES}</style>

      {/* Registration dots */}
      <div aria-hidden="true" style={{ position: 'absolute', top: 8, left: 8, width: 3, height: 3, borderRadius: '50%', background: 'rgba(45,212,191,0.05)' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: 8, right: 8, width: 3, height: 3, borderRadius: '50%', background: 'rgba(45,212,191,0.05)' }} />

      <h2 className="data" style={{
        color: "var(--teal)", fontSize: 12, letterSpacing: "0.15em", textTransform: "uppercase",
        display: "block", margin: 0, marginBlockEnd: 16, transition: "all 300ms",
      }}>
        {"\u2122 SURFACES"}
      </h2>

      {/* Hash mark ruler - gradient opacity */}
      <div aria-hidden="true" style={{ height: 1, background: "rgba(45,212,191,0.04)", position: "relative", marginBottom: 16 }}>
        {Array.from({ length: 30 }).map((_, i) => {
          const t = i / 29;
          const a = 0.03 + (1 - Math.abs(t - 0.5) * 2) * 0.07;
          return <div key={i} style={{ position: "absolute", left: `${t * 100}%`, top: -1, width: 1, height: i % 5 === 0 ? 5 : 2, background: `rgba(45,212,191,${a.toFixed(3)})` }} />;
        })}
      </div>

      <div className="museum-gallery" ref={galleryRef} tabIndex={0} role="region" aria-label="Surface gallery">
        {GALLERY.map((item, i) => (
          <MuseumCard key={item.title} item={item} index={i} />
        ))}
      </div>

      {/* Dot indicators */}
      <div style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: 12 }} aria-hidden="true">
        {GALLERY.map((_, i) => (
          <div key={i} style={{
            width: currentDot === i ? 16 : 5, height: 5, borderRadius: 3,
            background: currentDot === i ? "var(--teal)" : "rgba(45,212,191,0.15)",
            border: currentDot === i ? "none" : "1px solid rgba(45,212,191,0.08)",
            transition: "all 200ms",
          }} />
        ))}
      </div>

      <div className="small" style={{ color: "var(--sub-dim)", fontStyle: "italic", marginTop: 16, textAlign: "center" }}>
        Observational analysis only. Not a fact-check.
      </div>
    </section>
  );
}
