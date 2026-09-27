"use client";

import { Checkbox } from "@clawscale/react";
import { Playground, usePlayground } from "@/components/docs/playground";

export default function CheckboxPlayground() {
  const [props, options] = usePlayground({
    disabled: { type: "boolean", label: "Disabled", default: false },
    indeterminate: { type: "boolean", label: "Indeterminate", default: false },
    inline: { type: "boolean", label: "Inline", default: false },
    alignIndicator: { type: "segmented", label: "Align indicator", options: ["start", "end"], default: "start" },
    size: { type: "segmented", label: "Size", options: ["medium", "large"], default: "medium" },
  });
  return (
    <Playground options={options}>
      <div>
        <Checkbox {...props} defaultChecked label="Retry failed tasks" />
        <Checkbox {...props} label="Notify owners on failure" />
      </div>
    </Playground>
  );
}
