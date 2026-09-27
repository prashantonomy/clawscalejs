"use client";

import { Button, Classes, InputGroup, PopoverNext } from "@clawscale/react";
import { useState } from "react";

export default function PopoverControlled() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <PopoverNext
      isOpen={isOpen}
      onInteraction={(nextOpen) => setIsOpen(nextOpen)}
      placement="bottom"
      popoverClassName={Classes.POPOVER_CONTENT_SIZING}
      content={
        <form
          style={{ display: "grid", gap: 12, width: 240 }}
          onSubmit={(event) => {
            event.preventDefault();
            setIsOpen(false);
          }}
        >
          <InputGroup aria-label="Dataset name" defaultValue="orders_daily" />
          <Button intent="primary" text="Rename dataset" type="submit" />
        </form>
      }
    >
      <Button icon="edit" text="Rename" />
    </PopoverNext>
  );
}
