"use client";

import { TimePicker } from "@clawscale/react/datetime";

// Batch jobs may only start between 22:00 and 04:00. Only the time of each date matters.
export default function TimePickerMinMax() {
  return (
    <TimePicker
      minTime={new Date(2026, 0, 1, 22, 0)}
      maxTime={new Date(2026, 0, 1, 4, 0)}
      defaultValue={new Date(2026, 8, 14, 23, 30)}
    />
  );
}
