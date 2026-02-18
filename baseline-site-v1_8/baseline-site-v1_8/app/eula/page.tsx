import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { LegalDoc } from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "End User License Agreement",
  description: "Baseline End User License Agreement (EULA).",
  alternates: { canonical: `${site.url}/eula/` }
};

export default function EulaPage() {
  return (
    <LegalDoc
      title="BASELINE | End User License Agreement"
      effectiveDate="February 8, 2026"
      lastUpdated="February 8, 2026"
      summary={[
        "License terms for using the Baseline mobile application.",
        "Covers subscription auto-renewal, trial terms, and platform requirements.",
        "Observational analysis only. Not a fact-check."
      ]}
    >
      <p className="p" style={{ color: "var(--text)", fontWeight: 600 }}>
        Observational analysis only. Not a fact-check.
      </p>

      <p className="p">
        This End User License Agreement (&ldquo;EULA&rdquo;) is a legal agreement between you and Baseline governing
        your use of the Baseline mobile application (the &ldquo;App&rdquo;). By installing or using the App, you agree
        to the terms of this EULA. If you do not agree, do not install or use the App.
      </p>

      {/* ── 1. License Grant ──────────────────────────────────── */}
      <h2 className="h3">1. License Grant</h2>
      <p className="p">
        Baseline grants you a limited, non-exclusive, non-transferable, revocable license to install and use the App
        on devices you own or control, subject to these terms and the applicable App Store or Google Play terms of
        service.
      </p>

      {/* ── 2. Third-Party Beneficiaries ──────────────────────── */}
      <h2 className="h3">2. Third-Party Beneficiaries</h2>
      <p className="p">
        You acknowledge that this EULA is between you and Baseline only, and not with Apple Inc. or Google LLC.
        However, Apple and Google, and their subsidiaries, are third-party beneficiaries of this EULA. Upon your
        acceptance of this EULA, Apple and Google will have the right (and will be deemed to have accepted the right)
        to enforce this EULA against you as third-party beneficiaries.
      </p>

      {/* ── 3. Scope of License ───────────────────────────────── */}
      <h2 className="h3">3. Scope of License</h2>
      <p className="p">You may not:</p>
      <ul className="p">
        <li>Distribute, sublicense, lease, rent, or lend the App to third parties.</li>
        <li>Reverse-engineer, decompile, disassemble, or attempt to derive the source code of the App.</li>
        <li>Make the App available over a network where it could be used by multiple devices at the same time, except
          as authorized by your subscription tier.</li>
        <li>Copy the App except as expressly permitted by this EULA.</li>
        <li>Remove, alter, or obscure any proprietary notices on the App.</li>
      </ul>

      {/* ── 4. Subscriptions and Auto-Renewal ─────────────────── */}
      <h2 className="h3">4. Subscriptions and Auto-Renewal</h2>
      <p className="p">
        The App offers subscription-based access to premium features across four tiers: Core (free, ad-supported),
        Pro, Pro+, and B2B. B2B plans may be provisioned directly and may not be listed for purchase in-app.
      </p>
      <p className="p">
        Pro includes a 7-day free trial. Subscriptions automatically renew at the end of each billing
        period (monthly or annual) unless you cancel at least 24 hours before the end of the current period.
      </p>
      <p className="p">
        Payment is charged to your App Store or Google Play account at confirmation of purchase (or at the end of
        the free trial period, if applicable). You can manage or cancel your subscription at any time through your
        App Store or Google Play account settings.
      </p>

      {/* ── 5. Free Trial ─────────────────────────────────────── */}
      <h2 className="h3">5. Free Trial</h2>
      <p className="p">
        Pro includes a 7-day free trial. If you do not cancel before the trial ends, your subscription
        will automatically convert to a paid subscription and you will be charged the applicable subscription price.
        Any unused portion of a free trial period may be forfeited when you purchase a subscription, as determined
        by the applicable platform (Apple or Google).
      </p>

      {/* ── 6. Consent to Data Use ────────────────────────────── */}
      <h2 className="h3">6. Consent to Data Use</h2>
      <p className="p">
        By using the App, you consent to the collection and use of your information as described in our{" "}
        <Link href="/privacy/">Privacy Policy</Link>. The App processes public-figure statement text through independent AI
        systems. No user personal data is sent to AI providers for analysis.
      </p>

      {/* ── 7. Content Disclaimer ─────────────────────────────── */}
      <h2 className="h3">7. Content Disclaimer</h2>
      <p className="p">
        The App is an observational measurement tool, not a verification service, fact-checking service, or news
        source. AI system outputs may vary and are presented as observational measurements. You should not rely on
        App outputs as authoritative determinations of any kind.
      </p>

      {/* ── 8. Warranty Disclaimer ────────────────────────────── */}
      <h2 className="h3">8. Warranty Disclaimer</h2>
      <p className="p">
        THE APP IS PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTY OF ANY KIND. BASELINE DISCLAIMS ALL WARRANTIES,
        EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
        NON-INFRINGEMENT. BASELINE DOES NOT WARRANT THAT THE APP WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF
        HARMFUL COMPONENTS.
      </p>

      {/* ── 9. Limitation of Liability ────────────────────────── */}
      <h2 className="h3">9. Limitation of Liability</h2>
      <p className="p">
        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, BASELINE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
        SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE APP. IN NO EVENT SHALL
        BASELINE&rsquo;S TOTAL LIABILITY EXCEED THE AMOUNT YOU PAID FOR THE APP IN THE TWELVE (12) MONTHS PRECEDING
        THE CLAIM.
      </p>

      {/* ── 10. Termination ───────────────────────────────────── */}
      <h2 className="h3">10. Termination</h2>
      <p className="p">
        This EULA is effective until terminated. Your rights under this EULA will terminate automatically if you fail
        to comply with any of its terms. Upon termination, you must cease all use of the App and delete all copies.
      </p>

      {/* ── 11. Governing Law ─────────────────────────────────── */}
      <h2 className="h3">11. Governing Law</h2>
      <p className="p">
        This EULA is governed by the laws of the State of Oregon, without regard to conflict of law principles.
      </p>

      {/* ── 12. Trademarks ────────────────────────────────────── */}
      <h2 className="h3">12. Trademarks</h2>
      <p className="p">
        &ldquo;Baseline,&rdquo; &ldquo;The Receipt&trade;,&rdquo; &ldquo;Framing Radar&trade;,&rdquo; &ldquo;Lens Lab&trade;,&rdquo;
        &ldquo;Crossfire&trade;,&rdquo; &ldquo;Signal Pulse&trade;,&rdquo; &ldquo;Framing Fingerprint&trade;,&rdquo;
        &ldquo;Constellation Nav&trade;,&rdquo; &ldquo;Provision Drift&trade;,&rdquo; &ldquo;Split Microscope&trade;,&rdquo;
        &ldquo;Intersections Panel&trade;,&rdquo; &ldquo;Declassified Dossier&trade;,&rdquo; and &ldquo;Narrative Sync&trade;&rdquo;
        are trademarks of Baseline. All rights reserved.
      </p>

      {/* ── 13. Contact ───────────────────────────────────────── */}
      <h2 className="h3">13. Contact</h2>
      <p className="p">
        For questions about this EULA, contact us at{" "}
        <a href={`mailto:${site.contact.legal}`}>{site.contact.legal}</a>.
      </p>
    </LegalDoc>
  );
}
