'use client';

import type { ReactNode } from "react";
import { PipelineWidget, DeltaComputeWidget, ConsensusAssemblyWidget } from "./LiveWidgets";

/* Plain framed illustration. Sample data, nothing hidden. */
function IllustrationFrame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <figure
      style={{
        margin: 0,
        borderRadius: 10,
        overflow: "hidden",
        border: "2px solid var(--border_inactive)",
        background: "#0c1a23",
      }}
    >
      <div style={{ pointerEvents: "none", userSelect: "none" }}>{children}</div>
      <figcaption
        className="data"
        style={{
          padding: "8px 12px",
          borderTop: "1px solid var(--border_inactive)",
          color: "var(--teal-dim)",
          fontSize: 10,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        {label} &middot; illustration with sample data
      </figcaption>
    </figure>
  );
}

export function SurfaceWidgets() {
  return (
    <IllustrationFrame label="Pipeline: input, parallel systems, output">
      <PipelineWidget />
    </IllustrationFrame>
  );
}

export function LayerWidgets() {
  return (
    <div className="grid_2" style={{ display: "grid", gap: 12, marginTop: 16 }}>
      <IllustrationFrame label="Delta computation: current minus average">
        <DeltaComputeWidget />
      </IllustrationFrame>
      <IllustrationFrame label="Consensus assembly: convergence">
        <ConsensusAssemblyWidget />
      </IllustrationFrame>
    </div>
  );
}
