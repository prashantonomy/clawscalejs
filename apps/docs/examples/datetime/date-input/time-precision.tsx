"use client";

import { Code } from "@clawscale/react";
import { DateInput } from "@clawscale/react/datetime";
import { useState } from "react";

export default function DateInputTimePrecision() {
  const [value, setValue] = useState<string | null>("2026-08-17T02:30+00:00");
  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
      <DateInput
        timePrecision="minute"
        showTimezoneSelect
        defaultTimezone="Etc/UTC"
        value={value}
        onChange={setValue}
      />
      <Code>value: {JSON.stringify(value)}</Code>
    </div>
  );
}
