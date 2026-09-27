"use client";

import { SegmentedControl } from "@clawscale/react";

const REGIONS = [
  { label: "All regions", value: "all" },
  { label: "eu-west-1", value: "eu-west-1" },
  { label: "us-east-1", value: "us-east-1" },
  { label: "ap-southeast-2", value: "ap-southeast-2" },
];

export default function SegmentedControlFill() {
  return <SegmentedControl defaultValue="all" fill options={REGIONS} />;
}
