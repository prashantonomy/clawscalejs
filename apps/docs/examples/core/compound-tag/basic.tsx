"use client";

import { CompoundTag } from "@clawscale/react";

export default function CompoundTagBasic() {
  return (
    <>
      <CompoundTag leftContent="env">production</CompoundTag>
      <CompoundTag leftContent="region">eu-west-1</CompoundTag>
      <CompoundTag leftContent="owner">data-platform</CompoundTag>
      <CompoundTag leftContent="rows">3.4M</CompoundTag>
    </>
  );
}
