"use client";

import { Classes, Menu, MenuItem } from "@clawscale/react";

export default function MenuBasic() {
  return (
    <Menu className={Classes.ELEVATION_1}>
      <MenuItem text="Open pipeline" />
      <MenuItem text="Run now" />
      <MenuItem text="Edit schedule" />
      <MenuItem disabled text="Archive" />
    </Menu>
  );
}
