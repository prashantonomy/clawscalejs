"use client";

import { Button, NonIdealState } from "@clawscale/react";

export default function NonIdealStateEmptySearch() {
  return (
    <NonIdealState
      icon="search"
      title="No matching pipelines"
      description="No pipeline in eu-west-1 matches ingest_eu. Check the name or clear the filters."
      action={<Button icon="filter-remove" text="Clear filters" />}
    />
  );
}
