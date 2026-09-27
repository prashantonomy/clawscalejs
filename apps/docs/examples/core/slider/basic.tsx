"use client";

import { Slider } from "@clawscale/react";
import { useState } from "react";

export default function SliderBasic() {
  const [workers, setWorkers] = useState(12);
  return (
    <Slider
      handleHtmlProps={{ "aria-label": "Worker count" }}
      labelStepSize={8}
      max={32}
      min={0}
      value={workers}
      onChange={setWorkers}
    />
  );
}
