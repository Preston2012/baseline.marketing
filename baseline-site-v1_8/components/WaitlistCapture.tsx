"use client";

import { useState, useRef, useEffect } from "react";
import { supabaseConfig } from "@/config/supabase";

type CaptureType = "notify" | "early_access";

/** WaitlistCapture — 200% hero takeover.
 *  Scanline sweep, hashmark rulers, staggered entrance,
 *  terminal input, classified confirmation. */
export function WaitlistCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [entered, setEntered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  /* Staggered entrance on mount */
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 100);
    return () => clearTimeout(t);
  }, []);

  async function submit(type: CaptureType) {
    const trimmed = email.trim().toLowerCase();

    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMsg("Enter a valid email.");
      inputRef.current?.focus();
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch(
        `${supabaseConfig.url}/rest/v1/waitlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseConfig.anonKey,
            Authorization: `Bearer ${supabaseConfig.anonKey}`,
            Prefer: "return=minimal",
          },
          body: JSON.stringify({ email: trimmed, type }),
        }
      );

      if (!res.ok) {
        const body = await res.text();
        if (body.includes("duplicate") || body.includes("unique")) {
          setStatus("success");
          return;
        }
        throw new Error(body);
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Try again.");
    }
  }

  return (
    <section
      aria-label="Join the waitlist"
      style={{
        position: "relative",
        border: "2px solid var(--border_inactive)",
        borderRadius: 18,
        overflow: "hidden",
        backgroundImage: "url(/brand/hero_skyline.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundColor: "#081017",
        marginBottom: 16,
      }}
    >
      {/* Dark overlay — matches hero treatment */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(8,16,23,0.94) 0%, rgba(8,16,23,0.88) 50%, rgba(8,16,23,0.96) 100%)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      />

      {/* Scanline sweep — single pass on load */}
      <style>{`
        @keyframes wlScanline {
          0% { top: -2px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes wlGhostScan {
          0% { top: -2px; opacity: 0; }
          15% { opacity: 0.6; }
          85% { opacity: 0.6; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
      {/* Primary scanline */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(45,212,191,0.15) 20%, rgba(45,212,191,0.3) 50%, rgba(45,212,191,0.15) 80%, transparent 100%)",
          animation: "wlScanline 2s ease-out forwards",
          animationDelay: "300ms",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      {/* Ghost scanline — slower, dimmer, trailing */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(90deg, transparent 0%, rgba(45,212,191,0.06) 30%, rgba(45,212,191,0.1) 50%, rgba(45,212,191,0.06) 70%, transparent 100%)",
          animation: "wlGhostScan 3.5s ease-out forwards",
          animationDelay: "600ms",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* Reticle corners */}
      <Corner pos="top-left" />
      <Corner pos="top-right" />
      <Corner pos="bottom-left" />
      <Corner pos="bottom-right" />

      {/* Film perf accents — left edge (enhanced) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 3,
          top: 16,
          bottom: 16,
          width: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 2,
              height: 5,
              borderRadius: 1,
              background: `rgba(45,212,191,${i % 3 === 0 ? 0.08 : 0.05})`,
            }}
          />
        ))}
      </div>
      {/* Right edge */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: 3,
          top: 16,
          bottom: 16,
          width: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          zIndex: 1,
        }}
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 2,
              height: 5,
              borderRadius: 1,
              background: `rgba(45,212,191,${i % 3 === 0 ? 0.08 : 0.05})`,
            }}
          />
        ))}
      </div>

      {/* Circuit trace: horizontal connector across middle */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: 20,
          right: 20,
          height: 1,
          background: "linear-gradient(90deg, rgba(45,212,191,0.03) 0%, transparent 15%, transparent 85%, rgba(45,212,191,0.03) 100%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      >
        {/* Nodes at edges */}
        <div style={{ position: "absolute", left: 0, top: -1, width: 3, height: 3, borderRadius: "50%", background: "rgba(45,212,191,0.06)" }} />
        <div style={{ position: "absolute", right: 0, top: -1, width: 3, height: 3, borderRadius: "50%", background: "rgba(45,212,191,0.06)" }} />
      </div>

      {/* Intel dot grid: subtle background texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(rgba(45,212,191,0.02) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Content layer */}
      <div style={{ position: "relative", padding: "36px 24px 32px", zIndex: 1 }}>
        {/* Classification stamp row */}
        <div
          className="data"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            fontSize: 8,
            letterSpacing: "0.2em",
            color: "rgba(45,212,191,0.25)",
            textTransform: "uppercase",
            marginBottom: 20,
            opacity: entered ? 1 : 0,
            transform: entered ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 500ms ease-out, transform 500ms ease-out",
          }}
        >
          <span
            style={{
              width: 20,
              height: 1,
              background: "rgba(45,212,191,0.12)",
              display: "inline-block",
            }}
          />
          SIGNAL INTAKE // PRE-LAUNCH
          <span
            style={{
              width: 20,
              height: 1,
              background: "rgba(45,212,191,0.12)",
              display: "inline-block",
            }}
          />
        </div>

        {status === "success" ? (
          <SuccessState />
        ) : (
          <>
            {/* Headline */}
            <h2
              style={{
                fontWeight: 600,
                fontSize: 32,
                color: "var(--text)",
                margin: 0,
                textAlign: "center",
                letterSpacing: "-0.02em",
                opacity: entered ? 1 : 0,
                transform: entered ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 500ms ease-out 150ms, transform 500ms ease-out 150ms",
              }}
            >
              Get in <span style={{ color: "var(--teal)" }}>early.</span>
            </h2>

            <p
              className="data"
              style={{
                color: "var(--sub)",
                fontSize: 12,
                textAlign: "center",
                margin: "8px 0 0",
                lineHeight: 1.5,
                letterSpacing: "0.04em",
                opacity: entered ? 1 : 0,
                transform: entered ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 500ms ease-out 250ms, transform 500ms ease-out 250ms",
              }}
            >
              Join the waitlist. Be first to measure.
            </p>

            {/* Hashmark ruler */}
            <div
              aria-hidden="true"
              style={{
                position: "relative",
                height: 1,
                margin: "20px auto 22px",
                maxWidth: 400,
                background: "rgba(45,212,191,0.05)",
                opacity: entered ? 1 : 0,
                transition: "opacity 600ms ease-out 350ms",
              }}
            >
              {Array.from({ length: 20 }).map((_, i) => {
                const t = i / 19;
                const centerDist = Math.abs(t - 0.5) * 2;
                const alpha = 0.03 + (1 - centerDist) * 0.1;
                return (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      left: `${t * 100}%`,
                      top: -1,
                      width: 1,
                      height: i % 5 === 0 ? 5 : 2,
                      background: `rgba(45,212,191,${alpha.toFixed(3)})`,
                    }}
                  />
                );
              })}
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: -1,
                  width: 3,
                  height: 3,
                  borderRadius: "50%",
                  background: "rgba(45,212,191,0.15)",
                  transform: "translateX(-50%)",
                }}
              />
            </div>

            {/* Input + CTAs */}
            <div
              style={{
                maxWidth: 400,
                margin: "0 auto",
                opacity: entered ? 1 : 0,
                transform: entered ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 500ms ease-out 400ms, transform 500ms ease-out 400ms",
              }}
            >
              {/* Terminal-style input wrapper */}
              <div style={{ position: "relative" }}>
                {/* Prompt caret */}
                <span
                  className="data"
                  style={{
                    position: "absolute",
                    left: 14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "rgba(45,212,191,0.3)",
                    fontSize: 13,
                    pointerEvents: "none",
                    zIndex: 2,
                  }}
                >
                  ›
                </span>
                <style>{`
                  .wl-input:focus {
                    border-color: rgba(45,212,191,0.4) !important;
                    box-shadow: 0 0 0 1px rgba(45,212,191,0.08) inset;
                  }
                  .wl-input::placeholder {
                    color: rgba(182,198,214,0.25);
                  }
                `}</style>
                <input
                  ref={inputRef}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  className="wl-input"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMsg) setErrorMsg("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") submit("notify");
                  }}
                  disabled={status === "sending"}
                  style={{
                    width: "100%",
                    height: 50,
                    padding: "0 16px 0 30px",
                    borderRadius: 10,
                    border: `2px solid ${
                      errorMsg
                        ? "rgba(212,167,45,0.5)"
                        : "var(--border_inactive)"
                    }`,
                    background: "rgba(8,16,23,0.7)",
                    color: "var(--text)",
                    fontSize: 14,
                    fontFamily: "var(--font-jetbrains, monospace)",
                    letterSpacing: "0.02em",
                    outline: "none",
                    transition: "border-color 200ms ease-out",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Error message */}
              {errorMsg && (
                <div
                  className="data"
                  style={{
                    color: "rgba(212,167,45,0.85)",
                    fontSize: 10,
                    marginTop: 6,
                    textAlign: "center",
                    letterSpacing: "0.04em",
                  }}
                >
                  {errorMsg}
                </div>
              )}

              {/* Dual CTAs */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                  marginTop: 14,
                }}
              >
                <style>{`
                  .wl-btn-primary:hover:not(:disabled) {
                    background: #26b8a6 !important;
                  }
                  .wl-btn-ghost:hover:not(:disabled) {
                    border-color: rgba(45,212,191,0.45) !important;
                    background: rgba(45,212,191,0.04) !important;
                  }
                `}</style>
                <button
                  type="button"
                  className="wl-btn-primary"
                  onClick={() => submit("notify")}
                  disabled={status === "sending"}
                  style={{
                    height: 48,
                    borderRadius: 10,
                    background: "var(--teal)",
                    color: "var(--bg)",
                    fontWeight: 600,
                    fontSize: 13,
                    border: "2px solid rgba(45,212,191,0.35)",
                    cursor: status === "sending" ? "wait" : "pointer",
                    fontFamily: "inherit",
                    opacity: status === "sending" ? 0.6 : 1,
                    transition: "opacity 200ms ease-out, background 200ms ease-out",
                    padding: "0 8px",
                    letterSpacing: "0.01em",
                  }}
                >
                  {status === "sending" ? "Transmitting..." : "Notify me at launch"}
                </button>
                <button
                  type="button"
                  className="wl-btn-ghost"
                  onClick={() => submit("early_access")}
                  disabled={status === "sending"}
                  style={{
                    height: 48,
                    borderRadius: 10,
                    background: "transparent",
                    color: "var(--teal)",
                    fontWeight: 600,
                    fontSize: 13,
                    border: "2px solid rgba(45,212,191,0.2)",
                    cursor: status === "sending" ? "wait" : "pointer",
                    fontFamily: "inherit",
                    opacity: status === "sending" ? 0.6 : 1,
                    transition:
                      "opacity 200ms ease-out, border-color 200ms ease-out, background 200ms ease-out",
                    padding: "0 8px",
                    letterSpacing: "0.01em",
                  }}
                >
                  {status === "sending" ? "Transmitting..." : "Request early access"}
                </button>
              </div>

              {/* Privacy note — micro intel label style */}
              <div
                className="data"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  fontSize: 8,
                  color: "var(--sub)",
                  opacity: 0.3,
                  textAlign: "center",
                  marginTop: 18,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                <span
                  style={{
                    width: 12,
                    height: 1,
                    background: "rgba(182,198,214,0.15)",
                    display: "inline-block",
                  }}
                />
                Encrypted · No spam · Unsubscribe anytime
                <span
                  style={{
                    width: 12,
                    height: 1,
                    background: "rgba(182,198,214,0.15)",
                    display: "inline-block",
                  }}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* ── Success state — classified confirmation ── */
function SuccessState() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        textAlign: "center",
        padding: "12px 0 4px",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(6px)",
        transition: "opacity 400ms ease-out, transform 400ms ease-out",
      }}
    >
      {/* Confirmed ring — teal pulse */}
      <style>{`
        @keyframes wlConfirmPulse {
          0% { box-shadow: 0 0 0 0 rgba(45,212,191,0.2); }
          70% { box-shadow: 0 0 0 10px rgba(45,212,191,0); }
          100% { box-shadow: 0 0 0 0 rgba(45,212,191,0); }
        }
      `}</style>
      <div
        style={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          border: "2px solid rgba(45,212,191,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 16px",
          animation: "wlConfirmPulse 1.5s ease-out",
        }}
      >
        <span style={{ color: "var(--teal)", fontSize: 20, fontWeight: 600 }}>✓</span>
      </div>

      {/* Classification stamp */}
      <div
        className="data"
        style={{
          fontSize: 8,
          letterSpacing: "0.2em",
          color: "rgba(45,212,191,0.35)",
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        SIGNAL RECEIVED // CONFIRMED
      </div>

      <div
        style={{
          fontWeight: 600,
          fontSize: 22,
          color: "var(--text)",
          marginBottom: 6,
          letterSpacing: "-0.01em",
        }}
      >
        You&rsquo;re on the list.
      </div>

      {/* Hashmark ruler */}
      <div
        aria-hidden="true"
        style={{
          position: "relative",
          height: 1,
          margin: "14px auto",
          maxWidth: 200,
          background: "rgba(45,212,191,0.05)",
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => {
          const t = i / 11;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: `${t * 100}%`,
                top: -1,
                width: 1,
                height: i % 3 === 0 ? 4 : 2,
                background: `rgba(45,212,191,${(0.05 + (1 - Math.abs(t - 0.5) * 2) * 0.08).toFixed(3)})`,
              }}
            />
          );
        })}
      </div>

      <p
        className="data"
        style={{
          color: "var(--sub)",
          fontSize: 11,
          margin: 0,
          lineHeight: 1.6,
          letterSpacing: "0.03em",
        }}
      >
        We&rsquo;ll reach out before launch. Watch your inbox.
      </p>
    </div>
  );
}

/* ── Reticle corner helper — enhanced with registration dot ── */
function Corner({
  pos,
}: {
  pos: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) {
  const size = 16;
  const color = "rgba(45,212,191,0.1)";
  const style: React.CSSProperties = {
    position: "absolute",
    width: size,
    height: size,
    pointerEvents: "none",
    zIndex: 2,
  };

  if (pos.includes("top")) style.top = 12;
  if (pos.includes("bottom")) style.bottom = 12;
  if (pos.includes("left")) style.left = 12;
  if (pos.includes("right")) style.right = 12;
  if (pos.includes("top")) style.borderTop = `1px solid ${color}`;
  if (pos.includes("bottom")) style.borderBottom = `1px solid ${color}`;
  if (pos.includes("left")) style.borderLeft = `1px solid ${color}`;
  if (pos.includes("right")) style.borderRight = `1px solid ${color}`;

  // Registration dot position: inside corner
  const dotStyle: React.CSSProperties = {
    position: "absolute",
    width: 3,
    height: 3,
    borderRadius: "50%",
    background: "rgba(45,212,191,0.08)",
  };
  if (pos.includes("top")) dotStyle.top = 2;
  if (pos.includes("bottom")) dotStyle.bottom = 2;
  if (pos.includes("left")) dotStyle.left = 2;
  if (pos.includes("right")) dotStyle.right = 2;

  return (
    <div aria-hidden="true" style={style}>
      <div style={dotStyle} />
    </div>
  );
}
