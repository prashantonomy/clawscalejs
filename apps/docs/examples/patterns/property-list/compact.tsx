"use client";

import { PropertyList, PropertyListItem } from "@clawscale/react";

export default function PropertyListCompact() {
  return (
    <PropertyList compact labelWidth={96} style={{ width: 300 }}>
      <PropertyListItem label="Region">eu-central-1</PropertyListItem>
      <PropertyListItem label="Workers">12 of 16</PropertyListItem>
      <PropertyListItem label="CPU">64%</PropertyListItem>
      <PropertyListItem label="Memory">41.2 of 64 GB</PropertyListItem>
      <PropertyListItem label="Uptime">18d 4h</PropertyListItem>
      <PropertyListItem label="Version">2.14.0</PropertyListItem>
    </PropertyList>
  );
}
