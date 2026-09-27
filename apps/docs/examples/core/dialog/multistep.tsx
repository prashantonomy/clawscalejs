"use client";

import { Button, DialogBody, DialogStep, FormGroup, HTMLSelect, InputGroup, MultistepDialog } from "@clawscale/react";
import { useState } from "react";

export default function DialogMultistep() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const source = (
    <DialogBody>
      <FormGroup label="Source table" labelFor="pipeline-source">
        <HTMLSelect fill id="pipeline-source" options={["raw.orders", "raw.events", "raw.customers"]} />
      </FormGroup>
    </DialogBody>
  );
  const schedule = (
    <DialogBody>
      <FormGroup helperText="Every day at 02:15 UTC." label="Cron expression" labelFor="pipeline-cron">
        <InputGroup defaultValue="15 2 * * *" id="pipeline-cron" />
      </FormGroup>
    </DialogBody>
  );
  const review = (
    <DialogBody>
      <p>raw.orders loads into analytics.orders_daily every day at 02:15 UTC in us-east-1.</p>
    </DialogBody>
  );
  return (
    <>
      <Button icon="add" intent="primary" text="Create pipeline" onClick={() => setIsOpen(true)} />
      <MultistepDialog
        finalButtonProps={{ intent: "primary", text: "Create pipeline", onClick: close }}
        icon="data-lineage"
        isOpen={isOpen}
        onClose={close}
        title="New pipeline"
      >
        <DialogStep id="source" panel={source} title="Source" />
        <DialogStep id="schedule" panel={schedule} title="Schedule" />
        <DialogStep id="review" panel={review} title="Review" />
      </MultistepDialog>
    </>
  );
}
