"use client";

import { HTMLSelect, useTheme } from "@clawscale/react";
import { themes } from "@clawscale/tokens";

const options = Object.values(themes).map(({ name, label }) => ({ label, value: name }));

export default function ClawscaleProviderThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  return (
    <HTMLSelect
      aria-label="Theme"
      options={options}
      value={theme}
      onChange={(event) => setTheme(event.currentTarget.value)}
    />
  );
}
