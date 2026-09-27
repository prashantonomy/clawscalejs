"use client";

import { EntityTitle, H2, H4, H6 } from "@clawscale/react";

export default function EntityTitleHeadings() {
  return (
    <div style={{ display: "grid", gap: 20 }}>
      <EntityTitle heading={H2} icon="dashboard" title="Revenue by region" subtitle="Updated 5 minutes ago" />
      <EntityTitle heading={H4} icon="dashboard" title="Revenue by region" subtitle="Updated 5 minutes ago" />
      <EntityTitle heading={H6} icon="dashboard" title="Revenue by region" subtitle="Updated 5 minutes ago" />
      <EntityTitle icon="dashboard" title="Revenue by region" subtitle="Updated 5 minutes ago" />
    </div>
  );
}
