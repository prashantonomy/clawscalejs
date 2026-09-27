"use client";

import { Button, Card, H5 } from "@clawscale/react";

export default function CardBasic() {
  return (
    <Card style={{ maxWidth: 360 }}>
      <H5>orders_daily</H5>
      <p>Daily order snapshot from the sales warehouse. 1,204,331 rows, refreshed at 02:00 UTC.</p>
      <Button icon="th" text="Open table" />
    </Card>
  );
}
