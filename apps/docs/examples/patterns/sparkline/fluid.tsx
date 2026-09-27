"use client";

import { Sparkline } from "@clawscale/react";

const cpu = [38, 41, 40, 44, 47, 45, 52, 58, 55, 61, 57, 54, 49, 51, 47, 44];

export default function SparklineFluid() {
  return (
    <div
      style={{
        border: "1px solid var(--cs-color-border)",
        borderRadius: "var(--cs-radius-md)",
        maxWidth: "100%",
        overflow: "hidden",
        padding: 12,
        resize: "horizontal",
        width: 320,
      }}
    >
      <Sparkline data={cpu} height={40} label="CPU utilization, last 80 minutes" />
    </div>
  );
}
