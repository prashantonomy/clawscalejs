"use client";

import { Metric, Switch } from "@clawscale/react";
import { useState } from "react";

export default function MetricLoading() {
  const [loading, setLoading] = useState(true);
  return (
    <div style={{ display: "grid", gap: 16, width: 180 }}>
      <Metric label="Throughput" value="12,480" unit="rows/s" loading={loading} />
      <Switch label="Loading" checked={loading} onChange={(event) => setLoading(event.currentTarget.checked)} />
    </div>
  );
}
