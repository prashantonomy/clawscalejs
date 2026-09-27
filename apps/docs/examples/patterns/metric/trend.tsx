"use client";

import { Metric } from "@clawscale/react";

const usEast = [8120, 8340, 8290, 8610, 8580, 8870, 8930, 9050, 9120, 9260, 9310, 9400];
const euWest = [6480, 6420, 6510, 6390, 6300, 6340, 6250, 6220, 6180, 6150, 6120, 6100];

export default function MetricTrend() {
  return (
    <div style={{ display: "grid", gap: 40, gridTemplateColumns: "repeat(2, 180px)" }}>
      <Metric label="Ingest, us-east-1" value="9,400" unit="rows/s" trend={usEast} />
      <Metric label="Ingest, eu-west-1" value="6,100" unit="rows/s" trend={euWest} trendColor="var(--cs-chart-2)" />
    </div>
  );
}
