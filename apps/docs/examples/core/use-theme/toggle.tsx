"use client";

import { Button, useTheme } from "@clawscale/react";

export default function UseThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  return (
    <Button
      icon={isDark ? "flash" : "moon"}
      text={isDark ? "Switch to light" : "Switch to dark"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    />
  );
}
