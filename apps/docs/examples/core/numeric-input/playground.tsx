"use client";

import { FormGroup, NumericInput } from "@clawscale/react";
import { INTENTS, intentProp, Playground, SIZES, usePlayground } from "@/components/docs/playground";

export default function NumericInputPlayground() {
  const [props, options] = usePlayground({
    disabled: { type: "boolean", label: "Disabled", default: false },
    readOnly: { type: "boolean", label: "Read only", default: false },
    fill: { type: "boolean", label: "Fill", default: false },
    leftIcon: { type: "boolean", label: "Left icon", default: false },
    selectAllOnFocus: { type: "boolean", label: "Select all on focus", default: false },
    clampValueOnBlur: { type: "boolean", label: "Clamp value on blur", default: false },
    buttonPosition: {
      type: "segmented",
      label: "Button position",
      options: ["left", "right", "none"],
      default: "right",
    },
    intent: { type: "select", label: "Intent", options: INTENTS, default: "none" },
    size: { type: "segmented", label: "Size", options: SIZES, default: "medium" },
    range: { type: "heading", label: "Range" },
    min: { type: "number", label: "Min", min: 0, max: 30, default: 1 },
    max: { type: "number", label: "Max", min: 30, max: 730, default: 365 },
  });
  const { intent, leftIcon, ...shared } = props;
  return (
    <Playground options={options}>
      <FormGroup fill={props.fill} label="Retention" labelInfo="(days)">
        <NumericInput
          {...shared}
          aria-label="Retention in days"
          defaultValue={30}
          intent={intentProp(intent)}
          leftIcon={leftIcon ? "time" : undefined}
        />
      </FormGroup>
    </Playground>
  );
}
