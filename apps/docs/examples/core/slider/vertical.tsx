"use client";

import { Slider } from "@clawscale/react";
import { useState } from "react";

export default function SliderVertical() {
  const [cpuLimit, setCpuLimit] = useState(65);
  return (
    <Slider
      handleHtmlProps={{ "aria-label": "CPU limit" }}
      labelStepSize={25}
      max={100}
      min={0}
      value={cpuLimit}
      vertical
      onChange={setCpuLimit}
    />
  );
}
