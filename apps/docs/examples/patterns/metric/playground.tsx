"use client";

import { Card, Metric } from "@clawscale/react";
import { Playground, SIZES, usePlayground } from "@/components/docs/playground";

const latency = [171, 169, 174, 172, 170, 176, 175, 178, 177, 180, 179, 182];
const slots = [1, 2, 3, 4, 5, 6, 7, 8].map((slot) => `--cs-chart-${slot}`);

export default function MetricPlayground() {
  const [props, options] = usePlayground({
    delta: { type: "number", label: "Delta", min: -50, max: 50, step: 0.5, default: 3.1 },
    goodDirection: { type: "segmented", label: "Good direction", options: ["up", "down"], default: "down" },
    size: { type: "segmented", label: "Size", options: SIZES, default: "medium" },
    loading: { type: "boolean", label: "Loading", default: false },
    caption: { type: "boolean", label: "Caption", default: true },
    trend: { type: "boolean", label: "Trend", default: true },
    trendColor: { type: "select", label: "Trend color", options: slots, default: "--cs-chart-1" },
  });
  return (
    <Playground options={options}>
      <Card style={{ width: 240 }}>
        <Metric
          label="p95 latency"
          value="182"
          unit="ms"
          delta={props.delta}
          goodDirection={props.goodDirection}
          size={props.size}
          loading={props.loading}
          caption={props.caption ? "vs last hour" : undefined}
          trend={props.trend ? latency : undefined}
          trendColor={`var(${props.trendColor})`}
        />
      </Card>
    </Playground>
  );
}
