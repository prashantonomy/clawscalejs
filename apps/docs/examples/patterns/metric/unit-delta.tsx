"use client";

import { Metric } from "@clawscale/react";

export default function MetricUnitDelta() {
  return (
    <div style={{ display: "flex", gap: 40 }}>
      <Metric label="Throughput" value="12,480" unit="rows/s" delta={8.2} />
      <Metric label="Cache hit rate" value="94.1" unit="%" delta={-1.2} />
    </div>
  );
}
