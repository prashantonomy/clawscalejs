"use client";

import { Metric } from "@clawscale/react";

export default function MetricCaption() {
  return (
    <div style={{ display: "flex", gap: 40 }}>
      <Metric label="Throughput" value="12,480" unit="rows/s" delta={8.2} caption="vs last hour" />
      <Metric label="Queued jobs" value="1,204" caption="across 6 regions" />
    </div>
  );
}
