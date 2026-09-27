"use client";

import { Button, Card, H5, Overlay2 } from "@clawscale/react";
import { useState } from "react";

export default function OverlayBasic() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  return (
    <>
      <Button text="Show run summary" onClick={() => setIsOpen(true)} />
      <Overlay2 isOpen={isOpen} onClose={close}>
        <Card
          elevation={4}
          style={{ left: 0, right: 0, top: "15vh", margin: "0 auto", width: "min(440px, calc(100vw - 32px))" }}
        >
          <H5>Run 4812 finished with warnings</H5>
          <p>ingest-orders loaded 1,284,112 rows in 6 min 42 s. 312 rows failed schema validation.</p>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <Button text="Close" onClick={close} />
            <Button intent="primary" text="Open run" onClick={close} />
          </div>
        </Card>
      </Overlay2>
    </>
  );
}
