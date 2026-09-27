"use client";

import { PropertyList, PropertyListItem } from "@clawscale/react";

export default function PropertyListMonospace() {
  return (
    <PropertyList style={{ width: 400 }}>
      <PropertyListItem label="Run ID" monospace>
        run_8f2c91d4
      </PropertyListItem>
      <PropertyListItem label="Commit" monospace>
        3f9a2c1e
      </PropertyListItem>
      <PropertyListItem label="Image" monospace>
        ghcr.io/acme/ingest:2.14.0
      </PropertyListItem>
      <PropertyListItem label="Trace ID" monospace>
        4bf92f3577b34da6a3ce929d0e0e4736
      </PropertyListItem>
      <PropertyListItem label="Triggered by">Schedule</PropertyListItem>
    </PropertyList>
  );
}
