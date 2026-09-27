"use client";

import { Card, Metric } from "@clawscale/react";

const metrics = [
  { label: "Throughput", value: "12,480", unit: "rows/s", delta: 8.2 },
  { label: "p95 latency", value: "182", unit: "ms", delta: 3.1, goodDirection: "down" },
  { label: "Error rate", value: "0.42", unit: "%", delta: -12.5, goodDirection: "down" },
  { label: "Active pipelines", value: "38", delta: 0 },
  { label: "Rows ingested", value: "1.84B", delta: 4.6 },
  { label: "Compute cost", value: "$1,284", delta: 1.9, goodDirection: "down" },
] as const;

export default function MetricGrid() {
  return (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))" }}>
      {metrics.map((metric) => (
        <Card key={metric.label} compact>
          <Metric size="small" caption="vs yesterday" {...metric} />
        </Card>
      ))}
    </div>
  );
}
