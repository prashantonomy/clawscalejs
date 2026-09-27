"use client";

import { MultiSlider, MultiSliderHandle } from "@clawscale/react";
import { useState } from "react";

export default function SliderMulti() {
  const [warning, setWarning] = useState(70);
  const [critical, setCritical] = useState(90);
  return (
    <MultiSlider labelStepSize={20} max={100} min={0}>
      <MultiSliderHandle
        htmlProps={{ "aria-label": "Disk usage warning threshold" }}
        intentAfter="warning"
        intentBefore="success"
        value={warning}
        onChange={setWarning}
      />
      <MultiSliderHandle
        htmlProps={{ "aria-label": "Disk usage critical threshold" }}
        intentAfter="danger"
        value={critical}
        onChange={setCritical}
      />
    </MultiSlider>
  );
}
