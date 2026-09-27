"use client";

import { SegmentedControl } from "@clawscale/react";
import { Playground, SIZES, usePlayground } from "@/components/docs/playground";

const RANGES = [
  { label: "1h", value: "1h" },
  { label: "24h", value: "24h" },
  { label: "7d", value: "7d" },
  { label: "30d", value: "30d" },
  { label: "90d", value: "90d" },
];

export default function SegmentedControlPlayground() {
  const [props, options] = usePlayground({
    disabled: { type: "boolean", label: "Disabled", default: false },
    fill: { type: "boolean", label: "Fill", default: false },
    inline: { type: "boolean", label: "Inline", default: false },
    intent: { type: "segmented", label: "Intent", options: ["none", "primary"], default: "none" },
    size: { type: "segmented", label: "Size", options: SIZES, default: "medium" },
  });
  return (
    <Playground options={options}>
      <SegmentedControl {...props} defaultValue="24h" options={RANGES} />
    </Playground>
  );
}
