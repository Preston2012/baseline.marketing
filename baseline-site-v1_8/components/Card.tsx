export function Card({
  title,
  children,
  className,
  headingLevel
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
  headingLevel?: "h2" | "h3" | "h4";
}) {
  const HeadingTag = headingLevel || "div";

  return (
    <div
      className={className}
      style={{
        background: "var(--card)",
        border: "2px solid var(--border_inactive)",
        borderRadius: "var(--radius_card)",
        padding: 16
      }}
    >
      {title ? (
        <HeadingTag style={{ color: "var(--text)", fontWeight: 600, marginBottom: 8, fontSize: 14, margin: headingLevel ? "0 0 8px" : undefined }}>
          {title}
        </HeadingTag>
      ) : null}
      {children}
    </div>
  );
}
