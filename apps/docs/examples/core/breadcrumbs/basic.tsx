"use client";

import { Breadcrumbs } from "@clawscale/react";

export default function BreadcrumbsBasic() {
  return (
    <Breadcrumbs
      items={[
        { href: "#workspace", text: "Workspace" },
        { href: "#warehouse", text: "Warehouse" },
        { href: "#sales", text: "sales" },
        { text: "orders_daily" },
      ]}
    />
  );
}
