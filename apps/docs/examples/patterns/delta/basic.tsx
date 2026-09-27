"use client";

import { Delta } from "@clawscale/react";

export default function DeltaBasic() {
  return (
    <>
      <Delta value={4.2} />
      <Delta value={-1.3} />
      <Delta value={0} />
    </>
  );
}
