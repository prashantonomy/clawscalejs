"use client";

import { DatePicker } from "@clawscale/react/datetime";

// Backfills can only target days inside the 90-day retention window.
export default function DatePickerMinMax() {
  return (
    <DatePicker minDate={new Date(2026, 5, 3)} maxDate={new Date(2026, 7, 31)} defaultValue={new Date(2026, 7, 17)} />
  );
}
