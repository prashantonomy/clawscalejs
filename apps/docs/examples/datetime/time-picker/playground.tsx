"use client";

import { Tag } from "@clawscale/react";
import { TimePicker } from "@clawscale/react/datetime";
import { useState } from "react";
import { Playground, usePlayground } from "@/components/docs/playground";

const pad = (n: number, width = 2) => String(n).padStart(width, "0");
const clock = (time: Date) =>
  `${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(time.getSeconds())}.${pad(time.getMilliseconds(), 3)}`;

export default function TimePickerPlayground() {
  const [time, setTime] = useState(new Date(2026, 8, 14, 21, 30, 15, 250));
  const [props, options] = usePlayground({
    precision: { type: "select", label: "Precision", options: ["minute", "second", "millisecond"], default: "minute" },
    useAmPm: { type: "boolean", label: "12-hour clock", default: false },
    showArrowButtons: { type: "boolean", label: "Arrow buttons", default: false },
    selectAllOnFocus: { type: "boolean", label: "Select all on focus", default: false },
    disabled: { type: "boolean", label: "Disabled", default: false },
  });
  return (
    <Playground options={options}>
      {/* The key remounts the picker, so the hour text switches between 12 and 24 hours. */}
      <TimePicker key={String(props.useAmPm)} {...props} value={time} onChange={setTime} />
      <Tag minimal>value: {clock(time)}</Tag>
    </Playground>
  );
}
