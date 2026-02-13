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
      }}
    >
      <span
        className="data"
        style={{
          color: "var(--teal)",
          fontSize: 11,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          display: "block",
          marginBottom: 16,
        }}
      >
        404
      </span>

      <h1
        className="h1"
        style={{
          fontSize: 32,
          marginBottom: 12,
          letterSpacing: "-0.02em",
        }}
      >
        Signal Lost
      </h1>

      <p
        className="data"
        style={{
          color: "var(--sub)",
          fontSize: 13,
          margin: "0 0 32px",
          opacity: 0.6,
        }}
      >
        This route returned no measurement data.
      </p>

      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          height: 44,
          padding: "0 24px",
          border: "2px solid var(--teal)",
          borderRadius: 12,
          color: "var(--teal)",
          textDecoration: "none",
          fontSize: 14,
          fontWeight: 600,
          transition: "background 200ms ease-out",
        }}
      >
        Return to BASELINE
      </Link>
    </section>
  );
}
