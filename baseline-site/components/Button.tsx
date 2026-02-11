import Link from "next/link";

type BaseProps = {
  href: string;
  children: React.ReactNode;
  ariaLabel: string;
  external?: boolean;
};

function preventPlaceholderJump(href: string, e: React.MouseEvent<HTMLAnchorElement>) {
  if (href === "#!" || href === "#") {
    e.preventDefault();
  }
}

export function PrimaryLinkButton({ href, children, ariaLabel, external }: BaseProps) {
  if (external) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className="btnPrimary"
        onClick={(e) => preventPlaceholderJump(href, e)}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          height: 52,
          padding: "0 14px",
          borderRadius: "var(--radius_btn)",
          background: "var(--teal)",
          color: "var(--bg)",
          textDecoration: "none",
          fontWeight: 600,
          border: "2px solid rgba(45,212,191,0.35)"
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className="btnPrimary"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: 52,
        padding: "0 14px",
        borderRadius: "var(--radius_btn)",
        background: "var(--teal)",
        color: "var(--bg)",
        textDecoration: "none",
        fontWeight: 600,
        border: "2px solid rgba(45,212,191,0.35)"
      }}
    >
      {children}
    </Link>
  );
}

export function SecondaryLinkButton({ href, children, ariaLabel, external }: BaseProps) {
  if (external) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        className="btnSecondary"
        onClick={(e) => preventPlaceholderJump(href, e)}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          height: 52,
          padding: "0 14px",
          borderRadius: "var(--radius_btn)",
          background: "transparent",
          color: "var(--text)",
          textDecoration: "none",
          fontWeight: 600,
          border: "2px solid var(--border_inactive)"
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className="btnSecondary"
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: 52,
        padding: "0 14px",
        borderRadius: "var(--radius_btn)",
        background: "transparent",
        color: "var(--text)",
        textDecoration: "none",
        fontWeight: 600,
        border: "2px solid var(--border_inactive)"
      }}
    >
      {children}
    </Link>
  );
}
