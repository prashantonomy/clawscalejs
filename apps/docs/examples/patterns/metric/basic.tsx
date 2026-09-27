"use client";

import { Metric } from "@clawscale/react";

export default function MetricBasic() {
  return (
    <div style={{ display: "flex", gap: 40 }}>
      <Metric label="Active pipelines" value="38" />
      <Metric label="Rows ingested today" value="1.84B" />
    </div>
  );
}
