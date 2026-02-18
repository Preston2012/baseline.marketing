/** Tier pill badge — Bloomberg terminal tag energy.
 *  Used on Pricing cards and Features page.
 *  JetBrains Mono, 2px teal border, transparent fill. */

type TierPillProps = {
  tier: "CORE" | "PRO" | "PRO+" | "B2B";
};

export function TierPill({ tier }: TierPillProps) {
  return (
    <span
      className="data"
      style={{
        display: "inline-block",
        fontSize: 10,
        letterSpacing: "0.12em",
        color: "var(--teal)",
        border: "2px solid rgba(45,212,191,0.35)",
        borderRadius: 6,
        padding: "2px 6px",
        lineHeight: 1.4,
      }}
    >
      {tier}
    </span>
  );
}
