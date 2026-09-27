"use client";

import { FormGroup, NumericInput } from "@clawscale/react";

export default function NumericInputStepSizes() {
  return (
    <FormGroup helperText="1 to 64. Shift steps by 8." label="Workers">
      <NumericInput
        aria-label="Workers"
        defaultValue={8}
        majorStepSize={8}
        max={64}
        min={1}
        minorStepSize={null}
        stepSize={1}
      />
    </FormGroup>
  );
}
