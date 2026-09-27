"use client";

import { Callout } from "@clawscale/react";

export default function CalloutMinimal() {
  return (
    <>
      <Callout minimal title="Read only">
        This dataset is managed by the finance team.
      </Callout>
      <Callout minimal intent="danger" title="Credentials expire in 2 days">
        Rotate the warehouse key before Friday to keep syncs running.
      </Callout>
    </>
  );
}
