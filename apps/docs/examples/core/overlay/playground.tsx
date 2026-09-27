"use client";

import { Button, Card, H5, Overlay2 } from "@clawscale/react";
import { useState } from "react";
import { Playground, usePlayground } from "@/components/docs/playground";

export default function OverlayPlayground() {
  const [isOpen, setIsOpen] = useState(false);
  const [props, options] = usePlayground({
    hasBackdrop: { type: "boolean", label: "Backdrop", default: true },
    canEscapeKeyClose: { type: "boolean", label: "Close on escape", default: true },
    canOutsideClickClose: { type: "boolean", label: "Close on outside click", default: true },
    autoFocus: { type: "boolean", label: "Auto focus", default: true },
    enforceFocus: { type: "boolean", label: "Enforce focus", default: true },
    shouldReturnFocusOnClose: { type: "boolean", label: "Return focus on close", default: true },
  });
  const close = () => setIsOpen(false);
  return (
    <Playground options={options}>
      <Button intent="primary" text="Start backfill" onClick={() => setIsOpen(true)} />
      <Overlay2 {...props} isOpen={isOpen} onClose={close}>
        <Card
          elevation={4}
          style={{ left: 0, right: 0, top: "15vh", margin: "0 auto", width: "min(440px, calc(100vw - 32px))" }}
        >
          <H5>Backfill orders_daily</H5>
          <p>Reprocess 90 days of partitions in us-east-1. Estimated cost: 38 compute hours.</p>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <Button text="Cancel" onClick={close} />
            <Button intent="primary" text="Start" onClick={close} />
          </div>
        </Card>
      </Overlay2>
    </Playground>
  );
}
