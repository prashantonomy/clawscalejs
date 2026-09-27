"use client";

import { AnchorButton, Button, Tooltip } from "@clawscale/react";

export default function TooltipDisabled() {
  return (
    <>
      <Tooltip content="Deploys are frozen until 18:00 UTC">
        <AnchorButton disabled icon="cloud-upload" text="Deploy" />
      </Tooltip>
      <Tooltip content="Only owners can delete pipelines">
        <span style={{ display: "inline-block", cursor: "not-allowed" }}>
          <Button disabled icon="trash" style={{ pointerEvents: "none" }} text="Delete" />
        </span>
      </Tooltip>
    </>
  );
}
