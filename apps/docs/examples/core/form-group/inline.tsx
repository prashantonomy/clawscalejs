"use client";

import { FormGroup, HTMLSelect } from "@clawscale/react";

export default function FormGroupInline() {
  return (
    <>
      <FormGroup inline label="Region" labelFor="form-group-region">
        <HTMLSelect id="form-group-region" options={["eu-west-1", "us-east-1", "ap-southeast-2"]} />
      </FormGroup>
      <FormGroup inline label="Rows per page" labelFor="form-group-rows">
        <HTMLSelect id="form-group-rows" defaultValue={100} options={[50, 100, 500, 1000]} />
      </FormGroup>
    </>
  );
}
