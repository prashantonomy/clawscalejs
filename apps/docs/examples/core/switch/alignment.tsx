"use client";

import { Switch } from "@clawscale/react";

export default function SwitchAlignment() {
  return (
    <div style={{ width: 260 }}>
      <Switch alignIndicator="end" defaultChecked label="Failure alerts" />
      <Switch alignIndicator="end" label="Weekly usage report" />
      <Switch alignIndicator="end" defaultChecked label="Schema drift checks" />
    </div>
  );
}
