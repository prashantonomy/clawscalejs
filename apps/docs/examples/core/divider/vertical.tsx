"use client";

import { Button, ButtonGroup, Divider } from "@clawscale/react";

export default function DividerVertical() {
  return (
    <ButtonGroup variant="minimal">
      <Button icon="undo" aria-label="Undo" />
      <Button icon="redo" aria-label="Redo" />
      <Divider />
      <Button icon="filter" text="Filter" />
      <Button icon="sort" text="Sort" />
      <Divider />
      <Button icon="download" text="Export" />
    </ButtonGroup>
  );
}
