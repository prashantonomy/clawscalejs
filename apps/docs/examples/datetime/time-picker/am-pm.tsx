"use client";

import { TimePicker } from "@clawscale/react/datetime";

// On-call handoff at 9:00 PM.
export default function TimePickerAmPm() {
  return <TimePicker useAmPm defaultValue={new Date(2026, 8, 14, 21, 0)} />;
}
