"use client";

import { Classes, type IconName, Menu, MenuDivider, MenuItem } from "@clawscale/react";
import { INTENTS, intentProp, Playground, SIZES, usePlayground } from "@/components/docs/playground";

export default function MenuPlayground() {
  const [props, options] = usePlayground({
    size: { type: "segmented", label: "Size", options: SIZES, default: "medium" },
    icons: { type: "boolean", label: "Icons", default: true },
    labels: { type: "boolean", label: "Labels", default: true },
    dividers: { type: "boolean", label: "Dividers", default: true },
    firstItem: { type: "heading", label: "First item" },
    intent: { type: "select", label: "Intent", options: INTENTS, default: "none" },
    active: { type: "boolean", label: "Active", default: false },
    disabled: { type: "boolean", label: "Disabled", default: false },
  });
  const icon = (name: IconName) => (props.icons ? name : undefined);
  const label = (text: string) => (props.labels ? text : undefined);
  return (
    <Playground options={options}>
      <Menu className={Classes.ELEVATION_1} size={props.size}>
        {props.dividers && <MenuDivider title="ingest_orders" />}
        <MenuItem
          active={props.active}
          disabled={props.disabled}
          icon={icon("play")}
          intent={intentProp(props.intent)}
          label={label("⌘R")}
          text="Run now"
        />
        <MenuItem icon={icon("time")} label={label("Hourly")} text="Schedule" />
        <MenuItem icon={icon("duplicate")} label={label("⌘D")} text="Duplicate" />
        {props.dividers && <MenuDivider />}
        <MenuItem icon={icon("trash")} intent="danger" text="Delete pipeline" />
      </Menu>
    </Playground>
  );
}
