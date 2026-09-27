"use client";

import { TagInput } from "@clawscale/react";
import { useState } from "react";

export default function TagInputLeftIcon() {
  const [owners, setOwners] = useState(["data-platform", "finance-analytics"]);
  return (
    <TagInput
      inputProps={{ "aria-label": "Owner teams" }}
      leftIcon="people"
      placeholder="Add owner teams"
      values={owners}
      onChange={(values) => setOwners(values.map(String))}
    />
  );
}
