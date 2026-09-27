"use client";

import { EntityTitle, Tag } from "@clawscale/react";

export default function EntityTitleTags() {
  return (
    <EntityTitle
      icon="flow-linear"
      title="ingest-orders"
      subtitle="Runs hourly in us-east-1"
      tags={
        <>
          <Tag minimal intent="success">
            Healthy
          </Tag>
          <Tag minimal>v14</Tag>
        </>
      }
    />
  );
}
