# @clawscale/tokens

Clawscale design tokens as CSS variables, JSON and typed JavaScript.

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

Dark values apply under `[data-cs-theme="dark"]`. `@clawscale/react/styles.css` already includes these tokens.

## JavaScript

```ts
import { chartPalette, dark, light, shared } from "@clawscale/tokens";

light.color.primary; // "#3563E9"
chartPalette.dark; // eight categorical colors in their fixed order
```

`@clawscale/tokens/tokens.json` holds the same values for other tools.

Every text and intent color is tested for WCAG AA contrast.

Docs: https://clawscale.github.io/clawscale/docs/core/tokens/

## License

Apache 2.0.
