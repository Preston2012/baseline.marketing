export function DisclaimerBar() {
  return (
    <div
      className="reduceTransparency"
      role="status"
      aria-label="Analysis disclaimer"
      style={{
        position: "sticky",
        top: 56,
        zIndex: 50,
        background: "rgba(8,16,23,0.92)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderBottom: "2px solid var(--border_inactive)"
      }}
    >
      <div className="container" style={{ padding: "10px 16px", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "baseline" }}>
        <span className="data" style={{ color: "var(--text)" }}>
          Observational analysis only. Not a fact-check.
        </span>
        {/* Audit fix: secondary text opacity tuned to ~0.85 */}
        <span className="small" style={{ opacity: 0.85, minWidth: 0 }}>
          Outputs may vary between systems. Sources and context remain the reference surface.
        </span>
      </div>
    </div>
  );
}
