"use client";

import { Button, ButtonGroup } from "@clawscale/react";
import { DatabaseIcon, PauseIcon, RefreshIcon } from "@clawscale/react/icons";

export default function LoadingIconsComponents() {
  return (
    <ButtonGroup>
      <Button icon={<RefreshIcon />} text="Refresh" />
      <Button icon={<DatabaseIcon />} text="Snapshot" />
      <Button icon={<PauseIcon />} intent="warning" text="Pause ingest" />
    </ButtonGroup>
  );
}
