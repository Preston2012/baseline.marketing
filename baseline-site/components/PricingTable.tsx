"use client";

import { useState } from "react";
import { Card } from "./Card";

type Billing = "monthly" | "annual";

type Tier = {
  id: "core" | "pro" | "pro_plus" | "b2b";
  name: string;
  monthly: string;
  annual: string;
  note?: string;
  bullets: string[];
};

export function PricingTable() {
  const [billing, setBilling] = useState<Billing>("monthly");

  const tiers: Tier[] = [
    {
      id: "core",
      name: "Core",
      monthly: "Free",
      annual: "Free",
      note: "Ad-supported (Today Feed + Search only).",
      bullets: [
        "Consensus layer",
        "The Receipt\u2122 match limit: 3",
        "Basic signals",
        "Ads (Today Feed + Search only)"
      ]
    },
    {
      id: "pro",
      name: "Pro",
      monthly: "$7.99 / month",
      annual: "$59.99 / year",
      note: "$5.99/mo for first 60 days, then $7.99/mo. Includes 7-day free trial.",
      bullets: [
        "Ad-free",
        "The Lens Lab\u2122",
        "Framing Radar\u2122",
        "Historical Trends",
        "Vote tracking",
        "The Receipt\u2122 match limit: 5",
        "Annotations: 100"
      ]
    },
    {
      id: "pro_plus",
      name: "Pro+",
      monthly: "$24.99 / month",
      annual: "$199.99 / year",
      note: "More signal. Less noise. Includes 7-day free trial.",
      bullets: [
        "All Pro features",
        "Bill Overview & Notable Provisions",
        "Provision Drift\u2122 — semantic distance scoring",
        "Unlimited Receipt\u2122 history",
        "Advanced notification controls",
        "Higher frequency digest updates",
        "Annotations: 500"
      ]
    },
    {
      id: "b2b",
      name: "B2B",
      monthly: "Contact Us",
      annual: "$3,999 / year",
      note: "Annual-only. Founding Partner pricing available for a limited time.",
      bullets: [
        "All Pro+ features",
        "Max throughput tier",
        "Annotations: 1000",
        "Elevated rate limits"
      ]
    }
  ];

  const priceFor = (t: Tier) => (billing === "monthly" ? t.monthly : t.annual);

  return (
    <div>
      {/* Audit fix: exact launch pricing language */}
      <p className="p" style={{ marginTop: 10 }}>
        <span className="data">
          Pro launch price: $5.99/mo for the first 60 days, then $7.99/mo. Includes 7-day free trial.
        </span>
      </p>

      {/* Audit fix: tabs pattern with role="tab" + aria-selected + aria-controls */}
      <div
        aria-label="Billing period"
        role="tablist"
        style={{
          display: "inline-flex",
          gap: 6,
          padding: 6,
          borderRadius: 12,
          border: "2px solid var(--border_inactive)",
          background: "rgba(12,26,35,0.35)"
        }}
      >
        <button
          type="button"
          role="tab"
          aria-selected={billing === "monthly"}
          aria-controls="pricing-panel"
          onClick={() => setBilling("monthly")}
          style={{
            border: "2px solid var(--border_inactive)",
            background: billing === "monthly" ? "rgba(182,198,214,0.12)" : "transparent",
            color: "var(--text)",
            borderRadius: 10,
            padding: "10px 12px",
            cursor: "pointer",
            fontWeight: 600,
            minWidth: 90
          }}
        >
          Monthly
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={billing === "annual"}
          aria-controls="pricing-panel"
          onClick={() => setBilling("annual")}
          style={{
            border: "2px solid var(--border_inactive)",
            background: billing === "annual" ? "rgba(182,198,214,0.12)" : "transparent",
            color: "var(--text)",
            borderRadius: 10,
            padding: "10px 12px",
            cursor: "pointer",
            fontWeight: 600,
            minWidth: 90
          }}
        >
          Annual
        </button>
      </div>

      {/* Tier cards */}
      <div
        id="pricing-panel"
        role="tabpanel"
        className="grid grid_2"
        style={{ marginTop: 12, alignItems: "stretch" }}
      >
        {tiers.map((t) => (
          <Card key={t.id} title={t.name}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
              <div className="data" style={{ fontSize: 16 }}>
                {priceFor(t)}
              </div>
            </div>

            {t.note ? (
              <div className="small" style={{ opacity: 0.95, marginTop: 6 }}>{t.note}</div>
            ) : null}

            <div style={{ height: 10 }} />

            <ul className="p" style={{ margin: 0 }}>
              {t.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>

      <div style={{ height: 12 }} />

      {/* Audit fix: explicit 7-day trial, no "may include" hedging, no "eligible new subscribers" vagueness */}
      <Card title="Subscription terms">
        <div className="p" style={{ margin: 0 }}>
          All paid tiers include a 7-day free trial. Subscriptions renew automatically unless cancelled at least
          24 hours before the end of the current period. Payment is charged to your App Store or Google Play
          account at confirmation of purchase (or after the trial ends). You can manage or cancel your
          subscription in your App Store / Google Play account settings. Refund requests are handled by Apple or
          Google under their respective policies.
        </div>
      </Card>
    </div>
  );
}
