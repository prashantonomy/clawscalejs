"use client";

import { EditableText, H5 } from "@clawscale/react";

export default function EditableTextSelectAll() {
  return (
    <H5>
      <EditableText selectAllOnFocus defaultValue="ingest-orders-nightly" />
    </H5>
  );
}
