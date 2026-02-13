import Link from "next/link";
import { site } from "@/config/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="noSelect"
      style={{
        marginTop: 28,
        borderTop: "2px solid var(--border_inactive)",
        background: "rgba(12,26,35,0.25)"
      }}
    >
      <div className="container" style={{ padding: "14px 16px" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div className="small">&copy; {year} Baseline. All rights reserved.</div>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {[
              { href: "/privacy/", label: "Privacy" },
              { href: "/terms/", label: "Terms" },
              { href: "/eula/", label: "EULA" },
              { href: "/do-not-sell-or-share/", label: "Do Not Sell or Share" },
              { href: "/support/", label: "Support" },
              { href: "/press/", label: "Press" },
            ].map((link) => (
              <Link
                key={link.href}
                className="small"
                href={link.href}
                style={{
                  minHeight: 44,
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0 4px",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="small" style={{ opacity: 0.5, marginTop: 4, lineHeight: 1.8 }}>
          Baseline, The Receipt™, Framing Radar™, Lens Lab™, Crossfire™, Signal Pulse™,
          Framing Fingerprint™, Constellation Nav™, Provision Drift™, Split Microscope™,
          Intersections Panel™, Declassified Dossier™, and Narrative Sync™ are trademarks of Baseline.
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 4 }}>
          <a
            className="small"
            href={`mailto:${site.contact.support}`}
            style={{ minHeight: 44, display: "inline-flex", alignItems: "center" }}
          >
            {site.contact.support}
          </a>
        </div>

        {/* N5: Next measurement timestamp */}
        <div
          className="data"
          style={{
            fontSize: 10,
            color: "var(--sub)",
            opacity: 0.3,
            marginTop: 8,
            letterSpacing: "0.08em",
          }}
        >
          NEXT MEASUREMENT: &mdash;
        </div>
      </div>
    </footer>
  );
}
