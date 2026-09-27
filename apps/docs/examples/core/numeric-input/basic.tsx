"use client";

import { FormGroup, NumericInput } from "@clawscale/react";

export default function NumericInputBasic() {
  return (
    <FormGroup label="Retention" labelInfo="(days)">
      <NumericInput aria-label="Retention in days" defaultValue={30} />
    </FormGroup>
  );
}
