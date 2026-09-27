"use client";

import { Button, PropertyList, PropertyListItem, Section, SectionCard } from "@clawscale/react";

export default function SectionRightElement() {
  return (
    <Section
      icon="notifications"
      title="Alert rules"
      subtitle="3 active"
      rightElement={<Button size="small" variant="minimal" icon="plus" text="Add rule" />}
    >
      <SectionCard>
        <PropertyList>
          <PropertyListItem label="Freshness">Older than 2 h: page on-call</PropertyListItem>
          <PropertyListItem label="Row count">Drops by 20%: post to #data-alerts</PropertyListItem>
          <PropertyListItem label="Schema">Any change: email the owner</PropertyListItem>
        </PropertyList>
      </SectionCard>
    </Section>
  );
}
