"use client";

import { type ColorSchemePreference, SegmentedControl, useTheme } from "@clawscale/react";

export default function ClawscaleProviderColorSchemeSwitcher() {
  const { colorScheme, setColorScheme } = useTheme();
  return (
    <SegmentedControl
      aria-label="Color scheme"
      options={[
        { label: "Light", value: "light", icon: "flash" },
        { label: "Dark", value: "dark", icon: "moon" },
        { label: "System", value: "system", icon: "desktop" },
      ]}
      value={colorScheme}
      onValueChange={(value) => setColorScheme(value as ColorSchemePreference)}
    />
  );
}
