"use client";

import { Card, CardList, Tag } from "@clawscale/react";

const PIPELINES = [
  { name: "ingest-orders", schedule: "Hourly" },
  { name: "enrich-customers", schedule: "Daily" },
  { name: "export-ledger", schedule: "Daily" },
  { name: "train-forecast", schedule: "Weekly" },
];

export default function CardListCompact() {
  return (
    <CardList compact style={{ maxWidth: 400 }}>
      {PIPELINES.map((pipeline) => (
        <Card role="listitem" key={pipeline.name} style={{ justifyContent: "space-between" }}>
          {pipeline.name}
          <Tag minimal>{pipeline.schedule}</Tag>
        </Card>
      ))}
    </CardList>
  );
}
