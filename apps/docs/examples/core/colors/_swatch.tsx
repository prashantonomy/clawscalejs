/**
 * Docs helper, not an example. Color swatches rendered from @clawscale/tokens,
 * so the Colors and Themes pages always show the shipped values.
 * Each swatch shows the light color scheme on the left and the dark one on the right.
 */
import { type BuiltInThemeName, type ColorToken, chartPalettes, intents, themes } from "@clawscale/tokens";
import type { CSSProperties, ReactNode } from "react";

/** Color tokens shown on the Colors page, by section. */
export const colorGroups = {
  surfaces: [
    "canvas",
    "surface",
    "surface-raised",
    "surface-sunken",
    "surface-hover",
    "surface-active",
    "surface-selected",
  ],
  borders: ["border", "border-strong", "border-subtle"],
  text: ["text", "text-muted", "text-subtle", "text-disabled", "text-inverse"],
  intents: intents.flatMap((intent): ColorToken[] => [intent, `${intent}-subtle`, `${intent}-text`]),
} satisfies Record<string, ColorToken[]>;

export type ColorGroup = keyof typeof colorGroups;

const mono: CSSProperties = { fontFamily: "var(--cs-font-mono)", fontSize: "var(--cs-font-size-xs)" };

/** Paints a value over its color scheme's surface, so translucent tokens look as they do in the UI. */
function half(value: string, surface: string): CSSProperties {
  return { background: `linear-gradient(${value}, ${value}), ${surface}`, flex: 1 };
}

export interface SwatchProps {
  /** Label, usually the CSS variable. */
  name: string;
  /** Value in the light color scheme. */
  light: string;
  /** Value in the dark color scheme. */
  dark: string;
  /** The theme whose surfaces sit under translucent values. */
  theme?: BuiltInThemeName;
}

export function Swatch({ name, light: lightValue, dark: darkValue, theme = "default" }: SwatchProps) {
  const { light, dark } = themes[theme];
  return (
    <div
      style={{
        background: "var(--cs-color-surface)",
        border: "1px solid var(--cs-color-border)",
        borderRadius: "var(--cs-radius-lg)",
        overflow: "hidden",
      }}
    >
      <div aria-hidden="true" style={{ borderBottom: "1px solid var(--cs-color-border)", display: "flex", height: 48 }}>
        <div style={half(lightValue, light.color.surface)} />
        <div style={half(darkValue, dark.color.surface)} />
      </div>
      <div style={{ ...mono, display: "grid", gap: "2px 8px", gridTemplateColumns: "auto 1fr", padding: "8px 10px" }}>
        <span style={{ color: "var(--cs-color-text)", fontWeight: 600, gridColumn: "1 / -1", marginBottom: 2 }}>
          {name}
        </span>
        <span style={{ color: "var(--cs-color-text-subtle)" }}>Light</span>
        <span style={{ color: "var(--cs-color-text-muted)" }}>{lightValue}</span>
        <span style={{ color: "var(--cs-color-text-subtle)" }}>Dark</span>
        <span style={{ color: "var(--cs-color-text-muted)" }}>{darkValue}</span>
      </div>
    </div>
  );
}

function SwatchGrid({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "grid",
        gap: 12,
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        margin: "16px 0 24px",
      }}
    >
      {children}
    </div>
  );
}

/** Swatches for one group of `--cs-color-*` tokens. */
export function ColorSwatches({ group, theme = "default" }: { group: ColorGroup; theme?: BuiltInThemeName }) {
  const names = colorGroups[group];
  if (!names) throw new Error(`ColorSwatches: unknown group "${group}".`);
  const { light, dark } = themes[theme];
  return (
    <SwatchGrid>
      {names.map((name) => (
        <Swatch
          key={name}
          name={`--cs-color-${name}`}
          light={light.color[name]}
          dark={dark.color[name]}
          theme={theme}
        />
      ))}
    </SwatchGrid>
  );
}

/** The eight categorical chart slots, in their fixed order. */
export function ChartSwatches({ theme = "default" }: { theme?: BuiltInThemeName }) {
  const palette = chartPalettes[theme];
  return (
    <SwatchGrid>
      {palette.light.map((value, index) => (
        <Swatch
          key={value}
          name={`--cs-chart-${index + 1}`}
          light={value}
          dark={palette.dark[index] ?? value}
          theme={theme}
        />
      ))}
    </SwatchGrid>
  );
}
