"use client";

import { FormGroup, InputGroup } from "@clawscale/react";

export default function FormGroupHelperText() {
  return (
    <FormGroup
      helperText="Cron expression in UTC. Leave empty to run on demand."
      label="Schedule"
      labelFor="form-group-schedule"
    >
      <InputGroup id="form-group-schedule" defaultValue="0 3 * * *" />
    </FormGroup>
  );
}
