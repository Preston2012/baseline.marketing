"use client";

import { useEffect, useRef, useState } from "react";

const STATEMENTS = [
  "We don\u2019t declare what\u2019s real.",
  "We don\u2019t pass judgment.",
  "We don\u2019t score people.",
  "We don\u2019t editorialize.",
  "We don\u2019t collapse disagreement.",
  "We don\u2019t tell you what to think.",
];

/** S3 v3: IntersectionObserver manifesto.
 *  Each statement occupies vertical space and fades in on scroll.
 *  Uses overflowX:hidden in layout (not overflow:hidden) to preserve
 *  vertical layout and IntersectionObserver behavior. */
export function ManifestoScroll() {
  const [visibleSet, setVisibleSet] = useState<Set<number>>(new Set());
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    refs.current.forEach((el, i) => {
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSet((prev) => {
              const next = new Set(prev);
              next.add(i);
              return next;
            });
            obs.unobserve(el); /* fire once */
          }
        },
        { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div style={{ padding: "40px 0", position: "relative" }}>
      {/* Film perforation edges */}
      <div aria-hidden="true" style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 5,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center',
        pointerEvents: 'none',
      }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} style={{ width: 2, height: 5, borderRadius: 1, background: 'rgba(45,212,191,0.03)' }} />
        ))}
      </div>
      <div aria-hidden="true" style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 5,
        display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center',
        pointerEvents: 'none',
      }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} style={{ width: 2, height: 5, borderRadius: 1, background: 'rgba(45,212,191,0.03)' }} />
        ))}
      </div>

      {STATEMENTS.map((s, i) => {
        const isVisible = visibleSet.has(i);

        return (
          <div
            key={i}
            ref={(el) => { refs.current[i] = el; }}
            style={{
              minHeight: "50vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 24px",
              position: "relative",
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
                opacity: isVisible ? 1 : 0,
                transition: "opacity 400ms ease-out",
              }}
            >
              {String(i + 1).padStart(2, "0")} / {String(STATEMENTS.length).padStart(2, "0")}
            </div>

            {/* Statement */}
            <p
              className="data"
              style={{
                margin: 0,
                fontSize: "clamp(24px, 5vw, 42px)",
                color: "var(--text)",
                textAlign: "center",
                lineHeight: 1.3,
                letterSpacing: "-0.02em",
                maxWidth: 640,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 600ms ease-out, transform 600ms ease-out",
              }}
            >
              {s}
            </p>

            {/* Teal thread + circuit node between statements */}
            {i < STATEMENTS.length - 1 && (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 1,
                  height: 48,
                  background: "linear-gradient(to bottom, rgba(45,212,191,0.15), transparent)",
                  opacity: isVisible ? 1 : 0,
                  transition: "opacity 800ms ease-out 300ms",
                }}
                aria-hidden="true"
              >
                {/* Circuit node at junction */}
                <div style={{ position: 'absolute', top: 0, left: -2, width: 5, height: 5, borderRadius: '50%', background: 'rgba(45,212,191,0.1)' }} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
