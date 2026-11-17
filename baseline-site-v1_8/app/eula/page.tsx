import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/config/site";
import { LegalDoc } from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "End User License Agreement",
  description: "Baseline End User License Agreement. License terms for the free speech-measurement app and platform requirements.",
  alternates: { canonical: `${site.url}/eula/` }
};

export default function EulaPage() {
  return (
    <LegalDoc
      title="BASELINE | End User License Agreement"
      effectiveDate="Not yet in effect (draft)"
      lastUpdated="November 17, 2026"
      summary={[
        "License terms for using the free Baseline mobile application.",
        "Covers the license, platform requirements, and disclaimers.",
        "Observational analysis only. Not a fact-check."
      ]}
    >
      <p className="p" style={{ color: "var(--text)", fontWeight: 600 }}>
        Observational analysis only. Not a fact-check.
      </p>

      <p className="p">
        This End User License Agreement (&ldquo;EULA&rdquo;) is a legal agreement between you and Baseline governing
        your use of the Baseline mobile application (the &ldquo;App&rdquo;). By installing or using the App, you agree
        to this EULA. If you do not agree, do not install or use the App.
      </p>

      <h2 className="h3">1. License Grant</h2>
      <p className="p">
        Baseline grants you a limited, non-exclusive, non-transferable, revocable license to install and use the App
        on devices you own or control, subject to this EULA and the terms of the App Store or Google Play. The App is
        free. If parts of it are released under an open source license, that license governs those parts.
      </p>

      <h2 className="h3">2. Third-Party Beneficiaries</h2>
      <p className="p">
        This EULA is between you and Baseline only, and not with Apple Inc. or Google LLC. Apple and Google, and their
        subsidiaries, are third-party beneficiaries of this EULA. On your acceptance, they have the right to enforce
        it against you as third-party beneficiaries.
      </p>

      <h2 className="h3">3. Scope of License</h2>
      <p className="p">You may not:</p>
      <ul className="p">
        <li>Distribute, sublicense, lease, rent, or lend the App to third parties, except as an open source license allows.</li>
        <li>Reverse-engineer, decompile, or disassemble the App, except as an open source license allows.</li>
        <li>Remove, alter, or obscure proprietary notices on the App.</li>
      </ul>

      <h2 className="h3">4. No Charges</h2>
      <p className="p">
        The App has no advertising, no subscriptions, and no in-app purchases. Baseline does not charge for it.
      </p>

      <h2 className="h3">5. Consent to Data Use</h2>
      <p className="p">
        By using the App, you consent to the collection and use of your information as described in our{" "}
        <Link href="/privacy/">Privacy Policy</Link>. The App processes public statement text through independent AI
        systems. No data about you is sent to AI providers for analysis.
      </p>

      <h2 className="h3">6. Content Disclaimer</h2>
      <p className="p">
        The App is an observational measurement tool, not a verification service, fact-checking service, or news
        source. AI system outputs may vary and are presented as observational measurements. Do not rely on App outputs
        as authoritative determinations of any kind.
      </p>

      <h2 className="h3">7. Warranty Disclaimer</h2>
      <p className="p">
        THE APP IS PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTY OF ANY KIND. BASELINE DISCLAIMS ALL WARRANTIES,
        EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
        NON-INFRINGEMENT. BASELINE DOES NOT WARRANT THAT THE APP WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF
        HARMFUL COMPONENTS.
      </p>

      <h2 className="h3">8. Limitation of Liability</h2>
      <p className="p">
        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, BASELINE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
        SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE APP. BECAUSE THE APP IS FREE,
        BASELINE&rsquo;S TOTAL LIABILITY SHALL NOT EXCEED ONE HUNDRED U.S. DOLLARS (US $100).
      </p>

      <h2 className="h3">9. Termination</h2>
      <p className="p">
        This EULA is effective until terminated. Your rights end automatically if you fail to comply with it. On
        termination, stop using the App and delete all copies.
      </p>

      <h2 className="h3">10. Governing Law</h2>
      <p className="p">
        This EULA is governed by the laws of the State of Oregon, without regard to conflict of law principles.
      </p>

      <h2 className="h3">11. Trademarks</h2>
      <p className="p">
        &ldquo;Baseline,&rdquo; &ldquo;The Receipt&trade;,&rdquo; &ldquo;Framing Radar&trade;,&rdquo; &ldquo;Lens
        Lab&trade;,&rdquo; &ldquo;Crossfire&trade;,&rdquo; &ldquo;Signal Pulse&trade;,&rdquo; &ldquo;Framing
        Fingerprint&trade;,&rdquo; &ldquo;Constellation Nav&trade;,&rdquo; &ldquo;Provision Drift&trade;,&rdquo;
        &ldquo;Split Microscope&trade;,&rdquo; &ldquo;Intersections Panel&trade;,&rdquo; &ldquo;Declassified
        Dossier&trade;,&rdquo; and &ldquo;Narrative Sync&trade;&rdquo; are trademarks of Baseline. All rights
        reserved.
      </p>

      <h2 className="h3">12. Contact</h2>
      <p className="p">
        Questions about this EULA: <a href={`mailto:${site.contact.support}`}>{site.contact.support}</a>.
      </p>
    </LegalDoc>
  );
}
