"use client";

import { FileInput } from "@clawscale/react";

export default function FileInputButtonText() {
  return <FileInput buttonText="Upload" inputProps={{ accept: ".json" }} text="Choose a schema file" />;
}
