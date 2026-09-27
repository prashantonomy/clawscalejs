"use client";

import { Callout } from "@clawscale/react";

export default function CalloutCompact() {
  return (
    <>
      <Callout compact intent="primary">
        Showing cached results from 09:40 UTC.
      </Callout>
      <Callout compact intent="warning" title="Partial results">
        2 of 14 shards timed out. Totals may be low.
      </Callout>
    </>
  );
}
