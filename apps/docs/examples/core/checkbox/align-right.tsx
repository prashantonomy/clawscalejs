"use client";

import { Checkbox } from "@clawscale/react";

export default function CheckboxAlignRight() {
  return (
    <div style={{ width: 260 }}>
      <Checkbox alignIndicator="end" defaultChecked label="Daily email digest" />
      <Checkbox alignIndicator="end" defaultChecked label="Failure alerts" />
      <Checkbox alignIndicator="end" label="Page the on-call engineer" />
    </div>
  );
}
