"use client";

import { Button, ButtonGroup, Code } from "@clawscale/react";
import { DateInput } from "@clawscale/react/datetime";
import { useState } from "react";

export default function DateInputControlled() {
  const [value, setValue] = useState<string | null>("2026-08-17");
  return (
    <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
      <DateInput value={value} onChange={setValue} />
      <ButtonGroup>
        <Button text="Release cut" onClick={() => setValue("2026-08-17")} />
        <Button text="General availability" onClick={() => setValue("2026-08-24")} />
        <Button text="Clear" onClick={() => setValue(null)} />
      </ButtonGroup>
      <Code>value: {JSON.stringify(value)}</Code>
    </div>
  );
}
