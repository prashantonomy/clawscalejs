"use client";

import { Button, Tag, Tooltip } from "@clawscale/react";

export default function TooltipBasic() {
  return (
    <>
      <Tooltip content="Median time from ingest to query, last 24 hours">
        <Tag minimal>p50 latency 212 ms</Tag>
      </Tooltip>
      <Tooltip content="Runs every day at 02:15 UTC">
        <Button icon="time" text="Daily" />
      </Tooltip>
    </>
  );
}
