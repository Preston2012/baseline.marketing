"use client";

import { useState, useEffect } from "react";

const WORDS = ["Speech", "Patterns", "Signals", "Language"];

/** S9: Morphing word in hero headline.
 *  Crossfades between words on a 3s cycle. */
export function HeroMorph() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % WORDS.length);
        setFading(false);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      style={{
        display: "inline-block",
        minWidth: 160,
        opacity: fading ? 0 : 1,
        transform: fading ? "translateY(4px)" : "translateY(0)",
        transition: "opacity 400ms ease-out, transform 400ms ease-out",
        color: "#2dd4bf",
      }}
    >
      {WORDS[index]}
    </span>
  );
}
