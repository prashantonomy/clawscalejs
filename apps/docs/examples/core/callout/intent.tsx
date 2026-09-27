"use client";

import { Callout } from "@clawscale/react";

export default function CalloutIntent() {
  return (
    <>
      <Callout intent="primary" title="New schema version">
        orders_daily v14 adds the fulfillment_region column.
      </Callout>
      <Callout intent="success" title="Sync complete">
        1,204,331 rows loaded from us-east-1 in 3 minutes.
      </Callout>
      <Callout intent="warning" title="Quota at 85%">
        The analytics warehouse throttles queries above 100%.
      </Callout>
      <Callout intent="danger" title="Pipeline failed">
        ingest-orders stopped at step 3 of 5. Check the run log.
      </Callout>
    </>
  );
}
