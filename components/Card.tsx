export function Card({
  title,
  children,
  className
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        background: "var(--card)",
        border: "1px solid var(--border_inactive)",
        borderRadius: "var(--radius_card)",
        padding: 16
      }}
    >
      {title ? (
        <div style={{ color: "var(--text)", fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
          {title}
        </div>
      ) : null}
      {children}
    </div>
  );
}
