"use client";

import { Button, FocusStyleManager, InputGroup, Switch } from "@clawscale/react";
import { useEffect, useState } from "react";

export default function AccessibilityFocus() {
  const [keyboardOnly, setKeyboardOnly] = useState(false);

  useEffect(() => setKeyboardOnly(FocusStyleManager.isActive()), []);

  const toggle = (checked: boolean) => {
    if (checked) FocusStyleManager.onlyShowFocusOnTabs();
    else FocusStyleManager.alwaysShowFocus();
    setKeyboardOnly(checked);
  };

  return (
    <div style={{ display: "grid", gap: 12, width: 320 }}>
      <Switch
        checked={keyboardOnly}
        label="Show focus only for keyboard"
        onChange={(event) => toggle(event.currentTarget.checked)}
      />
      <InputGroup aria-label="Pipeline name" placeholder="Pipeline name" />
      <div style={{ display: "flex", gap: 8 }}>
        <Button intent="primary" text="Run pipeline" />
        <Button text="Cancel" />
      </div>
    </div>
  );
}
