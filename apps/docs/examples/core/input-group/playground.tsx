"use client";

import { Button, InputGroup } from "@clawscale/react";
import { INTENTS, intentProp, Playground, SIZES, usePlayground } from "@/components/docs/playground";

export default function InputGroupPlayground() {
  const [props, options] = usePlayground({
    disabled: { type: "boolean", label: "Disabled", default: false },
    readOnly: { type: "boolean", label: "Read only", default: false },
    fill: { type: "boolean", label: "Fill", default: false },
    round: { type: "boolean", label: "Round", default: false },
    leftIcon: { type: "boolean", label: "Left icon", default: true },
    rightElement: { type: "boolean", label: "Right element", default: true },
    intent: { type: "select", label: "Intent", options: INTENTS, default: "none" },
    size: { type: "segmented", label: "Size", options: SIZES, default: "medium" },
  });
  const { intent, leftIcon, rightElement, ...shared } = props;
  const button = <Button aria-label="Apply filter" disabled={props.disabled} icon="arrow-right" variant="minimal" />;
  return (
    <Playground options={options}>
      <InputGroup
        {...shared}
        aria-label="Filter pipelines"
        intent={intentProp(intent)}
        leftIcon={leftIcon ? "filter" : undefined}
        placeholder="Filter pipelines"
        rightElement={rightElement ? button : undefined}
      />
    </Playground>
  );
}
