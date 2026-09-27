"use client";

import { TagInput } from "@clawscale/react";
import { useState } from "react";

export default function TagInputSeparator() {
  const [tables, setTables] = useState<string[]>([]);
  return (
    <TagInput
      inputProps={{ "aria-label": "Tables" }}
      placeholder="Paste table names separated by commas, semicolons or spaces"
      separator={/[,;\s]+/}
      values={tables}
      onChange={(values) => setTables(values.map(String))}
    />
  );
}
