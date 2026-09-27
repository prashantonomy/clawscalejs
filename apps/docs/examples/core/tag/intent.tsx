"use client";

import { Tag } from "@clawscale/react";

export default function TagIntent() {
  return (
    <>
      <Tag>Queued</Tag>
      <Tag intent="primary">Running</Tag>
      <Tag intent="success">Succeeded</Tag>
      <Tag intent="warning">Delayed</Tag>
      <Tag intent="danger">Failed</Tag>
    </>
  );
}
