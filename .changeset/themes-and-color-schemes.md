---
"@clawscale/react": minor
"@clawscale/tokens": minor
---

Add themes, starting with a futuristic theme. Light and dark are now color schemes.

- New `futuristic` theme: a heads-up display with Oxanium, cut corners, cyan light, capital labels and glowing readouts. Load `@clawscale/react/themes/futuristic.css` after `styles.css` and pass `defaultTheme="futuristic"`.
- `ClawscaleProvider` and `ThemeScript` manage the theme and the color scheme separately. `useTheme` returns `theme`, `setTheme`, `colorScheme`, `resolvedColorScheme` and `setColorScheme`.
- `<html>` gets `data-cs-theme`, the theme name, and `data-cs-color-scheme`, light or dark. Both work on any element and nest.
- New tokens: `--cs-corner-shape`, `--cs-label-transform` and `--cs-label-tracking`. Each color, shadow and chart token also has a `-light` and a `-dark` value to override.
- `@clawscale/tokens` exports `themes`, `chartPalettes`, `renderThemeCss` and the `ThemeDefinition` type, and ships `themes/futuristic.css`.

Fixes in every theme:

- Intent icons, callout text, progress meters, spinners and editable text use Clawscale's intent colors instead of Blueprint's palette. Intent toasts keep Blueprint's fills, because Blueprint forces their button colors.
- The label of an active menu item stays readable in dark.

Breaking changes. The old names keep working until 1.0:

- `theme`, `defaultTheme` and `onThemeChange` with light, dark or system become `colorScheme`, `defaultColorScheme` and `onColorSchemeChange`. Old values still set the color scheme and log a warning.
- `resolvedTheme` becomes `resolvedColorScheme`, `setTheme("dark")` becomes `setColorScheme("dark")` and `storageKey` becomes `colorSchemeStorageKey`. A color scheme saved under `clawscale-theme` moves to `clawscale-color-scheme`.
- The provider writes the theme name to `data-cs-theme`. CSS that selects `[data-cs-theme="dark"]` on `<html>` should select `[data-cs-color-scheme="dark"]`. Wrappers with `data-cs-theme="dark"` still switch to dark.
- `@clawscale/tokens`: the `themes` list of light and dark is now `colorSchemes`. `Theme` and `ThemeTokens` are deprecated for `ColorScheme` and `ColorSchemeTokens`.
- Clawscale's rules now sit in `@layer clawscale.base`, followed by `clawscale.themes`. `@layer blueprint, clawscale, app;` keeps working.
