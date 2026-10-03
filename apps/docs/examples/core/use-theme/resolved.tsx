"use client";

import { PropertyList, PropertyListItem, useTheme } from "@clawscale/react";
import { chartPalettes } from "@clawscale/tokens";

export default function UseThemeResolved() {
  const { theme, colorScheme, resolvedColorScheme } = useTheme();
  // Colors for a canvas chart, which CSS variables cannot reach.
  const palette = theme === "futuristic" ? chartPalettes.futuristic : chartPalettes.default;
  return (
    <PropertyList style={{ width: "100%", maxWidth: 340 }}>
      <PropertyListItem label="theme" monospace>
        {theme}
      </PropertyListItem>
      <PropertyListItem label="colorScheme" monospace>
        {colorScheme}
      </PropertyListItem>
      <PropertyListItem label="resolvedColorScheme" monospace>
        {resolvedColorScheme}
      </PropertyListItem>
      <PropertyListItem label="Chart line" monospace>
        {palette[resolvedColorScheme][0]}
      </PropertyListItem>
    </PropertyList>
  );
}
