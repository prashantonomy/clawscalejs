"use client";

import { Button } from "@clawscale/react";
import { getToaster } from "./_toaster";

export default function ToastTimeout() {
  const showShort = async () => {
    (await getToaster()).show({ icon: "clipboard", message: "Copied the table path.", timeout: 2000 });
  };
  const showSticky = async () => {
    (await getToaster()).show({
      icon: "warning-sign",
      intent: "warning",
      message: "Maintenance window starts at 22:00 UTC. Runs pause for 30 min.",
      timeout: 0,
    });
  };
  return (
    <>
      <Button text="2 second timeout" onClick={showShort} />
      <Button text="No timeout" onClick={showSticky} />
    </>
  );
}
