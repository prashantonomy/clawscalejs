"use client";

import { Button, Menu, MenuDivider, MenuItem, PopoverNext } from "@clawscale/react";

export default function MenuDropdown() {
  return (
    <PopoverNext
      placement="bottom-start"
      content={
        <Menu>
          <MenuItem icon="th" text="Table" />
          <MenuItem icon="timeline-line-chart" text="Line chart" />
          <MenuItem icon="heat-grid" text="Heatmap" />
          <MenuDivider />
          <MenuItem icon="code" text="SQL editor" />
        </Menu>
      }
    >
      <Button alignText="start" icon="applications" endIcon="caret-down" text="Open with" />
    </PopoverNext>
  );
}
