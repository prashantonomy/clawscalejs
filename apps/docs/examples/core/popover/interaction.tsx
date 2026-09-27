"use client";

import { Button, Menu, MenuItem, PopoverNext } from "@clawscale/react";

const kinds = ["click", "click-target", "hover", "hover-target"] as const;

export default function PopoverInteraction() {
  const menu = (
    <Menu>
      <MenuItem icon="play" shouldDismissPopover={false} text="Run now" />
      <MenuItem icon="pause" shouldDismissPopover={false} text="Pause schedule" />
      <MenuItem icon="history" shouldDismissPopover={false} text="Run history" />
    </Menu>
  );
  return (
    <>
      {kinds.map((kind) => (
        <PopoverNext content={menu} interactionKind={kind} key={kind} placement="bottom">
          <Button endIcon="caret-down" text={kind} />
        </PopoverNext>
      ))}
    </>
  );
}
