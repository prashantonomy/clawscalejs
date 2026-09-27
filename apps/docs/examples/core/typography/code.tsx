"use client";

import { Code, Pre } from "@clawscale/react";

export default function TypographyCode() {
  return (
    <>
      <p>
        Raise <Code>max_workers</Code> to drain the queue faster.
      </p>
      <Pre>{`pipeline: orders-daily
schedule: "0 2 * * *"
max_workers: 12`}</Pre>
    </>
  );
}
