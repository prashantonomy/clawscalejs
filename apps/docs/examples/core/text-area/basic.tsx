"use client";

import { FormGroup, TextArea } from "@clawscale/react";

export default function TextAreaBasic() {
  return (
    <FormGroup label="Description" labelFor="text-area-description">
      <TextArea id="text-area-description" placeholder="What this pipeline loads and who depends on it" rows={3} />
    </FormGroup>
  );
}
