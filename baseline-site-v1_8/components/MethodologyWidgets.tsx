'use client';

import { FrostedWidgetPreview } from "./FrostedWidget";
import { PipelineWidget, DeltaComputeWidget, ConsensusAssemblyWidget } from "./LiveWidgets";

/* Frosted widget for Proprietary Surfaces section — pipeline demo */
export function SurfaceWidgets() {
  return (
    <FrostedWidgetPreview label="PIPELINE · INPUT → PARALLEL → OUTPUT">
      <PipelineWidget />
    </FrostedWidgetPreview>
  );
}

/* Frosted widget strip for Measurement Layers section */
export function LayerWidgets() {
  return (
    <div className="grid_2" style={{ display: "grid", gap: 12, marginTop: 16 }}>
      <FrostedWidgetPreview label="DELTA COMPUTATION · CURRENT − AVG">
        <DeltaComputeWidget />
      </FrostedWidgetPreview>
      <FrostedWidgetPreview label="CONSENSUS ASSEMBLY · CONVERGENCE">
        <ConsensusAssemblyWidget />
      </FrostedWidgetPreview>
    </div>
  );
}
