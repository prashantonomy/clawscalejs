"use client";

import { CheckboxCard } from "@clawscale/react";

export default function ControlCardCheckbox() {
  return (
    <>
      <CheckboxCard defaultChecked label="us-east-1" />
      <CheckboxCard defaultChecked label="eu-west-1" />
      <CheckboxCard label="ap-southeast-2" />
    </>
  );
}
