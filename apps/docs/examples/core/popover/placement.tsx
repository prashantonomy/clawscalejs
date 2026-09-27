"use client";

import { Button, Classes, POPOVER_NEXT_PLACEMENTS, PopoverNext } from "@clawscale/react";

export default function PopoverPlacement() {
  return (
    <div
      style={{
        display: "grid",
        gap: 8,
        gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
        width: "100%",
        maxWidth: 480,
      }}
    >
      {POPOVER_NEXT_PLACEMENTS.map((placement) => (
        <PopoverNext
          content={`placement="${placement}"`}
          fill
          key={placement}
          placement={placement}
          popoverClassName={Classes.POPOVER_CONTENT_SIZING}
        >
          <Button text={placement} />
        </PopoverNext>
      ))}
    </div>
  );
}
