"use client";

import { Classes, Radio, RadioGroup } from "@clawscale/react";
import { useState } from "react";

export default function RadioChildren() {
  const [mode, setMode] = useState("append");
  return (
    <RadioGroup name="radio-write-mode" onChange={(event) => setMode(event.currentTarget.value)} selectedValue={mode}>
      <Radio value="append">
        Append <span className={Classes.TEXT_MUTED}>adds new rows</span>
      </Radio>
      <Radio value="merge">
        Merge <span className={Classes.TEXT_MUTED}>upserts on the primary key</span>
      </Radio>
      <Radio value="overwrite">
        Overwrite <span className={Classes.TEXT_MUTED}>replaces the partition</span>
      </Radio>
    </RadioGroup>
  );
}
