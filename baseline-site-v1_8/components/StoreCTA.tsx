"use client";

import { useState } from "react";
import { BRAND_BA_MARK, BADGE_APPSTORE, BADGE_GOOGLEPLAY } from "../config/brand-assets";

export function StoreCTA({
  store
}: {
  store: "appstore" | "googleplay";
}) {
  const [open, setOpen] = useState(false);

  const badge =
    store === "appstore"
      ? { src: BADGE_APPSTORE, alt: "Download on the App Store" }
      : { src: BADGE_GOOGLEPLAY, alt: "Get it on Google Play" };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={badge.alt}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
          borderRadius: 8,
          transition: "opacity 0.15s ease"
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
      >
        <img
          src={badge.src}
          alt={badge.alt}
          style={{ height: 44, minWidth: 148, width: "auto", display: "block" }}
        />
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
            onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false); }}
            role="dialog"
            aria-modal="true"
            aria-label="Coming soon"
            style={{
              background: "var(--card)",
              border: "2px solid var(--border_active)",
              borderRadius: 18,
              padding: 28,
              maxWidth: 380,
              width: "100%",
              textAlign: "center"
            }}
          >
            {/* BA mark */}
            <img
              src={BRAND_BA_MARK}
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
              autoFocus
              onClick={() => setOpen(false)}
              className="btnPrimary"
              style={{
                height: 44,
                padding: "0 24px",
                borderRadius: "var(--radius_btn)",
                background: "var(--teal)",
                color: "var(--bg)",
                fontWeight: 600,
                border: "2px solid rgba(45,212,191,0.35)",
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
