"use client";

import { EntityTitle } from "@clawscale/react";

export default function EntityTitleBasic() {
  return (
    <>
      <EntityTitle icon="th" title="orders_daily" />
      <EntityTitle icon="flow-linear" title="ingest-orders" />
      <EntityTitle icon="dashboard" title="Revenue by region" />
    </>
  );
}
