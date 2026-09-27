"use client";

import { RadioGroup } from "@clawscale/react";
import { useState } from "react";

const REGIONS = [
  { label: "eu-west-1", value: "eu-west-1" },
  { label: "us-east-1", value: "us-east-1" },
  { disabled: true, label: "ap-southeast-2 (at capacity)", value: "ap-southeast-2" },
];

export default function RadioDisabled() {
  const [region, setRegion] = useState("eu-west-1");
  return (
    <RadioGroup
      name="radio-region"
      onChange={(event) => setRegion(event.currentTarget.value)}
      options={REGIONS}
      selectedValue={region}
    />
  );
}
