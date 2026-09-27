"use client";

import { Alert, Button } from "@clawscale/react";
import { useState } from "react";

export default function AlertBasic() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button icon="trash" intent="danger" text="Delete dataset" onClick={() => setIsOpen(true)} />
      <Alert
        cancelButtonText="Cancel"
        confirmButtonText="Delete dataset"
        icon="trash"
        intent="danger"
        isOpen={isOpen}
        onCancel={() => setIsOpen(false)}
        onConfirm={() => setIsOpen(false)}
      >
        <p>
          Delete <strong>orders_daily</strong>? It holds 1,284,112 rows and 14 views read from it. You cannot undo this.
        </p>
      </Alert>
    </>
  );
}
