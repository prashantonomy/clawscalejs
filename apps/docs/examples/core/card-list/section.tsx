"use client";

import { Card, CardList, Section, SectionCard, Tag } from "@clawscale/react";

const REGIONS = [
  { name: "us-east-1", status: "Healthy", intent: "success" },
  { name: "eu-west-1", status: "Degraded", intent: "warning" },
  { name: "ap-southeast-2", status: "Healthy", intent: "success" },
] as const;

export default function CardListSection() {
  return (
    <Section title="Regions" subtitle="3 regions, 1 degraded" style={{ width: "100%", maxWidth: 400 }}>
      <SectionCard padded={false}>
        <CardList bordered={false}>
          {REGIONS.map((region) => (
            <Card role="listitem" key={region.name} style={{ justifyContent: "space-between" }}>
              {region.name}
              <Tag minimal intent={region.intent}>
                {region.status}
              </Tag>
            </Card>
          ))}
        </CardList>
      </SectionCard>
    </Section>
  );
}
