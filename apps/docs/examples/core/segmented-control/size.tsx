"use client";

import { SegmentedControl } from "@clawscale/react";

const RANGES = [
  { label: "24h", value: "24h" },
  { label: "7d", value: "7d" },
  { label: "30d", value: "30d" },
];

export default function SegmentedControlSize() {
  return (
    <>
      <SegmentedControl defaultValue="7d" options={RANGES} size="small" />
      <SegmentedControl defaultValue="7d" options={RANGES} size="medium" />
      <SegmentedControl defaultValue="7d" options={RANGES} size="large" />
    </>
  );
}
