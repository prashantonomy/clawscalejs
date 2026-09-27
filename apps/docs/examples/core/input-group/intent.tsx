"use client";

import { InputGroup } from "@clawscale/react";

export default function InputGroupIntent() {
  return (
    <>
      <InputGroup aria-label="Primary" intent="primary" placeholder="Primary" />
      <InputGroup aria-label="Success" intent="success" placeholder="Success" />
      <InputGroup aria-label="Warning" intent="warning" placeholder="Warning" />
      <InputGroup aria-label="Danger" intent="danger" placeholder="Danger" />
    </>
  );
}
