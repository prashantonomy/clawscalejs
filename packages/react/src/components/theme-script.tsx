"use client";

import { getThemeScript, type ThemeScriptOptions } from "../theme-script.js";

export interface ThemeScriptProps extends ThemeScriptOptions {
  /** Nonce for a strict Content Security Policy. */
  nonce?: string;
}

/**
 * Applies the saved theme before the first paint. Render it inside `<head>` in your root layout.
 *
 * The server sends an executable script. The client renders it as inert `text/plain`,
 * which avoids React's warning about script tags without running it twice.
 */
export function ThemeScript({ nonce, ...options }: ThemeScriptProps) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      nonce={nonce}
      suppressHydrationWarning
      // biome-ignore lint/security/noDangerouslySetInnerHtml: the script is a static string built by getThemeScript.
      dangerouslySetInnerHTML={{ __html: getThemeScript(options) }}
    />
  );
}
