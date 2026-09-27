"use client";

import { Card, Metric } from "@clawscale/react";

const metrics = [
  {
    label: "Throughput",
    value: "12,480",
    unit: "rows/s",
    delta: 8.2,
    trend: [10940, 11210, 11020, 11460, 11330, 11790, 11650, 11920, 12050, 12210, 12330, 12480],
  },
  {
    label: "p95 latency",
    value: "182",
    unit: "ms",
    delta: 3.1,
    goodDirection: "down",
    trend: [171, 169, 174, 172, 170, 176, 175, 178, 177, 180, 179, 182],
  },
  {
    label: "Error rate",
    value: "0.42",
    unit: "%",
    delta: -12.5,
    goodDirection: "down",
    trend: [0.51, 0.49, 0.5, 0.48, 0.47, 0.49, 0.46, 0.45, 0.44, 0.45, 0.43, 0.42],
  },
  {
    label: "Queue lag",
    value: "4.1",
    unit: "s",
    delta: -6.8,
    goodDirection: "down",
    trend: [4.6, 4.5, 4.7, 4.4, 4.5, 4.3, 4.4, 4.2, 4.3, 4.2, 4.1, 4.1],
  },
] as const;

export default function PatternsMetricRow() {
  return (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
      {metrics.map((metric) => (
        <Card key={metric.label} compact>
          <Metric caption="vs last hour" {...metric} />
        </Card>
      ))}
    </div>
  );
}
