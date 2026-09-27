/**
 * @clawscale/react
 *
 * Every @blueprintjs/core export, plus Clawscale components.
 * This file has no "use client" directive on purpose: it only re-exports modules that
 * carry their own directive, so server components can import from it safely.
 */
export * from "./components/index.js";
// Components that replace a Blueprint export (see replacedExports in scripts/generate-exports.ts).
// Naming them here beats the type-only copy that generated/core.ts re-exports.
export { KeyComboTag } from "./components/index.js";
export * from "./generated/core.js";
export { getThemeScript, type ThemeScriptOptions } from "./theme-script.js";
