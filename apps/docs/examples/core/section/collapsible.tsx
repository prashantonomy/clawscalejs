"use client";

import { Pre, PropertyList, PropertyListItem, Section, SectionCard } from "@clawscale/react";

export default function SectionCollapsible() {
  return (
    <>
      <Section collapsible icon="th" title="Schema" subtitle="4 columns">
        <SectionCard>
          <PropertyList>
            <PropertyListItem label="order_id">string</PropertyListItem>
            <PropertyListItem label="amount">decimal(12, 2)</PropertyListItem>
            <PropertyListItem label="region">string</PropertyListItem>
            <PropertyListItem label="created_at">timestamp</PropertyListItem>
          </PropertyList>
        </SectionCard>
      </Section>
      <Section collapsible collapseProps={{ defaultIsOpen: false }} icon="console" title="Run log">
        <SectionCard>
          <Pre>
            {"06:15:02 Started run 1284\n06:15:40 Read 1.2M rows from raw.orders\n06:17:11 Wrote curated.orders_daily"}
          </Pre>
        </SectionCard>
      </Section>
    </>
  );
}
