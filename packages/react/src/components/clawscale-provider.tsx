"use client";

import { BlueprintProvider, type BlueprintProviderProps, FocusStyleManager } from "@blueprintjs/core";
import type { ThemeName } from "@clawscale/tokens";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import {
  COLOR_SCHEME_ATTRIBUTE,
  type ColorScheme,
  type ColorSchemePreference,
  DARK_CLASS,
  DEFAULT_THEME,
  isColorSchemePreference,
  resolveThemeOptions,
  THEME_ATTRIBUTE,
} from "../theme-script.js";

/** @deprecated Since 0.2, use `ColorSchemePreference`. */
export type ThemePreference = ColorSchemePreference;

/** @deprecated Since 0.2, use `ColorScheme`. */
export type ResolvedTheme = ColorScheme;

export interface ThemeContextValue {
  /** The theme, for example `"default"` or `"futuristic"`. */
  theme: ThemeName;
  /** Changes and saves the theme. */
  setTheme: (theme: ThemeName) => void;
  /** The saved color scheme preference. Can be `"system"`. */
  colorScheme: ColorSchemePreference;
  /** The color scheme that is applied right now: `"light"` or `"dark"`. */
  resolvedColorScheme: ColorScheme;
  /** Changes and saves the color scheme preference. */
  setColorScheme: (colorScheme: ColorSchemePreference) => void;
  /** @deprecated Since 0.2, use `resolvedColorScheme`. */
  resolvedTheme: ColorScheme;
}

export interface ClawscaleProviderProps extends Omit<BlueprintProviderProps, "children"> {
  children?: ReactNode;
  /** Controlled theme, for example `"futuristic"`. Leave unset to let the provider manage it. */
  theme?: ThemeName;
  /**
   * Theme used before anything is saved.
   * @default "default"
   */
  defaultTheme?: ThemeName;
  /** Called when `setTheme` runs. */
  onThemeChange?: (theme: ThemeName) => void;
  /** Controlled color scheme preference. Leave unset to let the provider manage it. */
  colorScheme?: ColorSchemePreference;
  /**
   * Color scheme preference used before anything is saved.
   * @default "system"
   */
  defaultColorScheme?: ColorSchemePreference;
  /** Called when `setColorScheme` runs. */
  onColorSchemeChange?: (colorScheme: ColorSchemePreference) => void;
  /**
   * localStorage key for the theme. Pass `null` to skip saving it.
   * @default "clawscale-theme"
   */
  themeStorageKey?: string | null;
  /**
   * localStorage key for the color scheme. Pass `null` to skip saving it.
   * @default "clawscale-color-scheme"
   */
  colorSchemeStorageKey?: string | null;
  /** @deprecated Since 0.2, use `colorSchemeStorageKey`. `null` turns off saving for both keys. */
  storageKey?: string | null;
  /**
   * Put the theme and color scheme on the document element, so portals follow them.
   * @default true
   */
  applyToDocument?: boolean;
  /**
   * When focus rings show. "keyboard" hides them after mouse clicks, "always" keeps Blueprint's behavior.
   * @default "keyboard"
   */
  focusRings?: "keyboard" | "always";
}

const MEDIA = "(prefers-color-scheme: dark)";

const fallbackContext: ThemeContextValue = {
  theme: DEFAULT_THEME,
  setTheme: () => {},
  colorScheme: "light",
  resolvedColorScheme: "light",
  setColorScheme: () => {},
  resolvedTheme: "light",
};

const ThemeContext = createContext<ThemeContextValue>(fallbackContext);

const warnings = new Set<string>();

/** Warns about a misconfiguration or a name from before 0.2, once per message. */
function warnOnce(message: string) {
  if (warnings.has(message)) return;
  warnings.add(message);
  console.warn(`Clawscale: ${message}`);
}

function readStorage(key: string | null): string | null {
  if (key == null) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(key: string | null, value: string | null) {
  if (key == null) return;
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    // Storage can be unavailable in private windows. The theme still applies.
  }
}

/**
 * Reads the saved theme and color scheme. Before 0.2, the theme key held light, dark or system.
 * Such a value moves to the color scheme key, like ThemeScript reads it.
 */
function readSaved(themeKey: string | null, schemeKey: string | null) {
  let theme = readStorage(themeKey);
  let colorScheme = readStorage(schemeKey);
  if (isColorSchemePreference(theme)) {
    if (!isColorSchemePreference(colorScheme)) {
      colorScheme = theme;
      writeStorage(schemeKey, theme);
    }
    writeStorage(themeKey, null);
    theme = null;
  }
  return {
    theme: theme || undefined,
    colorScheme: isColorSchemePreference(colorScheme) ? colorScheme : undefined,
  };
}

function subscribeToSystem(onChange: () => void) {
  const query = window.matchMedia(MEDIA);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function applyToRoot(theme: ThemeName, colorScheme: ColorScheme) {
  const root = document.documentElement;
  root.classList.toggle(DARK_CLASS, colorScheme === "dark");
  root.setAttribute(THEME_ATTRIBUTE, theme);
  root.setAttribute(COLOR_SCHEME_ATTRIBUTE, colorScheme);
  root.style.colorScheme = colorScheme;
}

/**
 * Root provider for Clawscale apps. Wraps Blueprint's `BlueprintProvider` (overlays,
 * hotkeys, portals) and manages the theme and the light, dark and system color schemes.
 */
export function ClawscaleProvider({
  children,
  theme: themeProp,
  defaultTheme,
  onThemeChange,
  colorScheme: colorSchemeProp,
  defaultColorScheme,
  onColorSchemeChange,
  themeStorageKey,
  colorSchemeStorageKey,
  storageKey,
  applyToDocument = true,
  focusRings = "keyboard",
  ...blueprintProps
}: ClawscaleProviderProps) {
  // Before 0.2, `theme` was the color scheme. Such a value still controls the color scheme.
  const legacyTheme = isColorSchemePreference(themeProp) ? themeProp : undefined;
  const controlledTheme = legacyTheme === undefined ? themeProp : undefined;
  const controlledColorScheme = colorSchemeProp ?? legacyTheme;
  const colorSchemeChange =
    onColorSchemeChange ??
    (legacyTheme === undefined ? undefined : (onThemeChange as ((value: ColorSchemePreference) => void) | undefined));
  const options = resolveThemeOptions({
    defaultTheme,
    defaultColorScheme,
    themeStorageKey,
    colorSchemeStorageKey,
    storageKey,
  });
  const themeKey = options.themeStorageKey;
  const colorSchemeKey = options.colorSchemeStorageKey;

  useEffect(() => {
    if (legacyTheme !== undefined) {
      warnOnce(`theme="${legacyTheme}" is a color scheme. Since 0.2, pass colorScheme="${legacyTheme}".`);
    }
    if (isColorSchemePreference(defaultTheme)) {
      warnOnce(
        `defaultTheme="${defaultTheme}" is a color scheme. Since 0.2, pass defaultColorScheme="${defaultTheme}".`,
      );
    }
    if (storageKey !== undefined) warnOnce("storageKey is deprecated. Since 0.2, pass colorSchemeStorageKey.");
  }, [legacyTheme, defaultTheme, storageKey]);

  const [storedTheme, setStoredTheme] = useState<ThemeName>(options.defaultTheme);
  const [storedColorScheme, setStoredColorScheme] = useState<ColorSchemePreference>(options.defaultColorScheme);
  // Stays false until the saved values are read, so the first effect never overwrites
  // what the inline theme script already applied.
  const [ready, setReady] = useState(controlledTheme !== undefined && controlledColorScheme !== undefined);

  useEffect(() => {
    const saved = readSaved(themeKey, colorSchemeKey);
    if (saved.theme !== undefined) setStoredTheme(saved.theme);
    if (saved.colorScheme !== undefined) setStoredColorScheme(saved.colorScheme);
    setReady(true);
  }, [themeKey, colorSchemeKey]);

  useEffect(() => {
    if (themeKey == null && colorSchemeKey == null) return;
    const onStorage = (event: StorageEvent) => {
      if (event.key !== themeKey && event.key !== colorSchemeKey) return;
      const saved = readSaved(themeKey, colorSchemeKey);
      if (saved.theme !== undefined) setStoredTheme(saved.theme);
      if (saved.colorScheme !== undefined) setStoredColorScheme(saved.colorScheme);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [themeKey, colorSchemeKey]);

  const systemDark = useSyncExternalStore(
    subscribeToSystem,
    () => window.matchMedia(MEDIA).matches,
    () => false,
  );

  const theme = controlledTheme ?? storedTheme;
  const colorScheme = controlledColorScheme ?? storedColorScheme;
  const resolvedColorScheme: ColorScheme = colorScheme === "system" ? (systemDark ? "dark" : "light") : colorScheme;

  useEffect(() => {
    if (ready && applyToDocument) applyToRoot(theme, resolvedColorScheme);
  }, [ready, applyToDocument, theme, resolvedColorScheme]);

  // A theme's tokens set --cs-theme to its name. Without its stylesheet, the default theme shows.
  useEffect(() => {
    if (!ready || !applyToDocument || theme === DEFAULT_THEME) return;
    const timer = window.setTimeout(() => {
      const loaded = getComputedStyle(document.documentElement).getPropertyValue("--cs-theme").trim();
      if (loaded !== theme) {
        warnOnce(
          `no styles found for the "${theme}" theme. Import @clawscale/react/themes/${theme}.css, or the stylesheet that defines it.`,
        );
      }
    }, 1000);
    return () => window.clearTimeout(timer);
  }, [ready, applyToDocument, theme]);

  useEffect(() => {
    if (focusRings === "always") FocusStyleManager.alwaysShowFocus();
    else FocusStyleManager.onlyShowFocusOnTabs();
  }, [focusRings]);

  const setColorScheme = useCallback(
    (next: ColorSchemePreference) => {
      if (controlledColorScheme === undefined) setStoredColorScheme(next);
      writeStorage(colorSchemeKey, next);
      colorSchemeChange?.(next);
    },
    [controlledColorScheme, colorSchemeKey, colorSchemeChange],
  );

  const setTheme = useCallback(
    (next: ThemeName) => {
      if (isColorSchemePreference(next)) {
        warnOnce(`setTheme("${next}") sets the color scheme. Since 0.2, call setColorScheme("${next}").`);
        setColorScheme(next);
        return;
      }
      if (controlledTheme === undefined) setStoredTheme(next);
      writeStorage(themeKey, next);
      onThemeChange?.(next);
    },
    [controlledTheme, themeKey, onThemeChange, setColorScheme],
  );

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      colorScheme,
      resolvedColorScheme,
      setColorScheme,
      resolvedTheme: resolvedColorScheme,
    }),
    [theme, setTheme, colorScheme, resolvedColorScheme, setColorScheme],
  );

  return (
    <ThemeContext.Provider value={value}>
      <BlueprintProvider {...blueprintProps}>{children}</BlueprintProvider>
    </ThemeContext.Provider>
  );
}

/** Reads and changes the theme and color scheme. Outside a provider, returns the default theme in light and setters that do nothing. */
export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
