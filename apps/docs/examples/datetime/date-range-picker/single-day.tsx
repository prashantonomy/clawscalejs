"use client";

import { DateRangePicker } from "@clawscale/react/datetime";

// A change freeze can cover a single release day.
export default function DateRangePickerSingleDay() {
  return (
    <DateRangePicker
      allowSingleDayRange
      singleMonthOnly
      defaultValue={[new Date(2026, 7, 17), new Date(2026, 7, 17)]}
    />
  );
}
