"use client";

import { PropertyList, PropertyListItem, Section, SectionCard } from "@clawscale/react";

export default function SectionCompact() {
  return (
    <Section compact icon="globe" title="Region health">
      <SectionCard>
        <PropertyList compact>
          <PropertyListItem label="us-east-1">99.98% uptime</PropertyListItem>
          <PropertyListItem label="eu-west-1">99.95% uptime</PropertyListItem>
          <PropertyListItem label="ap-southeast-2">99.91% uptime</PropertyListItem>
        </PropertyList>
      </SectionCard>
    </Section>
  );
}
