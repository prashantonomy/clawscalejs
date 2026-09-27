"use client";

import { Button, Icon, Tag } from "@clawscale/react";

export default function IconComponents() {
  return (
    <>
      <Button icon="refresh" text="Refresh" />
      <Button icon={<Icon icon="database" intent="primary" />} text="Datasets" />
      <Tag icon="globe" minimal>
        us-east-1
      </Tag>
      <Tag icon="error" intent="danger" minimal>
        3 failed runs
      </Tag>
    </>
  );
}
