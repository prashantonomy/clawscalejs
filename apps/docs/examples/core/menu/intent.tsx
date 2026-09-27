"use client";

import { Classes, Menu, MenuItem } from "@clawscale/react";

export default function MenuIntent() {
  return (
    <Menu className={Classes.ELEVATION_1}>
      <MenuItem icon="play" intent="primary" text="Run pipeline" />
      <MenuItem icon="tick-circle" intent="success" text="Mark as validated" />
      <MenuItem icon="pause" intent="warning" text="Pause ingestion" />
      <MenuItem icon="trash" intent="danger" text="Delete dataset" />
    </Menu>
  );
}
