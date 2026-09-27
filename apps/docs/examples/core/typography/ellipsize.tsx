"use client";

import { Text } from "@clawscale/react";

const path = "s3://analytics-prod/exports/orders/2026/09/27/part-00017-of-00064.snappy.parquet";

export default function TypographyEllipsize() {
  return (
    <div style={{ width: 280 }}>
      <Text ellipsize>{path}</Text>
    </div>
  );
}
