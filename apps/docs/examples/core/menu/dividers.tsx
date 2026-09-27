"use client";

import { Classes, Menu, MenuDivider, MenuItem } from "@clawscale/react";

export default function MenuDividers() {
  return (
    <Menu className={Classes.ELEVATION_1}>
      <MenuDivider title="Pipelines" />
      <MenuItem icon="flows" text="ingest_orders" label="Hourly" />
      <MenuItem icon="flows" text="refresh_revenue" label="Daily" />
      <MenuDivider title="Datasets" />
      <MenuItem icon="th" text="orders_daily" label="3.4M rows" />
      <MenuItem icon="th" text="revenue_by_region" label="12K rows" />
      <MenuDivider />
      <MenuItem icon="cog" text="Workspace settings" />
    </Menu>
  );
}
