"use client";

import { Card, Classes, ContextMenu, EntityTitle, Menu, MenuDivider, MenuItem } from "@clawscale/react";

export default function ContextMenuBasic() {
  return (
    <ContextMenu
      content={
        <Menu>
          <MenuItem icon="eye-open" text="Preview rows" />
          <MenuItem icon="duplicate" text="Copy table path" />
          <MenuItem icon="edit" text="Rename" />
          <MenuDivider />
          <MenuItem icon="trash" intent="danger" text="Delete dataset" />
        </Menu>
      }
    >
      <Card style={{ width: 300 }}>
        <EntityTitle icon="database" title="orders_daily" subtitle="1,284,112 rows, updated 4 min ago" />
        <p className={Classes.TEXT_MUTED} style={{ margin: "12px 0 0" }}>
          Right-click for actions.
        </p>
      </Card>
    </ContextMenu>
  );
}
