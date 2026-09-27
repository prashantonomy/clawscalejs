import { OverlaysProvider, OverlayToaster, type Toaster } from "@clawscale/react";
import { createRoot } from "react-dom/client";

let toaster: Promise<Toaster> | undefined;

/** The docs' shared toaster. It is created on first use, in the browser. */
export function getToaster(): Promise<Toaster> {
  toaster ??= OverlayToaster.create(
    { position: "top" },
    {
      domRenderer: (element, container) => createRoot(container).render(<OverlaysProvider>{element}</OverlaysProvider>),
    },
  );
  return toaster;
}
