"use client";

import { Breadcrumb, type BreadcrumbProps, Breadcrumbs, Tag } from "@clawscale/react";

const ITEMS: BreadcrumbProps[] = [
  { href: "#pipelines", icon: "flow-linear", text: "Pipelines" },
  { href: "#ingest-orders", text: "ingest-orders" },
  { text: "Run 4812" },
];

function renderCurrent({ text, ...props }: BreadcrumbProps) {
  return (
    <Breadcrumb {...props} current>
      {text}
      <Tag minimal intent="success" style={{ marginLeft: 8 }}>
        Succeeded
      </Tag>
    </Breadcrumb>
  );
}

export default function BreadcrumbsRenderer() {
  return <Breadcrumbs items={ITEMS} currentBreadcrumbRenderer={renderCurrent} />;
}
