"use client";

import { Button, ButtonGroup, Tooltip } from "@clawscale/react";

export default function ButtonGroupTooltips() {
  return (
    <ButtonGroup>
      <Tooltip content="Zoom in">
        <Button icon="zoom-in" aria-label="Zoom in" />
      </Tooltip>
      <Tooltip content="Zoom out">
        <Button icon="zoom-out" aria-label="Zoom out" />
      </Tooltip>
      <Tooltip content="Fit to data">
        <Button icon="zoom-to-fit" aria-label="Fit to data" />
      </Tooltip>
      <Tooltip content="Export as CSV">
        <Button icon="download" aria-label="Export as CSV" />
      </Tooltip>
    </ButtonGroup>
  );
}
