"use client";

import { TimezoneSelect } from "@clawscale/react/datetime";
import { useState } from "react";

export default function TimezoneSelectLocalTimezone() {
  const [timezone, setTimezone] = useState<string>();
  return (
    <TimezoneSelect
      showLocalTimezone
      placeholder="Select the on-call timezone"
      value={timezone}
      onChange={setTimezone}
    />
  );
}
