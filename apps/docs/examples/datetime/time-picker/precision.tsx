"use client";

import { TimePicker } from "@clawscale/react/datetime";

export default function TimePickerPrecision() {
  return (
    <div style={{ alignItems: "center", display: "grid", gap: "12px 24px", gridTemplateColumns: "auto auto" }}>
      <span>Nightly backup</span>
      <TimePicker precision="minute" defaultValue={new Date(2026, 8, 14, 2, 30)} />
      <span>Log rotation</span>
      <TimePicker precision="second" defaultValue={new Date(2026, 8, 14, 0, 0, 15)} />
      <span>Trace span start</span>
      <TimePicker precision="millisecond" defaultValue={new Date(2026, 8, 14, 14, 7, 32, 418)} />
    </div>
  );
}
