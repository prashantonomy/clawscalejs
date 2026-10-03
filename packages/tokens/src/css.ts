import { defaultTheme } from "./themes.js";
import {
  type ColorScheme,
  type ColorSchemeTokens,
  colorSchemes,
  type SharedOverrides,
  type SharedTokens,
  type ThemeDefinition,
} from "./tokens.js";

/** Attribute that names the theme of an element and its subtree, for example `data-cs-theme="futuristic"`. */
export const THEME_ATTRIBUTE = "data-cs-theme";

/** Attribute that sets the color scheme of an element and its subtree: `light` or `dark`. */
export const COLOR_SCHEME_ATTRIBUTE = "data-cs-color-scheme";

/**
 * Selector that switches to the dark color scheme when no other selector is given.
 * `[data-cs-theme="dark"]` is the dark attribute from before 0.2. It keeps working until 1.0.
 */
export const defaultDarkSelector = '[data-cs-color-scheme="dark"], [data-cs-theme="dark"]';

/** Selector that restores the light color scheme inside a dark subtree. Includes the attribute from before 0.2. */
export const defaultLightSelector = '[data-cs-color-scheme="light"], [data-cs-theme="light"]';

/**
 * Selector for the elements of one theme. The default theme also matches `:root`.
 * The `:root[...]` part outranks bare `:root` rules, so load order never matters.
 */
export function themeSelector(name: string): string {
  return name === defaultTheme.name
    ? `:root, [${THEME_ATTRIBUTE}="${name}"]`
    : `:root[${THEME_ATTRIBUTE}="${name}"], [${THEME_ATTRIBUTE}="${name}"]`;
}

function schemeTokens(theme: ThemeDefinition, scheme: ColorScheme): ColorSchemeTokens {
  return scheme === "light" ? theme.light : theme.dark;
}

/** Returns a theme's color, shadow and chart tokens in one color scheme, for example `{ "--cs-color-canvas": "#F4F5F7" }`. */
export function themeVariables(theme: ThemeDefinition, scheme: ColorScheme): Record<string, string>;
/** @deprecated Pass the theme too: `themeVariables(themes.default, scheme)`. */
export function themeVariables(scheme: ColorScheme): Record<string, string>;
export function themeVariables(themeOrScheme: ThemeDefinition | ColorScheme, scheme?: ColorScheme) {
  const theme = typeof themeOrScheme === "string" ? defaultTheme : themeOrScheme;
  const source = schemeTokens(theme, typeof themeOrScheme === "string" ? themeOrScheme : (scheme ?? "light"));
  const vars: Record<string, string> = {};
  for (const [name, value] of Object.entries(source.color)) vars[`--cs-color-${name}`] = value;
  for (const [name, value] of Object.entries(source.shadow)) vars[`--cs-shadow-${name}`] = value;
  for (const [name, value] of Object.entries(source.chart)) vars[`--cs-chart-${name}`] = value;
  return vars;
}

function groupVariables(groups: SharedOverrides | SharedTokens): Record<string, string> {
  const vars: Record<string, string> = {};
  for (const [group, values] of Object.entries(groups)) {
    for (const [name, value] of Object.entries(values ?? {})) vars[`--cs-${group}-${name}`] = value as string;
  }
  return vars;
}

/**
 * Returns the tokens that do not change with the color scheme, for example `{ "--cs-radius-md": "6px" }`,
 * and the sequential ramp. Defaults to the default theme.
 */
export function sharedVariables(theme: ThemeDefinition = defaultTheme): Record<string, string> {
  const vars = groupVariables(theme.shared);
  for (const [step, value] of Object.entries(theme.sequential)) vars[`--cs-chart-seq-${step}`] = value;
  return vars;
}

/** Every color scheme token of a theme with its light and dark value side by side, as the CSS declares them. */
export function schemeValueVariables(theme: ThemeDefinition): Record<string, string> {
  const perScheme = Object.fromEntries(colorSchemes.map((scheme) => [scheme, themeVariables(theme, scheme)]));
  const vars: Record<string, string> = {};
  for (const name of Object.keys(themeVariables(theme, "light"))) {
    for (const scheme of colorSchemes) vars[`${name}-${scheme}`] = perScheme[scheme]?.[name] ?? "";
  }
  return vars;
}

export interface RenderTokensCssOptions {
  /** Selector list that switches to the dark color scheme. */
  darkSelector?: string;
  /** Selector list that restores the light color scheme inside a dark subtree. */
  lightSelector?: string;
}

function block(selector: string, declarations: string[], indent = ""): string {
  const body = declarations.map((line) => `${indent}  ${line}`).join("\n");
  return `${indent}${selector} {\n${body}\n${indent}}`;
}

const declare = (vars: Record<string, string>) => Object.entries(vars).map(([name, value]) => `${name}: ${value};`);

/** A theme's own declarations: its name, its shared tokens and both color schemes' values. */
function themeDeclarations(theme: ThemeDefinition): string[] {
  return [`--cs-theme: ${theme.name};`, ...declare(sharedVariables(theme)), ...declare(schemeValueVariables(theme))];
}

/** Shared overrides behind `@supports`, for example larger radii where corners can be cut. */
function supportsBlocks(theme: ThemeDefinition, selector: string): string[] {
  return Object.entries(theme.supports ?? {}).map(
    ([condition, overrides]) =>
      `@supports ${condition} {\n${block(selector, declare(groupVariables(overrides)), "  ")}\n}`,
  );
}

/**
 * Renders the token CSS: the color scheme switches, the default theme and the final `--cs-*` tokens.
 *
 * Theme and color scheme are separate axes, and either can change on any element:
 * - Color scheme elements set two switches. In dark, `--cs-is-dark` is empty and `--cs-is-light` is `initial`.
 * - Theme elements declare each token's light and dark value side by side, such as `--cs-color-canvas-light`.
 * - Every element that changes either axis picks the final token:
 *   `var(--cs-is-dark, <light value>) var(--cs-is-light, <dark value>)`.
 *   An empty switch drops its half. An `initial` switch is invalid, so its half falls back to the value.
 * Switches and values inherit, so the closest theme and the closest color scheme always win.
 */
export function renderTokensCss(options: RenderTokensCssOptions = {}): string {
  const darkSelector = options.darkSelector ?? defaultDarkSelector;
  const lightSelector = options.lightSelector ?? defaultLightSelector;
  const finalNames = Object.keys(themeVariables(defaultTheme, "light"));
  const defaultSelector = themeSelector(defaultTheme.name);
  return [
    "/* Clawscale design tokens. Generated from @clawscale/tokens. Do not edit. */",
    block(`:root, ${lightSelector}`, ["color-scheme: light;", "--cs-is-light: ;", "--cs-is-dark: initial;"]),
    block(darkSelector, ["color-scheme: dark;", "--cs-is-light: initial;", "--cs-is-dark: ;"]),
    block(defaultSelector, themeDeclarations(defaultTheme)),
    ...supportsBlocks(defaultTheme, defaultSelector),
    block(
      `:root, [${THEME_ATTRIBUTE}], [${COLOR_SCHEME_ATTRIBUTE}], ${darkSelector}, ${lightSelector}`,
      finalNames.map((name) => `${name}: var(--cs-is-dark, var(${name}-light)) var(--cs-is-light, var(${name}-dark));`),
    ),
  ].join("\n\n");
}

/**
 * Renders the tokens of one more theme, scoped to `[data-cs-theme="<name>"]`.
 * It needs the CSS from `renderTokensCss`, which picks the final tokens.
 */
export function renderThemeCss(theme: ThemeDefinition): string {
  const selector = themeSelector(theme.name);
  return [
    `/* Clawscale ${theme.label} theme tokens. Generated from @clawscale/tokens. Do not edit. */`,
    block(selector, themeDeclarations(theme)),
    ...supportsBlocks(theme, selector),
  ].join("\n\n");
}
