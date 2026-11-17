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
        "The agreement is with Winters Code, not with Apple or Google.",
        "Covers the license, platform requirements, and disclaimers.",
        "Observational analysis only. Not a fact-check."
      ]}
    >
      <p className="p" style={{ color: "var(--text)", fontWeight: 600 }}>
        Observational analysis only. Not a fact-check.
      </p>

      <p className="p">
        This End User License Agreement (&ldquo;EULA&rdquo;) is a legal agreement between you and Winters Code
        (&ldquo;Winters Code,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;), which makes the Baseline mobile application
        (the &ldquo;App&rdquo;). Baseline is the name of the App. By installing or using the App, you agree to this
        EULA. If you do not agree, do not install or use the App.
      </p>

      <h2 className="h3">1. Acknowledgement</h2>
      <p className="p">
        You and Winters Code acknowledge that this EULA is between you and Winters Code only, and not with Apple Inc.
        (&ldquo;Apple&rdquo;) or Google LLC (&ldquo;Google&rdquo;). Winters Code, not Apple or Google, is solely
        responsible for the App and its content. This EULA may not give you rights to use the App that conflict with
        the App Store Terms of Service, the Google Play Terms of Service, or any other terms that apply to you.
      </p>

      <h2 className="h3">2. License Grant and Scope</h2>
      <p className="p">
        Winters Code grants you a limited, non-exclusive, non-transferable, revocable license to install and use the
        App on devices you own or control, as permitted by the Usage Rules of the App Store or the Google Play terms.
        On Apple devices, this license covers Apple-branded products you own or control, as permitted by the Usage
        Rules in the App Store Terms of Service, and the App may also be used by other accounts associated with you
        through Family Sharing, volume purchasing or Legacy Contacts.
        The App is free. If parts of it are released under an open source license, that license governs those parts.
      </p>
      <p className="p">You may not:</p>
      <ul className="p">
        <li>Distribute, sublicense, lease, rent, or lend the App to third parties, except as an open source license allows.</li>
        <li>Reverse-engineer, decompile, or disassemble the App, except as an open source license allows.</li>
        <li>Remove, alter, or obscure proprietary notices on the App.</li>
      </ul>

      <h2 className="h3">3. No Charges</h2>
      <p className="p">
        The App has no advertising, no subscriptions, and no in-app purchases. Winters Code does not charge for it.
      </p>

      <h2 className="h3">4. Maintenance and Support</h2>
      <p className="p">
        Winters Code, not Apple or Google, is solely responsible for providing maintenance and support for the App.
        Apple and Google have no obligation to provide maintenance or support. Contact{" "}
        <a href={`mailto:${site.contact.support}`}>{site.contact.support}</a>.
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

      <h2 className="h3">7. Warranty</h2>
      <p className="p">
        THE APP IS PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTY OF ANY KIND. WINTERS CODE DISCLAIMS ALL WARRANTIES,
        EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
        NON-INFRINGEMENT, AND DOES NOT WARRANT THAT THE APP WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF HARMFUL
        COMPONENTS.
      </p>
      <p className="p">
        If the App fails to conform to any applicable warranty, you may notify Apple, and Apple will refund the
        purchase price for the App to you, if any. The App is free, so no purchase price applies. To the maximum extent
        permitted by law, Apple has no other warranty obligation with respect to the App. Any other claims, losses,
        liabilities, damages, costs, or expenses attributable to any failure to conform to a warranty are the
        responsibility of Winters Code.
      </p>

      <h2 className="h3">8. Product Claims</h2>
      <p className="p">
        Winters Code, not Apple or Google, is responsible for addressing any claims you or any third party have
        relating to the App or your possession or use of it, including product liability claims, claims that the App
        fails to conform to a legal or regulatory requirement, and claims under consumer protection, privacy, or
        similar law.
      </p>

      <h2 className="h3">9. Intellectual Property Claims</h2>
      <p className="p">
        If a third party claims that the App or your possession and use of it infringes that party&rsquo;s
        intellectual property rights, Winters Code, not Apple or Google, is solely responsible for the investigation,
        defense, settlement, and discharge of the claim.
      </p>

      <h2 className="h3">10. Legal Compliance and Export</h2>
      <p className="p">
        You represent and warrant that you are not located in a country that is subject to a U.S. Government embargo
        or designated as a &ldquo;terrorist supporting&rdquo; country, and that you are not listed on any U.S.
        Government list of prohibited or restricted parties.
      </p>

      <h2 className="h3">11. Limitation of Liability</h2>
      <p className="p">
        TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, WINTERS CODE SHALL NOT BE LIABLE FOR ANY INDIRECT,
        INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE APP. BECAUSE THE APP IS
        FREE, WINTERS CODE&rsquo;S TOTAL LIABILITY SHALL NOT EXCEED ONE HUNDRED U.S. DOLLARS (US $100).
      </p>

      <h2 className="h3">12. Termination</h2>
      <p className="p">
        This EULA is effective until terminated. Your rights end automatically if you fail to comply with it. On
        termination, stop using the App and delete all copies.
      </p>

      <h2 className="h3">13. Third-Party Terms</h2>
      <p className="p">
        You must comply with applicable third-party terms of agreement when using the App, for example your wireless
        carrier&rsquo;s terms and the terms of your device platform.
      </p>

      <h2 className="h3">14. Third-Party Beneficiaries</h2>
      <p className="p">
        Apple and Google, and their subsidiaries, are third-party beneficiaries of this EULA. On your acceptance of
        this EULA, Apple and Google have the right (and are deemed to have accepted the right) to enforce this EULA
        against you as third-party beneficiaries.
      </p>

      <h2 className="h3">15. Governing Law</h2>
      <p className="p">
        This EULA is governed by the laws of the State of Oregon, without regard to conflict of law principles.
      </p>

      <h2 className="h3">16. Trademarks</h2>
      <p className="p">
        &ldquo;Baseline,&rdquo; &ldquo;The Receipt&trade;,&rdquo; &ldquo;Framing Radar&trade;,&rdquo; &ldquo;Lens
        Lab&trade;,&rdquo; &ldquo;Crossfire&trade;,&rdquo; &ldquo;Signal Pulse&trade;,&rdquo; &ldquo;Framing
        Fingerprint&trade;,&rdquo; &ldquo;Constellation Nav&trade;,&rdquo; &ldquo;Provision Drift&trade;,&rdquo;
        &ldquo;Split Microscope&trade;,&rdquo; &ldquo;Intersections Panel&trade;,&rdquo; &ldquo;Declassified
        Dossier&trade;,&rdquo; and &ldquo;Narrative Sync&trade;&rdquo; are trademarks of Winters Code. All rights
        reserved.
      </p>

      <h2 className="h3">17. Developer Name and Address</h2>
      <p className="p">
        Questions, complaints, or claims about the App: Winters Code, [DEVELOPER ADDRESS: Preston to supply before
        this draft is approved], Bandon, Oregon.{" "}
        Email <a href={`mailto:${site.contact.support}`}>{site.contact.support}</a>.
      </p>
    </LegalDoc>
  );
}
