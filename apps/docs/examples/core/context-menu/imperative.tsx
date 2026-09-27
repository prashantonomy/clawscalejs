"use client";

import { Card, Menu, MenuItem, showContextMenu, Tag } from "@clawscale/react";
import type { MouseEvent } from "react";

const tables = ["events_raw", "sessions", "orders_daily", "revenue_by_region"];

export default function ContextMenuImperative() {
  const openMenu = (event: MouseEvent<HTMLElement>, table: string) => {
    event.preventDefault();
    showContextMenu({
      content: (
        <Menu>
          <MenuItem icon="eye-open" text={`Preview ${table}`} />
          <MenuItem icon="data-lineage" text="Show upstream tables" />
          <MenuItem icon="duplicate" text="Copy table name" />
        </Menu>
      ),
      targetOffset: { left: event.clientX, top: event.clientY },
    });
  };

  return (
    <Card style={{ display: "flex", flexWrap: "wrap", gap: 8, maxWidth: 420 }}>
      {tables.map((table) => (
        <Tag key={table} icon="th" interactive minimal onContextMenu={(event) => openMenu(event, table)}>
          {table}
        </Tag>
      ))}
    </Card>
  );
}
