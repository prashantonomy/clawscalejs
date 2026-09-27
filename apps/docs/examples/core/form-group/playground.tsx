"use client";

import { FormGroup, InputGroup } from "@clawscale/react";
import { INTENTS, intentProp, Playground, usePlayground } from "@/components/docs/playground";

export default function FormGroupPlayground() {
  const [props, options] = usePlayground({
    disabled: { type: "boolean", label: "Disabled", default: false },
    inline: { type: "boolean", label: "Inline", default: false },
    fill: { type: "boolean", label: "Fill", default: false },
    intent: { type: "select", label: "Intent", options: INTENTS, default: "none" },
    content: { type: "heading", label: "Content" },
    label: { type: "boolean", label: "Label", default: true },
    labelInfo: { type: "boolean", label: "Label info", default: true },
    subLabel: { type: "boolean", label: "Sub label", default: false },
    helperText: { type: "boolean", label: "Helper text", default: true },
  });
  const intent = intentProp(props.intent);
  return (
    <Playground options={options}>
      <FormGroup
        disabled={props.disabled}
        fill={props.fill}
        helperText={props.helperText && "Rows older than this are deleted nightly."}
        inline={props.inline}
        intent={intent}
        label={props.label && "Retention"}
        labelFor="form-group-playground"
        labelInfo={props.labelInfo && "(days)"}
        subLabel={props.subLabel && "Applies to every table in the dataset."}
      >
        <InputGroup disabled={props.disabled} id="form-group-playground" intent={intent} defaultValue="90" />
      </FormGroup>
    </Playground>
  );
}
