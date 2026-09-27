"use client";

import { Classes, ProgressBar } from "@clawscale/react";
import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

export default function AccessibilityReducedMotion() {
  const reduced = usePrefersReducedMotion();
  return (
    <div style={{ display: "grid", gap: 8, width: 320 }}>
      <ProgressBar aria-label="Backfill progress" animate={!reduced} intent="primary" value={0.64} />
      <span className={Classes.TEXT_MUTED}>
        Backfill 64% done. {reduced ? "Reduced motion is on: stripes stay still." : "Stripes move."}
      </span>
    </div>
  );
}
