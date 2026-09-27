"use client";

import { Icon } from "@clawscale/react";

export default function IconIntent() {
  return (
    <>
      <Icon icon="info-sign" intent="primary" title="Info" />
      <Icon icon="tick-circle" intent="success" title="Succeeded" />
      <Icon icon="warning-sign" intent="warning" title="Warning" />
      <Icon icon="error" intent="danger" title="Failed" />
    </>
  );
}
