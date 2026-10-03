"use client";

import { SegmentedControl, useTheme } from "@clawscale/react";

export default function ThemesPicker() {
  const { theme, setTheme } = useTheme();
  return (
    <SegmentedControl
      aria-label="Theme"
      options={[
        { label: "Default", value: "default", icon: "style" },
        { label: "Futuristic", value: "futuristic", icon: "rocket-slant" },
      ]}
      value={theme}
      onValueChange={setTheme}
    />
  );
}
