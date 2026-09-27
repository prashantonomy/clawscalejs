"use client";

import { Callout } from "@clawscale/react";
import { INTENTS, intentProp, Playground, usePlayground } from "@/components/docs/playground";

const ICONS = { default: undefined, custom: "database", none: null } as const;

export default function CalloutPlayground() {
  const [props, options] = usePlayground({
    compact: { type: "boolean", label: "Compact", default: false },
    minimal: { type: "boolean", label: "Minimal", default: false },
    showTitle: { type: "boolean", label: "Show title", default: true },
    intent: { type: "select", label: "Intent", options: INTENTS, default: "warning" },
    icon: { type: "segmented", label: "Icon", options: ["default", "custom", "none"], default: "default" },
  });
  return (
    <Playground options={options}>
      <Callout
        compact={props.compact}
        minimal={props.minimal}
        intent={intentProp(props.intent)}
        icon={ICONS[props.icon]}
        title={props.showTitle ? "Replication lag" : undefined}
      >
        eu-west-1 is 42 seconds behind the primary. Reads from this region may be stale.
      </Callout>
    </Playground>
  );
}
