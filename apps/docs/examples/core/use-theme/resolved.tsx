"use client";

import { PropertyList, PropertyListItem, useTheme } from "@clawscale/react";

// Colors for a canvas chart, which CSS variables cannot reach.
const lineColor = { light: "#2D72D2", dark: "#8ABBFF" };

export default function UseThemeResolved() {
  const { theme, resolvedTheme } = useTheme();
  return (
    <PropertyList style={{ width: "100%", maxWidth: 320 }}>
      <PropertyListItem label="theme" monospace>
        {theme}
      </PropertyListItem>
      <PropertyListItem label="resolvedTheme" monospace>
        {resolvedTheme}
      </PropertyListItem>
      <PropertyListItem label="Chart line" monospace>
        {lineColor[resolvedTheme]}
      </PropertyListItem>
    </PropertyList>
  );
}
