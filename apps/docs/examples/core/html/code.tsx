"use client";

import { Code, Pre } from "@clawscale/react";

export default function HtmlCode() {
  return (
    <>
      <p>
        Raise <Code>retention_days</Code> to keep partitions longer.
      </p>
      <Pre>
        {`SELECT region, sum(total) AS revenue
FROM orders_daily
GROUP BY region;`}
      </Pre>
    </>
  );
}
