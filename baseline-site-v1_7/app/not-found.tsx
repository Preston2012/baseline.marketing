import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Signal Lost"
};

export default function NotFound() {
  return (
    <section
      className="section"
      aria-label="Page not found"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        position: "relative",
      }}
    >
      {/* Classification micro-stamp */}
      <div style={{
        fontFamily: "var(--font-jetbrains, monospace)",
        fontSize: 8, letterSpacing: "0.15em",
        color: "rgba(45,212,191,0.12)",
        textTransform: "uppercase", marginBottom: 24,
      }}>
        SYS.ERR // ROUTE NOT FOUND // 0x404
      </div>

      <span className="data" style={{
        color: "var(--teal)", fontSize: 11,
        letterSpacing: "0.15em", textTransform: "uppercase",
        display: "block", marginBottom: 16,
      }}>
        404
      </span>

      <h1 className="h1" style={{ fontSize: 32, marginBottom: 12, letterSpacing: "-0.02em" }}>
        Signal Lost
      </h1>

      <p className="data" style={{ color: "var(--sub)", fontSize: 13, margin: "0 0 32px", opacity: 0.6 }}>
        This route returned no measurement data.
      </p>

      {/* Hash mark divider */}
      <div aria-hidden="true" style={{ width: 120, height: 1, background: "rgba(45,212,191,0.06)", position: "relative", marginBottom: 32 }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} style={{ position: "absolute", left: `${(i / 11) * 100}%`, top: -1, width: 1, height: i % 3 === 0 ? 5 : 2, background: "rgba(45,212,191,0.1)" }} />
        ))}
      </div>

      <Link href="/" style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        height: 44, padding: "0 24px", border: "2px solid var(--teal)",
        borderRadius: 12, color: "var(--teal)", textDecoration: "none",
        fontSize: 14, fontWeight: 600, transition: "background 200ms ease-out",
      }}>
        Return to BASELINE
      </Link>

      <div style={{
        fontFamily: "var(--font-jetbrains, monospace)",
        fontSize: 7, color: "rgba(45,212,191,0.08)",
        marginTop: 48, letterSpacing: "0.1em",
      }}>
        GRID: 0x2DD4BF · STATUS: NO SIGNAL · RETRY: RECOMMENDED
      </div>
    </section>
  );
}
