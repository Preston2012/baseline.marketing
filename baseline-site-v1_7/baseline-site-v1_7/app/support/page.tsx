import type { Metadata } from "next";
import { site } from "@/config/site";
import { Card } from "@/components/Card";

export const metadata: Metadata = {
  title: "Support",
  description: "Support contacts and operational notes for Baseline.",
  alternates: { canonical: `${site.url}/support/` }
};

export default function SupportPage() {
  return (
    <section className="section" aria-label="Support">
      <h1 className="h1" style={{ fontSize: 28 }}>Support</h1>

      <p className="p" style={{ maxWidth: 760 }}>
        For account access, technical issues, or general questions, email support. Subscription management and
        cancellations are handled through the App Store / Google Play subscription settings.
      </p>

      {/* Audit fix: disclaimer on Support page */}
      <p className="p" style={{ color: "var(--text)", fontWeight: 600 }}>
        Observational analysis only. Not a fact-check.
      </p>

      <div className="grid grid_2" style={{ marginTop: 12 }}>
        <Card title="Support">
          <p className="p" style={{ margin: 0 }}>
            <a href={`mailto:${site.contact.support}`}>{site.contact.support}</a>
          </p>
        </Card>

        <Card title="Takedown / correction requests">
          <p className="p" style={{ margin: 0 }}>
            <a href={`mailto:${site.contact.takedown}`}>{site.contact.takedown}</a>
          </p>
        </Card>

        <Card title="Privacy">
          <p className="p" style={{ margin: 0 }}>
            <a href={`mailto:${site.contact.privacy}`}>{site.contact.privacy}</a>
          </p>
        </Card>

        <Card title="Legal">
          <p className="p" style={{ margin: 0 }}>
            <a href={`mailto:${site.contact.legal}`}>{site.contact.legal}</a>
          </p>
        </Card>
      </div>
    </section>
  );
}
