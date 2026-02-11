import { Card } from "./Card";

export function ScreenshotGrid() {
  return (
    <div className="grid grid_2" style={{ marginTop: 12 }}>
      <Card title="Framing Radar™">
        <img src="/screens/framing_radar.png" alt="Framing Radar screen" loading="lazy" />
      </Card>

      <Card title="Pipeline diagram">
        <img src="/screens/pipeline_diagram.png" alt="Pipeline diagram" loading="lazy" />
      </Card>
    </div>
  );
}
