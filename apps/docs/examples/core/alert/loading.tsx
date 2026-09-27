"use client";

import { Alert, Button } from "@clawscale/react";
import { useState } from "react";

export default function AlertLoading() {
  const [isOpen, setIsOpen] = useState(false);
  const [isStopping, setIsStopping] = useState(false);

  const stopRollout = () => {
    setIsStopping(true);
    // Stands in for the request that stops the rollout.
    setTimeout(() => {
      setIsStopping(false);
      setIsOpen(false);
    }, 1500);
  };

  return (
    <>
      <Button icon="stop" text="Stop rollout" onClick={() => setIsOpen(true)} />
      <Alert
        cancelButtonText="Keep running"
        confirmButtonText="Stop rollout"
        icon="warning-sign"
        intent="warning"
        isOpen={isOpen}
        loading={isStopping}
        onCancel={() => setIsOpen(false)}
        onConfirm={stopRollout}
      >
        <p>Stop the api-gateway v2.14.0 rollout? 3 of 8 regions already run the new version.</p>
      </Alert>
    </>
  );
}
