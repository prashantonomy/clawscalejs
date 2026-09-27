"use client";

import { Switch } from "@clawscale/react";
import { Playground, usePlayground } from "@/components/docs/playground";

export default function SwitchPlayground() {
  const [props, options] = usePlayground({
    disabled: { type: "boolean", label: "Disabled", default: false },
    inline: { type: "boolean", label: "Inline", default: false },
    innerLabels: { type: "boolean", label: "Inner labels", default: false },
    alignIndicator: { type: "segmented", label: "Align indicator", options: ["start", "end"], default: "start" },
    size: { type: "segmented", label: "Size", options: ["medium", "large"], default: "medium" },
  });
  const { innerLabels, ...shared } = props;
  const labels = innerLabels ? { innerLabel: "off", innerLabelChecked: "on" } : {};
  return (
    <Playground options={options}>
      <div>
        <Switch {...shared} {...labels} defaultChecked label="Auto-scale workers" />
        <Switch {...shared} {...labels} label="Pause ingestion" />
      </div>
    </Playground>
  );
}
