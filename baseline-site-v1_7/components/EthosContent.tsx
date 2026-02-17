'use client';

import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────
   ETHOS CONTENT — Ten brand principles
   ─────────────────────────────────────────────────────────
   Frosted glass cards. Corner-stamp SVG icons. Centered
   text with bullet support points. Stagger-in on scroll.
   Uses site CSS variables — no hardcoded colors.
   ───────────────────────────────────────────────────────── */

interface EthosCard {
  numeral: string;
  headline: string;
  tagline: string;
  bullets: string[];
  tag: string;
  icon: React.ReactNode;
}

const PRINCIPLES: EthosCard[] = [
  {
    numeral: 'I',
    headline: 'We Forget Nothing',
    tagline: 'The record is the product. Permanence is the point.',
    bullets: [
      'Every statement captured, analyzed, and stored forever',
      'Not summarized, not paraphrased, not deleted after 90 days',
      'Nothing expires. Nothing decays. The record only grows',
    ],
    tag: 'IMMUTABLE RECORD',
    icon: (
      <svg viewBox="0 0 26 26" fill="none">
        <path d="M3 13c0-3.5 2.5-6 5.5-6S13 9 13 11v4c0 2 1.8 4 4.5 4s5.5-2.5 5.5-6-2.5-6-5.5-6c-1.8 0-3.2.8-4.2 2.2" stroke="var(--teal)" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M13 15v-4c0-2-1.8-4-4.5-4" stroke="var(--teal)" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.5" />
      </svg>
    ),
  },
  {
    numeral: 'II',
    headline: "Frozen at the Moment It\u2019s Taken",
    tagline: 'The timestamp is the seal.',
    bullets: [
      'Once recorded, nothing changes: not the data, not the scores, not the conclusions',
      'No retroactive edits when the political wind shifts',
      'Blockchain-grade permanence. No gas, no wallets, no barriers',
    ],
    tag: 'ZERO REVISIONISM',
    icon: (
      <svg viewBox="0 0 26 26" fill="none">
        <rect x="4" y="4" width="18" height="18" rx="3" stroke="var(--teal)" strokeWidth="1.1" opacity="0.35" />
        <line x1="4" y1="10" x2="22" y2="10" stroke="var(--teal)" strokeWidth="0.8" opacity="0.25" />
        <circle cx="13" cy="16" r="4" stroke="var(--teal)" strokeWidth="1.2" opacity="0.6" />
        <line x1="13" y1="14.5" x2="13" y2="16" stroke="var(--teal)" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="13" y1="16" x2="15" y2="17.2" stroke="var(--teal)" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="13" cy="16" r="0.8" fill="var(--teal)" opacity="0.5" />
      </svg>
    ),
  },
  {
    numeral: 'III',
    headline: 'Multiple Lenses. Zero Opinions.',
    tagline: 'The platform measures. You decide.',
    bullets: [
      'Multiple AI models run simultaneously, each blind to the others',
      'Agreement is a data point. Disagreement is a data point',
      'Both are shown, neither is editorialized',
    ],
    tag: 'OBSERVATIONAL ANALYSIS',
    icon: (
      <svg viewBox="0 0 26 26" fill="none">
        <circle cx="9" cy="10" r="4.5" stroke="var(--teal)" strokeWidth="1.1" opacity="0.45" />
        <circle cx="17" cy="10" r="4.5" stroke="var(--teal)" strokeWidth="1.1" opacity="0.45" />
        <circle cx="13" cy="17" r="4.5" stroke="var(--teal)" strokeWidth="1.1" opacity="0.45" />
        <circle cx="13" cy="12.5" r="1.2" fill="var(--teal)" opacity="0.35" />
      </svg>
    ),
  },
  {
    numeral: 'IV',
    headline: 'Signal Over Noise',
    tagline: 'When the data speaks, you hear it. Otherwise, silence.',
    bullets: [
      "Significance weighed against each figure\u2019s own noise floor",
      'No push notifications for routine speeches',
      'No dopamine engineering. No engagement farming',
    ],
    tag: 'NO MANUFACTURED URGENCY',
    icon: (
      <svg viewBox="0 0 26 26" fill="none">
        <polyline points="2,16 5,16 7,16 9,16 11,14 13,8 15,16 17,14 19,16 21,16 24,16" stroke="var(--teal)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.65" fill="none" />
        <line x1="2" y1="19" x2="24" y2="19" stroke="var(--teal)" strokeWidth="0.5" opacity="0.12" />
        <circle cx="13" cy="8" r="1.5" fill="none" stroke="var(--teal)" strokeWidth="0.8" opacity="0.3" />
      </svg>
    ),
  },
  {
    numeral: 'V',
    headline: 'Time Is the Moat',
    tagline: 'Every day the data gets deeper. Every day the barrier gets higher.',
    bullets: [
      'Each new entry makes all previous data more valuable',
      'Semantic connections compound. Patterns emerge across years',
      'Storage costs negligible. Recreating from scratch, prohibitive',
    ],
    tag: 'COMPOUNDING INTELLIGENCE',
    icon: (
      <svg viewBox="0 0 26 26" fill="none">
        <circle cx="6" cy="20" r="1.5" fill="var(--teal)" opacity="0.25" />
        <circle cx="11" cy="15" r="1.5" fill="var(--teal)" opacity="0.35" />
        <circle cx="17" cy="11" r="2" fill="var(--teal)" opacity="0.5" />
        <circle cx="22" cy="7" r="2.5" fill="var(--teal)" opacity="0.65" />
        <line x1="6" y1="20" x2="11" y2="15" stroke="var(--teal)" strokeWidth="0.7" opacity="0.2" />
        <line x1="11" y1="15" x2="17" y2="11" stroke="var(--teal)" strokeWidth="0.7" opacity="0.3" />
        <line x1="17" y1="11" x2="22" y2="7" stroke="var(--teal)" strokeWidth="0.7" opacity="0.4" />
        <line x1="11" y1="15" x2="22" y2="7" stroke="var(--teal)" strokeWidth="0.5" opacity="0.15" strokeDasharray="2 2" />
      </svg>
    ),
  },
  {
    numeral: 'VI',
    headline: 'Show Your Work',
    tagline: "A measurement you can\u2019t audit isn\u2019t a measurement. It\u2019s an assertion.",
    bullets: [
      'All methodologies documented and accessible inside the product',
      'Not buried in legal footnotes. Linked, readable, questionable',
      'Transparency is architecture, not marketing',
    ],
    tag: 'AUDITABLE BY DESIGN',
    icon: (
      <svg viewBox="0 0 26 26" fill="none">
        <rect x="6" y="5" width="14" height="4" rx="1" stroke="var(--teal)" strokeWidth="0.9" opacity="0.3" />
        <rect x="6" y="11" width="14" height="4" rx="1" stroke="var(--teal)" strokeWidth="0.9" opacity="0.5" />
        <rect x="6" y="17" width="14" height="4" rx="1" stroke="var(--teal)" strokeWidth="0.9" opacity="0.7" />
        <line x1="9" y1="7" x2="15" y2="7" stroke="var(--teal)" strokeWidth="0.8" opacity="0.3" strokeLinecap="round" />
        <line x1="9" y1="13" x2="16" y2="13" stroke="var(--teal)" strokeWidth="0.8" opacity="0.5" strokeLinecap="round" />
        <line x1="9" y1="19" x2="17" y2="19" stroke="var(--teal)" strokeWidth="0.8" opacity="0.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    numeral: 'VII',
    headline: 'Influence Is the Scope',
    tagline: "We don\u2019t filter by industry. We track impact.",
    bullets: [
      'Politicians, crypto founders, AI leaders, tech CEOs, podcasters',
      "Anyone whose words move markets, shape policy, or shift opinion",
      'Started with forty-four. Building toward thousands',
    ],
    tag: 'CROSS-SECTOR INTELLIGENCE',
    icon: (
      <svg viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="13" r="3.5" stroke="var(--teal)" strokeWidth="1.1" opacity="0.6" />
        <circle cx="13" cy="13" r="7" stroke="var(--teal)" strokeWidth="0.8" opacity="0.3" />
        <circle cx="13" cy="13" r="10.5" stroke="var(--teal)" strokeWidth="0.6" opacity="0.15" />
        <circle cx="13" cy="13" r="1.2" fill="var(--teal)" opacity="0.5" />
        <circle cx="19" cy="10" r="1.2" fill="var(--teal)" opacity="0.35" />
        <circle cx="8" cy="17" r="1.2" fill="var(--teal)" opacity="0.25" />
        <circle cx="16" cy="21" r="1.2" fill="var(--teal)" opacity="0.2" />
      </svg>
    ),
  },
  {
    numeral: 'VIII',
    headline: "Earn It, Don\u2019t Trick It",
    tagline: "We don\u2019t manufacture urgency about information that requires clarity.",
    bullets: [
      'No countdown timers, scarcity theater, or FOMO',
      'The product converts by being useful. The paywall is calm',
      "The upgrade is obvious when you need it, invisible when you don\u2019t",
    ],
    tag: 'TRUST BY DEFAULT',
    icon: (
      <svg viewBox="0 0 26 26" fill="none">
        <path d="M13 3L22 8V15C22 20 18 24 13 26C8 24 4 20 4 15V8L13 3Z" stroke="var(--teal)" strokeWidth="1.1" opacity="0.45" fill="none" />
        <polyline points="9,13.5 12,16.5 17.5,10.5" stroke="var(--teal)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      </svg>
    ),
  },
  {
    numeral: 'IX',
    headline: 'Every Export Is a Billboard',
    tagline: 'Quality is the marketing strategy.',
    bullets: [
      'Screenshots that look like classified intelligence documents',
      "Shares that make people stop and ask what they\u2019re looking at",
      'Proof of work. Organic reach built into the output itself',
    ],
    tag: 'PROOF OF WORK',
    icon: (
      <svg viewBox="0 0 26 26" fill="none">
        <rect x="6" y="3" width="14" height="20" rx="1.5" stroke="var(--teal)" strokeWidth="1" opacity="0.35" />
        <line x1="6" y1="3" x2="9" y2="3" stroke="var(--teal)" strokeWidth="1.4" opacity="0.6" strokeLinecap="round" />
        <line x1="6" y1="3" x2="6" y2="6" stroke="var(--teal)" strokeWidth="1.4" opacity="0.6" strokeLinecap="round" />
        <line x1="20" y1="23" x2="17" y2="23" stroke="var(--teal)" strokeWidth="1.4" opacity="0.6" strokeLinecap="round" />
        <line x1="20" y1="23" x2="20" y2="20" stroke="var(--teal)" strokeWidth="1.4" opacity="0.6" strokeLinecap="round" />
        <line x1="9.5" y1="10" x2="16.5" y2="10" stroke="var(--teal)" strokeWidth="0.7" opacity="0.2" />
        <line x1="9.5" y1="13" x2="15" y2="13" stroke="var(--teal)" strokeWidth="0.7" opacity="0.2" />
        <line x1="9.5" y1="16" x2="14" y2="16" stroke="var(--teal)" strokeWidth="0.7" opacity="0.2" />
      </svg>
    ),
  },
  {
    numeral: 'X',
    headline: 'The Permanent Record',
    tagline: 'Always recording. Always measuring. Never judging.',
    bullets: [
      'Not a fact-checker, not an opinion engine, not a feed',
      'A measurement instrument and a research library that never closes',
      'An institutional memory that never forgets',
    ],
    tag: 'BASELINE\u2122',
    icon: (
      <svg viewBox="0 0 26 26" fill="none">
        <line x1="3" y1="13" x2="23" y2="13" stroke="var(--teal)" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
        <circle cx="3" cy="13" r="1.5" fill="var(--teal)" opacity="0.35" />
        <circle cx="13" cy="13" r="2.5" fill="var(--teal)" opacity="0.55" />
        <circle cx="23" cy="13" r="1.5" fill="var(--teal)" opacity="0.35" />
        <line x1="8" y1="10.5" x2="8" y2="15.5" stroke="var(--teal)" strokeWidth="0.7" opacity="0.2" />
        <line x1="18" y1="10.5" x2="18" y2="15.5" stroke="var(--teal)" strokeWidth="0.7" opacity="0.2" />
        <circle cx="13" cy="13" r="5" stroke="var(--teal)" strokeWidth="0.7" opacity="0.12" />
        <circle cx="13" cy="13" r="8.5" stroke="var(--teal)" strokeWidth="0.5" opacity="0.06" />
      </svg>
    ),
  },
];

/* ── RULER — Hashmark divider ── */
function Ruler() {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto 32px', padding: '0 16px' }}>
      <svg viewBox="0 0 800 10" preserveAspectRatio="none" style={{ width: '100%', height: 10, display: 'block' }}>
        <line x1="0" y1="5" x2="800" y2="5" stroke="var(--border_inactive)" strokeWidth="0.5" />
        {[0, 400, 800].map(x => <circle key={x} cx={x} cy="5" r="1.5" fill="rgba(45,212,191,0.15)" />)}
        {[0, 400, 800].map(x => <line key={`t${x}`} x1={x} y1="2.5" x2={x} y2="7.5" stroke="rgba(45,212,191,0.12)" strokeWidth="0.5" />)}
        {[100, 200, 300, 500, 600, 700].map(x => <line key={`s${x}`} x1={x} y1="3.5" x2={x} y2="6.5" stroke="rgba(182,198,214,0.06)" strokeWidth="0.5" />)}
      </svg>
    </div>
  );
}

/* ── SINGLE ETHOS CARD ── */
function EthosCardEl({ card, index }: { card: EthosCard; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    /* Intersection observer for scroll-triggered entrance */
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, index * 40);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className="ethos-card"
      style={{
        position: 'relative',
        background: 'rgba(12,26,35,0.55)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '2px solid var(--border_inactive)',
        borderRadius: 'var(--radius_card)',
        padding: '32px 32px 28px',
        opacity: 0,
        transform: 'translateY(10px)',
        overflow: 'hidden',
      }}
    >
      {/* Corner stamp icon — top left */}
      <div
        style={{
          position: 'absolute',
          top: 18,
          left: 20,
          width: 48,
          height: 48,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          border: '1px solid rgba(45,212,191,0.1)',
        }}
      >
        <div style={{ width: 24, height: 24 }}>{card.icon}</div>
      </div>

      {/* Centered content */}
      <div style={{ textAlign: 'center', maxWidth: 540, margin: '0 auto' }}>
        {/* Numeral */}
        <span
          className="data"
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: 'rgba(45,212,191,0.2)',
            letterSpacing: 4,
            display: 'block',
            marginBottom: 4,
          }}
        >
          {card.numeral}
        </span>

        {/* Headline */}
        <h2
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: 'var(--text)',
            marginBottom: 4,
            lineHeight: 1.3,
          }}
        >
          {card.headline}
        </h2>

        {/* Tagline */}
        <p
          style={{
            fontSize: 13,
            fontWeight: 300,
            color: 'var(--sub)',
            marginBottom: 16,
            fontStyle: 'italic',
            opacity: 0.8,
          }}
        >
          {card.tagline}
        </p>

        {/* Bullets — frosted pre-launch */}
        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: '0 auto',
            maxWidth: 480,
            display: 'flex',
            flexDirection: 'column',
            gap: 7,
            textAlign: 'left',
            filter: 'blur(5px)',
            WebkitFilter: 'blur(5px)',
            userSelect: 'none',
          }}
        >
          {card.bullets.map((b, i) => (
            <li
              key={i}
              style={{
                fontSize: 13,
                fontWeight: 300,
                color: 'var(--sub)',
                lineHeight: 1.5,
                paddingLeft: 16,
                position: 'relative',
              }}
            >
              {/* Teal dash bullet */}
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 9,
                  width: 5,
                  height: 1,
                  background: 'rgba(45,212,191,0.4)',
                }}
              />
              {b}
            </li>
          ))}
        </ul>

        {/* Tag pill */}
        <span
          className="data"
          style={{
            display: 'inline-block',
            marginTop: 16,
            fontSize: 8,
            letterSpacing: 2,
            color: 'rgba(45,212,191,0.4)',
            padding: '4px 10px',
            border: '1px solid rgba(45,212,191,0.08)',
            borderRadius: 3,
            background: 'rgba(45,212,191,0.06)',
          }}
        >
          {card.tag}
        </span>
      </div>
    </div>
  );
}

/* ── MAIN EXPORT ── */
export function EthosContent() {
  return (
    <>
      <Ruler />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingBottom: 48 }}>
        {PRINCIPLES.map((card, i) => (
          <EthosCardEl key={card.numeral} card={card} index={i} />
        ))}
      </div>

      {/* Classification footer */}
      <div
        className="classification-stamp"
        style={{ textAlign: 'center', paddingBottom: 24 }}
      >
        BASELINE™ BRAND ETHOS // CLASSIFICATION: PUBLIC
      </div>

      <style>{`
        .ethos-card {
          transition: border-color 0.3s ease, transform 0.3s ease, background 0.3s ease;
        }
        .ethos-card:hover {
          border-color: rgba(45,212,191,0.22);
          transform: translateY(-1px);
          background: rgba(12,26,35,0.65);
        }
        @media (max-width: 640px) {
          .ethos-card { padding: 28px 20px 24px !important; }
        }
      `}</style>
    </>
  );
}
