"use client";

import { Button, Classes, H6, PopoverNext } from "@clawscale/react";

export default function PopoverBasic() {
  return (
    <PopoverNext
      placement="bottom"
      popoverClassName={Classes.POPOVER_CONTENT_SIZING}
      content={
        <div>
          <H6>Pause ingest-orders?</H6>
          <p>Scheduled runs wait until you resume. 2 runs are queued.</p>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <Button className={Classes.POPOVER_DISMISS} text="Cancel" />
            <Button className={Classes.POPOVER_DISMISS} intent="warning" text="Pause" />
          </div>
        </div>
      }
    >
      <Button icon="pause" text="Pause pipeline" />
    </PopoverNext>
  );
}
