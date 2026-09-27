"use client";

import { Button, Tag } from "@clawscale/react";
import { useState } from "react";
import { INTENTS, intentProp, Playground, usePlayground } from "@/components/docs/playground";

const TAGS = ["production", "eu-west-1", "orders_daily", "pii"];

export default function TagPlayground() {
  const [tags, setTags] = useState(TAGS);
  const [props, options] = usePlayground({
    active: { type: "boolean", label: "Active", default: false },
    fill: { type: "boolean", label: "Fill", default: false },
    interactive: { type: "boolean", label: "Interactive", default: false },
    minimal: { type: "boolean", label: "Minimal", default: false },
    removable: { type: "boolean", label: "Removable", default: false },
    round: { type: "boolean", label: "Round", default: false },
    icon: { type: "boolean", label: "Icon", default: false },
    endIcon: { type: "boolean", label: "End icon", default: false },
    intent: { type: "select", label: "Intent", options: INTENTS, default: "none" },
    size: { type: "segmented", label: "Size", options: ["medium", "large"], default: "medium" },
  });
  const { icon, endIcon, intent, removable, ...tagProps } = props;
  const remove = (tag: string) => setTags((current) => current.filter((item) => item !== tag));
  return (
    <Playground options={options}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", width: "100%" }}>
        {tags.map((tag) => (
          <Tag
            key={tag}
            {...tagProps}
            endIcon={endIcon ? "caret-down" : undefined}
            icon={icon ? "tag" : undefined}
            intent={intentProp(intent)}
            onRemove={removable ? () => remove(tag) : undefined}
          >
            {tag}
          </Tag>
        ))}
        {tags.length === 0 && <Button icon="reset" text="Restore tags" onClick={() => setTags(TAGS)} />}
      </div>
    </Playground>
  );
}
