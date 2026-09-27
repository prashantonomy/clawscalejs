"use client";

import { PropertyList, PropertyListItem } from "@clawscale/react";

export default function PropertyListVertical() {
  return (
    <PropertyList layout="vertical" style={{ width: 220 }}>
      <PropertyListItem label="Dataset">analytics.events_daily</PropertyListItem>
      <PropertyListItem label="Rows">1,284,902,113</PropertyListItem>
      <PropertyListItem label="Size">412 GB</PropertyListItem>
      <PropertyListItem label="Partitioned by">event_date</PropertyListItem>
    </PropertyList>
  );
}
