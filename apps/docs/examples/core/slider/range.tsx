"use client";

import { RangeSlider } from "@clawscale/react";
import { useState } from "react";

export default function SliderRange() {
  const [replicas, setReplicas] = useState<[number, number]>([4, 16]);
  return (
    <RangeSlider
      handleHtmlProps={{ start: { "aria-label": "Minimum replicas" }, end: { "aria-label": "Maximum replicas" } }}
      labelStepSize={8}
      max={32}
      min={0}
      value={replicas}
      onChange={setReplicas}
    />
  );
}
