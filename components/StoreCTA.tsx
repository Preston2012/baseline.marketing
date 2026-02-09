"use client";

import { useState } from "react";

export function StoreCTA({
  variant = "primary",
  label
}: {
  variant?: "primary" | "secondary";
  label: string;
}) {
  const [open, setOpen] = useState(false);

  const isPrimary = variant === "primary";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={isPrimary ? "btnPrimary" : "btnSecondary"}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          height: 52,
          padding: "0 14px",
          borderRadius: "var(--radius_btn)",
          background: isPrimary ? "var(--teal)" : "transparent",
          color: isPrimary ? "var(--bg)" : "var(--text)",
          fontWeight: 600,
          border: isPrimary
            ? "1px solid rgba(45,212,191,0.35)"
            : "1px solid var(--border_inactive)",
          cursor: "pointer",
          fontSize: 14,
          fontFamily: "inherit"
        }}
      >
        {label}
      </button>

      {open ? (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9000,
            background: "rgba(0,0,0,0.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Coming soon"
            style={{
              background: "var(--card)",
              border: "1px solid var(--border_active)",
              borderRadius: 18,
              padding: 28,
              maxWidth: 380,
              width: "100%",
              textAlign: "center"
            }}
          >
            {/* BA mark */}
            <img
              src="/brand/ba_mark.png"
              alt=""
              style={{ height: 48, width: 48, margin: "0 auto 16px" }}
            />

            <div style={{ color: "var(--text)", fontWeight: 600, fontSize: 18, marginBottom: 8 }}>
              Coming Soon
            </div>

            <p style={{ color: "var(--sub)", fontSize: 14, lineHeight: 1.5, margin: "0 0 20px" }}>
              Thanks for your interest in Baseline. We&rsquo;re
              launching on the App Store and Google Play soon.
            </p>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="btnPrimary"
              style={{
                height: 44,
                padding: "0 24px",
                borderRadius: "var(--radius_btn)",
                background: "var(--teal)",
                color: "var(--bg)",
                fontWeight: 600,
                border: "1px solid rgba(45,212,191,0.35)",
                cursor: "pointer",
                fontSize: 14,
                fontFamily: "inherit"
              }}
            >
              Got it
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}
