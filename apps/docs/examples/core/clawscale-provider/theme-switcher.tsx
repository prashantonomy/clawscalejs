"use client";

import { SegmentedControl, type ThemePreference, useTheme } from "@clawscale/react";

export default function ClawscaleProviderThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <SegmentedControl
      options={[
        { label: "Light", value: "light", icon: "flash" },
        { label: "Dark", value: "dark", icon: "moon" },
        { label: "System", value: "system", icon: "desktop" },
      ]}
      value={theme}
      onValueChange={(value) => setTheme(value as ThemePreference)}
    />
  );
}
