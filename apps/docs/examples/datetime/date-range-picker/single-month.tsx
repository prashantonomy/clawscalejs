"use client";

import { DateRangePicker } from "@clawscale/react/datetime";

export default function DateRangePickerSingleMonth() {
  return (
    <DateRangePicker singleMonthOnly shortcuts={false} defaultValue={[new Date(2026, 7, 22), new Date(2026, 7, 23)]} />
  );
}
