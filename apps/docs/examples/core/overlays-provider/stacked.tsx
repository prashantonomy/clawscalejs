"use client";

import { Alert, Button, Dialog, DialogBody, DialogFooter } from "@clawscale/react";
import { useState } from "react";

export default function OverlaysProviderStacked() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const deletePipeline = () => {
    setIsAlertOpen(false);
    setIsDialogOpen(false);
  };
  return (
    <>
      <Button icon="edit" text="Edit pipeline" onClick={() => setIsDialogOpen(true)} />
      <Dialog icon="data-lineage" isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} title="ingest-orders">
        <DialogBody>
          <p>Open the alert, then press Escape twice. The alert closes first, then this dialog.</p>
        </DialogBody>
        <DialogFooter
          actions={<Button intent="danger" text="Delete pipeline" onClick={() => setIsAlertOpen(true)} />}
        />
      </Dialog>
      <Alert
        canEscapeKeyCancel
        cancelButtonText="Cancel"
        confirmButtonText="Delete"
        icon="trash"
        intent="danger"
        isOpen={isAlertOpen}
        onCancel={() => setIsAlertOpen(false)}
        onConfirm={deletePipeline}
      >
        <p>Delete ingest-orders and its 312 run records?</p>
      </Alert>
    </>
  );
}
