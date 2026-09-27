"use client";

import { ClawscaleClasses, FormGroup, TextArea } from "@clawscale/react";

const SCHEMA = `{
  "order_id": "string",
  "amount": decimal,
  "region": "string"
}`;

export default function TextAreaIntent() {
  return (
    <FormGroup
      helperText="Invalid JSON: unexpected token on line 3."
      intent="danger"
      label="Schema"
      labelFor="text-area-schema"
    >
      <TextArea
        className={ClawscaleClasses.MONOSPACE}
        defaultValue={SCHEMA}
        id="text-area-schema"
        intent="danger"
        rows={5}
      />
    </FormGroup>
  );
}
