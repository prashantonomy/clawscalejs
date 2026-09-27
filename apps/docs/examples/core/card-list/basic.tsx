"use client";

import { Card, CardList, Icon } from "@clawscale/react";

const DATASETS = ["orders_daily", "customers", "ledger_entries", "web_sessions"];

export default function CardListBasic() {
  return (
    <CardList style={{ maxWidth: 400 }}>
      {DATASETS.map((name) => (
        <Card role="listitem" key={name} interactive style={{ justifyContent: "space-between" }}>
          {name}
          <Icon icon="chevron-right" />
        </Card>
      ))}
    </CardList>
  );
}
