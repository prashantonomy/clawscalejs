"use client";

import { Metric } from "@clawscale/react";

export default function MetricSize() {
  return (
    <div style={{ display: "flex", gap: 40 }}>
      <Metric size="small" label="Small" value="1,204" unit="jobs" />
      <Metric size="medium" label="Medium" value="1,204" unit="jobs" />
      <Metric size="large" label="Large" value="1,204" unit="jobs" />
    </div>
  );
}
