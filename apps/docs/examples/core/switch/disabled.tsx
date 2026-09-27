"use client";

import { Switch } from "@clawscale/react";

export default function SwitchDisabled() {
  return (
    <div>
      <Switch defaultChecked disabled label="Audit logging (required)" />
      <Switch disabled label="Public dashboards" />
    </div>
  );
}
