"use client";

import { PropertyList, PropertyListItem } from "@clawscale/react";

export default function PropertyListHorizontal() {
  return (
    <PropertyList style={{ width: 360 }}>
      <PropertyListItem label="Pipeline">orders-sync</PropertyListItem>
      <PropertyListItem label="Schedule">Every 15 minutes</PropertyListItem>
      <PropertyListItem label="Region">eu-central-1</PropertyListItem>
      <PropertyListItem label="Owner">data-platform</PropertyListItem>
      <PropertyListItem label="Last run">Succeeded at 14:05 UTC in 4m 12s</PropertyListItem>
    </PropertyList>
  );
}
