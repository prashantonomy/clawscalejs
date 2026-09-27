"use client";

import { Button, Tooltip } from "@clawscale/react";

export default function TooltipCompact() {
  return (
    <>
      <Tooltip content="1,284,112 rows written in the last hour">
        <Button text="Default" />
      </Tooltip>
      <Tooltip compact content="1,284,112 rows written in the last hour">
        <Button text="Compact" />
      </Tooltip>
    </>
  );
}
