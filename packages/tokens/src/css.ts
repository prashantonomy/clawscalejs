import { dark, light, sequentialBlue, shared, type Theme } from "./tokens.js";

/** Selector that switches tokens to the dark theme when no other selector is given. */
export const defaultDarkSelector = '[data-cs-theme="dark"]';

/** Selector that restores light tokens inside a dark subtree. */
export const defaultLightSelector = '[data-cs-theme="light"]';

/** Returns the theme-dependent variables, for example `{ "--cs-color-canvas": "#F4F5F7" }`. */
export function themeVariables(theme: Theme): Record<string, string> {
  const source = theme === "light" ? light : dark;
  const vars: Record<string, string> = {};
  for (const [name, value] of Object.entries(source.color)) vars[`--cs-color-${name}`] = value;
  for (const [name, value] of Object.entries(source.shadow)) vars[`--cs-shadow-${name}`] = value;
  for (const [name, value] of Object.entries(source.chart)) vars[`--cs-chart-${name}`] = value;
  return vars;
}

/** Returns the theme-independent variables, for example `{ "--cs-radius-md": "6px" }`. */
export function sharedVariables(): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [group, values] of Object.entries(shared)) {
    for (const [name, value] of Object.entries(values)) vars[`--cs-${group}-${name}`] = value;
  }
  for (const [step, value] of Object.entries(sequentialBlue)) vars[`--cs-chart-seq-${step}`] = value;
  return vars;
}

export interface RenderTokensCssOptions {
  /** Selector list that switches to dark tokens. */
  darkSelector?: string;
  /** Selector list that restores light tokens inside a dark subtree. */
  lightSelector?: string;
}

function block(selector: string, vars: Record<string, string>, colorScheme: Theme): string {
  const lines = Object.entries(vars).map(([name, value]) => `  ${name}: ${value};`);
  return `${selector} {\n  color-scheme: ${colorScheme};\n${lines.join("\n")}\n}`;
}

/** Renders every token as CSS custom properties: shared and light on `:root`, then the dark scope. */
export function renderTokensCss(options: RenderTokensCssOptions = {}): string {
  const darkSelector = options.darkSelector ?? defaultDarkSelector;
  const lightSelector = options.lightSelector ?? defaultLightSelector;
  return [
    "/* Clawscale design tokens. Generated from @clawscale/tokens. Do not edit. */",
    block(":root", { ...sharedVariables(), ...themeVariables("light") }, "light"),
    block(darkSelector, themeVariables("dark"), "dark"),
    block(lightSelector, themeVariables("light"), "light"),
  ].join("\n\n");
}
