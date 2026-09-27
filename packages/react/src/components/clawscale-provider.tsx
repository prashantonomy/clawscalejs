"use client";

import { BlueprintProvider, type BlueprintProviderProps, FocusStyleManager } from "@blueprintjs/core";
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
import { DARK_CLASS, DEFAULT_STORAGE_KEY, THEME_ATTRIBUTE } from "../theme-script.js";

export type ThemePreference = "light" | "dark" | "system";
export type ResolvedTheme = "light" | "dark";

export interface ThemeContextValue {
  /** The saved preference. Can be "system". */
  theme: ThemePreference;
  /** The theme that is applied right now. */
  resolvedTheme: ResolvedTheme;
  /** Changes and saves the preference. */
  setTheme: (theme: ThemePreference) => void;
}

export interface ClawscaleProviderProps extends Omit<BlueprintProviderProps, "children"> {
  children?: ReactNode;
  /** Controlled theme preference. Leave unset to let the provider manage it. */
  theme?: ThemePreference;
  /**
   * Preference used before anything is saved.
   * @default "system"
   */
  defaultTheme?: ThemePreference;
  /** Called when `setTheme` runs. */
  onThemeChange?: (theme: ThemePreference) => void;
  /**
   * localStorage key for the saved preference. Pass `null` to skip saving.
   * @default "clawscale-theme"
   */
  storageKey?: string | null;
  /**
   * Put the theme class and attribute on the document element, so portals follow the theme.
   * @default true
   */
  applyToDocument?: boolean;
  /**
   * When focus rings show. "keyboard" hides them after mouse clicks, "always" keeps Blueprint's behavior.
   * @default "keyboard"
   */
  focusRings?: "keyboard" | "always";
}

const THEMES: readonly ThemePreference[] = ["light", "dark", "system"];
const MEDIA = "(prefers-color-scheme: dark)";

const fallbackContext: ThemeContextValue = {
  theme: "light",
  resolvedTheme: "light",
  setTheme: () => {},
};

const ThemeContext = createContext<ThemeContextValue>(fallbackContext);

function readStorage(key: string): ThemePreference | undefined {
  try {
    const value = window.localStorage.getItem(key);
    return THEMES.includes(value as ThemePreference) ? (value as ThemePreference) : undefined;
  } catch {
    return undefined;
  }
}

function subscribeToSystem(onChange: () => void) {
  const query = window.matchMedia(MEDIA);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function applyTheme(theme: ResolvedTheme) {
  const root = document.documentElement;
  root.classList.toggle(DARK_CLASS, theme === "dark");
  root.setAttribute(THEME_ATTRIBUTE, theme);
  root.style.colorScheme = theme;
}

/**
 * Root provider for Clawscale apps. Wraps Blueprint's `BlueprintProvider` (overlays,
 * hotkeys, portals) and manages the light, dark and system themes.
 */
export function ClawscaleProvider({
  children,
  theme: controlledTheme,
  defaultTheme = "system",
  onThemeChange,
  storageKey = DEFAULT_STORAGE_KEY,
  applyToDocument = true,
  focusRings = "keyboard",
  ...blueprintProps
}: ClawscaleProviderProps) {
  const isControlled = controlledTheme !== undefined;
  const [storedTheme, setStoredTheme] = useState<ThemePreference>(defaultTheme);
  // Stays false until the saved preference is read, so the first effect never
  // overwrites the theme that the inline theme script already applied.
  const [ready, setReady] = useState(isControlled);

  useEffect(() => {
    if (storageKey != null) {
      const saved = readStorage(storageKey);
      if (saved !== undefined) setStoredTheme(saved);
    }
    setReady(true);
  }, [storageKey]);

  useEffect(() => {
    if (storageKey == null) return;
    const onStorage = (event: StorageEvent) => {
      if (event.key !== storageKey) return;
      const next = readStorage(storageKey);
      if (next !== undefined) setStoredTheme(next);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [storageKey]);

  const systemDark = useSyncExternalStore(
    subscribeToSystem,
    () => window.matchMedia(MEDIA).matches,
    () => false,
  );

  const theme = isControlled ? controlledTheme : storedTheme;
  const resolvedTheme: ResolvedTheme = theme === "system" ? (systemDark ? "dark" : "light") : theme;

  useEffect(() => {
    if (ready && applyToDocument) applyTheme(resolvedTheme);
  }, [ready, applyToDocument, resolvedTheme]);

  useEffect(() => {
    if (focusRings === "always") FocusStyleManager.alwaysShowFocus();
    else FocusStyleManager.onlyShowFocusOnTabs();
  }, [focusRings]);

  const setTheme = useCallback(
    (next: ThemePreference) => {
      if (!isControlled) setStoredTheme(next);
      if (storageKey != null) {
        try {
          window.localStorage.setItem(storageKey, next);
        } catch {
          // Storage can be unavailable in private windows. The theme still applies.
        }
      }
      onThemeChange?.(next);
    },
    [isControlled, storageKey, onThemeChange],
  );

  const value = useMemo(() => ({ theme, resolvedTheme, setTheme }), [theme, resolvedTheme, setTheme]);

  return (
    <ThemeContext.Provider value={value}>
      <BlueprintProvider {...blueprintProps}>{children}</BlueprintProvider>
    </ThemeContext.Provider>
  );
}

/** Reads and changes the current theme. Returns a light no-op theme outside a provider. */
export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}
