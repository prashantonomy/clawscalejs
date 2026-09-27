"use client";

import { Button, InputGroup } from "@clawscale/react";

export default function InputGroupDisabled() {
  return (
    <InputGroup
      aria-label="Source table"
      defaultValue="analytics.events_raw"
      disabled
      leftIcon="th"
      rightElement={<Button aria-label="Edit source table" disabled icon="edit" variant="minimal" />}
    />
  );
}
