"use client";

import { Button, Classes, PopoverNext } from "@clawscale/react";

const freshness = "orders_daily was refreshed 4 min ago.";

export default function PopoverMinimal() {
  return (
    <>
      <PopoverNext content={freshness} placement="bottom" popoverClassName={Classes.POPOVER_CONTENT_SIZING}>
        <Button text="Default" />
      </PopoverNext>
      <PopoverNext
        animation="minimal"
        arrow={false}
        content={freshness}
        placement="bottom"
        popoverClassName={Classes.POPOVER_CONTENT_SIZING}
      >
        <Button text="Minimal" />
      </PopoverNext>
    </>
  );
}
