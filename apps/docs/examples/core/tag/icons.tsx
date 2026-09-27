"use client";

import { Tag } from "@clawscale/react";

export default function TagIcons() {
  return (
    <>
      <Tag icon="database">orders_daily</Tag>
      <Tag icon="globe" minimal>
        eu-west-1
      </Tag>
      <Tag icon="time" endIcon="caret-down" minimal>
        Last 24 hours
      </Tag>
      <Tag endIcon="share">Runbook</Tag>
    </>
  );
}
