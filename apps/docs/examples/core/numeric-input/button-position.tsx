"use client";

import { FormGroup, NumericInput } from "@clawscale/react";

export default function NumericInputButtonPosition() {
  return (
    <>
      <FormGroup label="Batch size">
        <NumericInput aria-label="Batch size" buttonPosition="left" defaultValue={500} />
      </FormGroup>
      <FormGroup label="Priority">
        <NumericInput aria-label="Priority" buttonPosition="none" defaultValue={3} />
      </FormGroup>
    </>
  );
}
