import type { Metadata } from "next";
import { site } from "@/config/site";
import { LegalDoc } from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Baseline Terms of Service.",
  alternates: { canonical: `${site.url}/terms/` }
};

export default function TermsPage() {
  return (
    <LegalDoc
      title="BASELINE | Terms of Service"
      effectiveDate="February 8, 2026"
      lastUpdated="February 8, 2026"
      summary={[
        "Covers acceptable use, subscription terms, and dispute resolution.",
        "Baseline is a measurement tool, not a verification service.",
        "Observational analysis only. Not a fact-check."
      ]}
    >
      <p className="p" style={{ color: "var(--text)", fontWeight: 600 }}>
        Observational analysis only. Not a fact-check.
      </p>

      {/* ── 1. Acceptance ─────────────────────────────────────── */}
      <h2 className="h3">1. Acceptance of Terms</h2>
      <p className="p">
        By accessing or using the Baseline mobile application (the &ldquo;App&rdquo;), you agree to be bound by these
        Terms of Service (&ldquo;Terms&rdquo;). If you do not agree, do not use the App.
      </p>

      {/* ── 2. Service Description ────────────────────────────── */}
      <h2 className="h3">2. Service Description</h2>
      <p className="p">
        Baseline is an observational measurement tool for public speech. The App processes public-figure statements
        through multiple independent AI systems and displays the outputs side-by-side with source context and a
        separate consensus layer.
      </p>
      <p className="p">
        <strong>Baseline is not a fact-checking service, a verification service, or a news source.</strong> Outputs
        are observational measurements that may vary between AI systems. The App does not make truth claims, render
        judgments, or provide veracity determinations.
      </p>

      {/* ── 3. Eligibility ────────────────────────────────────── */}
      <h2 className="h3">3. Eligibility</h2>
      <p className="p">
        You must be at least 13 years of age (or the applicable minimum age in your jurisdiction) to use the App.
        By using the App, you represent that you meet this requirement.
      </p>

      {/* ── 4. Account Registration ───────────────────────────── */}
      <h2 className="h3">4. Account Registration</h2>
      <p className="p">
        Certain features require account registration. You are responsible for maintaining the security of your
        account credentials and for all activities that occur under your account. You agree to provide accurate
        information and to notify us promptly of any unauthorized use.
      </p>
      <p className="p">
        Guest access is available with limited functionality. Authentication is triggered at the first personal
        action (e.g., creating an annotation or managing a subscription).
      </p>

      {/* ── 5. Subscription Plans ─────────────────────────────── */}
      <h2 className="h3">5. Subscription Plans</h2>
      <p className="p">The App offers four tiers:</p>
      <ul className="p">
        <li>
          <strong>Core (Free):</strong> Ad-supported with limited features. Advertisements appear on the Today Feed
          and Search surfaces only, never on analysis surfaces.
        </li>
        <li>
          <strong>Pro ($7.99/month or $59.99/year):</strong> Ad-free with access to The Lens Lab&trade;, Framing
          Radar&trade;, Historical Trends, Vote Tracking, and Annotations (100 limit). Launch price: $5.99/mo for
          the first 60 days, then $7.99/mo.
        </li>
        <li>
          <strong>Pro+ ($24.99/month or $199.99/year):</strong> All Pro features including Provision Drift&trade;, with higher limits and Annotations
          (500 limit).
        </li>
        <li>
          <strong>B2B (annual-only, Contact Us):</strong> All Pro+ features with maximum throughput,
          Annotations (1000 limit), and elevated rate limits. Includes a 30-day pilot period.
        </li>
      </ul>
      <p className="p">
        Pro includes a 7-day free trial. Subscriptions renew automatically unless cancelled at least
        24 hours before the end of the current period. Payment is charged to your App Store or Google Play account.
        You can manage or cancel your subscription in your App Store / Google Play account settings.
      </p>

      {/* ── 6. Acceptable Use ─────────────────────────────────── */}
      <h2 className="h3">6. Acceptable Use</h2>
      <p className="p">You agree not to:</p>
      <ul className="p">
        <li>Attempt to gain unauthorized access to the App, its servers, or any related systems.</li>
        <li>Use the App to harass, defame, or threaten any person.</li>
        <li>Misrepresent App outputs as independent verification, fact-checks, or authoritative judgments.</li>
        <li>Scrape, crawl, or use automated means to access the App beyond normal usage patterns.</li>
        <li>Reverse-engineer, decompile, or disassemble any part of the App.</li>
        <li>Circumvent rate limits, feature gates, or subscription restrictions.</li>
      </ul>

      {/* ── 7. Intellectual Property ──────────────────────────── */}
      <h2 className="h3">7. Intellectual Property</h2>
      <p className="p">
        All content, features, and functionality of the App (including but not limited to text, graphics, logos,
        icons, software, and the compilation thereof) are the property of Baseline or its licensors and are protected
        by copyright, trademark, and other intellectual property laws.
      </p>
      <p className="p">
        &ldquo;Baseline,&rdquo; &ldquo;The Receipt&trade;,&rdquo; &ldquo;Framing Radar&trade;,&rdquo; &ldquo;The Lens Lab&trade;,&rdquo; &ldquo;Provision Drift&trade;,&rdquo;
        and associated logos are trademarks of Baseline. You may not use these marks without prior written consent.
      </p>

      {/* ── 8. Disclaimers ────────────────────────────────────── */}
      <h2 className="h3">8. Disclaimers</h2>
      <p className="p">
        THE APP IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND,
        EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
        PURPOSE, AND NON-INFRINGEMENT.
      </p>
      <p className="p">
        AI system outputs are observational measurements that may vary between systems and over time. Variance
        between systems is expected behavior, not a defect. You should not rely on App outputs as the sole basis for
        any decision.
      </p>

      {/* ── 9. Limitation of Liability ────────────────────────── */}
      <h2 className="h3">9. Limitation of Liability</h2>
      <p className="p">
        TO THE MAXIMUM EXTENT PERMITTED BY LAW, BASELINE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
        CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR
        RELATED TO YOUR USE OF THE APP, REGARDLESS OF THE THEORY OF LIABILITY.
      </p>

      {/* ── 10. Indemnification ───────────────────────────────── */}
      <h2 className="h3">10. Indemnification</h2>
      <p className="p">
        You agree to indemnify and hold harmless Baseline and its officers, directors, employees, and agents from any
        claims, liabilities, damages, losses, and expenses (including reasonable attorneys&rsquo; fees) arising out of
        or related to your violation of these Terms or your use of the App.
      </p>

      {/* ── 11. Takedown Requests ─────────────────────────────── */}
      <h2 className="h3">11. Takedown Requests</h2>
      <p className="p">
        Public figures or their authorized representatives may submit takedown or correction requests to{" "}
        <a href={`mailto:${site.contact.takedown}`}>{site.contact.takedown}</a>. We will review requests in
        accordance with our content policies and applicable law.
      </p>

      {/* ── 12. Dispute Resolution ────────────────────────────── */}
      <h2 className="h3">12. Dispute Resolution</h2>
      <p className="p">
        Any dispute arising from these Terms or your use of the App shall be resolved through binding arbitration
        in accordance with the rules of the American Arbitration Association, except that either party may seek
        injunctive or equitable relief in any court of competent jurisdiction. Class action lawsuits and class-wide
        arbitrations are not permitted.
      </p>

      {/* ── 13. Governing Law ─────────────────────────────────── */}
      <h2 className="h3">13. Governing Law</h2>
      <p className="p">
        These Terms are governed by the laws of the State of Oregon, without regard to conflict of law principles.
      </p>

      {/* ── 14. Changes to Terms ──────────────────────────────── */}
      <h2 className="h3">14. Changes to Terms</h2>
      <p className="p">
        We may update these Terms from time to time. We will notify you of material changes by updating the
        &ldquo;Last Updated&rdquo; date and, where appropriate, providing notice through the App. Your continued use
        of the App after changes constitutes acceptance.
      </p>

      {/* ── 15. Contact ───────────────────────────────────────── */}
      <h2 className="h3">15. Contact</h2>
      <p className="p">
        For questions about these Terms, contact us at{" "}
        <a href={`mailto:${site.contact.legal}`}>{site.contact.legal}</a>.
      </p>
    </LegalDoc>
  );
}
