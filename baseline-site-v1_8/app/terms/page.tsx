import type { Metadata } from "next";
import { site } from "@/config/site";
import { LegalDoc } from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Baseline Terms of Service. Acceptable use and dispute terms for the free speech-measurement app. Observational analysis, not a fact-check.",
  alternates: { canonical: `${site.url}/terms/` },
  openGraph: {
    title: "Terms of Service | Baseline",
    description: "Baseline Terms of Service. Acceptable use and dispute terms for the free speech-measurement app. Observational analysis, not a fact-check.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Baseline" }],
  },
};

export default function TermsPage() {
  return (
    <LegalDoc
      title="BASELINE | Terms of Service"
      effectiveDate="November 17, 2026"
      lastUpdated="November 17, 2026"
      summary={[
        "Baseline is free. There is nothing to buy.",
        "Baseline is a measurement tool, not a verification service.",
        "Covers acceptable use. Disputes go to the state courts in Coos County, Oregon, and small claims court is allowed.",
        "Observational analysis only. Not a fact-check."
      ]}
    >
      <p className="p" style={{ color: "var(--text)", fontWeight: 600 }}>
        Observational analysis only. Not a fact-check.
      </p>

      <h2 className="h3">1. Acceptance of Terms</h2>
      <p className="p">
        By using the Baseline mobile application (the &ldquo;App&rdquo;), you agree to these Terms of Service
        (&ldquo;Terms&rdquo;) with Winters Code of Bandon, Oregon (&ldquo;Winters Code,&rdquo; &ldquo;we,&rdquo;
        &ldquo;us&rdquo;), which makes the App. Baseline is the name of the App. If you do not agree, do not use the
        App.
      </p>

      <h2 className="h3">2. Service Description</h2>
      <p className="p">
        Baseline is an observational measurement tool for public speech. The App processes public statements through
        multiple independent AI systems and shows the outputs side by side with source context and a separate
        consensus layer.
      </p>
      <p className="p">
        <strong>Baseline is not a fact-checking service, a verification service, or a news source.</strong> Outputs
        are observational measurements that may vary between AI systems. The App does not make truth claims, render
        judgments, or provide veracity determinations.
      </p>

      <h2 className="h3">3. Free to Use</h2>
      <p className="p">
        The App is free. It has no advertising, no subscriptions, and no purchases. Baseline is meant to be open
        source. If that changes how the App is licensed, these Terms will say so.
      </p>

      <h2 className="h3">4. Eligibility</h2>
      <p className="p">
        You must be at least 13 years of age (or the applicable minimum age in your jurisdiction) to use the App. By
        using the App, you say you meet this requirement.
      </p>

      <h2 className="h3">5. Accounts</h2>
      <p className="p">
        You can use the App without an account. An account is needed to sync follows and alerts. You are responsible
        for keeping your sign-in details safe and for activity under your account. Give accurate information and tell
        us promptly about unauthorized use. You can delete your account in the App at any time.
      </p>

      <h2 className="h3">6. Acceptable Use</h2>
      <p className="p">You agree not to:</p>
      <ul className="p">
        <li>Attempt to gain unauthorized access to the App, its servers, or any related systems.</li>
        <li>Use the App to harass, defame, or threaten any person.</li>
        <li>Present App outputs as independent verification, fact-checks, or authoritative judgments.</li>
        <li>Scrape, crawl, or use automated means to access the App beyond normal usage.</li>
        <li>Circumvent rate limits or other technical protections.</li>
      </ul>

      <h2 className="h3">7. Intellectual Property</h2>
      <p className="p">
        The App&rsquo;s content, design, and software are the property of Winters Code or its licensors, except where an
        open source license says otherwise for specific code. Public statements shown in the App belong to their
        speakers and sources and are shown with attribution.
      </p>
      <p className="p">
        &ldquo;Baseline,&rdquo; &ldquo;The Receipt&trade;,&rdquo; &ldquo;Framing Radar&trade;,&rdquo; &ldquo;Lens
        Lab&trade;,&rdquo; &ldquo;Crossfire&trade;,&rdquo; &ldquo;Signal Pulse&trade;,&rdquo; &ldquo;Framing
        Fingerprint&trade;,&rdquo; &ldquo;Constellation Nav&trade;,&rdquo; &ldquo;Provision Drift&trade;,&rdquo;
        &ldquo;Split Microscope&trade;,&rdquo; &ldquo;Intersections Panel&trade;,&rdquo; &ldquo;Declassified
        Dossier&trade;,&rdquo; &ldquo;Narrative Sync&trade;,&rdquo; and associated logos are trademarks of Winters Code.
        Do not use these marks without written consent.
      </p>

      <h2 className="h3">8. Shared Content</h2>
      <p className="p">
        Content you share or export from the App may carry a Baseline watermark. Do not remove or obscure it. Shared
        links are public and may stay reachable.
      </p>

      <h2 className="h3">9. AI-Generated Summaries</h2>
      <p className="p">
        The App produces AI-generated observational summaries of public speech. They are machine-generated
        measurements, not editorial content. Do not present them as human-authored analysis, independent
        verification, or authoritative determinations of any kind.
      </p>

      <h2 className="h3">10. Disclaimers</h2>
      <p className="p">
        THE APP IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND,
        EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
        NON-INFRINGEMENT.
      </p>
      <p className="p">
        AI system outputs are observational measurements that may vary between systems and over time. Variance
        between systems is expected, not a defect. Do not rely on App outputs as the sole basis for any decision.
      </p>

      <h2 className="h3">11. Limitation of Liability</h2>
      <p className="p">
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, WINTERS CODE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
        CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR RELATED
        TO YOUR USE OF THE APP, REGARDLESS OF THE THEORY OF LIABILITY. BECAUSE THE APP IS FREE, WINTERS CODE&rsquo;S
        TOTAL LIABILITY SHALL NOT EXCEED ONE HUNDRED U.S. DOLLARS (US $100).
      </p>

      <h2 className="h3">12. Indemnification</h2>
      <p className="p">
        You agree to indemnify and hold harmless Winters Code from claims, liabilities, damages, losses,
        and expenses (including reasonable attorneys&rsquo; fees) arising out of your violation of these Terms or your
        use of the App.
      </p>

      <h2 className="h3">13. Corrections and Takedown Requests</h2>
      <p className="p">
        Public figures, their representatives, and anyone else may report an error or request a correction or takedown
        at <a href={`mailto:${site.contact.support}`}>{site.contact.support}</a>. We review requests under our content
        policies and applicable law.
      </p>

      <h2 className="h3">14. Dispute Resolution</h2>
      <p className="p">
        Any dispute arising from these Terms or your use of the App shall be brought in the state courts located in
        Coos County, Oregon, and you and Winters Code consent to the jurisdiction and venue of those courts. Either
        party may bring an eligible claim in small claims court. Nothing in these Terms requires arbitration.
      </p>

      <h2 className="h3">15. Governing Law</h2>
      <p className="p">
        These Terms are governed by the laws of the State of Oregon, without regard to conflict of law principles.
      </p>

      <h2 className="h3">16. Changes to Terms</h2>
      <p className="p">
        We may update these Terms. We will update the &ldquo;Last Updated&rdquo; date and, where it matters, give
        notice in the App. Continued use after a change means you accept it.
      </p>

      <h2 className="h3">17. Contact</h2>
      <p className="p">
        Questions about these Terms: <a href={`mailto:${site.contact.support}`}>{site.contact.support}</a>.
      </p>
    </LegalDoc>
  );
}
