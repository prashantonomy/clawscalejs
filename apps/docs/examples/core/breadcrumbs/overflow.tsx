"use client";

import { type BreadcrumbProps, Breadcrumbs } from "@clawscale/react";

const ITEMS: BreadcrumbProps[] = [
  { href: "#workspace", icon: "folder-close", text: "Workspace" },
  { href: "#analytics", icon: "folder-close", text: "Analytics" },
  { href: "#pipelines", icon: "folder-close", text: "Pipelines" },
  { href: "#nightly", icon: "folder-close", text: "Nightly" },
  { href: "#ingest-orders", icon: "flow-linear", text: "ingest-orders" },
  { icon: "history", text: "Run 4812" },
];

export default function BreadcrumbsOverflow() {
  return (
    <div style={{ display: "grid", gap: 12, width: "100%", maxWidth: 360 }}>
      <Breadcrumbs items={ITEMS} minVisibleItems={2} />
      <Breadcrumbs items={ITEMS} collapseFrom="end" />
    </div>
  );
}
