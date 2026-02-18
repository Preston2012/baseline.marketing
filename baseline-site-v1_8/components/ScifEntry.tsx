'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

/* ─────────────────────────────────────────────────────────
   SCIF ENTRY — Classified Access Ritual
   ─────────────────────────────────────────────────────────
   Stage 1: The Void — black + teal blinking cursor
   Stage 2: The Boot — typed classification header
   Stage 3: The Challenge — masked command input
   Stage 4: The Breach — vault door parts, site revealed
   
   First-visit only. Returning visitors skip to content.
   ───────────────────────────────────────────────────────── */

// ── Accepted commands (case-insensitive) ──
const ACCEPTED_COMMANDS = [
  'grant access',
  'declassify',
  'enter',
  'open',
  'access',
  'baseline',
];

// ── Typing speed config (ms per character) ──
const SPEED_FAST = 38;
const SPEED_SLOW = 55;

// ── The classification lines ──
interface TypeLine {
  label?: string;       // gunmetal prefix (e.g. "CLASSIFICATION:")
  value: string;        // teal content
  speed: number;        // ms per char
  pauseAfter: number;   // ms pause after line completes
  isHeadline?: boolean; // full teal treatment
  triggerReticles?: boolean; // fire reticles after this line
}

const BOOT_LINES: TypeLine[] = [
  {
    value: 'BASELINE\u2122 // SIGNAL INTELLIGENCE BRIEF',
    speed: SPEED_FAST,
    pauseAfter: 400,
    isHeadline: true,
  },
  {
    label: 'CLASSIFICATION: ',
    value: 'UNRESTRICTED',
    speed: SPEED_SLOW,
    pauseAfter: 300,
    triggerReticles: true,
  },
  {
    label: 'CLEARANCE: ',
    value: 'PUBLIC ACCESS GRANTED',
    speed: SPEED_FAST,
    pauseAfter: 500,
  },
];

// ── localStorage key ──
const CLEARED_KEY = 'baseline_clearance';

export function ScifEntry({ children }: { children: React.ReactNode }) {
  const [cleared, setCleared] = useState<boolean | null>(null);
  const [stage, setStage] = useState<'void' | 'boot' | 'challenge' | 'breach' | 'done'>('void');
  const [displayedLines, setDisplayedLines] = useState<Array<{ label?: string; typed: string; complete: boolean }>>([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [reticlesVisible, setReticlesVisible] = useState(false);
  const [hashMarksVisible, setHashMarksVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [maskedValue, setMaskedValue] = useState('');
  const [showDenied, setShowDenied] = useState(false);
  const [amberFlash, setAmberFlash] = useState(false);
  const [deniedCount, setDeniedCount] = useState(0);
  const [showScanner, setShowScanner] = useState(false);
  const [scannerProgress, setScannerProgress] = useState(0);
  const [scannerActive, setScannerActive] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [grantedTyped, setGrantedTyped] = useState('');
  const [doorOpen, setDoorOpen] = useState(false);
  const [overlayGone, setOverlayGone] = useState(false);
  const [autoTyping, setAutoTyping] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scanIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const holdStartRef = useRef<number>(0);

  // ── Check clearance on mount ──
  useEffect(() => {
    try {
      const val = localStorage.getItem(CLEARED_KEY);
      setCleared(val === 'true');
    } catch {
      setCleared(false);
    }

    // Easter egg: devs who open console find this
    if (typeof window !== 'undefined') {
      console.log(
        '%c BASELINE™ // SIGNAL INTELLIGENCE BRIEF %c\n' +
        '%c CLASSIFICATION: UNCLASSIFIED \n' +
        ' GRID: 0x2DD4BF \n' +
        ' STATUS: NOMINAL \n' +
        ' You found the signal. ',
        'background:#2dd4bf;color:#081017;font-weight:bold;padding:4px 8px;font-family:monospace;',
        '',
        'color:#3a4a56;font-family:monospace;font-size:11px;'
      );
    }
  }, []);

  // Lock body scroll while SCIF is active — nuclear approach for mobile
  useEffect(() => {
    const preventTouch = (e: TouchEvent) => { e.preventDefault(); };
    
    if (!cleared && !doorOpen) {
      // position:fixed is the only way to truly kill scroll on iOS
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.position = 'fixed';
      document.documentElement.style.width = '100%';
      document.documentElement.style.height = '100%';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.body.style.top = '0';
      document.body.style.left = '0';
      // Block touchmove to kill all touch-scrolling
      document.addEventListener('touchmove', preventTouch, { passive: false });
    } else {
      document.documentElement.style.overflow = '';
      document.documentElement.style.position = '';
      document.documentElement.style.width = '';
      document.documentElement.style.height = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.top = '';
      document.body.style.left = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.documentElement.style.position = '';
      document.documentElement.style.width = '';
      document.documentElement.style.height = '';
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.removeEventListener('touchmove', preventTouch);
    };
  }, [cleared, doorOpen]);

  // ── Cursor blink ──
  useEffect(() => {
    if (stage === 'done' || overlayGone) return;
    const blink = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(blink);
  }, [stage, overlayGone]);

  // ── Grant clearance and animate breach ──
  const grantClearance = useCallback(() => {
    setAccessGranted(true);
    setShowPrompt(false);

    // Type out "ACCESS GRANTED"
    const text = 'ACCESS GRANTED';
    let i = 0;
    const typeInterval = setInterval(() => {
      i++;
      setGrantedTyped(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(typeInterval);
        // Beat → shake → door breach
        setTimeout(() => {
          // Screen shake
          const overlay = document.getElementById('scif-overlay');
          if (overlay) {
            overlay.style.animation = 'scif-shake 0.3s ease-out';
          }
          setTimeout(() => {
            setDoorOpen(true);
            // Save clearance
            try { localStorage.setItem(CLEARED_KEY, 'true'); } catch {}
            // Remove overlay after door animation
            setTimeout(() => {
              setOverlayGone(true);
              setStage('done');
            }, 1200);
          }, 400);
        }, 600);
      }
    }, SPEED_FAST);
  }, []);

  // ── Auto-type after timeout (the system overrides you) ──
  const autoType = useCallback(() => {
    setAutoTyping(true);
    setShowDenied(false);
    const cmd = 'GRANT ACCESS';
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setMaskedValue('*'.repeat(i));
      setInputValue(cmd.slice(0, i));
      if (i >= cmd.length) {
        clearInterval(interval);
        setTimeout(() => grantClearance(), 300);
      }
    }, 70);
  }, [grantClearance]);

  // ── Idle timer — 12 seconds then auto-type ──
  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      if (!accessGranted) autoType();
    }, 12000);
  }, [accessGranted, autoType]);

  // ── Start boot sequence ──
  useEffect(() => {
    if (cleared !== false) return;

    // Stage 1: void with cursor for 1.2s, then boot
    const voidTimer = setTimeout(() => {
      setStage('boot');
    }, 1200);

    return () => clearTimeout(voidTimer);
  }, [cleared]);

  // ── Boot sequence typing ──
  useEffect(() => {
    if (stage !== 'boot') return;

    let cancelled = false;
    let currentLine = 0;

    const typeLine = (lineIdx: number) => {
      if (cancelled || lineIdx >= BOOT_LINES.length) {
        // Boot complete → challenge stage
        if (!cancelled) {
          setTimeout(() => {
            setStage('challenge');
            setShowPrompt(true);
            resetIdleTimer();
          }, 200);
        }
        return;
      }

      const line = BOOT_LINES[lineIdx];
      const fullText = line.value;
      let charIdx = 0;

      // Add new line entry
      setDisplayedLines(prev => [...prev, {
        label: line.label,
        typed: '',
        complete: false,
      }]);

      const typeChar = () => {
        if (cancelled) return;
        charIdx++;
        setDisplayedLines(prev => {
          const next = [...prev];
          next[lineIdx] = { ...next[lineIdx], typed: fullText.slice(0, charIdx) };
          return next;
        });

        if (charIdx >= fullText.length) {
          // Line complete
          setDisplayedLines(prev => {
            const next = [...prev];
            next[lineIdx] = { ...next[lineIdx], complete: true };
            return next;
          });

          // Trigger reticles on UNRESTRICTED
          if (line.triggerReticles) {
            setTimeout(() => {
              setReticlesVisible(true);
              setTimeout(() => setHashMarksVisible(true), 300);
            }, 100);
          }

          setTimeout(() => typeLine(lineIdx + 1), line.pauseAfter);
        } else {
          setTimeout(typeChar, line.speed);
        }
      };

      // If there's a label, show it instantly then type the value
      if (line.label) {
        setTimeout(typeChar, 100);
      } else {
        typeChar();
      }
    };

    typeLine(0);
    return () => { cancelled = true; };
  }, [stage, resetIdleTimer]);

  // ── Focus input when challenge appears ──
  useEffect(() => {
    if (stage === 'challenge' && showPrompt && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [stage, showPrompt]);

  // ── Handle command input ──
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (accessGranted || autoTyping) return;
    const val = e.target.value;
    setInputValue(val);
    setMaskedValue('*'.repeat(val.length));
    setShowDenied(false);
    resetIdleTimer();
  };

  const handleSubmit = () => {
    if (accessGranted || autoTyping) return;
    const cmd = inputValue.trim().toLowerCase();

    if (ACCEPTED_COMMANDS.includes(cmd)) {
      grantClearance();
    } else {
      // ACCESS DENIED
      setAmberFlash(true);
      setShowDenied(true);
      setTimeout(() => setAmberFlash(false), 150);

      const newCount = deniedCount + 1;
      setDeniedCount(newCount);
      setInputValue('');
      setMaskedValue('');

      // After 3 failures, show scanner
      if (newCount >= 3 && !showScanner) {
        setTimeout(() => setShowScanner(true), 600);
      }

      // After 2 failures on scanner already visible, auto-type at reduced timer
      if (newCount >= 3) {
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(() => autoType(), 5000);
      }

      resetIdleTimer();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  // ── Fingerprint scanner hold ──
  const startScan = () => {
    if (accessGranted || autoTyping) return;
    setScannerActive(true);
    holdStartRef.current = Date.now();

    scanIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - holdStartRef.current;
      const progress = Math.min(elapsed / 2000, 1); // 2 second hold
      setScannerProgress(progress);

      if (progress >= 1) {
        if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
        setScannerActive(false);
        grantClearance();
      }
    }, 16);
  };

  const endScan = () => {
    if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    setScannerActive(false);
    setScannerProgress(0);
  };

  // ── Cleanup ──
  useEffect(() => {
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      if (scanIntervalRef.current) clearInterval(scanIntervalRef.current);
    };
  }, []);

  // ── If already cleared or still loading, just show content ──
  if (cleared === null) {
    // Loading state — black screen to prevent flash
    return (
      <div style={{ background: '#000', minHeight: '100vh' }}>
        {children}
      </div>
    );
  }

  if (cleared === true || overlayGone) {
    return <>{children}</>;
  }

  // ── Render the SCIF ──
  return (
    <>
      {/* Site is hidden underneath during ritual — clipped to zero to prevent scroll generation */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: 0, height: 0, overflow: 'hidden', visibility: 'hidden' }}>{children}</div>

      {/* Amber flash overlay */}
      {amberFlash && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(212, 167, 45, 0.12)',
            zIndex: 10001,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* SCIF Overlay */}
      <div
        id="scif-overlay"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          zIndex: 10000,
          background: '#000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-jetbrains, ui-monospace), ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          overflow: 'hidden',
          transition: doorOpen ? 'opacity 0.6s ease-out' : 'none',
          opacity: doorOpen ? 0 : 1,
          touchAction: 'none',
          overscrollBehavior: 'none',
        }}
        onTouchMove={(e) => e.preventDefault()}
      >
        {/* ── Corner Reticles ── */}
        {reticlesVisible && (
          <>
            {/* Top-left */}
            <div style={{
              position: 'absolute', top: 24, left: 24,
              width: 32, height: 32,
              borderTop: '2px solid #2dd4bf',
              borderLeft: '2px solid #2dd4bf',
              opacity: 0,
              animation: 'reticle-snap 0.2s ease-out forwards',
            }} />
            {/* Top-right */}
            <div style={{
              position: 'absolute', top: 24, right: 24,
              width: 32, height: 32,
              borderTop: '2px solid #2dd4bf',
              borderRight: '2px solid #2dd4bf',
              opacity: 0,
              animation: 'reticle-snap 0.2s ease-out 0.05s forwards',
            }} />
            {/* Bottom-left */}
            <div style={{
              position: 'absolute', bottom: 24, left: 24,
              width: 32, height: 32,
              borderBottom: '2px solid #2dd4bf',
              borderLeft: '2px solid #2dd4bf',
              opacity: 0,
              animation: 'reticle-snap 0.2s ease-out 0.1s forwards',
            }} />
            {/* Bottom-right */}
            <div style={{
              position: 'absolute', bottom: 24, right: 24,
              width: 32, height: 32,
              borderBottom: '2px solid #2dd4bf',
              borderRight: '2px solid #2dd4bf',
              opacity: 0,
              animation: 'reticle-snap 0.2s ease-out 0.15s forwards',
            }} />
          </>
        )}

        {/* ── Edge Hash Marks (gradient: bright center → fading edges) ── */}
        {hashMarksVisible && (
          <>
            {/* Top edge */}
            <div style={{
              position: 'absolute', top: 24, left: 72, right: 72,
              height: 1,
              opacity: 0,
              animation: 'hash-fade 0.8s ease-out forwards',
            }}>
              {Array.from({ length: 20 }).map((_, i) => {
                const t = i / 19; // 0..1
                const centerDist = Math.abs(t - 0.5) * 2; // 0 at center, 1 at edges
                const alpha = 0.04 + (1 - centerDist) * 0.14; // 0.04 at edges → 0.18 at center
                return (
                  <div key={`ht-${i}`} style={{
                    position: 'absolute',
                    left: `${t * 100}%`,
                    top: 0,
                    width: 1,
                    height: i % 5 === 0 ? 8 : 4,
                    background: `rgba(45, 212, 191, ${alpha.toFixed(3)})`,
                  }} />
                );
              })}
            </div>
            {/* Bottom edge */}
            <div style={{
              position: 'absolute', bottom: 24, left: 72, right: 72,
              height: 1,
              opacity: 0,
              animation: 'hash-fade 0.8s ease-out 0.2s forwards',
            }}>
              {Array.from({ length: 20 }).map((_, i) => {
                const t = i / 19;
                const centerDist = Math.abs(t - 0.5) * 2;
                const alpha = 0.04 + (1 - centerDist) * 0.14;
                return (
                  <div key={`hb-${i}`} style={{
                    position: 'absolute',
                    left: `${t * 100}%`,
                    bottom: 0,
                    width: 1,
                    height: i % 5 === 0 ? 8 : 4,
                    background: `rgba(45, 212, 191, ${alpha.toFixed(3)})`,
                  }} />
                );
              })}
            </div>
            {/* Left edge */}
            <div style={{
              position: 'absolute', left: 24, top: 72, bottom: 72,
              width: 1,
              opacity: 0,
              animation: 'hash-fade 0.8s ease-out 0.1s forwards',
            }}>
              {Array.from({ length: 16 }).map((_, i) => {
                const t = i / 15;
                const centerDist = Math.abs(t - 0.5) * 2;
                const alpha = 0.04 + (1 - centerDist) * 0.14;
                return (
                  <div key={`hl-${i}`} style={{
                    position: 'absolute',
                    top: `${t * 100}%`,
                    left: 0,
                    height: 1,
                    width: i % 4 === 0 ? 8 : 4,
                    background: `rgba(45, 212, 191, ${alpha.toFixed(3)})`,
                  }} />
                );
              })}
            </div>
            {/* Right edge */}
            <div style={{
              position: 'absolute', right: 24, top: 72, bottom: 72,
              width: 1,
              opacity: 0,
              animation: 'hash-fade 0.8s ease-out 0.3s forwards',
            }}>
              {Array.from({ length: 16 }).map((_, i) => {
                const t = i / 15;
                const centerDist = Math.abs(t - 0.5) * 2;
                const alpha = 0.04 + (1 - centerDist) * 0.14;
                return (
                  <div key={`hr-${i}`} style={{
                    position: 'absolute',
                    top: `${t * 100}%`,
                    right: 0,
                    height: 1,
                    width: i % 4 === 0 ? 8 : 4,
                    background: `rgba(45, 212, 191, ${alpha.toFixed(3)})`,
                  }} />
                );
              })}
            </div>
          </>
        )}

        {/* ── Terminal Content ── */}
        <div style={{
          maxWidth: 600,
          width: '100%',
          padding: '0 24px',
        }}>
          {/* Boot lines */}
          {displayedLines.map((line, i) => (
            <div
              key={i}
              style={{
                fontSize: BOOT_LINES[i]?.isHeadline ? 'clamp(12px, 3.5vw, 16px)' : 'clamp(11px, 3vw, 14px)',
                lineHeight: 1.8,
                letterSpacing: '0.06em',
                overflowWrap: 'break-word',
                wordBreak: 'break-word',
              }}
            >
              {/* Gunmetal label */}
              {line.label && (
                <span style={{
                  color: '#3a4a56',
                  fontWeight: 500,
                }}>
                  {line.label}
                </span>
              )}
              {/* Teal value */}
              <span style={{
                color: '#2dd4bf',
                fontWeight: BOOT_LINES[i]?.isHeadline ? 600 : 500,
                textShadow: line.complete ? '0 0 20px rgba(45, 212, 191, 0.3)' : 'none',
              }}>
                {line.typed}
              </span>
              {/* Cursor on current typing line */}
              {!line.complete && (
                <span style={{
                  display: 'inline-block',
                  width: 8,
                  height: BOOT_LINES[i]?.isHeadline ? 16 : 14,
                  background: cursorVisible ? '#2dd4bf' : 'transparent',
                  marginLeft: 2,
                  verticalAlign: 'middle',
                  transition: 'background 0.05s',
                }} />
              )}
            </div>
          ))}

          {/* Standalone cursor in void stage */}
          {stage === 'void' && displayedLines.length === 0 && (
            <div style={{ height: 18, display: 'flex', alignItems: 'center' }}>
              <span style={{
                display: 'inline-block',
                width: 9,
                height: 16,
                background: cursorVisible ? '#2dd4bf' : 'transparent',
                transition: 'background 0.05s',
              }} />
            </div>
          )}

          {/* ── Command Prompt ── */}
          {showPrompt && !accessGranted && (
            <div style={{
              marginTop: 24,
              opacity: 0,
              animation: 'prompt-fade 0.3s ease-out forwards',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                fontSize: 14,
                letterSpacing: '0.06em',
              }}>
                <span style={{ color: '#3a4a56', fontWeight: 500, marginRight: 8, flexShrink: 0 }}>
                  ENTER COMMAND:
                </span>
                <div style={{ position: 'relative', flex: 1, minWidth: 0 }}>
                  {/* Hidden real input */}
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={handleInput}
                    onKeyDown={handleKeyDown}
                    disabled={autoTyping}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                    style={{
                      position: 'absolute',
                      top: 0, left: 0,
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      background: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: 'transparent',
                      caretColor: 'transparent',
                      fontSize: 14,
                      fontFamily: 'inherit',
                    }}
                    aria-label="Enter access command"
                  />
                  {/* Visible masked display */}
                  <div style={{
                    color: '#2dd4bf',
                    fontWeight: 500,
                    fontSize: 14,
                    letterSpacing: '0.12em',
                    minHeight: 20,
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                    <span>{maskedValue}</span>
                    <span style={{
                      display: 'inline-block',
                      width: 8,
                      height: 14,
                      background: cursorVisible ? '#2dd4bf' : 'transparent',
                      marginLeft: 1,
                      transition: 'background 0.05s',
                    }} />
                  </div>
                </div>
              </div>

              {/* ACCESS DENIED message */}
              {showDenied && (
                <div style={{
                  marginTop: 12,
                  fontSize: 13,
                  letterSpacing: '0.08em',
                  color: '#d4a72d',
                  fontWeight: 500,
                  opacity: 0,
                  animation: 'denied-flash 0.3s ease-out forwards',
                }}>
                  ACCESS DENIED // RETRY
                </div>
              )}
            </div>
          )}

          {/* ── ACCESS GRANTED ── */}
          {accessGranted && (
            <div style={{
              marginTop: 24,
              fontSize: 14,
              letterSpacing: '0.06em',
            }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span style={{ color: '#3a4a56', fontWeight: 500, marginRight: 8 }}>
                  {autoTyping ? 'OVERRIDE: ' : 'STATUS: '}
                </span>
                <span style={{
                  color: '#2dd4bf',
                  fontWeight: 600,
                  textShadow: grantedTyped.length > 8 ? '0 0 24px rgba(45, 212, 191, 0.4)' : 'none',
                }}>
                  {grantedTyped}
                </span>
                {grantedTyped.length < 14 && (
                  <span style={{
                    display: 'inline-block',
                    width: 8,
                    height: 14,
                    background: cursorVisible ? '#2dd4bf' : 'transparent',
                    marginLeft: 2,
                    transition: 'background 0.05s',
                  }} />
                )}
              </div>
            </div>
          )}

          {/* ── Fingerprint Scanner ── */}
          {showScanner && !accessGranted && (
            <div
              style={{
                marginTop: 32,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                opacity: 0,
                animation: 'prompt-fade 0.5s ease-out forwards',
              }}
            >
              {/* Scanner ring */}
              <div
                onMouseDown={startScan}
                onMouseUp={endScan}
                onMouseLeave={endScan}
                onTouchStart={startScan}
                onTouchEnd={endScan}
                onTouchCancel={endScan}
                role="button"
                tabIndex={0}
                aria-label="Hold to scan fingerprint"
                onKeyDown={(e) => { if (e.key === ' ' || e.key === 'Enter') startScan(); }}
                onKeyUp={(e) => { if (e.key === ' ' || e.key === 'Enter') endScan(); }}
                style={{
                  position: 'relative',
                  width: 80,
                  height: 80,
                  cursor: 'pointer',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                }}
              >
                {/* Background ring */}
                <svg
                  viewBox="0 0 80 80"
                  style={{ position: 'absolute', top: 0, left: 0, width: 80, height: 80 }}
                >
                  <circle
                    cx="40" cy="40" r="36"
                    fill="none"
                    stroke="rgba(45, 212, 191, 0.15)"
                    strokeWidth="2"
                  />
                  {/* Progress arc */}
                  <circle
                    cx="40" cy="40" r="36"
                    fill="none"
                    stroke="#2dd4bf"
                    strokeWidth="2"
                    strokeDasharray={`${2 * Math.PI * 36}`}
                    strokeDashoffset={`${2 * Math.PI * 36 * (1 - scannerProgress)}`}
                    strokeLinecap="round"
                    transform="rotate(-90 40 40)"
                    style={{ transition: scannerActive ? 'none' : 'stroke-dashoffset 0.2s ease-out' }}
                  />
                </svg>

                {/* Reticle corners inside ring */}
                <div style={{
                  position: 'absolute',
                  top: 16, left: 16, right: 16, bottom: 16,
                }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, width: 8, height: 8, borderTop: '1px solid rgba(45,212,191,0.4)', borderLeft: '1px solid rgba(45,212,191,0.4)' }} />
                  <div style={{ position: 'absolute', top: 0, right: 0, width: 8, height: 8, borderTop: '1px solid rgba(45,212,191,0.4)', borderRight: '1px solid rgba(45,212,191,0.4)' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: 8, height: 8, borderBottom: '1px solid rgba(45,212,191,0.4)', borderLeft: '1px solid rgba(45,212,191,0.4)' }} />
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: 8, height: 8, borderBottom: '1px solid rgba(45,212,191,0.4)', borderRight: '1px solid rgba(45,212,191,0.4)' }} />
                </div>

                {/* Center crosshair */}
                <div style={{
                  position: 'absolute',
                  top: '50%', left: '50%',
                  transform: `translate(-50%, -50%) rotate(${scannerActive ? scannerProgress * 90 : 0}deg)`,
                  transition: scannerActive ? 'none' : 'transform 0.3s ease-out',
                }}>
                  <div style={{ width: 1, height: 12, background: 'rgba(45,212,191,0.3)', position: 'absolute', top: -6, left: 0 }} />
                  <div style={{ width: 12, height: 1, background: 'rgba(45,212,191,0.3)', position: 'absolute', top: 0, left: -6 }} />
                </div>
              </div>

              <div style={{
                marginTop: 12,
                fontSize: 10,
                letterSpacing: '0.15em',
                color: 'rgba(45, 212, 191, 0.35)',
                textTransform: 'uppercase',
              }}>
                {scannerActive ? 'Scanning...' : 'Hold to verify'}
              </div>
              <div style={{
                fontSize: 8,
                opacity: 0.25,
                marginTop: 4,
                letterSpacing: '0.04em',
                color: 'rgba(45, 212, 191, 0.35)',
              }}>
                No biometric data is collected.
              </div>
            </div>
          )}
        </div>

        {/* ── Scanline sweep on boot ── */}
        {stage === 'boot' && (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(45,212,191,0.08), transparent)',
            animation: 'scanline-down 3s linear infinite',
          }} />
        )}
      </div>

      {/* ── Animations ── */}
      <style>{`
        @keyframes reticle-snap {
          0% { opacity: 0; transform: scale(1.5); }
          60% { opacity: 1; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes hash-fade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes prompt-fade {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes denied-flash {
          0% { opacity: 0; transform: translateX(-4px); }
          30% { opacity: 1; transform: translateX(2px); }
          60% { transform: translateX(-1px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes scanline-down {
          0% { top: 0; }
          100% { top: 100%; }
        }

        @keyframes scif-shake {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-2px, 1px); }
          20% { transform: translate(2px, -1px); }
          30% { transform: translate(-1px, 2px); }
          40% { transform: translate(1px, -1px); }
          50% { transform: translate(-1px, 1px); }
          60% { transform: translate(1px, 0); }
          70% { transform: translate(-1px, -1px); }
          80% { transform: translate(0, 1px); }
          90% { transform: translate(1px, 0); }
        }

        @media (prefers-reduced-motion: reduce) {
          #scif-overlay,
          #scif-overlay * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
}
