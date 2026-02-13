"use client";

import { useEffect, useRef, useState } from "react";

const STATEMENTS = [
  "We don\u2019t declare truth.",
  "We don\u2019t label lies.",
  "We don\u2019t score people.",
  "We don\u2019t editorialize.",
  "We don\u2019t collapse disagreement.",
  "We don\u2019t tell you what to think.",
];

/** S3: Scroll-hijacked manifesto.
 *  Container is tall (100vh × statement count). The visible viewport
 *  pins the current statement and crossfades between them as user scrolls. */
export function ManifestoScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const containerTop = -rect.top;
      const containerHeight = el.offsetHeight - window.innerHeight;

      if (containerHeight <= 0) return;

      const pct = Math.max(0, Math.min(1, containerTop / containerHeight));
      setProgress(pct);

      const idx = Math.min(
        Math.floor(pct * STATEMENTS.length),
        STATEMENTS.length - 1
      );
      setActiveIndex(idx);
    };

    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        /* Height drives scroll distance — each statement gets ~100vh of scroll */
        height: `${STATEMENTS.length * 100}vh`,
        position: "relative",
      }}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: "sticky",
          top: 100, /* below nav (56) + disclaimer bar (~44) */
          height: "calc(100vh - 100px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 24px",
          overflow: "hidden",
        }}
      >
        {/* Counter */}
        <div
          className="data"
          style={{
            position: "absolute",
            top: 32,
            right: 24,
            color: "rgba(45, 212, 191, 0.3)",
            fontSize: 11,
            letterSpacing: "0.1em",
          }}
        >
          {String(activeIndex + 1).padStart(2, "0")} / {String(STATEMENTS.length).padStart(2, "0")}
        </div>

        {/* Progress bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: `${progress * 100}%`,
            height: 2,
            background: "var(--teal)",
            transition: "width 50ms linear",
          }}
          aria-hidden="true"
        />

        {/* Crossfading statements */}
        <div style={{ position: "relative", minHeight: 80, width: "100%", maxWidth: 640 }}>
          {STATEMENTS.map((s, i) => (
            <div
              key={i}
              style={{
                position: i === 0 ? "relative" : "absolute",
                inset: i === 0 ? undefined : 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: activeIndex === i ? 1 : 0,
                transform:
                  activeIndex === i
                    ? "translateY(0)"
                    : activeIndex > i
                      ? "translateY(-20px)"
                      : "translateY(20px)",
                transition: "opacity 400ms ease-out, transform 400ms ease-out",
                pointerEvents: activeIndex === i ? "auto" : "none",
              }}
            >
              <p
                className="data"
                style={{
                  margin: 0,
                  fontSize: "clamp(24px, 5vw, 42px)",
                  color: "var(--text)",
                  textAlign: "center",
                  lineHeight: 1.3,
                  letterSpacing: "-0.02em",
                }}
              >
                {s}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll hint — only on first statement */}
        <div
          className="data"
          style={{
            position: "absolute",
            bottom: 40,
            opacity: activeIndex === 0 ? 0.3 : 0,
            transition: "opacity 300ms",
            fontSize: 11,
            letterSpacing: "0.08em",
            color: "var(--sub)",
          }}
        >
          SCROLL
        </div>
      </div>
    </div>
  );
}
