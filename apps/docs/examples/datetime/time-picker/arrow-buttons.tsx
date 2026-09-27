"use client";

import { TimePicker } from "@clawscale/react/datetime";

// Daily cost report delivery.
export default function TimePickerArrowButtons() {
  return <TimePicker showArrowButtons precision="second" defaultValue={new Date(2026, 8, 14, 6, 0, 0)} />;
}
