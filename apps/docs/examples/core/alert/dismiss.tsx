"use client";

import { Alert, Button } from "@clawscale/react";
import { useState } from "react";

export default function AlertDismiss() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button icon="database" text="Check storage" onClick={() => setIsOpen(true)} />
      <Alert
        canEscapeKeyCancel
        canOutsideClickCancel
        confirmButtonText="Got it"
        icon="database"
        intent="primary"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <p>The eu-west-1 workspace reached its 2 TB storage quota. New ingests wait until you free space.</p>
      </Alert>
    </>
  );
}
