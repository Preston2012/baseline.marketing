import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { Card } from "@/components/Card";
import { StoreBadges } from "@/components/StoreCTA";

export const metadata: Metadata = {
  title: "Free",
  description: "Baseline is free. No ads, no subscriptions, no purchases, and no sale of your data.",
  alternates: { canonical: `${site.url}/pricing/` },
  openGraph: {
    title: "Free | Baseline",
    description: "Baseline is free. No ads, no subscriptions, no purchases, and no sale of your data.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Baseline is free" }],
  },
};

export default function FreePage() {
  return (
    <section className="section" aria-label="Free" style={{ position: 'relative' }}>
      {/* Registration dots */}
      <div aria-hidden="true" style={{ position: 'absolute', top: 8, left: 8, width: 3, height: 3, borderRadius: '50%', background: 'rgba(45,212,191,0.05)' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: 8, right: 8, width: 3, height: 3, borderRadius: '50%', background: 'rgba(45,212,191,0.05)' }} />

      <h1 className="h1" style={{ fontSize: 28 }}>Free</h1>
      <p className="p" style={{ maxWidth: 760 }}>
        Baseline is free. Every feature is open to everyone.
      </p>
      <p className="p" style={{ color: "var(--text)", fontWeight: 600 }}>
        Observational analysis only. Not a fact-check.
      </p>

      <div className="grid grid_2" style={{ marginTop: 12 }}>
        <Card title="What is free">
          <p className="p" style={{ margin: 0 }}>
            Everything. The Receipt&trade;, Framing Radar&trade;, The Lens Lab&trade;, Provision Drift&trade; and every
            other surface. No tiers. No locked features.
          </p>
        </Card>

        <Card title="No ads">
          <p className="p" style={{ margin: 0 }}>
            The app shows no advertising and has no advertising partners.
          </p>
        </Card>

        <Card title="No data sales">
          <p className="p" style={{ margin: 0 }}>
            We do not sell your data and we do not share it for advertising. The servers are ours, at Hetzner in Nuremberg, Germany. See the{" "}
            <Link href="/privacy/">Privacy Policy</Link>.
          </p>
        </Card>

        <Card title="How it is funded">
          <p className="p" style={{ margin: 0 }}>
            Baseline is meant to be open source. Winters Code runs it today and is seeking funding from grants and open
            source programs. No grant or funder is confirmed yet. Nothing here is paid for by selling your attention or
            your data.
          </p>
        </Card>
      </div>

      <h2 className="h3" style={{ marginTop: 24 }}>Get the app</h2>
      <StoreBadges marginTop={8} />
    </section>
  );
}
