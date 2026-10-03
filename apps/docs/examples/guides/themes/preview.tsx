"use client";

import { Button, Card, Metric, ProgressBar, Switch, Tag } from "@clawscale/react";

function Console({ theme }: { theme: "default" | "futuristic" }) {
  return (
    <Card data-cs-theme={theme} style={{ display: "grid", flex: "1 1 260px", gap: 14 }}>
      <Metric label="Throughput" value="12,480" unit="rows/s" delta={8.2} trend={[4, 6, 5, 8, 7, 9, 11, 10, 12, 13]} />
      <ProgressBar aria-label="Backfill progress" value={0.72} intent="primary" stripes={false} />
      <Switch defaultChecked label="Auto-scale workers" />
      <div style={{ alignItems: "center", display: "flex", gap: 8 }}>
        <Tag minimal intent="success">
          healthy
        </Tag>
        <span style={{ flex: 1 }} />
        <Button variant="outlined" text="Logs" />
        <Button intent="primary" text="Deploy" />
      </div>
    </Card>
  );
}

export default function ThemesPreview() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      <Console theme="default" />
      <Console theme="futuristic" />
    </div>
  );
}
