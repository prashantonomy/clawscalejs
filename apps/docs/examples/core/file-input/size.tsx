"use client";

import { FileInput } from "@clawscale/react";

export default function FileInputSize() {
  return (
    <>
      <FileInput size="small" text="Small" />
      <FileInput size="medium" text="Medium" />
      <FileInput size="large" text="Large" />
    </>
  );
}
