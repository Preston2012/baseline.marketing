import type { Metadata } from "next";
import { site, LEGAL_DRAFT_NOTICE } from "@/config/site";
import { Card } from "@/components/Card";

export const metadata: Metadata = {
  title: "Support",
  description: "Baseline support. One inbox for help, privacy requests, and corrections. The app is free.",
  alternates: { canonical: `${site.url}/support/` }
};

export default function SupportPage() {
  return (
    <section className="section intel-dot-grid" aria-label="Support" style={{ position: 'relative' }}>
      {/* Registration dots */}
      <div aria-hidden="true" style={{ position: 'absolute', top: 8, left: 8, width: 3, height: 3, borderRadius: '50%', background: 'rgba(45,212,191,0.05)' }} />
      <div aria-hidden="true" style={{ position: 'absolute', top: 8, right: 8, width: 3, height: 3, borderRadius: '50%', background: 'rgba(45,212,191,0.05)' }} />

      {LEGAL_DRAFT_NOTICE ? (
        <p className="data" role="note" style={{ color: "var(--teal)", fontSize: 12, letterSpacing: "0.08em", margin: "0 0 8px" }}>
          {LEGAL_DRAFT_NOTICE}
        </p>
      ) : null}
      <div className="classification-stamp" style={{ marginBottom: 8 }} data-stamp="BASELINE-OPS // SUPPORT CHANNEL" />
      <h1 className="h1" style={{ fontSize: 28 }}>Support</h1>

      <p className="p" style={{ maxWidth: 760 }}>
        For account access, technical issues, or general questions, email support. Baseline is free, so there is
        nothing to bill or cancel.
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

        <Card title="Corrections and takedown requests">
          <p className="p" style={{ margin: 0 }}>
            Email <a href={`mailto:${site.contact.support}?subject=Correction%20request`}>{site.contact.support}</a>{" "}
            with the statement and what is wrong. This is the one monitored inbox.
          </p>
        </Card>

        <Card title="Privacy requests">
          <p className="p" style={{ margin: 0 }}>
            To see, correct, or delete your data, email{" "}
            <a href={`mailto:${site.contact.support}?subject=Privacy%20request`}>{site.contact.support}</a>. You can
            also delete your account in the app.
          </p>
        </Card>
      </div>
    </section>
  );
}
