"use client";

import { EntityTitle } from "@clawscale/react";

export default function EntityTitleSubtitle() {
  return (
    <>
      <EntityTitle icon="th" title="orders_daily" subtitle="Table in sales, 1,204,331 rows" />
      <EntityTitle icon="flow-linear" title="ingest-orders" subtitle="Last run 12 minutes ago" />
    </>
  );
}
