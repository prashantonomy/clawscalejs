"use client";

import { Button, Classes, KeyComboTag, useHotkeys } from "@clawscale/react";
import { useCallback, useMemo, useState } from "react";

export default function UseHotkeysGlobal() {
  const [refreshedAt, setRefreshedAt] = useState<string>();
  const refresh = useCallback(() => setRefreshedAt(new Date().toLocaleTimeString("en-GB")), []);

  // Memoize the list, or the hook binds the hotkeys again on every render.
  const hotkeys = useMemo(
    () => [{ combo: "r", global: true, label: "Refresh run list", onKeyDown: refresh }],
    [refresh],
  );
  useHotkeys(hotkeys);

  return (
    <>
      <Button icon="refresh" text="Refresh runs" onClick={refresh} />
      <KeyComboTag combo="r" />
      <span className={Classes.TEXT_MUTED}>{refreshedAt ? `Refreshed at ${refreshedAt}` : "Not refreshed yet"}</span>
    </>
  );
}
