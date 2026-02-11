import type { Metadata } from "next";
import { site } from "@/config/site";
import { LegalDoc } from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Baseline Privacy Policy — data collection, use, sharing, retention, and your rights.",
  alternates: { canonical: `${site.url}/privacy/` }
};

export default function PrivacyPage() {
  return (
    <LegalDoc
      title="BASELINE &mdash; Privacy Policy"
      effectiveDate="February 8, 2026"
      lastUpdated="February 8, 2026"
      summary={[
        "Applies to the Baseline mobile application on iOS and Android.",
        "Describes collection, use, sharing, retention, and your rights.",
        "Observational analysis only. Not a fact-check."
      ]}
    >
      <p className="p">
        Baseline (&ldquo;Baseline,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the
        Baseline mobile application (the &ldquo;App&rdquo;) available on iOS and Android platforms. This Privacy Policy
        describes how we collect, use, disclose, and protect your information when you use the App.
      </p>

      <p className="p" style={{ color: "var(--text)", fontWeight: 600 }}>
        Observational analysis only. Not a fact-check.
      </p>

      {/* ── 1. Information We Collect ──────────────────────────── */}
      <h2 className="h3">1. Information We Collect</h2>

      <h3 className="h3" style={{ marginTop: 12 }}>1.1 Information You Provide Directly</h3>
      <ul className="p">
        <li>
          <strong>Account Information:</strong> Email address and password when you register, or authentication
          credentials when you sign in via Google or Apple OAuth.
        </li>
        <li>
          {/* Audit fix: "avatar image" not "avatar URL" */}
          <strong>Profile Information:</strong> Display name and avatar image, if you choose to provide them.
        </li>
        <li>
          <strong>User Preferences:</strong> App settings such as notification preferences and other configuration settings,
          stored as structured data.
        </li>
        <li>
          {/* Audit fix: Pro, Pro+, B2B — not just "Pro+ or B2B" */}
          <strong>Private Annotations:</strong> If you are a paid subscriber (Pro, Pro+, or B2B tier), you may
          create private notes on public figure statements. These annotations are visible only to you and are never
          shared with other users or made public.
        </li>
        <li>
          <strong>Subscription Information:</strong> Your subscription tier (Core, Pro, Pro+, or B2B), purchase
          history, and billing status. Payment processing is handled entirely by Apple (App Store) and Google
          (Google Play), and our subscription management partner RevenueCat. We do not collect or store your
          payment instruments.
        </li>
        <li>
          <strong>Support Communications:</strong> If you contact us for support, we may collect your name, email
          address, and the content of your communication.
        </li>
      </ul>

      <h3 className="h3" style={{ marginTop: 12 }}>1.2 Information Collected Automatically</h3>
      <ul className="p">
        <li>
          <strong>Device Information:</strong> Device type, operating system version, and mobile network information.
        </li>
        <li>
          <strong>Usage Data:</strong> Features accessed, pages viewed, interaction timestamps, and session duration.
        </li>
        <li>
          <strong>IP Address:</strong> Collected for rate limiting, abuse prevention, and general analytics.
        </li>
        <li>
          <strong>Crash and Performance Data:</strong> Diagnostic information to identify and fix bugs.
        </li>
      </ul>

      <h3 className="h3" style={{ marginTop: 12 }}>1.3 Information from Third-Party Services</h3>
      <ul className="p">
        <li>
          <strong>Authentication Providers:</strong> If you sign in with Google or Apple, we receive your name and
          email address as authorized by you.
        </li>
        <li>
          <strong>RevenueCat:</strong> Subscription status, product identifiers, transaction timestamps, and
          renewal/cancellation events.
        </li>
        <li>
          <strong>Google AdMob:</strong> For Core (free) tier users, advertisements may involve device identifiers
          and ad interaction data.
        </li>
      </ul>

      {/* ── 2. How We Use Your Information ─────────────────────── */}
      <h2 className="h3">2. How We Use Your Information</h2>
      <ul className="p">
        <li>Provide, maintain, and improve the App and its measurement surfaces.</li>
        <li>Authenticate your identity and manage your subscription tier.</li>
        <li>Enforce rate limits and feature gates based on your subscription.</li>
        <li>Display advertising for Core (free) tier users via Google AdMob, limited to the Today Feed and Search
          surfaces only. Ads are never displayed on analysis surfaces.</li>
        <li>Respond to support requests and communicate service updates.</li>
        <li>Detect, prevent, and address technical issues and abuse.</li>
      </ul>

      {/* ── 3. How We Share Your Information ────────────────────── */}
      <h2 className="h3">3. How We Share Your Information</h2>
      <p className="p">
        We do not sell your personal information. We share information only in the following circumstances:
      </p>

      <h3 className="h3" style={{ marginTop: 12 }}>3.1 Service Providers</h3>
      {/* Audit fix: table wrapped in scroll container */}
      <div className="legalTableWrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Provider</th>
              <th scope="col">Purpose</th>
              <th scope="col">Data Shared</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Supabase</strong></td>
              <td>Backend infrastructure, database hosting, authentication</td>
              <td>Account data, profile data, preferences, annotations, usage metadata</td>
            </tr>
            <tr>
              <td><strong>RevenueCat</strong></td>
              <td>Subscription management</td>
              <td>User ID, tier, product IDs, purchase/renewal timestamps</td>
            </tr>
            <tr>
              <td><strong>Google AdMob</strong></td>
              <td>Advertising (Core tier only, Today Feed + Search only)</td>
              <td>Device identifiers, ad interaction data</td>
            </tr>
            <tr>
              <td><strong>AI Providers</strong></td>
              <td>Observational analysis of public-figure statement text</td>
              <td>Public-figure statement text only &mdash; no user personal data is sent to AI providers</td>
            </tr>
            <tr>
              <td><strong>Apple / Google</strong></td>
              <td>App distribution and payment processing</td>
              <td>Purchase and subscription data per platform policies</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 className="h3" style={{ marginTop: 12 }}>3.2 Legal Requirements</h3>
      <p className="p">
        We may disclose information if required by law, regulation, legal process, or governmental request, or to
        protect the rights, property, or safety of Baseline, our users, or the public.
      </p>

      {/* ── 4. Data Retention ──────────────────────────────────── */}
      <h2 className="h3">4. Data Retention</h2>
      <ul className="p">
        <li>
          <strong>Account Data:</strong> Retained while your account is active. Upon account deletion, personal data
          is removed within 30 days. Some data may persist in encrypted backups for up to 90 days.
        </li>
        <li>
          <strong>Financial Records:</strong> Transaction records retained for 7 years for legal and tax compliance.
        </li>
        <li>
          <strong>Anonymous Usage Data:</strong> Aggregated, de-identified usage data may be retained indefinitely
          for product improvement.
        </li>
        <li>
          <strong>Server Logs:</strong> Retained for 90 days for security and debugging purposes.
        </li>
      </ul>

      {/* ── 5. Advertising ─────────────────────────────────────── */}
      <h2 className="h3">5. Advertising</h2>
      <p className="p">
        Core (free) tier users may see advertisements served by Google AdMob. Ads appear only on the Today Feed
        and Search surfaces. Advertisements are never displayed on analysis surfaces (Statement Detail, The Lens Lab&trade;,
        Framing Radar&trade;, Trends, or The Receipt&trade; screens). Paid subscribers (Pro, Pro+, B2B) do not see any
        advertisements.
      </p>
      <p className="p">
        Ad-related data sharing may constitute &ldquo;sharing&rdquo; of personal information under the California
        Privacy Rights Act (CPRA). See Section 7 and our{" "}
        <a href="/do-not-sell-or-share/">Do Not Sell or Share</a> page for opt-out instructions.
      </p>

      {/* ── 6. Data Security ───────────────────────────────────── */}
      <h2 className="h3">6. Data Security</h2>
      <p className="p">
        We implement industry-standard security measures including encryption in transit (TLS), encryption at rest,
        row-level security policies in our database, and role-based access controls. However, no method of electronic
        transmission or storage is 100% secure, and we cannot guarantee absolute security.
      </p>

      {/* ── 7. Your Rights and Choices ─────────────────────────── */}
      <h2 className="h3">7. Your Rights and Choices</h2>

      {/* Audit fix: sequential numbering, no gaps */}
      <h3 className="h3" style={{ marginTop: 12 }}>7.1 All Users</h3>
      <ul className="p">
        <li>Access and update your profile information through App settings.</li>
        <li>Delete your account by contacting <a href={`mailto:${site.contact.privacy}`}>{site.contact.privacy}</a>.</li>
        <li>Manage notification preferences in App settings.</li>
        <li>Manage or cancel your subscription through App Store / Google Play settings.</li>
      </ul>

      <h3 className="h3" style={{ marginTop: 12 }}>7.2 California Residents (CCPA/CPRA)</h3>
      <p className="p">
        California residents have the right to know what personal information is collected, request deletion, request
        correction, and opt out of the &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal information. Baseline
        does not sell personal information. For ad-related data sharing opt-out, see our{" "}
        <a href="/do-not-sell-or-share/">Do Not Sell or Share</a> page.
      </p>

      <h3 className="h3" style={{ marginTop: 12 }}>7.3 EEA / UK Residents (GDPR)</h3>
      <p className="p">
        If you are located in the European Economic Area or the United Kingdom, we process your personal data on the
        following legal bases: consent (where you have given it), contractual necessity (to provide the App),
        legitimate interest (to improve and secure the App), and legal obligation (to comply with applicable law).
      </p>
      <p className="p">You have the right to:</p>
      <ul className="p">
        <li>Access the personal data we hold about you.</li>
        <li>Request rectification of inaccurate data.</li>
        <li>Request erasure of your personal data.</li>
        <li>Object to or restrict certain processing.</li>
        <li>Request data portability.</li>
        <li>Withdraw consent at any time (without affecting the lawfulness of prior processing).</li>
      </ul>
      <p className="p">
        Data transfers outside the EEA are protected by Standard Contractual Clauses (SCCs) or equivalent safeguards.
        You may lodge a complaint with your local supervisory authority.
      </p>

      {/* ── 8. Children&rsquo;s Privacy ───────────────────────── */}
      <h2 className="h3">8. Children&rsquo;s Privacy</h2>
      <p className="p">
        The App is not directed to children under the age of 13 (or the applicable age of consent in your
        jurisdiction). We do not knowingly collect personal information from children. If we learn that we have
        collected information from a child, we will delete it promptly.
      </p>

      {/* ── 9. Changes to This Policy ──────────────────────────── */}
      <h2 className="h3">9. Changes to This Policy</h2>
      <p className="p">
        We may update this Privacy Policy from time to time. We will notify you of material changes by updating the
        &ldquo;Last Updated&rdquo; date above and, where appropriate, providing notice through the App. Your continued
        use of the App after changes constitutes acceptance of the updated policy.
      </p>

      {/* ── 10. Contact ────────────────────────────────────────── */}
      <h2 className="h3">10. Contact</h2>
      <p className="p">
        For privacy-related questions or requests, contact us at{" "}
        <a href={`mailto:${site.contact.privacy}`}>{site.contact.privacy}</a>.
      </p>
    </LegalDoc>
  );
}
