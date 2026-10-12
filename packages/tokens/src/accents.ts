/**
 * Accents: the primary color of a theme, with its tints, focus ring and selection.
 * Themes list the accents people can pick in `accents`. `data-cs-accent` applies one.
 * Contrast rules for every accent in every theme are enforced by `test/tokens.test.ts`.
 */
import { type AccentDefinition, type AccentToken, accentTokens, type ThemeDefinition } from "./tokens.js";

/** Violet. Solids carry white text at 6.3:1 or more. */
export const violet: AccentDefinition = {
  name: "violet",
  label: "Violet",
  light: {
    primary: "#634DBF",
    "primary-hover": "#5642A6",
    "primary-active": "#4A3891",
    "primary-disabled": "#BCB1EA",
    "primary-on": "#FFFFFF",
    "primary-subtle": "#F1EEFC",
    "primary-subtle-hover": "#E6E1FA",
    "primary-border": "#CBC1F2",
    "primary-text": "#5642A6",
    focus: "#634DBF",
    selection: "rgba(99, 77, 191, 0.20)",
    "surface-selected": "rgba(99, 77, 191, 0.10)",
  },
  dark: {
    primary: "#634DBF",
    "primary-hover": "#5642A6",
    "primary-active": "#4A3891",
    "primary-disabled": "#382F63",
    "primary-on": "#FFFFFF",
    "primary-subtle": "rgba(152, 129, 243, 0.16)",
    "primary-subtle-hover": "rgba(152, 129, 243, 0.24)",
    "primary-border": "rgba(168, 152, 245, 0.45)",
    "primary-text": "#BDADFF",
    focus: "#9881F3",
    selection: "rgba(152, 129, 243, 0.32)",
    "surface-selected": "rgba(152, 129, 243, 0.18)",
  },
};

/** Blueprint's blue. Solids carry white text at 4.7:1 or more. */
export const blue: AccentDefinition = {
  name: "blue",
  label: "Blue",
  light: {
    primary: "#2D72D2",
    "primary-hover": "#215DB0",
    "primary-active": "#184A90",
    "primary-disabled": "#9DBDEA",
    "primary-on": "#FFFFFF",
    "primary-subtle": "#EBF2FC",
    "primary-subtle-hover": "#DCE8FA",
    "primary-border": "#A9C7F2",
    "primary-text": "#215DB0",
    focus: "#2D72D2",
    selection: "rgba(45, 114, 210, 0.20)",
    "surface-selected": "rgba(45, 114, 210, 0.10)",
  },
  dark: {
    primary: "#2D72D2",
    "primary-hover": "#215DB0",
    "primary-active": "#184A90",
    "primary-disabled": "#24406A",
    "primary-on": "#FFFFFF",
    "primary-subtle": "rgba(76, 144, 240, 0.16)",
    "primary-subtle-hover": "rgba(76, 144, 240, 0.24)",
    "primary-border": "rgba(138, 187, 255, 0.45)",
    "primary-text": "#8ABBFF",
    focus: "#4C90F0",
    selection: "rgba(76, 144, 240, 0.32)",
    "surface-selected": "rgba(76, 144, 240, 0.18)",
  },
};

/** Teal. Solids carry white text at 5.6:1 or more. */
export const teal: AccentDefinition = {
  name: "teal",
  label: "Teal",
  light: {
    primary: "#00756A",
    "primary-hover": "#00635A",
    "primary-active": "#004D46",
    "primary-disabled": "#93CBC4",
    "primary-on": "#FFFFFF",
    "primary-subtle": "#E6F4F2",
    "primary-subtle-hover": "#D3ECE8",
    "primary-border": "#9BD3CB",
    "primary-text": "#00635A",
    focus: "#00756A",
    selection: "rgba(0, 117, 106, 0.20)",
    "surface-selected": "rgba(0, 117, 106, 0.10)",
  },
  dark: {
    primary: "#00756A",
    "primary-hover": "#00635A",
    "primary-active": "#004D46",
    "primary-disabled": "#1B4743",
    "primary-on": "#FFFFFF",
    "primary-subtle": "rgba(46, 184, 169, 0.15)",
    "primary-subtle-hover": "rgba(46, 184, 169, 0.22)",
    "primary-border": "rgba(63, 199, 184, 0.45)",
    "primary-text": "#3FC7B8",
    focus: "#2EB8A9",
    selection: "rgba(46, 184, 169, 0.30)",
    "surface-selected": "rgba(46, 184, 169, 0.17)",
  },
};

function accentValues(colors: Record<AccentToken, string>): Record<AccentToken, string> {
  return Object.fromEntries(accentTokens.map((token) => [token, colors[token]])) as Record<AccentToken, string>;
}

/** Every accent of a theme, the one in its `light` and `dark` tokens first. */
export function themeAccents(theme: ThemeDefinition): AccentDefinition[] {
  const own = theme.accent ?? { name: theme.name, label: theme.label };
  return [
    { ...own, light: accentValues(theme.light.color), dark: accentValues(theme.dark.color) },
    ...(theme.accents ?? []),
  ];
}

/** A theme with one of its accents applied, as `data-cs-accent` applies it. Unknown names change nothing. */
export function withAccent(theme: ThemeDefinition, accentName: string): ThemeDefinition {
  const accent = theme.accents?.find((option) => option.name === accentName);
  if (!accent) return theme;
  return {
    ...theme,
    light: { ...theme.light, color: { ...theme.light.color, ...accent.light } },
    dark: { ...theme.dark, color: { ...theme.dark.color, ...accent.dark } },
  };
}
