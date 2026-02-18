'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PrimaryLinkButton } from './Button';
import { BRAND_WORDMARK, BRAND_BA_MARK } from '../config/brand-assets';

/* §1 Nav Order: Home · Features · Methodology · Pricing
   Hamburger overflow: What We Don't Do · Press · Support · Legal */
const NAV_PRIMARY = [
  { href: '/features/', label: 'Features' },
  { href: '/methodology/', label: 'Methodology' },
  { href: '/ethos/', label: 'Ethos' },
  { href: '/pricing/', label: 'Pricing' },
];

const NAV_OVERFLOW = [
  { href: '/what-we-dont-do/', label: "What We Don\u2019t Do" },
  { href: '/press/', label: 'Press' },
  { href: '/support/', label: 'Support' },
  { href: '/privacy/', label: 'Privacy' },
  { href: '/terms/', label: 'Terms' },
  { href: '/eula/', label: 'EULA' },
  { href: '/do-not-sell-or-share/', label: 'Do Not Sell' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => { close(); }, [pathname, close]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        menuRef.current && !menuRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) close();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open, close]);

  useEffect(() => {
    if (!open) return;
    const trap = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { close(); buttonRef.current?.focus(); }
      if (e.key !== 'Tab' || !menuRef.current) return;
      const focusable = menuRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };
    document.addEventListener('keydown', trap);
    return () => document.removeEventListener('keydown', trap);
  }, [open, close]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const allMobileLinks = [...NAV_PRIMARY, ...NAV_OVERFLOW];

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: '#000',
        borderBottom: '2px solid rgba(45,212,191,0.08)',
      }}
    >
      <nav
        style={{
          maxWidth: 1120, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px', height: 56,
          position: 'relative',
        }}
        aria-label="Main navigation"
      >
        {/* BA mark — left */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0, zIndex: 2 }}>
          <img
            src={BRAND_BA_MARK}
            alt="Baseline"
            width={48}
            height={20}
            style={{ height: 20, width: 'auto' }}
          />
        </Link>

        {/* Wordmark — centered */}
        <Link
          href="/"
          onClick={(e) => {
            /* I8: If already on homepage, scroll to top instead of navigating */
            if (pathname === '/') {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
            zIndex: 1,
          }}
        >
          <img
            src={BRAND_WORDMARK}
            alt="BASELINE"
            width={358}
            height={100}
            style={{ height: 36, width: 'auto' }}
          />
        </Link>

        {/* Desktop primary links — right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28, zIndex: 2 }} className="nav-desktop noSelect">
          {NAV_PRIMARY.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="nav-scan-link"
              aria-current={pathname === href ? 'page' : undefined}
              style={{
                color: pathname === href ? '#2dd4bf' : '#b6c6d6',
                textDecoration: 'none', fontSize: 14, fontWeight: 500,
                transition: 'color .15s',
                paddingBottom: 4,
                borderBottom: pathname === href ? '2px solid #2dd4bf' : '2px solid transparent',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#2dd4bf')}
              onMouseLeave={e => {
                if (pathname !== href) e.currentTarget.style.color = '#b6c6d6';
              }}
            >
              {label}
            </Link>
          ))}
          <PrimaryLinkButton href="/pricing/" ariaLabel="Get started" compact>Get Started</PrimaryLinkButton>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={buttonRef}
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="nav-mobile-btn"
          style={{
            display: 'none', background: 'none', border: 'none',
            color: '#eaf2ff', fontSize: 24, cursor: 'pointer', padding: 8,
            zIndex: 2,
          }}
        >
          {open ? '\u2715' : '\u2261'}
        </button>
      </nav>

      {/* Mobile drawer — all links (primary + overflow) */}
      {open && (
        <>
          <div
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
              zIndex: 98,
            }}
            onClick={close}
            aria-hidden="true"
          />
          <div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            style={{
              position: 'fixed', top: 56, left: 0, right: 0,
              background: '#000',
              borderBottom: '2px solid rgba(45,212,191,0.12)',
              padding: '16px 24px 24px', zIndex: 99,
              display: 'flex', flexDirection: 'column', gap: 4,
              maxHeight: 'calc(100vh - 56px)',
              overflowY: 'auto',
            }}
          >
            {allMobileLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                aria-current={pathname === href ? 'page' : undefined}
                onClick={close}
                style={{
                  color: pathname === href ? '#2dd4bf' : '#eaf2ff',
                  textDecoration: 'none', fontSize: 16, fontWeight: 500,
                  padding: '12px 0',
                  borderBottom: '2px solid rgba(45,212,191,0.06)',
                }}
              >
                {label}
              </Link>
            ))}
            <div style={{ marginTop: 8 }}>
              <PrimaryLinkButton href="/pricing/" ariaLabel="Get started">Get Started</PrimaryLinkButton>
            </div>
          </div>
        </>
      )}

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
