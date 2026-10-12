"use client";

import { Button, HTMLSelect, useTheme } from "@clawscale/react";
import { type ThemeDefinition, themeAccents, themes } from "@clawscale/tokens";

const allThemes: ThemeDefinition[] = Object.values(themes);

export default function ThemesAccentPicker() {
  const { theme, accent, setAccent } = useTheme();
  const accents = themeAccents(allThemes.find((option) => option.name === theme) ?? themes.default);
  // A saved accent that this theme lacks falls back to the theme's own, listed first.
  const active = accents.some((option) => option.name === accent) ? accent : accents[0]?.name;
  return (
    <div style={{ alignItems: "center", display: "flex", gap: 8 }}>
      <HTMLSelect
        aria-label="Accent"
        options={accents.map(({ name, label }) => ({ label, value: name }))}
        value={active}
        onChange={(event) => setAccent(event.currentTarget.value)}
      />
      <Button intent="primary" icon="play" text="Run pipeline" />
    </div>
  );
}
