# @clawscale/react

Clawscale for React: every Blueprint component with a refined look, ready for Next.js.

```bash
npm install @clawscale/react
```

```tsx
import "@clawscale/react/styles.css";
import "@clawscale/react/fonts.css";
import { Button, ClawscaleProvider } from "@clawscale/react";

export function App() {
  return (
    <ClawscaleProvider>
      <Button intent="primary" text="Run now" />
    </ClawscaleProvider>
  );
}
```

## Entry points

| Import | Contents |
| --- | --- |
| `@clawscale/react` | Core components, hooks and Clawscale patterns |
| `@clawscale/react/select` | Select, Suggest, MultiSelect, Omnibar, QueryList |
| `@clawscale/react/datetime` | Date and time pickers and inputs |
| `@clawscale/react/table` | The spreadsheet-like Table |
| `@clawscale/react/icons` | Icon names, icon components and the icon loader |
| `@clawscale/react/common` | Constants that are safe in React Server Components |
| `@clawscale/react/sync-icons` | Synchronous icon loading for server rendering |
| `@clawscale/react/styles.css` | Every style, in `@layer blueprint` and `@layer clawscale` |
| `@clawscale/react/fonts.css` | Inter and JetBrains Mono |

This package pins exact Blueprint versions because its stylesheet is built against them. Do not install `@blueprintjs/*` next to it.

Docs: https://prashantonomy.github.io/clawscalejs/docs/

## License

Apache 2.0. Includes Blueprint by Palantir Technologies (Apache 2.0) and normalize.css (MIT). See NOTICE.
