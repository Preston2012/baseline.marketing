/** Shown at the top of every policy page until Preston approves the text.
 *  Set to an empty string to remove it everywhere. */
export const LEGAL_DRAFT_NOTICE = "";

export const site = {
  name: "Baseline",
  url: "https://www.baseline.marketing",
  tagline: "Speech you can measure.",
  // Keep meta copy neutral + instrument-grade.
  // (Mandatory disclaimer is presented in UI via DisclaimerBar.)
  description:
    "Speech you can measure. Parallel AI systems measure public speech side-by-side with sources and context. Not a fact-check.",
  social: {},
  contact: {
    support: "support@baseline.marketing",
    press: "support@baseline.marketing"
  }
} as const;
