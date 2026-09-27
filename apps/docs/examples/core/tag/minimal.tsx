"use client";

import { Tag } from "@clawscale/react";

export default function TagMinimal() {
  return (
    <>
      <Tag minimal>Queued</Tag>
      <Tag minimal intent="primary">
        Running
      </Tag>
      <Tag minimal intent="success">
        Succeeded
      </Tag>
      <Tag minimal intent="warning">
        Delayed
      </Tag>
      <Tag minimal intent="danger">
        Failed
      </Tag>
    </>
  );
}
