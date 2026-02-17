import type { Metadata } from "next";
import { site } from "@/config/site";
import { SecondaryLinkButton } from "@/components/Button";
import { ManifestoScroll } from "@/components/ManifestoScroll";

export const metadata: Metadata = {
  title: "What We Don\u2019t Do",
  description:
    "Baseline measures public speech. It does not rate, score, editorialize, or tell you what to think. Three systems analyze. You interpret.",
  alternates: { canonical: `${site.url}/what-we-dont-do/` },
  openGraph: {
    title: "What We Don\u2019t Do | Baseline",
    description:
      "Baseline measures public speech. It does not rate, score, editorialize, or tell you what to think.",
  },
};

export default function WhatWeDontDoPage() {
  return (
    <>
      {/* Classification micro-stamp above manifesto */}
      <div className="section" style={{ paddingBottom: 0 }}>
        <div className="classification-stamp">
          BASELINE-DOCTRINE // OPERATIONAL BOUNDARIES
        </div>
      </div>

      {/* S3: Scroll-hijacked manifesto — each statement pins and crossfades */}
      <ManifestoScroll />

      {/* Post-manifesto anchor */}
      <section className="section" aria-label="What We Don't Do — closing">
        <h1 style={{
          position: "absolute", width: 1, height: 1, padding: 0, margin: -1,
          overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: 0
        }}>
          What We Don&rsquo;t Do
        </h1>
        <div style={{ maxWidth: 640 }}>
          <p
            style={{
              color: "var(--teal)",
              fontSize: 17,
              fontWeight: 600,
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Three systems analyze.
            <br />
            You interpret.
          </p>

          {/* Teal rule */}
          <div
            style={{
              width: 48,
              height: 2,
              background: "var(--teal)",
              marginTop: 20,
              marginBottom: 20,
            }}
          />
        </div>

        {/* Cross-links */}
        <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
          <SecondaryLinkButton href="/methodology/" ariaLabel="View methodology">
            How we measure
          </SecondaryLinkButton>
          <SecondaryLinkButton href="/pricing/" ariaLabel="View pricing">
            View pricing
          </SecondaryLinkButton>
        </div>

        {/* Disclaimer */}
        <p
          className="small"
          style={{
            fontStyle: "italic",
            opacity: 0.5,
            marginTop: 32,
          }}
        >
          Observational analysis only. Not a fact-check.
        </p>
      </section>
    </>
  );
}
