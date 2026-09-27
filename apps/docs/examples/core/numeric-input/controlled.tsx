"use client";

import { Button, ControlGroup, FormGroup, NumericInput } from "@clawscale/react";
import { useState } from "react";

export default function NumericInputControlled() {
  const [threshold, setThreshold] = useState("0.95");
  return (
    <FormGroup label="Alert threshold">
      <ControlGroup>
        <NumericInput
          aria-label="Alert threshold"
          majorStepSize={0.1}
          max={1}
          min={0}
          minorStepSize={0.001}
          stepSize={0.01}
          value={threshold}
          onValueChange={(_valueAsNumber, valueAsString) => setThreshold(valueAsString)}
        />
        <Button text="Reset" onClick={() => setThreshold("0.95")} />
      </ControlGroup>
    </FormGroup>
  );
}
