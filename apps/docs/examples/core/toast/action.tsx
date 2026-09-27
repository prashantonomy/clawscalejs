"use client";

import { Button } from "@clawscale/react";
import { getToaster } from "./_toaster";

export default function ToastAction() {
  const archive = async () => {
    const toaster = await getToaster();
    toaster.show({
      icon: "archive",
      message: "Archived 3 pipelines.",
      action: {
        text: "Undo",
        onClick: () => toaster.show({ icon: "undo", message: "Restored 3 pipelines." }),
      },
    });
  };
  return <Button icon="archive" text="Archive selected" onClick={archive} />;
}
