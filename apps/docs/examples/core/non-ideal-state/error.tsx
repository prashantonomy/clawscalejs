"use client";

import { Button, NonIdealState } from "@clawscale/react";

export default function NonIdealStateError() {
  return (
    <NonIdealState
      icon="error"
      title="Could not load datasets"
      description="The metadata service did not respond within 30 seconds."
      action={<Button intent="primary" icon="refresh" text="Retry" />}
    />
  );
}
