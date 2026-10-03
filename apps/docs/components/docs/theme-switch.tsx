"use client";

import { SegmentedControl, useTheme } from "@clawscale/react";

const options = [
  { label: "Default", value: "default" },
  { label: "Futuristic", value: "futuristic" },
];

/** Switches the docs between the default and the futuristic theme. The choice is saved. */
export function ThemeSwitch({ className, small = true }: { className?: string; small?: boolean }) {
  const { theme, setTheme } = useTheme();
  return (
    <SegmentedControl
      aria-label="Theme"
      className={className}
      options={options}
      value={theme}
      onValueChange={setTheme}
      small={small}
    />
  );
}
