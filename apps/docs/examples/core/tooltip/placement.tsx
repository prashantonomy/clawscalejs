"use client";

import { Button, Tooltip } from "@clawscale/react";

const placements = ["top", "right", "bottom", "left"] as const;

export default function TooltipPlacement() {
  return (
    <>
      {placements.map((placement) => (
        <Tooltip content={`placement="${placement}"`} key={placement} placement={placement}>
          <Button text={placement} />
        </Tooltip>
      ))}
    </>
  );
}
