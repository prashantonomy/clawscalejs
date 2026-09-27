"use client";

import { CompoundTag } from "@clawscale/react";

export default function CompoundTagIntent() {
  return (
    <>
      <CompoundTag leftContent="env">development</CompoundTag>
      <CompoundTag intent="primary" leftContent="env">
        staging
      </CompoundTag>
      <CompoundTag intent="success" leftContent="status">
        healthy
      </CompoundTag>
      <CompoundTag intent="warning" leftContent="freshness">
        3 h behind
      </CompoundTag>
      <CompoundTag intent="danger" leftContent="env">
        production
      </CompoundTag>
    </>
  );
}
