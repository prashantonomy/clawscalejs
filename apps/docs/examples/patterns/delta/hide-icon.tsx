"use client";

import { Delta } from "@clawscale/react";

export default function DeltaHideIcon() {
  return (
    <>
      <Delta value={4.2} hideIcon />
      <Delta value={-1.3} hideIcon />
      <Delta value={0} hideIcon />
    </>
  );
}
