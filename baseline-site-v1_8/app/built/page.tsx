import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Built By Preston Winters",
  description:
    "Solo-built political intelligence platform. 100K+ lines of code. 28 screens. 4 AI providers. Flutter, Supabase, Edge Functions. Multi-AI orchestration at team velocity.",
  alternates: { canonical: `${site.url}/built/` },
  openGraph: {
    title: "Built By Preston Winters | Baseline",
    description:
      "Solo-built political intelligence platform. 100K+ lines of code, 4 AI providers, production on Google Play.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Baseline" }],
  },
};

/* ─────────────────────────────────────────────────────────
   /built — Portfolio page. The URL on resumes.
   Not in primary nav. Hamburger overflow only.
   ───────────────────────────────────────────────────────── */

const STATS = [
  { value: "100K+", label: "LINES OF CODE", sub: "Baseline alone" },
  { value: "28", label: "SCREENS", sub: "Production app" },
  { value: "22", label: "EDGE FUNCTIONS", sub: "Supabase backend" },
  { value: "4", label: "AI PROVIDERS", sub: "Independent analysis" },
  { value: "3", label: "APPS LIVE", sub: "iOS + Android" },
  { value: "500+", label: "BUILD SESSIONS", sub: "Documented" },
];

const STACK = [
  "Flutter",
  "Dart",
  "Supabase",
  "PostgreSQL",
  "Edge Functions",
  "REST APIs",
  "Riverpod",
  "GoRouter",
  "RevenueCat",
  "AdMob",
  "Git",
];

const PIPELINE = [
  {
    step: "01",
    label: "CAPTURE",
    desc: "Public speech ingested with source, timestamp, and speaker identity.",
  },
  {
    step: "02",
    label: "EXTRACT",
    desc: "Gemini structures raw input into a canonical format for analysis.",
  },
  {
    step: "03",
    label: "ANALYZE",
    desc: "Claude, GPT, and Grok process the same input independently. No model sees another's output.",
  },
  {
    step: "04",
    label: "SCORE",
    desc: "Consensus layer computes weighted agreement across all outputs.",
  },
  {
    step: "05",
    label: "DISPLAY",
    desc: "Results shown side-by-side with full source context. User interprets.",
  },
];

export default function BuiltPage() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{
          padding: "80px 24px 48px",
          maxWidth: 720,
          margin: "0 auto",
        }}
      >
        {/* Classification stamp */}
        <div
          style={{
            fontFamily:
              "var(--font-jetbrains, monospace), ui-monospace, monospace",
            fontSize: 9,
            letterSpacing: "0.15em",
            color: "rgba(45,212,191,0.4)",
            marginBottom: 24,
            textTransform: "uppercase",
          }}
        >
          PORTFOLIO // SOLO DEVELOPER // 2024-2026
        </div>

        <h1
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: "var(--text)",
            margin: "0 0 12px",
            lineHeight: 1.2,
          }}
        >
          Built by Preston Winters
        </h1>

        <p
          className="p"
          style={{
            fontSize: 16,
            color: "var(--sub)",
            margin: "0 0 32px",
            lineHeight: 1.6,
            maxWidth: 560,
          }}
        >
          3 production apps. 100K+ lines of code for Baseline alone. Built in
          months, not years, using multi-AI orchestration.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a
            href="https://play.google.com/store/apps/details?id=com.baseline.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: 44,
              padding: "0 20px",
              borderRadius: 8,
              background: "var(--teal)",
              color: "#081017",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 14,
              border: "2px solid rgba(45,212,191,0.35)",
            }}
          >
            View on Google Play
          </a>
          <a
            href="mailto:Droiddna2013@gmail.com?subject=Re:%20Baseline%20Portfolio"
            style={{
              display: "inline-flex",
              alignItems: "center",
              height: 44,
              padding: "0 20px",
              borderRadius: 8,
              background: "transparent",
              color: "var(--teal)",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 14,
              border: "2px solid rgba(45,212,191,0.25)",
            }}
          >
            Contact Me
          </a>
        </div>
      </section>

      {/* ── STATS GRID ── */}
      <section
        style={{
          padding: "0 24px 48px",
          maxWidth: 720,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 12,
          }}
        >
          {STATS.map((s) => (
            <div
              key={s.label}
              style={{
                padding: "20px 16px",
                background: "var(--card)",
                border: "2px solid var(--border_inactive)",
                borderRadius: 10,
              }}
            >
              <div
                style={{
                  fontFamily:
                    "var(--font-jetbrains, monospace), ui-monospace, monospace",
                  fontSize: 28,
                  fontWeight: 700,
                  color: "var(--teal)",
                  lineHeight: 1,
                  marginBottom: 6,
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily:
                    "var(--font-jetbrains, monospace), ui-monospace, monospace",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  color: "var(--text)",
                  fontWeight: 600,
                  marginBottom: 2,
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontSize: 11,
                  color: "var(--sub)",
                }}
              >
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ARCHITECTURE ── */}
      <section
        style={{
          padding: "0 24px 48px",
          maxWidth: 720,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontFamily:
              "var(--font-jetbrains, monospace), ui-monospace, monospace",
            fontSize: 9,
            letterSpacing: "0.15em",
            color: "rgba(45,212,191,0.4)",
            marginBottom: 12,
            textTransform: "uppercase",
          }}
        >
          SYSTEM ARCHITECTURE // BASELINE
        </div>

        <h2
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: "var(--text)",
            margin: "0 0 24px",
          }}
        >
          How Baseline Works
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {PIPELINE.map((p, i) => (
            <div key={p.step}>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  padding: "16px 0",
                }}
              >
                {/* Step number + vertical line */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minWidth: 32,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      border: "2px solid var(--teal)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily:
                        "var(--font-jetbrains, monospace), ui-monospace, monospace",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "var(--teal)",
                    }}
                  >
                    {p.step}
                  </div>
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily:
                        "var(--font-jetbrains, monospace), ui-monospace, monospace",
                      fontSize: 12,
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      color: "var(--teal)",
                      marginBottom: 4,
                    }}
                  >
                    {p.label}
                  </div>
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--sub)",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                  >
                    {p.desc}
                  </p>
                </div>
              </div>

              {/* Connector line */}
              {i < PIPELINE.length - 1 && (
                <div
                  style={{
                    width: 2,
                    height: 20,
                    background:
                      "linear-gradient(180deg, var(--teal), rgba(45,212,191,0.1))",
                    marginLeft: 15,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Stack badges */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginTop: 32,
          }}
        >
          {STACK.map((s) => (
            <span
              key={s}
              style={{
                fontFamily:
                  "var(--font-jetbrains, monospace), ui-monospace, monospace",
                fontSize: 11,
                padding: "5px 12px",
                borderRadius: 6,
                border: "1px solid rgba(45,212,191,0.2)",
                color: "rgba(45,212,191,0.7)",
                letterSpacing: "0.05em",
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </section>

      {/* ── HOW I BUILD ── */}
      <section
        style={{
          padding: "0 24px 48px",
          maxWidth: 720,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontFamily:
              "var(--font-jetbrains, monospace), ui-monospace, monospace",
            fontSize: 9,
            letterSpacing: "0.15em",
            color: "rgba(45,212,191,0.4)",
            marginBottom: 12,
            textTransform: "uppercase",
          }}
        >
          METHODOLOGY // BUILD PROCESS
        </div>

        <h2
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: "var(--text)",
            margin: "0 0 16px",
          }}
        >
          Multi-AI Orchestration
        </h2>

        <p
          className="p"
          style={{
            fontSize: 15,
            color: "var(--sub)",
            margin: "0 0 16px",
            lineHeight: 1.6,
          }}
        >
          I don&rsquo;t write every line by hand. I direct Claude, GPT, Gemini,
          and Grok simultaneously, using each model&rsquo;s strengths for
          different tasks: architecture, code generation, QA, and user research
          synthesis. The result is solo output at team velocity.
        </p>

        <div
          style={{
            padding: "16px 20px",
            background: "var(--card)",
            border: "2px solid var(--border_inactive)",
            borderRadius: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            {[
              {
                model: "Claude",
                role: "Architecture, complex code generation, institutional knowledge management",
              },
              {
                model: "GPT",
                role: "Rapid prototyping, broad technical QA, documentation",
              },
              {
                model: "Gemini",
                role: "Data extraction, structuring, research synthesis",
              },
              {
                model: "Grok",
                role: "Edge case identification, adversarial testing, alternative perspectives",
              },
            ].map((m) => (
              <div key={m.model} style={{ display: "flex", gap: 12 }}>
                <div
                  style={{
                    fontFamily:
                      "var(--font-jetbrains, monospace), ui-monospace, monospace",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--teal)",
                    minWidth: 60,
                    letterSpacing: "0.05em",
                  }}
                >
                  {m.model}
                </div>
                <div style={{ fontSize: 13, color: "var(--sub)", lineHeight: 1.4 }}>
                  {m.role}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 16,
              paddingTop: 12,
              borderTop: "1px solid var(--border_inactive)",
              fontFamily:
                "var(--font-jetbrains, monospace), ui-monospace, monospace",
              fontSize: 10,
              color: "rgba(45,212,191,0.5)",
              letterSpacing: "0.1em",
            }}
          >
            390+ INSTITUTIONAL KNOWLEDGE RULES DOCUMENTED
          </div>
        </div>
      </section>

      {/* ── OTHER PROJECTS ── */}
      <section
        style={{
          padding: "0 24px 48px",
          maxWidth: 720,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            fontFamily:
              "var(--font-jetbrains, monospace), ui-monospace, monospace",
            fontSize: 9,
            letterSpacing: "0.15em",
            color: "rgba(45,212,191,0.4)",
            marginBottom: 12,
            textTransform: "uppercase",
          }}
        >
          ADDITIONAL // PORTFOLIO
        </div>

        <h2
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: "var(--text)",
            margin: "0 0 20px",
          }}
        >
          Other Projects
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            {
              name: "StainSlayer AI",
              desc: "Stain identification app. Camera-first UX. Live on iOS and Android.",
              status: "LIVE",
            },
            {
              name: "3 Additional Apps",
              desc: "Active development pipeline. Home intelligence, document translation, self-accuracy tracking.",
              status: "IN DEV",
            },
            {
              name: "Cyber Hornets",
              desc: "Previously CEO. 40.9K followers, 7-figure revenue, 10K+ Discord community.",
              status: "PREV",
            },
          ].map((p) => (
            <div
              key={p.name}
              style={{
                padding: "16px 20px",
                background: "var(--card)",
                border: "2px solid var(--border_inactive)",
                borderRadius: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: 16,
              }}
            >
              <div>
                <div
                  style={{
                    fontWeight: 600,
                    color: "var(--text)",
                    fontSize: 15,
                    marginBottom: 4,
                  }}
                >
                  {p.name}
                </div>
                <div style={{ fontSize: 13, color: "var(--sub)", lineHeight: 1.4 }}>
                  {p.desc}
                </div>
              </div>
              <span
                style={{
                  fontFamily:
                    "var(--font-jetbrains, monospace), ui-monospace, monospace",
                  fontSize: 9,
                  letterSpacing: "0.1em",
                  padding: "3px 8px",
                  borderRadius: 4,
                  border: `1px solid ${
                    p.status === "LIVE"
                      ? "rgba(45,212,191,0.3)"
                      : "rgba(255,255,255,0.1)"
                  }`,
                  color:
                    p.status === "LIVE"
                      ? "var(--teal)"
                      : "var(--sub)",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT FOOTER ── */}
      <section
        style={{
          padding: "32px 24px 80px",
          maxWidth: 720,
          margin: "0 auto",
          borderTop: "1px solid var(--border_inactive)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 18,
              color: "var(--text)",
              marginBottom: 8,
            }}
          >
            Preston Winters
          </div>

          <a
            href="mailto:Droiddna2013@gmail.com"
            style={{
              color: "var(--teal)",
              textDecoration: "none",
              fontSize: 14,
              fontFamily:
                "var(--font-jetbrains, monospace), ui-monospace, monospace",
            }}
          >
            Droiddna2013@gmail.com
          </a>
          <a
            href="tel:+15415510731"
            style={{
              color: "var(--sub)",
              textDecoration: "none",
              fontSize: 14,
              fontFamily:
                "var(--font-jetbrains, monospace), ui-monospace, monospace",
            }}
          >
            541-551-0731
          </a>
          <span
            style={{
              color: "var(--sub)",
              fontSize: 14,
            }}
          >
            Bandon, Oregon
          </span>
        </div>
      </section>
    </>
  );
}
