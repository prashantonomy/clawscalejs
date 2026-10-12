"use client";

import { Button, useTheme } from "@clawscale/react";

export default function UseThemeToggle() {
  const { resolvedColorScheme, setColorScheme } = useTheme();
  const isDark = resolvedColorScheme === "dark";
  return (
    <Button
      icon={isDark ? "flash" : "moon"}
      text={isDark ? "Switch to light" : "Switch to dark"}
      onClick={() => setColorScheme(isDark ? "light" : "dark")}
    />
  );
}
