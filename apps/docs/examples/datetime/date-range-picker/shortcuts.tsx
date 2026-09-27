"use client";

import { type DateRange, DateRangePicker, type DateRangeShortcut } from "@clawscale/react/datetime";

function lastDays(days: number): DateRange {
  const end = new Date();
  const start = new Date(end.getFullYear(), end.getMonth(), end.getDate() - days + 1);
  return [start, end];
}

export default function DateRangePickerShortcuts() {
  const shortcuts: DateRangeShortcut[] = [
    { label: "Last 7 days", dateRange: lastDays(7) },
    { label: "Last 30 days", dateRange: lastDays(30) },
    { label: "Last 90 days", dateRange: lastDays(90) },
  ];
  return <DateRangePicker shortcuts={shortcuts} defaultValue={[new Date(2026, 6, 20), new Date(2026, 6, 26)]} />;
}
