"use client";

import { Card, CardList } from "@clawscale/react";

const REGIONS = [
  { name: "us-east-1", nodes: 24 },
  { name: "eu-west-1", nodes: 16 },
  { name: "ap-southeast-2", nodes: 8 },
];

export default function CardListBordered() {
  return (
    <CardList bordered={false} style={{ maxWidth: 400 }}>
      {REGIONS.map((region) => (
        <Card role="listitem" key={region.name} style={{ justifyContent: "space-between" }}>
          {region.name}
          <span className="cs-numeric">{region.nodes} nodes</span>
        </Card>
      ))}
    </CardList>
  );
}
