import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { LegalDoc } from "@/components/LegalDoc";
import { Card } from "@/components/Card";

export const metadata: Metadata = {
  title: "Do Not Sell or Share",
  description: "Baseline does not sell or share personal information. How to ask about your data under CPRA and CCPA.",
  alternates: { canonical: `${site.url}/do-not-sell-or-share/` }
};

export default function DoNotSellPage() {
  return (
    <LegalDoc
      title="BASELINE | Do Not Sell or Share My Personal Information"
      effectiveDate="Not yet in effect (draft)"
      lastUpdated="November 17, 2026"
      summary={[
        "Baseline does not sell personal information.",
        "Baseline does not share personal information for advertising.",
        "You can still ask to see, correct, or delete your data."
      ]}
    >
      <p className="p">
        Baseline does not sell your personal information. Baseline does not share it for cross-context behavioral
        advertising. The app has no advertising and no advertising partners, so there is nothing to opt out of.
      </p>

      <h2 className="h3">What Leaves Baseline</h2>
      <p className="p">
        Your data lives on servers that Winters Code operates. The only information sent to AI providers is the text of
        public statements. No data about you is sent to them. The{" "}
        <Link href="/privacy/">Privacy Policy</Link> lists every recipient.
      </p>

      <Card title="Your options">
        <ol className="p" style={{ margin: 0 }}>
          <li>
            <strong>Usage sharing:</strong> turn off &ldquo;Share usage data&rdquo; in the app&rsquo;s Settings.
          </li>
          <li>
            <strong>Delete your account:</strong> Settings, then delete account.
          </li>
          <li>
            <strong>Ask us:</strong> email{" "}
            <a href={`mailto:${site.contact.support}?subject=Privacy%20request`}>{site.contact.support}</a> to see,
            correct, or delete your data, or to confirm that nothing is sold or shared.
          </li>
        </ol>
      </Card>

      <div style={{ height: 12 }} />

      <h2 className="h3">Processing Timeframe</h2>
      <p className="p">Requests sent by email are answered within 45 days.</p>

      <h2 className="h3">Non-Discrimination</h2>
      <p className="p">
        We will not treat you differently for exercising your privacy rights. The app is free for everyone.
      </p>

      <h2 className="h3">Contact</h2>
      <p className="p">
        Questions about this page: <a href={`mailto:${site.contact.support}`}>{site.contact.support}</a>.
      </p>
    </LegalDoc>
  );
}
