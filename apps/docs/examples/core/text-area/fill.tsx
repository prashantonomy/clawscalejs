"use client";

import { FormGroup, TextArea } from "@clawscale/react";

export default function TextAreaFill() {
  return (
    <FormGroup label="Incident summary" labelFor="text-area-summary">
      <TextArea
        fill
        id="text-area-summary"
        placeholder="What failed, since when, and which datasets are stale"
        rows={4}
      />
    </FormGroup>
  );
}
