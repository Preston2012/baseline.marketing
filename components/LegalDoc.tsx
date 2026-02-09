export function LegalDoc({
  title,
  effectiveDate,
  lastUpdated,
  summary,
  children
}: {
  title: string;
  effectiveDate: string;
  lastUpdated: string;
  summary?: string[];
  children: React.ReactNode;
}) {
  const bullets = summary ?? [
    "Applies to the Baseline mobile application.",
    "Explains how data is handled and what you can request.",
    "Includes subscription and privacy disclosures where relevant."
  ];

  return (
    <section className="section legal" aria-label={title}>
      <h1 className="h2">{title}</h1>
      <p className="small">
        <span className="data">Effective Date:</span> {effectiveDate} &nbsp;&bull;&nbsp;{" "}
        <span className="data">Last Updated:</span> {lastUpdated}
      </p>

      <div
        style={{
          border: "1px solid var(--border_inactive)",
          borderRadius: 12,
          padding: 12,
          background: "rgba(12,26,35,0.45)"
        }}
      >
        <div style={{ color: "var(--text)", fontWeight: 600, marginBottom: 6 }}>Summary</div>
        <ul style={{ margin: 0, paddingLeft: 18, color: "var(--sub)", fontSize: 12 }}>
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>

      <div style={{ height: 14 }} />

      {children}
    </section>
  );
}
