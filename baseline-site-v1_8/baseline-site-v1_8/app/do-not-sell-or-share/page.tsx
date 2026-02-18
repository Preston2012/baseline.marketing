import type { Metadata } from "next";
import { site } from "@/config/site";
import { LegalDoc } from "@/components/LegalDoc";
import { Card } from "@/components/Card";

export const metadata: Metadata = {
  title: "Do Not Sell or Share",
  description: "Opt-out instructions under CPRA/CCPA for Baseline.",
  alternates: { canonical: `${site.url}/do-not-sell-or-share/` }
};

export default function DoNotSellPage() {
  return (
    <LegalDoc
      title="BASELINE | Do Not Sell or Share My Personal Information"
      effectiveDate="February 8, 2026"
      lastUpdated="February 8, 2026"
      summary={[
        "Explains opt-out options under CPRA/CCPA.",
        "Baseline does not sell personal information.",
        "Core (free) tier may involve ad-related data sharing."
      ]}
    >
      <p className="p">
        Baseline does not sell your personal information. However, for Core (free) tier users, ad-related data
        sharing through Google AdMob may constitute &ldquo;sharing&rdquo; of personal information under the
        California Privacy Rights Act (CPRA). This page explains your opt-out options.
      </p>

      <h2 className="h3">What Data May Be Shared</h2>
      <p className="p">
        When advertisements are displayed to Core tier users, Google AdMob may collect device identifiers, ad
        interaction data, and related information for ad personalization and measurement purposes. This data
        collection and sharing occurs only on the Today Feed and Search surfaces. No ad-related data sharing occurs
        on analysis surfaces.
      </p>

      <h2 className="h3">How to Opt Out</h2>

      <Card title="Opt-out options">
        <ol className="p" style={{ margin: 0 }}>
          <li>
            <strong>iOS:</strong> Decline the App Tracking Transparency prompt when shown, or go to Settings &rarr;
            Privacy &amp; Security &rarr; Tracking and disable tracking for Baseline.
          </li>
          <li>
            <strong>Android:</strong> Go to Settings &rarr; Privacy &rarr; Ads and turn off ad personalization or
            reset your advertising ID.
          </li>
          <li>
            <strong>Email:</strong> Send an email to{" "}
            <a href={`mailto:${site.contact.privacy}?subject=Do%20Not%20Sell%20or%20Share`}>
              {site.contact.privacy}
            </a>{" "}
            with the subject line &ldquo;Do Not Sell or Share.&rdquo;
          </li>
          <li>
            <strong>Upgrade:</strong> Upgrade to any paid tier (Pro, Pro+, or B2B) to remove all advertisements and
            ad-related data sharing entirely.
          </li>
        </ol>
      </Card>

      <div style={{ height: 12 }} />

      <h2 className="h3">Processing Timeframe</h2>
      <p className="p">
        Opt-out requests submitted by email are processed within 45 days. Platform-level opt-outs (iOS tracking
        prompt, Android ad preferences) take effect immediately.
      </p>

      <h2 className="h3">Non-Discrimination</h2>
      <p className="p">
        We will not discriminate against you for exercising your privacy rights. Core tier functionality remains
        available regardless of your opt-out choices (ads may still appear but will not be personalized).
      </p>

      <h2 className="h3">Contact</h2>
      <p className="p">
        For questions about data sharing or this opt-out page, contact{" "}
        <a href={`mailto:${site.contact.privacy}`}>{site.contact.privacy}</a>.
      </p>
    </LegalDoc>
  );
}
