"use client";

import { Button, Classes, POPOVER_NEXT_PLACEMENTS, PopoverNext } from "@clawscale/react";
import { Playground, usePlayground } from "@/components/docs/playground";

export default function PopoverPlayground() {
  const [props, options] = usePlayground({
    placement: { type: "select", label: "Placement", options: ["auto", ...POPOVER_NEXT_PLACEMENTS], default: "auto" },
    interactionKind: {
      type: "select",
      label: "Interaction kind",
      options: ["click", "click-target", "hover", "hover-target"],
      default: "click",
    },
    animation: { type: "segmented", label: "Animation", options: ["scale", "minimal"], default: "scale" },
    arrow: { type: "boolean", label: "Arrow", default: true },
    matchTargetWidth: { type: "boolean", label: "Match target width", default: false },
    usePortal: { type: "boolean", label: "Use portal", default: true },
  });
  const { placement, ...rest } = props;
  return (
    <Playground options={options}>
      <PopoverNext
        {...rest}
        placement={placement === "auto" ? undefined : placement}
        popoverClassName={Classes.POPOVER_CONTENT_SIZING}
        content="orders_daily was refreshed 4 min ago. The next refresh starts at 10:00 UTC."
      >
        <Button intent="primary" text="Show freshness" />
      </PopoverNext>
    </Playground>
  );
}
