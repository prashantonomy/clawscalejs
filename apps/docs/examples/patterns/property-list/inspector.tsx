"use client";

import { Button, PropertyList, PropertyListItem, Section, SectionCard, Tag } from "@clawscale/react";

export default function PropertyListInspector() {
  return (
    <Section
      compact
      icon="data-connection"
      title="orders-sync"
      subtitle="Pipeline"
      rightElement={<Button variant="minimal" size="small" icon="cross" aria-label="Close inspector" />}
      style={{ width: 320 }}
    >
      <SectionCard>
        <PropertyList compact labelWidth={96}>
          <PropertyListItem label="Status">
            <Tag minimal intent="success">
              Healthy
            </Tag>
          </PropertyListItem>
          <PropertyListItem label="Schedule">Every 15 minutes</PropertyListItem>
          <PropertyListItem label="Region">eu-central-1</PropertyListItem>
          <PropertyListItem label="Owner">data-platform</PropertyListItem>
        </PropertyList>
      </SectionCard>
      <SectionCard>
        <PropertyList compact labelWidth={96}>
          <PropertyListItem label="Last run" monospace>
            run_8f2c91d4
          </PropertyListItem>
          <PropertyListItem label="Duration">4m 12s</PropertyListItem>
          <PropertyListItem label="Rows written">48,209,907</PropertyListItem>
        </PropertyList>
      </SectionCard>
    </Section>
  );
}
