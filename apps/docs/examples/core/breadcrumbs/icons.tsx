"use client";

import { Breadcrumbs } from "@clawscale/react";

export default function BreadcrumbsIcons() {
  return (
    <Breadcrumbs
      items={[
        { href: "#home", icon: "home", iconTitle: "Home" },
        { href: "#warehouse", icon: "database", text: "Warehouse" },
        { href: "#sales", icon: "folder-close", text: "sales" },
        { icon: "th", text: "orders_daily" },
      ]}
    />
  );
}
