"use client";

import { Button } from "@clawscale/react";
import { type DateRange, DateRangeInput } from "@clawscale/react/datetime";
import { useState } from "react";

const incident: DateRange = [new Date(2026, 8, 12), new Date(2026, 8, 14)];

function countDays([start, end]: DateRange) {
  return start && end ? Math.round((end.getTime() - start.getTime()) / 86_400_000) + 1 : 0;
}

export default function DateRangeInputControlled() {
  const [range, setRange] = useState<DateRange>(incident);
  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
      <DateRangeInput shortcuts={false} value={range} onChange={setRange} />
      <div style={{ alignItems: "center", display: "flex", gap: 8 }}>
        <Button text="Reset to incident" onClick={() => setRange(incident)} />
        <Button variant="minimal" text="Clear" onClick={() => setRange([null, null])} />
        <span>{countDays(range)} days in the export</span>
      </div>
    </div>
  );
}
