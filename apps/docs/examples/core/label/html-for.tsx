"use client";

import { InputGroup, Label } from "@clawscale/react";

export default function LabelHtmlFor() {
  return (
    <div style={{ width: 280 }}>
      <Label htmlFor="label-owner">Owner</Label>
      <InputGroup id="label-owner" leftIcon="user" placeholder="data-platform@example.com" />
    </div>
  );
}
