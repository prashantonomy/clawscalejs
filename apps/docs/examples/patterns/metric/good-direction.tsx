"use client";

import { Metric } from "@clawscale/react";

export default function MetricGoodDirection() {
  return (
    <div style={{ display: "flex", gap: 40 }}>
      <Metric label="p95 latency" value="182" unit="ms" delta={3.1} goodDirection="down" />
      <Metric label="Error rate" value="0.42" unit="%" delta={-12.5} goodDirection="down" />
    </div>
  );
}
