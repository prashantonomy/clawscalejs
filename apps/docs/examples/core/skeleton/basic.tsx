"use client";

import { Button, Card, Classes, H5, Switch } from "@clawscale/react";
import { useState } from "react";

export default function SkeletonBasic() {
  const [loading, setLoading] = useState(true);
  const skeleton = loading ? Classes.SKELETON : undefined;
  return (
    <div style={{ display: "grid", gap: 12, maxWidth: 420, width: "100%" }}>
      <Switch checked={loading} label="Loading" onChange={(event) => setLoading(event.currentTarget.checked)} />
      <Card>
        <H5 className={skeleton}>orders_daily</H5>
        <p className={skeleton}>3.4M rows in 24 columns. Refreshed hourly from raw.orders.</p>
        <Button aria-label="Open table" className={skeleton} disabled={loading} icon="th" text="Open table" />
      </Card>
      <Card className={skeleton}>
        <H5>revenue_by_region</H5>
        <p>12K rows in 8 columns. Refreshed daily at 02:00 UTC.</p>
      </Card>
    </div>
  );
}
