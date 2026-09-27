"use client";

import { Delta } from "@clawscale/react";

export default function DeltaGoodDirection() {
  return (
    <>
      <span>
        p95 latency <Delta value={6.4} goodDirection="down" />
      </span>
      <span>
        Error rate <Delta value={-12.5} goodDirection="down" />
      </span>
    </>
  );
}
