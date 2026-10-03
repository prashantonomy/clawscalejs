/**
 * Inline script that applies the saved theme and color scheme before the first paint.
 * Safe to call from server components. Render the result in <head>:
 *
 *   <script dangerouslySetInnerHTML={{ __html: getThemeScript() }} />
 */
import { DARK } from "@blueprintjs/core/lib/cjs/common/classes.js";
import type { ThemeName } from "@clawscale/tokens";

/** A color scheme that is applied: light or dark. */
export type ColorScheme = "light" | "dark";

/** A saved color scheme preference. `system` follows the operating system. */
export type ColorSchemePreference = ColorScheme | "system";

export interface ThemeScriptOptions {
  /**
   * Theme used when nothing is saved. Must match the provider's `defaultTheme`.
   * @default "default"
   */
  defaultTheme?: ThemeName;
  /**
   * Color scheme used when nothing is saved. Must match the provider's `defaultColorScheme`.
   * @default "system"
   */
  defaultColorScheme?: ColorSchemePreference;
  /**
   * localStorage key for the theme. Must match the provider's `themeStorageKey`.
   * @default "clawscale-theme"
   */
  themeStorageKey?: string | null;
  /**
   * localStorage key for the color scheme. Must match the provider's `colorSchemeStorageKey`.
   * @default "clawscale-color-scheme"
   */
  colorSchemeStorageKey?: string | null;
  /** @deprecated Since 0.2, use `colorSchemeStorageKey`. */
  storageKey?: string | null;
}

/** Attribute that carries the theme on the document element, for example `futuristic`. */
export const THEME_ATTRIBUTE = "data-cs-theme";

/** Attribute that carries the resolved color scheme on the document element: `light` or `dark`. */
export const COLOR_SCHEME_ATTRIBUTE = "data-cs-color-scheme";

/** Blueprint's dark theme class, for example `bp6-dark`. */
export const DARK_CLASS: string = DARK;

export const DEFAULT_THEME = "default";
export const DEFAULT_COLOR_SCHEME: ColorSchemePreference = "system";
export const DEFAULT_THEME_STORAGE_KEY = "clawscale-theme";
export const DEFAULT_COLOR_SCHEME_STORAGE_KEY = "clawscale-color-scheme";

const PREFERENCES: readonly string[] = ["light", "dark", "system"];

/** True for `light`, `dark` and `system`. Before 0.2, these were theme names. */
export function isColorSchemePreference(value: unknown): value is ColorSchemePreference {
  return typeof value === "string" && PREFERENCES.includes(value);
}

/** The options after the names from before 0.2 are mapped to the current ones. */
export interface ResolvedThemeOptions {
  defaultTheme: ThemeName;
  defaultColorScheme: ColorSchemePreference;
  themeStorageKey: string | null;
  colorSchemeStorageKey: string | null;
}

/**
 * Maps options from before 0.2: `defaultTheme: "dark"` meant a color scheme, and `storageKey`
 * held the color scheme. Shared by the script and ClawscaleProvider, so both read the same keys.
 */
export function resolveThemeOptions(options: ThemeScriptOptions): ResolvedThemeOptions {
  const legacyDefault = isColorSchemePreference(options.defaultTheme) ? options.defaultTheme : undefined;
  const { storageKey } = options;
  return {
    defaultTheme: legacyDefault === undefined ? (options.defaultTheme ?? DEFAULT_THEME) : DEFAULT_THEME,
    defaultColorScheme: options.defaultColorScheme ?? legacyDefault ?? DEFAULT_COLOR_SCHEME,
    themeStorageKey:
      options.themeStorageKey !== undefined
        ? options.themeStorageKey
        : storageKey === null
          ? null
          : DEFAULT_THEME_STORAGE_KEY,
    colorSchemeStorageKey:
      options.colorSchemeStorageKey !== undefined
        ? options.colorSchemeStorageKey
        : storageKey !== undefined
          ? storageKey
          : DEFAULT_COLOR_SCHEME_STORAGE_KEY,
  };
}

export function getThemeScript(options: ThemeScriptOptions = {}): string {
  const resolved = resolveThemeOptions(options);
  const themeKey = JSON.stringify(resolved.themeStorageKey);
  const schemeKey = JSON.stringify(resolved.colorSchemeStorageKey);
  const theme = JSON.stringify(resolved.defaultTheme);
  const scheme = JSON.stringify(resolved.defaultColorScheme);
  const darkClass = JSON.stringify(DARK_CLASS);
  // Before 0.2, the theme key held light, dark or system. Such a value is read as the color scheme.
  return `(function(){var t=${theme},c=${scheme},p=["light","dark","system"];try{var s=${themeKey}&&localStorage.getItem(${themeKey}),k=${schemeKey}&&localStorage.getItem(${schemeKey});if(p.indexOf(s)>=0){k=k||s;s=null}if(s)t=s;if(p.indexOf(k)>=0)c=k}catch(_){}try{var d=c==="dark"||(c==="system"&&matchMedia("(prefers-color-scheme: dark)").matches),e=document.documentElement;e.classList.toggle(${darkClass},d);e.setAttribute("${THEME_ATTRIBUTE}",t);e.setAttribute("${COLOR_SCHEME_ATTRIBUTE}",d?"dark":"light");e.style.colorScheme=d?"dark":"light"}catch(_){}})();`;
}
