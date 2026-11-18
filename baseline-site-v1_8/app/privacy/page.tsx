import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { LegalDoc } from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Baseline Privacy Policy. What the free Baseline app collects, how it is used, who receives it, how long it is kept, and how to delete it.",
  alternates: { canonical: `${site.url}/privacy/` },
  openGraph: {
    title: "Privacy Policy | Baseline",
    description: "Baseline Privacy Policy. What the free Baseline app collects, how it is used, who receives it, how long it is kept, and how to delete it.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Baseline" }],
  },
};

export default function PrivacyPage() {
  return (
    <LegalDoc
      title="BASELINE | Privacy Policy"
      effectiveDate="November 17, 2026"
      lastUpdated="November 17, 2026"
      summary={[
        "Baseline is free. No ads, no purchases, no sale of your data.",
        "You can use the app without an account. An account is for sync and alerts.",
        "Usage sharing is on by default and you can turn it off in Settings.",
        "Observational analysis only. Not a fact-check."
      ]}
    >
      <p className="p">
        Winters Code of Bandon, Oregon (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) makes Baseline, a free
        mobile app for observing public speech. This policy explains
        what the app collects, why, who receives it, and how to delete it.
      </p>

      <p className="p" style={{ color: "var(--text)", fontWeight: 600 }}>
        Observational analysis only. Not a fact-check.
      </p>

      <h2 className="h3">1. What Baseline Collects</h2>

      <h3 className="h3" style={{ marginTop: 12 }}>1.1 If you create an account</h3>
      <ul className="p">
        <li>
          <strong>Sign-in details:</strong> your email address and password, or the name and email address that Google
          or Apple share with us when you sign in with them. You can browse the app without signing in.
        </li>
        <li>
          <strong>Profile:</strong> a display name and avatar, if you choose to add them.
        </li>
        <li>
          <strong>Your choices:</strong> the figures you follow, your alert rules and alert settings, your notification
          preferences, and feedback you submit inside the app, including requests to track a figure.
        </li>
        <li>
          <strong>Push notifications:</strong> if you turn notifications on, the app stores a device identifier for
          push delivery in your profile preferences.
        </li>
      </ul>

      <h3 className="h3" style={{ marginTop: 12 }}>1.2 Usage data</h3>
      <p className="p">
        The app sends short usage events: app opened, feed viewed, a card opened, an alert or digest opened, a figure
        followed or unfollowed, and a share. Each event carries only short tokens, such as an identifier for the card
        you opened, never free text. Events are tied to a random identifier generated on your device and, if you are
        signed in, to your account. This is on by default. You can turn it off in Settings under &ldquo;Share usage
        data&rdquo;. When it is off, the app records nothing and clears anything queued.
      </p>

      <h3 className="h3" style={{ marginTop: 12 }}>1.3 Network data</h3>
      <p className="p">
        Our servers see your IP address when the app connects. We use it to limit abuse and to rate limit requests.
      </p>

      <h3 className="h3" style={{ marginTop: 12 }}>1.4 What Baseline does not collect</h3>
      <ul className="p">
        <li>No location data. The app does not ask for your location.</li>
        <li>No advertising identifier. The app contains no advertising.</li>
        <li>No payment information. There is nothing to buy.</li>
        <li>
          No third-party crash reporting or analytics service. Crash data comes only from what Google Play and the App
          Store provide to developers.
        </li>
      </ul>

      <h2 className="h3">2. How We Use It</h2>
      <ul className="p">
        <li>Run the app, keep your follows and alerts in sync, and send alerts you ask for.</li>
        <li>Count how the app is used so we can improve it.</li>
        <li>Prevent abuse and fix technical problems.</li>
        <li>Answer your support email and correction reports.</li>
      </ul>
      <p className="p">We do not sell your personal information. We do not share it for advertising.</p>

      <h2 className="h3">3. Who Receives It</h2>
      <div className="legalTableWrap" tabIndex={0} role="region" aria-label="Who receives your data">
        <table>
          <thead>
            <tr>
              <th scope="col">Recipient</th>
              <th scope="col">Purpose</th>
              <th scope="col">Data</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Baseline servers</strong></td>
              <td>
                Accounts, sync, alerts and the app&rsquo;s data. Operated by Winters Code on servers it runs at
                Hetzner in Nuremberg, Germany. Your data is stored in Germany. No outside database service holds your
                data.
              </td>
              <td>Everything in section 1</td>
            </tr>
            <tr>
              <td><strong>Google and Apple</strong></td>
              <td>Sign-in if you choose it, app distribution, and push delivery if you turn notifications on</td>
              <td>Sign-in details; push delivery data</td>
            </tr>
            <tr>
              <td><strong>AI providers</strong></td>
              <td>Observational analysis of public statements</td>
              <td>Public statement text only. No data about you is sent</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="p">
        We may disclose information if the law requires it or to protect people from harm.
      </p>

      <h2 className="h3">4. How Long We Keep It</h2>
      <ul className="p">
        <li>
          <strong>Account data:</strong> kept while your account is active. When you delete your account in the app,
          your account data is removed from the live database.
        </li>
        <li>
          <strong>Backups:</strong> the database is backed up nightly and the backups are encrypted. Deleted data
          leaves backups as older copies are replaced.
        </li>
        <li>
          <strong>Usage events:</strong> kept tied to the random device identifier and, if you were signed in, your
          account.
        </li>
      </ul>

      <h2 className="h3">5. Security</h2>
      <p className="p">
        Your data is stored in Germany. If you use the app outside Germany, your data is sent to Germany. The
        app and our servers talk over an encrypted connection (TLS). Backups are encrypted. No system is perfectly
        secure, and we cannot promise it.
      </p>

      <h2 className="h3">6. Your Choices and Rights</h2>
      <ul className="p">
        <li>Use the app without an account.</li>
        <li>Turn off usage sharing in Settings.</li>
        <li>Turn off notifications in the app or in your phone settings.</li>
        <li>Edit your profile in Settings.</li>
        <li>Delete your account inside the app: Settings, then delete account.</li>
        <li>
          Ask for a copy of your data, a correction, or deletion by emailing{" "}
          <a href={`mailto:${site.contact.support}`}>{site.contact.support}</a>.
        </li>
      </ul>
      <p className="p">
        California residents have the right to know, delete, correct, and opt out of sale or sharing. Baseline does not
        sell or share personal information. See{" "}
        <Link href="/do-not-sell-or-share/">Do Not Sell or Share</Link>. If you are in the European Economic Area or
        the United Kingdom, you can also object to or restrict processing, ask for portability, and complain to your
        local supervisory authority. We process your data to provide the app you asked for, with your consent where
        you gave it, and for our legitimate interest in keeping the app working and safe.
      </p>

      <h2 className="h3">7. Children</h2>
      <p className="p">
        The app is not directed to children under 13. We do not knowingly collect their information. If we learn that
        we have, we will delete it.
      </p>

      <h2 className="h3">8. Changes</h2>
      <p className="p">
        If this policy changes, we will update the date above and give notice in the app where it matters.
      </p>

      <h2 className="h3">9. Contact</h2>
      <p className="p">
        Questions or requests: <a href={`mailto:${site.contact.support}`}>{site.contact.support}</a>.
      </p>
    </LegalDoc>
  );
}
