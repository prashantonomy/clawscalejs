"use client";

import { HTMLSelect } from "@clawscale/react";

export default function HTMLSelectDisabled() {
  return <HTMLSelect aria-label="Warehouse" disabled options={["analytics-xl", "etl-medium", "adhoc-small"]} />;
}
