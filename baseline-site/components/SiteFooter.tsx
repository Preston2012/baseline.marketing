import Link from "next/link";
import { site } from "@/config/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        marginTop: 28,
        borderTop: "2px solid var(--border_inactive)",
        background: "rgba(12,26,35,0.25)"
      }}
    >
      <div className="container" style={{ padding: "18px 16px" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div className="small">&copy; {year} Baseline. All rights reserved.</div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link className="small" href="/privacy/">Privacy</Link>
            <Link className="small" href="/terms/">Terms</Link>
            <Link className="small" href="/eula/">EULA</Link>
            <Link className="small" href="/do-not-sell-or-share/">Do Not Sell or Share</Link>
            <Link className="small" href="/support/">Support</Link>
            <Link className="small" href="/press/">Press</Link>
          </div>
        </div>

        <div style={{ height: 10 }} />

        <div className="small" style={{ opacity: 0.5, marginTop: 4 }}>
          Baseline, The Receipt™, Framing Radar™, The Lens Lab™, and Provision Drift™ are trademarks of Baseline.
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 4 }}>
          <a className="small" href={`mailto:${site.contact.support}`}>{site.contact.support}</a>
        </div>
      </div>
    </footer>
  );
}
