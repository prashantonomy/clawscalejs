"use client";

import { Button } from "@clawscale/react";

export default function ButtonsIcons() {
  return (
    <>
      <Button icon="refresh" text="Refresh" />
      <Button endIcon="share" text="Share" />
      <Button icon="export" endIcon="caret-down" text="Export" />
      <Button icon="cog" aria-label="Settings" />
      <Button icon="trash" intent="danger" variant="minimal" aria-label="Delete" />
    </>
  );
}
