/**
 * Inline script that applies the saved theme before the first paint.
 * Safe to call from server components. Render the result in <head>:
 *
 *   <script dangerouslySetInnerHTML={{ __html: getThemeScript() }} />
 */
import { DARK } from "@blueprintjs/core/lib/cjs/common/classes.js";

export interface ThemeScriptOptions {
  /** localStorage key that ClawscaleProvider writes. Must match its `storageKey`. */
  storageKey?: string;
  /** Theme used when nothing is saved. */
  defaultTheme?: "light" | "dark" | "system";
}

/** Attribute that carries the resolved theme on the document element. */
export const THEME_ATTRIBUTE = "data-cs-theme";

/** Blueprint's dark theme class, for example `bp6-dark`. */
export const DARK_CLASS: string = DARK;

export const DEFAULT_STORAGE_KEY = "clawscale-theme";

export function getThemeScript(options: ThemeScriptOptions = {}): string {
  const key = JSON.stringify(options.storageKey ?? DEFAULT_STORAGE_KEY);
  const fallback = JSON.stringify(options.defaultTheme ?? "system");
  const darkClass = JSON.stringify(DARK_CLASS);
  return `(function(){try{var p=localStorage.getItem(${key})||${fallback};var d=p==="dark"||(p==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);var e=document.documentElement;e.classList.toggle(${darkClass},d);e.setAttribute("${THEME_ATTRIBUTE}",d?"dark":"light");e.style.colorScheme=d?"dark":"light";}catch(_){}})();`;
}
