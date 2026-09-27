"use client";

import { FormGroup, HTMLSelect } from "@clawscale/react";

const REGIONS = [
  { label: "US East (N. Virginia)", value: "us-east-1" },
  { label: "Europe (Ireland)", value: "eu-west-1" },
  { label: "Asia Pacific (Sydney)", value: "ap-southeast-2" },
];

export default function HTMLSelectBasic() {
  return (
    <FormGroup label="Region" labelFor="html-select-region">
      <HTMLSelect defaultValue="eu-west-1" id="html-select-region" options={REGIONS} />
    </FormGroup>
  );
}
