"use client";

import { PropertyList, PropertyListItem } from "@clawscale/react";

export default function PropertyListStriped() {
  return (
    <PropertyList striped labelWidth={140} style={{ width: 420 }}>
      <PropertyListItem label="Rows read">48,210,554</PropertyListItem>
      <PropertyListItem label="Rows written">48,209,907</PropertyListItem>
      <PropertyListItem label="Rows rejected">647</PropertyListItem>
      <PropertyListItem label="Bytes scanned">96.4 GB</PropertyListItem>
      <PropertyListItem label="Duration">11m 03s</PropertyListItem>
    </PropertyList>
  );
}
