"use client";

import { Code } from "@clawscale/react";
import { TimezoneSelect } from "@clawscale/react/datetime";
import { useState } from "react";

export default function TimezoneSelectBasic() {
  const [timezone, setTimezone] = useState("Etc/UTC");
  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "center" }}>
      <TimezoneSelect value={timezone} onChange={setTimezone} />
      <Code>deploy.schedule.timezone = {JSON.stringify(timezone)}</Code>
    </div>
  );
}
