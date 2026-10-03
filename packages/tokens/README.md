# @clawscale/tokens

Clawscale design tokens for every theme, as CSS variables, JSON and typed JavaScript.

```bash
npm install @clawscale/tokens
```

## CSS

```css
@import "@clawscale/tokens/tokens.css";

.panel {
  background: var(--cs-color-surface);
  border: 1px solid var(--cs-color-border);
  border-radius: var(--cs-radius-lg);
}
```

`tokens.css` holds the default theme. Dark values apply under `[data-cs-color-scheme="dark"]`. Add `@clawscale/tokens/themes/futuristic.css` for the futuristic theme under `[data-cs-theme="futuristic"]`. `@clawscale/react/styles.css` already includes the default tokens.

## JavaScript

```ts
import { chartPalettes, dark, light, shared, themes } from "@clawscale/tokens";

light.color.primary; // "#3563E9", the default theme
themes.futuristic.dark.color.primary; // "#0FD4F1"
chartPalettes.futuristic.dark; // eight categorical colors in their fixed order
```

`renderThemeCss(theme)` turns a `ThemeDefinition` into CSS, so you can build your own theme.

`@clawscale/tokens/tokens.json` holds the same values for other tools.

Every text and intent color of every theme is tested for WCAG AA contrast, in both color schemes.

Docs: https://prashantonomy.github.io/clawscalejs/docs/core/tokens/

## License

Apache 2.0.
