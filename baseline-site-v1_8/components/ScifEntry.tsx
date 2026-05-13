/* ─────────────────────────────────────────────────────────
   SCIF ENTRY — SHELVED 2026-05-13
   ─────────────────────────────────────────────────────────
   The boot ritual was suspected of hurting first-visit
   bounce rate. Baseline is on hold while Winters Code pays
   the bills, so we removed it entirely instead of guessing.
   
   The full original component is preserved at
   archive/ScifEntry.tsx.shelved-2026-05-13 if it ever
   comes back.
   
   This stub keeps the import contract intact: any page that
   does `<ScifEntry>{children}</ScifEntry>` renders the
   children directly with zero JS cost.
   ───────────────────────────────────────────────────────── */
export function ScifEntry({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
