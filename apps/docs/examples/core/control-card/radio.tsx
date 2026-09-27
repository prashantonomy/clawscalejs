"use client";

import { RadioCard, RadioGroup } from "@clawscale/react";
import { useState } from "react";

export default function ControlCardRadio() {
  const [size, setSize] = useState("medium");
  return (
    <RadioGroup
      name="warehouse-size"
      aria-label="Warehouse size"
      selectedValue={size}
      onChange={(event) => setSize(event.currentTarget.value)}
      style={{ display: "grid", gap: 8, width: 280 }}
    >
      <RadioCard label="Small: 2 vCPU, 8 GB" value="small" />
      <RadioCard label="Medium: 8 vCPU, 32 GB" value="medium" />
      <RadioCard label="Large: 32 vCPU, 128 GB" value="large" />
    </RadioGroup>
  );
}
