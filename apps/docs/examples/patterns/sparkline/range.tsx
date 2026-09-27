"use client";

import { Classes, Sparkline } from "@clawscale/react";

const cpu = [41, 43, 42, 44, 43, 45, 44, 46, 45, 47, 46, 48];

export default function SparklineRange() {
  return (
    <div style={{ alignItems: "center", display: "grid", gap: "12px 16px", gridTemplateColumns: "auto auto" }}>
      <span className={Classes.TEXT_MUTED}>Default</span>
      <Sparkline data={cpu} width={120} label="CPU utilization in percent, scaled to the data" />
      <span className={Classes.TEXT_MUTED}>0 to 100</span>
      <Sparkline data={cpu} width={120} min={0} max={100} label="CPU utilization in percent, scaled 0 to 100" />
    </div>
  );
}
