"use client";

import { useEffect, useRef } from "react";

/** I1: Teal scroll progress bar — fixed at top of viewport.
 *  Only renders on long pages (Methodology, Features). */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const el = barRef.current;
      if (!el) return;
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      el.style.width = `${pct}%`;
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      ref={barRef}
      className="scroll-progress"
      aria-hidden="true"
    />
  );
}
