"use client";

import { Button, Dialog, DialogBody, DialogFooter, FormGroup, HTMLSelect, InputGroup } from "@clawscale/react";
import { useState } from "react";

export default function DialogBasic() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  return (
    <>
      <Button icon="time" text="Edit schedule" onClick={() => setIsOpen(true)} />
      <Dialog icon="time" isOpen={isOpen} onClose={close} title="Schedule ingest-orders">
        <DialogBody>
          <FormGroup helperText="Every day at 02:15." label="Cron expression" labelFor="schedule-cron">
            <InputGroup defaultValue="15 2 * * *" id="schedule-cron" />
          </FormGroup>
          <FormGroup label="Time zone" labelFor="schedule-zone">
            <HTMLSelect fill id="schedule-zone" options={["UTC", "Europe/Berlin", "America/New_York"]} />
          </FormGroup>
        </DialogBody>
        <DialogFooter
          actions={
            <>
              <Button text="Cancel" onClick={close} />
              <Button intent="primary" text="Save schedule" onClick={close} />
            </>
          }
        >
          Next run: 28 Sep, 02:15 UTC
        </DialogFooter>
      </Dialog>
    </>
  );
}
