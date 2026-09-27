"use client";

import { TagInput } from "@clawscale/react";
import { useState } from "react";

export default function TagInputBasic() {
  const [regions, setRegions] = useState(["eu-west-1", "us-east-1"]);
  return (
    <TagInput
      inputProps={{ "aria-label": "Regions" }}
      placeholder="Add regions"
      values={regions}
      onChange={(values) => setRegions(values.map(String))}
    />
  );
}
