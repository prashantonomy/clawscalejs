"use client";

import { Tag } from "@clawscale/react";
import { DatePicker } from "@clawscale/react/datetime";
import { useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");
const format = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;

export default function DatePickerTimePrecision() {
  const [date, setDate] = useState<Date | null>(new Date(2026, 7, 17, 2, 30));
  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "center" }}>
      <DatePicker timePrecision="minute" value={date} onChange={setDate} />
      <Tag minimal>{date ? `Deploy window opens ${format(date)}` : "No deploy window"}</Tag>
    </div>
  );
}
