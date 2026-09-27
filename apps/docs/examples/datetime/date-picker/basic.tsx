"use client";

import { Tag } from "@clawscale/react";
import { DatePicker } from "@clawscale/react/datetime";
import { useState } from "react";

const pad = (n: number) => String(n).padStart(2, "0");
const isoDate = (date: Date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export default function DatePickerBasic() {
  const [date, setDate] = useState<Date | null>(new Date(2026, 7, 17));
  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "center" }}>
      <DatePicker value={date} onChange={setDate} />
      <Tag minimal>{date ? `Release cut: ${isoDate(date)}` : "No release date"}</Tag>
    </div>
  );
}
