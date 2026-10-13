# @clawscale/react

## 0.2.0

### Minor Changes

- [#10](https://github.com/prashantonomy/clawscalejs/pull/10) [`fb30cb3`](https://github.com/prashantonomy/clawscalejs/commit/fb30cb37d35243a6e480d5ac12782a9165fb9f34) Thanks [@prashantonomy](https://github.com/prashantonomy)! - Add the Beak theme, with the colors of the Beak design system: warm graphite surfaces, one azure accent, and amber and coral for warnings and errors. Fonts, corners and density are the default theme's.
  
  - The dark color scheme uses Beak's colors as authored. Intent buttons and tags are lit with dark text, and hover adds light.
  - Beak has no light scheme of its own. The light color scheme keeps its hues on light grounds, with deeper intent colors that carry light text.
  - Charts: slots 1 to 4 hold Beak's four categorical hues, and slots 5 to 8 extend them. The sequential ramp is Beak's warm gray, so magnitude spends no hue.
  - Load `@clawscale/react/themes/beak.css` after `styles.css` and pass `defaultTheme="beak"`. `@clawscale/tokens` exports `beak`, adds `chartPalettes.beak` and ships `themes/beak.css`.

- [#3](https://github.com/prashantonomy/clawscalejs/pull/3) [`1177cfd`](https://github.com/prashantonomy/clawscalejs/commit/1177cfdeb24cf7efcafe1767e1f1a5bf2e098d57) Thanks [@prashantonomy](https://github.com/prashantonomy)! - Add themes and accents. A theme sets the whole look, an accent sets its primary color, and light and dark are now color schemes.
  
  - New `ledger` theme: crisp and dense, drawn the way Blueprint draws it, with IBM Plex Sans and IBM Plex Mono, 2 to 3px corners, Blueprint's grays and elevation, and a violet accent. Load `@clawscale/react/themes/ledger.css` after `styles.css` and pass `defaultTheme="ledger"`. `fonts.css` now also loads IBM Plex.
  - Accents: every theme lists accents people can pick. Default offers blue, violet and teal. Ledger offers violet, blue and teal. `useTheme` returns `accent` and `setAccent`, the provider takes `accent`, `defaultAccent`, `onAccentChange` and `accentStorageKey`, and `<html>` gets `data-cs-accent`.
  - `ClawscaleProvider` and `ThemeScript` manage the theme and the color scheme separately. `useTheme` returns `theme`, `setTheme`, `colorScheme`, `resolvedColorScheme` and `setColorScheme`.
  - `<html>` gets `data-cs-theme`, the theme name, and `data-cs-color-scheme`, light or dark. Both work on any element and nest.
  - New tokens: `--cs-corner-shape`, `--cs-label-transform` and `--cs-label-tracking`. Each color, shadow and chart token also has a `-light` and a `-dark` value to override.
  - `@clawscale/tokens` exports `themes`, `chartPalettes`, `renderThemeCss`, the `ThemeDefinition` type, the `violet`, `blue` and `teal` accents and the `themeAccents` and `withAccent` helpers, and ships `themes/ledger.css`.
  
  Fixes in every theme:
  
  - Intent icons, callout text, progress meters, spinners and editable text use Clawscale's intent colors instead of Blueprint's palette. Intent toasts keep Blueprint's fills, because Blueprint forces their button colors.
  - The label of an active menu item stays readable in dark.
  
  Breaking changes. The old names keep working until 1.0:
  
  - `theme`, `defaultTheme` and `onThemeChange` with light, dark or system become `colorScheme`, `defaultColorScheme` and `onColorSchemeChange`. Old values still set the color scheme and log a warning.
  - `resolvedTheme` becomes `resolvedColorScheme`, `setTheme("dark")` becomes `setColorScheme("dark")` and `storageKey` becomes `colorSchemeStorageKey`. A color scheme saved under `clawscale-theme` moves to `clawscale-color-scheme`.
  - The provider writes the theme name to `data-cs-theme`. CSS that selects `[data-cs-theme="dark"]` on `<html>` should select `[data-cs-color-scheme="dark"]`. Wrappers with `data-cs-theme="dark"` still switch to dark.
  - `@clawscale/tokens`: the `themes` list of light and dark is now `colorSchemes`. `Theme` and `ThemeTokens` are deprecated for `ColorScheme` and `ColorSchemeTokens`.
  - Clawscale's rules now sit in `@layer clawscale.base`, followed by `clawscale.themes`. `@layer blueprint, clawscale, app;` keeps working.

### Patch Changes

- [#1](https://github.com/prashantonomy/clawscalejs/pull/1) [`1fba7c3`](https://github.com/prashantonomy/clawscalejs/commit/1fba7c3f9bd5b67f4ec8d460a42f8d9194e09942) Thanks [@prashantonomy](https://github.com/prashantonomy)! - Show the README on the npm package pages and publish with provenance.

- [#8](https://github.com/prashantonomy/clawscalejs/pull/8) [`c96038e`](https://github.com/prashantonomy/clawscalejs/commit/c96038e5c00d4e6b4c5f941d61651cd09ebd300b) Thanks [@prashantonomy](https://github.com/prashantonomy)! - Unchecked radios no longer look checked when nothing in their group is checked, as in a RadioGroup without a value or a group of RadioCards.
- Updated dependencies [[`fb30cb3`](https://github.com/prashantonomy/clawscalejs/commit/fb30cb37d35243a6e480d5ac12782a9165fb9f34), [`1fba7c3`](https://github.com/prashantonomy/clawscalejs/commit/1fba7c3f9bd5b67f4ec8d460a42f8d9194e09942), [`1177cfd`](https://github.com/prashantonomy/clawscalejs/commit/1177cfdeb24cf7efcafe1767e1f1a5bf2e098d57)]:
  - @clawscale/tokens@0.2.0

## 0.1.0

Initial release: every Blueprint 6.20 component with the Clawscale theme, Next.js entry points, ClawscaleProvider, ThemeScript and the Metric, Delta, Sparkline, PropertyList and StatusBar patterns.
