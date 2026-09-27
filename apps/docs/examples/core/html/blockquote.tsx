"use client";

import { Blockquote } from "@clawscale/react";

export default function HtmlBlockquote() {
  return (
    <Blockquote>
      Ingestion for eu-west-1 is paused until the schema migration completes. Queries on this region return data up to
      09:00 UTC.
    </Blockquote>
  );
}
