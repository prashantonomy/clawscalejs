"use client";

import { FormGroup, InputGroup } from "@clawscale/react";

export default function FormGroupIntent() {
  return (
    <>
      <FormGroup
        helperText="Under 30 days breaks monthly reports."
        intent="warning"
        label="Retention"
        labelFor="form-group-retention"
        labelInfo="(days)"
      >
        <InputGroup id="form-group-retention" intent="warning" defaultValue="14" />
      </FormGroup>
      <FormGroup helperText="Paths start with s3://" intent="danger" label="Output path" labelFor="form-group-output">
        <InputGroup id="form-group-output" intent="danger" defaultValue="warehouse/raw/orders" />
      </FormGroup>
    </>
  );
}
