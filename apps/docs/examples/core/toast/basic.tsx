"use client";

import { Button } from "@clawscale/react";
import { getToaster } from "./_toaster";

export default function ToastBasic() {
  const saveView = async () => {
    const toaster = await getToaster();
    toaster.show({ icon: "tick", intent: "success", message: "Saved the view Orders by region." });
  };
  return <Button icon="floppy-disk" text="Save view" onClick={saveView} />;
}
