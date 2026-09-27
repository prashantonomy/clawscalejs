"use client";

import { TagInput } from "@clawscale/react";
import { useState } from "react";

export default function TagInputTagProps() {
  const [environments, setEnvironments] = useState(["production", "staging", "development"]);
  return (
    <TagInput
      inputProps={{ "aria-label": "Target environments" }}
      placeholder="Add environments"
      tagProps={(value) => (value === "production" ? { intent: "danger" } : { minimal: true })}
      values={environments}
      onChange={(values) => setEnvironments(values.map(String))}
    />
  );
}
