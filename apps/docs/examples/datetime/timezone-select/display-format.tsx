"use client";

import { SegmentedControl } from "@clawscale/react";
import { TimezoneDisplayFormat, TimezoneSelect } from "@clawscale/react/datetime";
import { useState } from "react";

const formats = Object.values(TimezoneDisplayFormat).map((value) => ({ label: value, value }));

export default function TimezoneSelectDisplayFormat() {
  const [timezone, setTimezone] = useState("Asia/Tokyo");
  const [format, setFormat] = useState<TimezoneDisplayFormat>("code");
  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "center" }}>
      <SegmentedControl
        size="small"
        options={formats}
        value={format}
        onValueChange={(value) => setFormat(value as TimezoneDisplayFormat)}
      />
      <TimezoneSelect value={timezone} onChange={setTimezone} valueDisplayFormat={format} />
    </div>
  );
}
