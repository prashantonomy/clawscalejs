"use client";

import { CompoundTag } from "@clawscale/react";

export default function CompoundTagMinimal() {
  return (
    <>
      <CompoundTag minimal leftContent="env">
        development
      </CompoundTag>
      <CompoundTag minimal intent="primary" leftContent="env">
        staging
      </CompoundTag>
      <CompoundTag minimal intent="success" leftContent="status">
        healthy
      </CompoundTag>
      <CompoundTag minimal intent="warning" leftContent="freshness">
        3 h behind
      </CompoundTag>
      <CompoundTag minimal intent="danger" leftContent="env">
        production
      </CompoundTag>
    </>
  );
}
