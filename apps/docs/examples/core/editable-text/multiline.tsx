"use client";

import { EditableText } from "@clawscale/react";

export default function EditableTextMultiline() {
  return (
    <div style={{ width: "100%", maxWidth: 420 }}>
      <EditableText
        multiline
        minLines={3}
        maxLines={8}
        placeholder="Describe this dataset"
        defaultValue="Daily snapshot of orders from the sales warehouse. One row per order line, refreshed at 02:00 UTC."
      />
    </div>
  );
}
