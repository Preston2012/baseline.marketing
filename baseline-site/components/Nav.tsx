'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { PrimaryLinkButton } from './Button';

const NAV_LINKS = [
  { href: '/methodology', label: 'Methodology' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/press', label: 'Press' },
  { href: '/support', label: 'Support' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const close = useCallback(() => setOpen(false), []);

  /* close on route change */
  useEffect(() => { close(); }, [pathname, close]);

  /* close on outside click */
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

  /* trap focus inside mobile menu */
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

  /* scroll lock */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(8,16,23,0.92)', backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '2px solid rgba(45,212,191,0.08)',
      }}
    >
      <nav
        style={{
          maxWidth: 1120, margin: '0 auto',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px', height: 64,
        }}
        aria-label="Main navigation"
      >
        {/* ── Logo: BA mark only ── */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 0, textDecoration: 'none' }}>
          <Image
            src="/brand/ba_mark.png"
            alt="Baseline"
            width={48}
            height={20}
            priority
            style={{ height: 20, width: 'auto' }}
          />
        </Link>

        {/* ── Desktop links ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }} className="nav-desktop">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? 'page' : undefined}
              style={{
                color: pathname === href ? '#2dd4bf' : '#b6c6d6',
                textDecoration: 'none', fontSize: 14, fontWeight: 500,
                transition: 'color .15s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#2dd4bf')}
              onMouseLeave={e => {
                if (pathname !== href) e.currentTarget.style.color = '#b6c6d6';
              }}
            >
              {label}
            </Link>
          ))}
          <PrimaryLinkButton href="/pricing/" ariaLabel="Download">Download</PrimaryLinkButton>
        </div>

        {/* ── Mobile hamburger ── */}
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
          }}
        >
          {open ? '✕' : '≡'}
        </button>
      </nav>

      {/* ── Mobile drawer ── */}
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
              position: 'fixed', top: 64, left: 0, right: 0,
              background: '#081017',
              borderBottom: '2px solid rgba(45,212,191,0.12)',
              padding: '16px 24px 24px', zIndex: 99,
              display: 'flex', flexDirection: 'column', gap: 4,
            }}
          >
            {NAV_LINKS.map(({ href, label }) => (
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
              <PrimaryLinkButton href="/pricing/" ariaLabel="Download">Download</PrimaryLinkButton>
            </div>
          </div>
        </>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-btn { display: block !important; }
        }
      `}</style>
    </header>
  );
}
