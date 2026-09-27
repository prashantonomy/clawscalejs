"use client";

import { AnchorButton, Button } from "@clawscale/react";
import { INTENTS, intentProp, Playground, SIZES, usePlayground } from "@/components/docs/playground";

export default function ButtonsPlayground() {
  const [props, options] = usePlayground({
    active: { type: "boolean", label: "Active", default: false },
    disabled: { type: "boolean", label: "Disabled", default: false },
    loading: { type: "boolean", label: "Loading", default: false },
    fill: { type: "boolean", label: "Fill", default: false },
    variant: { type: "select", label: "Variant", options: ["solid", "outlined", "minimal"], default: "solid" },
    intent: { type: "select", label: "Intent", options: INTENTS, default: "none" },
    alignText: { type: "segmented", label: "Align text", options: ["start", "center", "end"], default: "center" },
    size: { type: "segmented", label: "Size", options: SIZES, default: "medium" },
  });
  const shared = { ...props, intent: intentProp(props.intent) };
  return (
    <Playground options={options}>
      <Button {...shared} icon="refresh" text="Refresh data" />
      <AnchorButton {...shared} href="#playground" icon="duplicate" endIcon="share" text="Duplicate view" />
    </Playground>
  );
}
