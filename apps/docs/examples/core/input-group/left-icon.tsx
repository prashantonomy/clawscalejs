"use client";

import { FormGroup, InputGroup } from "@clawscale/react";

export default function InputGroupLeftIcon() {
  return (
    <FormGroup label="Owner" labelFor="input-group-owner">
      <InputGroup id="input-group-owner" leftIcon="user" placeholder="data-platform@example.com" />
    </FormGroup>
  );
}
