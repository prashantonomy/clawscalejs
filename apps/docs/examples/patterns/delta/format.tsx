"use client";

import { Delta } from "@clawscale/react";

const count = new Intl.NumberFormat("en-US");

export default function DeltaFormat() {
  return (
    <>
      <Delta value={1240} format={(value) => `${count.format(value)} rows`} />
      <Delta value={-38} format={(value) => `${value} ms`} goodDirection="down" />
      <Delta value={212} format={(value) => `$${count.format(value)}`} goodDirection="down" />
    </>
  );
}
