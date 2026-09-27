"use client";

import { Slider } from "@clawscale/react";
import { useState } from "react";

export default function SliderLabelRenderer() {
  const [sampleRate, setSampleRate] = useState(0.25);
  const [timeoutMs, setTimeoutMs] = useState(1500);
  return (
    <>
      <Slider
        handleHtmlProps={{ "aria-label": "Sample rate" }}
        labelRenderer={(value) => `${Math.round(value * 100)}%`}
        labelStepSize={0.25}
        max={1}
        min={0}
        stepSize={0.05}
        value={sampleRate}
        onChange={setSampleRate}
      />
      <Slider
        handleHtmlProps={{ "aria-label": "Request timeout" }}
        labelRenderer={(value, opts) => (opts?.isHandleTooltip ? `${value} ms` : `${value / 1000} s`)}
        labelStepSize={1000}
        max={5000}
        min={0}
        stepSize={100}
        value={timeoutMs}
        onChange={setTimeoutMs}
      />
    </>
  );
}
