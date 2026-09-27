"use client";

import { InputGroup } from "@clawscale/react";

export default function InputGroupSize() {
  return (
    <>
      <InputGroup aria-label="Small" leftIcon="search" placeholder="Small" size="small" />
      <InputGroup aria-label="Medium" leftIcon="search" placeholder="Medium" size="medium" />
      <InputGroup aria-label="Large" leftIcon="search" placeholder="Large" size="large" />
    </>
  );
}
