"use client";

import { type DateRange, DateRangeInput, type DateRangeShortcut } from "@clawscale/react/datetime";

const sprint43: DateRange = [new Date(2026, 8, 14), new Date(2026, 8, 25)];

const sprints: DateRangeShortcut[] = [
  { label: "Sprint 41", dateRange: [new Date(2026, 7, 17), new Date(2026, 7, 28)] },
  { label: "Sprint 42", dateRange: [new Date(2026, 7, 31), new Date(2026, 8, 11)] },
  { label: "Sprint 43", dateRange: sprint43 },
];

export default function DateRangeInputShortcuts() {
  return <DateRangeInput shortcuts={sprints} defaultValue={sprint43} />;
}
