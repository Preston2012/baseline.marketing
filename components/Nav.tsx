"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { StoreCTA } from "./StoreCTA";

type NavItem = { href: string; label: string };

const items: NavItem[] = [
  { href: "/methodology/", label: "Methodology" },
  { href: "/pricing/", label: "Pricing" },
  { href: "/press/", label: "Press" },
  { href: "/support/", label: "Support" }
];

function getFocusable(root: HTMLElement | null): HTMLElement[] {
  if (!root) return [];
  const nodes = root.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  return Array.from(nodes).filter((el) => !el.hasAttribute("disabled"));
}

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const sheetRef = useRef<HTMLDivElement | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);

  /* Normalize pathname for aria-current matching */
  const activeHref = useMemo(() => {
    const p = pathname ?? "/";
    if (p.endsWith("/")) return p;
    return `${p}/`;
  }, [pathname]);

  /* Escape closes mobile sheet */
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Click outside closes mobile sheet */
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (!open) return;
      const target = e.target as Node;
      if (sheetRef.current && !sheetRef.current.contains(target)) setOpen(false);
    }
    window.addEventListener("mousedown", onClickOutside);
    return () => window.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  /* Scroll lock + focus management + focus trap */
  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      /* Return focus to hamburger on close */
      hamburgerRef.current?.focus();
      return;
    }

    /* Lock body scroll while dialog is open */
    document.body.style.overflow = "hidden";

    /* Focus first focusable element in sheet */
    const firstFocusable = getFocusable(sheetRef.current)[0];
    firstFocusable?.focus();

    /* Focus trap: keep Tab cycling within dialog */
    function trap(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      const focusables = getFocusable(sheetRef.current);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (!active) return;

      if (e.shiftKey) {
        if (active === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", trap);
    return () => window.removeEventListener("keydown", trap);
  }, [open]);

  return (
    <header style={{ borderBottom: "1px solid var(--border_inactive)", background: "rgba(8,16,23,0.92)" }}>
      <div
        className="container"
        style={{
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Baseline home"
          style={{ display: "inline-flex", gap: 10, alignItems: "center", textDecoration: "none" }}
        >
          <img src="/brand/ba_mark.png" alt="" style={{ height: 30, width: 30 }} />
          <img src="/brand/wordmark.png" alt="Baseline" style={{ height: 26, width: "auto" }} />
        </Link>

        {/* Audit fix: desktop links inside real <nav> landmark (no ghost nav) */}
        <nav aria-label="Primary" className="navLinks" style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              aria-current={activeHref === it.href ? "page" : undefined}
              style={{
                color: activeHref === it.href ? "var(--text)" : "var(--sub)",
                fontSize: 14,
                textDecoration: "none"
              }}
            >
              {it.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={{
            border: "1px solid var(--border_inactive)",
            background: "rgba(12,26,35,0.35)",
            color: "var(--text)",
            borderRadius: 12,
            height: 44,
            width: 44,
            cursor: "pointer",
            display: "none",
            fontSize: 24,
            fontWeight: 600,
            lineHeight: 1
          }}
          className="hamburger"
        >
          {open ? "\u00D7" : "\u2261"}
        </button>
      </div>

      {/* Mobile sheet dialog */}
      {open ? (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            zIndex: 200
          }}
        >
          <div
            ref={sheetRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            style={{
              position: "absolute",
              right: 12,
              top: 12,
              width: "min(360px, calc(100% - 24px))",
              borderRadius: 16,
              background: "rgba(12,26,35,0.92)",
              border: "1px solid var(--border_inactive)",
              padding: 12,
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)"
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={() => setOpen(false)}
                  aria-current={activeHref === it.href ? "page" : undefined}
                  style={{
                    padding: "12px 10px",
                    borderRadius: 12,
                    border: "1px solid var(--border_inactive)",
                    textDecoration: "none",
                    color: activeHref === it.href ? "var(--text)" : "var(--sub)",
                    fontWeight: 600
                  }}
                >
                  {it.label}
                </Link>
              ))}

              <div style={{ height: 4 }} />

              <StoreCTA variant="primary" label="Download on the App Store" />
              <StoreCTA variant="secondary" label="Get it on Google Play" />
            </div>
          </div>
        </div>
      ) : null}

      {/* Responsive breakpoint */}
      <style>{`
        @media (max-width: 720px){
          .navLinks { display: none !important; }
          .hamburger { display: inline-flex !important; align-items:center; justify-content:center; }
        }
        @media (min-width: 721px){
          .hamburger { display: none !important; }
          .navLinks { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
