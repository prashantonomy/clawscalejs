/**
 * Every built-in theme. A theme is a complete set of token values for both color schemes.
 * Components only read tokens, so a theme changes the look without changing any markup.
 */
import { futuristic, futuristicChartPalette } from "./futuristic.js";
import { type ColorScheme, chartPalette, dark, light, sequentialBlue, shared, type ThemeDefinition } from "./tokens.js";

/** Clawscale's calm, neutral look for everyday tools. Its tokens are `light`, `dark` and `shared`. */
export const defaultTheme: ThemeDefinition = {
  name: "default",
  label: "Default",
  description: "Calm and neutral, for tools people use all day.",
  shared,
  light,
  dark,
  sequential: sequentialBlue,
};

export const themes = {
  default: defaultTheme,
  futuristic,
} as const satisfies Record<string, ThemeDefinition>;

/** The name of a built-in theme. */
export type BuiltInThemeName = keyof typeof themes;

/** A theme name: a built-in one, or the name of a theme you define. */
export type ThemeName = BuiltInThemeName | (string & {});

/** Built-in theme names, the default first. */
export const themeNames = Object.keys(themes) as BuiltInThemeName[];

/** Each built-in theme's categorical chart colors in their fixed order, for chart libraries that take arrays. */
export const chartPalettes: Record<BuiltInThemeName, Record<ColorScheme, readonly string[]>> = {
  default: chartPalette,
  futuristic: futuristicChartPalette,
};
