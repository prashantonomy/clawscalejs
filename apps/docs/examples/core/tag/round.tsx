"use client";

import { Tag } from "@clawscale/react";

export default function TagRound() {
  return (
    <>
      <Tag round>v2.14.0</Tag>
      <Tag round intent="primary">
        Beta
      </Tag>
      <Tag round minimal intent="success">
        Healthy
      </Tag>
      <Tag round minimal>
        24 columns
      </Tag>
    </>
  );
}
