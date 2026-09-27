"use client";

import { Card, Tag } from "@clawscale/react";

export default function CardCompact() {
  return (
    <>
      <Card style={{ display: "flex", justifyContent: "space-between", width: 260 }}>
        ingest-orders
        <Tag minimal intent="success">
          Healthy
        </Tag>
      </Card>
      <Card compact style={{ display: "flex", justifyContent: "space-between", width: 260 }}>
        ingest-orders
        <Tag minimal intent="success">
          Healthy
        </Tag>
      </Card>
    </>
  );
}
