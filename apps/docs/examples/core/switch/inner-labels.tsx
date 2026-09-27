"use client";

import { Switch } from "@clawscale/react";

export default function SwitchInnerLabels() {
  return (
    <div>
      <Switch defaultChecked innerLabel="off" innerLabelChecked="on" label="Scheduler" />
      <Switch innerLabel="off" innerLabelChecked="on" label="Debug logging" />
    </div>
  );
}
