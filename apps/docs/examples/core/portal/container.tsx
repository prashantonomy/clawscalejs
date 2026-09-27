"use client";

import { Card, H6, Portal, Tag } from "@clawscale/react";
import { useState } from "react";

export default function PortalContainer() {
  const [target, setTarget] = useState<HTMLDivElement | null>(null);
  return (
    <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 1fr", width: "100%", maxWidth: 520 }}>
      <Card compact>
        <H6>Pipeline editor</H6>
        <p>The tags are declared here.</p>
        {target && (
          <Portal container={target}>
            <Tag intent="primary" minimal>
              orders_daily
            </Tag>{" "}
            <Tag minimal>events_raw</Tag>
          </Portal>
        )}
      </Card>
      <Card compact>
        <H6>Inspector</H6>
        <div ref={setTarget} style={{ position: "relative", minHeight: 24 }} />
      </Card>
    </div>
  );
}
