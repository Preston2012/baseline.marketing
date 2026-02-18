'use client';

import { FrostedWidgetPreview } from "./FrostedWidget";
import { PipelineWidget, DeltaComputeWidget, ConsensusAssemblyWidget, SplitMicroscopeWidget, NarrativeSyncWidget } from "./LiveWidgets";

/* Frosted widget for Proprietary Surfaces section — pipeline demo */
export function SurfaceWidgets() {
  return (
    <FrostedWidgetPreview label="MEASUREMENT PIPELINE · INPUT → PARALLEL → OUTPUT">
      <PipelineWidget />
    </FrostedWidgetPreview>
  );
}

/* Frosted widget strip for Proprietary Surfaces — analytical demos */
export function AnalysisWidgets() {
  return (
    <div className="grid_2" style={{ display: "grid", gap: 12, marginTop: 16 }}>
      <FrostedWidgetPreview label="SPLIT MICROSCOPE™ · DIVERGENCE VIEW">
        <SplitMicroscopeWidget />
      </FrostedWidgetPreview>
      <FrostedWidgetPreview label="NARRATIVE SYNC™ · CONVERGENCE DETECTION">
        <NarrativeSyncWidget />
      </FrostedWidgetPreview>
    </div>
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
