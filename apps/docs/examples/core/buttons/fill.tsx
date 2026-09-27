"use client";

import { Button } from "@clawscale/react";

export default function ButtonsFill() {
  return (
    <div style={{ display: "grid", gap: 8, width: "100%", maxWidth: 360 }}>
      <Button fill intent="primary" text="Run pipeline" />
      <Button fill alignText="start" endIcon="caret-down" icon="filter" text="Filter by owner" />
    </div>
  );
}
