"use client";

import { Delta } from "@clawscale/react";

export default function DeltaNeutral() {
  return (
    <>
      <span>
        Traffic share, eu-west-1 <Delta value={14.8} neutral />
      </span>
      <span>
        Traffic share, us-east-1 <Delta value={-9.3} neutral />
      </span>
    </>
  );
}
