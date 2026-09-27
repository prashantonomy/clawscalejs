"use client";

import { Button, Menu, MenuDivider, MenuItem, PopoverNext } from "@clawscale/react";

export default function PopoverDropdown() {
  return (
    <PopoverNext
      animation="minimal"
      arrow={false}
      placement="bottom-start"
      content={
        <Menu>
          <MenuItem icon="export" text="Export CSV" />
          <MenuItem icon="export" text="Export Parquet" />
          <MenuItem icon="clipboard" text="Copy as SQL" />
          <MenuDivider />
          <MenuItem icon="share" text="Share view" />
        </Menu>
      }
    >
      <Button endIcon="caret-down" icon="export" text="Export" />
    </PopoverNext>
  );
}
