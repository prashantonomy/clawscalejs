"use client";

import { FileInput } from "@clawscale/react";
import { useState } from "react";

export default function FileInputSelectedFile() {
  const [fileName, setFileName] = useState<string>();
  return (
    <FileInput
      hasSelection={fileName !== undefined}
      inputProps={{ accept: ".csv" }}
      text={fileName ?? "Choose a CSV export"}
      onInputChange={(event) => setFileName(event.currentTarget.files?.[0]?.name)}
    />
  );
}
