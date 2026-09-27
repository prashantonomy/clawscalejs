"use client";

import { DatePicker, type DatePickerShortcut } from "@clawscale/react/datetime";

const milestones: DatePickerShortcut[] = [
  { label: "Code freeze", date: new Date(2026, 7, 12) },
  { label: "Release cut", date: new Date(2026, 7, 17) },
  { label: "Canary at 10%", date: new Date(2026, 7, 19) },
  { label: "General availability", date: new Date(2026, 7, 24) },
];

export default function DatePickerShortcuts() {
  return <DatePicker shortcuts={milestones} defaultValue={new Date(2026, 7, 17)} />;
}
