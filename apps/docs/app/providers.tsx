"use client";

import "@clawscale/react/sync-icons";
import { ClawscaleProvider } from "@clawscale/react";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return <ClawscaleProvider>{children}</ClawscaleProvider>;
}
