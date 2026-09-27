"use client";

import { TagInput } from "@clawscale/react";
import { useState } from "react";
import { INTENTS, intentProp, Playground, usePlayground } from "@/components/docs/playground";

export default function TagInputPlayground() {
  const [regions, setRegions] = useState(["eu-west-1", "us-east-1", "ap-southeast-2"]);
  const [props, options] = usePlayground({
    disabled: { type: "boolean", label: "Disabled", default: false },
    fill: { type: "boolean", label: "Fill", default: false },
    addOnBlur: { type: "boolean", label: "Add on blur", default: false },
    addOnPaste: { type: "boolean", label: "Add on paste", default: true },
    leftIcon: { type: "boolean", label: "Left icon", default: true },
    minimalTags: { type: "boolean", label: "Minimal tags", default: false },
    intent: { type: "select", label: "Intent", options: INTENTS, default: "none" },
    size: { type: "segmented", label: "Size", options: ["medium", "large"], default: "medium" },
  });
  const { intent, leftIcon, minimalTags, ...shared } = props;
  return (
    <Playground options={options}>
      <TagInput
        {...shared}
        inputProps={{ "aria-label": "Regions" }}
        intent={intentProp(intent)}
        leftIcon={leftIcon ? "globe" : undefined}
        placeholder="Add regions"
        tagProps={{ minimal: minimalTags }}
        values={regions}
        onChange={(values) => setRegions(values.map(String))}
      />
    </Playground>
  );
}
