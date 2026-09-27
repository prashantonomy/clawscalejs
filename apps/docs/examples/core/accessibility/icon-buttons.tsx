"use client";

import { Button, Tooltip } from "@clawscale/react";

export default function AccessibilityIconButtons() {
  return (
    <>
      <Tooltip content="Refresh">
        <Button icon="refresh" variant="minimal" aria-label="Refresh" />
      </Tooltip>
      <Tooltip content="Filter rows">
        <Button icon="filter" variant="minimal" aria-label="Filter rows" />
      </Tooltip>
      <Tooltip content="Download CSV">
        <Button icon="download" variant="minimal" aria-label="Download CSV" />
      </Tooltip>
      <Tooltip content="Delete pipeline">
        <Button icon="trash" intent="danger" variant="minimal" aria-label="Delete pipeline" />
      </Tooltip>
    </>
  );
}
