"use client";

import { Tag } from "@clawscale/react";
import { type DateRange, DateRangePicker } from "@clawscale/react/datetime";
import { useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");
const isoDate = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

function describe([start, end]: DateRange) {
  if (!start || !end) return "Pick the first and last day of the incident";
  const days = Math.round((end.getTime() - start.getTime()) / 86_400_000) + 1;
  return `Incident window: ${isoDate(start)} to ${isoDate(end)}, ${days} days`;
}

export default function DateRangePickerBasic() {
  const [range, setRange] = useState<DateRange>([new Date(2026, 6, 20), new Date(2026, 6, 26)]);
  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "center" }}>
      <DateRangePicker shortcuts={false} value={range} onChange={setRange} />
      <Tag minimal>{describe(range)}</Tag>
    </div>
  );
}
