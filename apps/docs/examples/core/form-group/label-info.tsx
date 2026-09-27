"use client";

import { FormGroup, InputGroup } from "@clawscale/react";

export default function FormGroupLabelInfo() {
  return (
    <FormGroup
      label="Owner"
      labelFor="form-group-owner"
      labelInfo="(required)"
      subLabel="Receives failure alerts for this pipeline."
    >
      <InputGroup id="form-group-owner" placeholder="data-platform@example.com" />
    </FormGroup>
  );
}
