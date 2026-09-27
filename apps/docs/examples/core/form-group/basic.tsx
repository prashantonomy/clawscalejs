"use client";

import { FormGroup, InputGroup } from "@clawscale/react";

export default function FormGroupBasic() {
  return (
    <FormGroup label="Pipeline name" labelFor="form-group-pipeline">
      <InputGroup id="form-group-pipeline" placeholder="orders-daily-ingest" />
    </FormGroup>
  );
}
