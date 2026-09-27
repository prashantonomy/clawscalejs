"use client";

import { Button, Classes, RadioGroup } from "@clawscale/react";
import { useState } from "react";

const RETENTION = [
  { label: "30 days", value: "30" },
  { label: "90 days", value: "90" },
  { label: "365 days", value: "365" },
];

export default function RadioControlled() {
  const [days, setDays] = useState("90");
  return (
    <div>
      <RadioGroup
        name="radio-retention"
        onChange={(event) => setDays(event.currentTarget.value)}
        options={RETENTION}
        selectedValue={days}
      />
      <p className={Classes.TEXT_MUTED}>Partitions older than {days} days are deleted at 02:00 UTC.</p>
      <Button size="small" text="Reset to 90 days" onClick={() => setDays("90")} />
    </div>
  );
}
