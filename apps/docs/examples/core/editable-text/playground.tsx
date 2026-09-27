"use client";

import { EditableText, H3 } from "@clawscale/react";
import { INTENTS, intentProp, Playground, usePlayground } from "@/components/docs/playground";

export default function EditableTextPlayground() {
  const [props, options] = usePlayground({
    disabled: { type: "boolean", label: "Disabled", default: false },
    selectAllOnFocus: { type: "boolean", label: "Select all on focus", default: false },
    confirmOnEnterKey: { type: "boolean", label: "Confirm on Enter (multiline)", default: false },
    intent: { type: "select", label: "Intent", options: INTENTS, default: "none" },
    maxLength: { type: "segmented", label: "Max length", options: ["20", "60", "200"], default: "60" },
  });
  const { confirmOnEnterKey, ...shared } = {
    ...props,
    intent: intentProp(props.intent),
    maxLength: Number(props.maxLength),
  };
  return (
    <Playground options={options}>
      <H3>
        <EditableText {...shared} placeholder="Name this dashboard" defaultValue="Revenue by region" />
      </H3>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <EditableText
          {...shared}
          multiline
          minLines={3}
          confirmOnEnterKey={confirmOnEnterKey}
          placeholder="Describe this dashboard"
          defaultValue="Net revenue per region, updated hourly from orders_daily."
        />
      </div>
    </Playground>
  );
}
