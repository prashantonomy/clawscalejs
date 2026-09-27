"use client";

import { TextArea } from "@clawscale/react";

export default function TextAreaSize() {
  return (
    <>
      <TextArea aria-label="Small" placeholder="Small" size="small" />
      <TextArea aria-label="Medium" placeholder="Medium" size="medium" />
      <TextArea aria-label="Large" placeholder="Large" size="large" />
    </>
  );
}
