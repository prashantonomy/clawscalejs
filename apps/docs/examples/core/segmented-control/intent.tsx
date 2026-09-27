"use client";

import { SegmentedControl } from "@clawscale/react";

const STATUSES = [
  { label: "All runs", value: "all" },
  { label: "Failed", value: "failed" },
  { label: "Running", value: "running" },
  { label: "Queued", value: "queued" },
];

export default function SegmentedControlIntent() {
  return <SegmentedControl defaultValue="failed" intent="primary" options={STATUSES} />;
}
