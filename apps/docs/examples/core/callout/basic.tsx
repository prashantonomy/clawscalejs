"use client";

import { Callout } from "@clawscale/react";

export default function CalloutBasic() {
  return (
    <Callout title="Backfill scheduled">
      The orders_daily backfill starts at 02:00 UTC and takes about 40 minutes. Queries on this dataset may return
      partial results until it finishes.
    </Callout>
  );
}
