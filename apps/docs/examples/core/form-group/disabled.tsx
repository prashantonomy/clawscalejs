"use client";

import { FormGroup, InputGroup } from "@clawscale/react";

export default function FormGroupDisabled() {
  return (
    <FormGroup disabled helperText="Locked while the backfill runs." label="Source table" labelFor="form-group-source">
      <InputGroup disabled id="form-group-source" defaultValue="analytics.events_raw" />
    </FormGroup>
  );
}
