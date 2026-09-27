"use client";

import { Icon, Tag } from "@clawscale/react";
import { INTENTS, intentProp, Playground, usePlayground } from "@/components/docs/playground";

export default function IconsPlayground() {
  const [props, options] = usePlayground({
    icon: {
      type: "select",
      label: "Icon",
      options: ["globe-network", "database", "data-lineage", "heat-grid", "satellite", "shield"],
      default: "globe-network",
    },
    size: { type: "select", label: "Size", options: ["12", "16", "18", "20", "24", "32", "48", "64"], default: "32" },
    intent: { type: "select", label: "Intent", options: INTENTS, default: "none" },
  });
  const size = Number(props.size);
  return (
    <Playground options={options}>
      <Icon icon={props.icon} size={size} intent={intentProp(props.intent)} />
      <Tag minimal>{size < 20 ? "16px paths" : "20px paths"}</Tag>
    </Playground>
  );
}
