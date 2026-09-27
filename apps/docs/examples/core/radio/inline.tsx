"use client";

import { RadioGroup } from "@clawscale/react";
import { useState } from "react";

const GRANULARITY = [
  { label: "Hour", value: "hour" },
  { label: "Day", value: "day" },
  { label: "Week", value: "week" },
  { label: "Month", value: "month" },
];

export default function RadioInline() {
  const [granularity, setGranularity] = useState("day");
  return (
    <RadioGroup
      inline
      name="radio-granularity"
      onChange={(event) => setGranularity(event.currentTarget.value)}
      options={GRANULARITY}
      selectedValue={granularity}
    />
  );
}
