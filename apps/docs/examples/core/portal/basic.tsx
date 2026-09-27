"use client";

import { Button, Card, Classes, H6, Portal } from "@clawscale/react";
import { useState } from "react";

export default function PortalBasic() {
  const [isShown, setIsShown] = useState(false);
  return (
    <>
      <Button
        icon="refresh"
        text={isShown ? "Hide sync status" : "Show sync status"}
        onClick={() => setIsShown((shown) => !shown)}
      />
      {isShown && (
        <Portal>
          <Card elevation={3} style={{ position: "fixed", right: 24, bottom: 24, width: 300, zIndex: 20 }}>
            <H6>Syncing 3 datasets to eu-west-1</H6>
            <p className={Classes.TEXT_MUTED}>orders_daily, events_raw and customers. 64% done.</p>
          </Card>
        </Portal>
      )}
    </>
  );
}
