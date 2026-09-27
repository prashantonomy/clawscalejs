"use client";

import { PropertyList, PropertyListItem, Section, SectionCard } from "@clawscale/react";

export default function SectionBasic() {
  return (
    <Section icon="flows" title="ingest_orders" subtitle="Pipeline owned by data-platform">
      <SectionCard>
        <PropertyList>
          <PropertyListItem label="Schedule">Hourly at :15</PropertyListItem>
          <PropertyListItem label="Last run">Succeeded 4 min ago</PropertyListItem>
          <PropertyListItem label="Output">curated.orders_daily</PropertyListItem>
        </PropertyList>
      </SectionCard>
    </Section>
  );
}
