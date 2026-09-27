"use client";

import { ProgressBar } from "@clawscale/react";
import { INTENTS, intentProp, Playground, usePlayground } from "@/components/docs/playground";

export default function ProgressBarPlayground() {
  const [props, options] = usePlayground({
    intent: { type: "select", label: "Intent", options: INTENTS, default: "primary" },
    indeterminate: { type: "boolean", label: "Indeterminate", default: false },
    value: { type: "number", label: "Value (%)", min: 0, max: 100, step: 10, default: 60 },
    stripes: { type: "boolean", label: "Stripes", default: true },
    animate: { type: "boolean", label: "Animate", default: true },
  });
  return (
    <Playground options={options}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <ProgressBar
          aria-label="Export progress"
          animate={props.animate}
          intent={intentProp(props.intent)}
          stripes={props.stripes}
          value={props.indeterminate ? undefined : props.value / 100}
        />
      </div>
    </Playground>
  );
}
