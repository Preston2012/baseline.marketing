import Link from "next/link";

type BaseProps = {
  href: string;
  children: React.ReactNode;
  ariaLabel: string;
  external?: boolean;
  compact?: boolean;
};

function preventPlaceholderJump(href: string, e: React.MouseEvent<HTMLAnchorElement>) {
  if (href === "#!" || href === "#") {
    e.preventDefault();
  }
}

export function PrimaryLinkButton({ href, children, ariaLabel, external, compact }: BaseProps) {
  const height = compact ? 36 : 52;
  const padding = compact ? "0 12px" : "0 14px";
  const fontSize = compact ? 13 : undefined;

  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    height,
    padding,
    borderRadius: "var(--radius_btn)",
    background: "var(--teal)",
    color: "var(--bg)",
    textDecoration: "none",
    fontWeight: 600,
    fontSize,
    border: "2px solid rgba(45,212,191,0.35)"
  };

  if (external) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className="btnPrimary"
        onClick={(e) => preventPlaceholderJump(href, e)}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        style={style}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={ariaLabel} className="btnPrimary" style={style}>
      {children}
    </Link>
  );
}

export function SecondaryLinkButton({ href, children, ariaLabel, external }: BaseProps) {
  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    height: 52,
    padding: "0 14px",
    borderRadius: "var(--radius_btn)",
    background: "transparent",
    color: "var(--text)",
    textDecoration: "none",
    fontWeight: 600,
    border: "2px solid rgba(45,212,191,0.35)"
  };

  if (external) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className="btnSecondary"
        onClick={(e) => preventPlaceholderJump(href, e)}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        style={style}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} aria-label={ariaLabel} className="btnSecondary" style={style}>
      {children}
    </Link>
  );
}
