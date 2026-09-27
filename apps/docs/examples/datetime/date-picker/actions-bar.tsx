"use client";

import { DatePicker } from "@clawscale/react/datetime";

export default function DatePickerActionsBar() {
  return <DatePicker showActionsBar clearButtonText="Unschedule" defaultValue={new Date(2026, 7, 17)} />;
}
