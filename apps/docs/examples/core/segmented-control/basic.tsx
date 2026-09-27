"use client";

import { Classes, SegmentedControl } from "@clawscale/react";
import { useState } from "react";

const RANGES = [
  { label: "1h", value: "1h" },
  { label: "24h", value: "24h" },
  { label: "7d", value: "7d" },
  { label: "30d", value: "30d" },
  { label: "90d", value: "90d" },
];

export default function SegmentedControlBasic() {
  const [range, setRange] = useState("24h");
  return (
    <>
      <SegmentedControl options={RANGES} value={range} onValueChange={setRange} />
      <span className={Classes.TEXT_MUTED}>Error rate over the last {range}</span>
    </>
  );
}
