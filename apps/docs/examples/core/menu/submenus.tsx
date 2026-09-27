"use client";

import { Classes, Menu, MenuItem } from "@clawscale/react";

export default function MenuSubmenus() {
  return (
    <Menu className={Classes.ELEVATION_1}>
      <MenuItem icon="play" text="Run pipeline" />
      <MenuItem icon="export" text="Export results">
        <MenuItem text="CSV" />
        <MenuItem text="Parquet" />
        <MenuItem text="JSON Lines" />
      </MenuItem>
      <MenuItem icon="globe" text="Replicate to">
        <MenuItem text="us-east-1" />
        <MenuItem text="eu-west-1" />
        <MenuItem text="ap-southeast-2" />
      </MenuItem>
    </Menu>
  );
}
