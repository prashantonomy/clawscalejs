"use client";

import { Classes, Icon, Menu, MenuItem } from "@clawscale/react";

export default function MenuIcons() {
  return (
    <Menu className={Classes.ELEVATION_1}>
      <MenuItem icon="play" text="Run pipeline" label="⌘R" />
      <MenuItem icon="duplicate" text="Duplicate" label="⌘D" />
      <MenuItem icon="history" text="Run history" label="1,284" />
      <MenuItem icon="code-block" text="Open in notebook" labelElement={<Icon icon="share" />} />
    </Menu>
  );
}
