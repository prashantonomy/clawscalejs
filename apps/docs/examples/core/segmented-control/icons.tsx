"use client";

import { SegmentedControl } from "@clawscale/react";

export default function SegmentedControlIcons() {
  return (
    <SegmentedControl
      defaultValue="table"
      options={[
        { icon: "th", label: "Table", value: "table" },
        { icon: "timeline-line-chart", label: "Chart", value: "chart" },
        { icon: "map", label: "Map", value: "map" },
      ]}
    />
  );
}
