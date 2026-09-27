"use client";

import { Button, HTMLSelect } from "@clawscale/react";

export default function HTMLSelectLarge() {
  return (
    <>
      <HTMLSelect aria-label="Environment" large options={["production", "staging", "development"]} />
      <Button intent="primary" size="large" text="Deploy" />
    </>
  );
}
