"use client";

import { SegmentedControl, useTheme } from "@clawscale/react";

export default function ClawscaleProviderThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <SegmentedControl
      aria-label="Theme"
      options={[
        { label: "Default", value: "default" },
        { label: "Futuristic", value: "futuristic" },
      ]}
      value={theme}
      onValueChange={setTheme}
    />
  );
}
