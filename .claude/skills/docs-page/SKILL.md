---
name: docs-page
description: Write or update a Clawscale docs page with live examples, an interactive playground and generated props tables, matching the blueprintjs.com layout. Use when adding a page for a component or pattern, or when editing docs content.
---

# Write a docs page

1. Read "Write or update a docs page" in AGENTS.md and the reference page `apps/docs/app/docs/core/buttons/page.mdx` with its examples in `apps/docs/examples/core/buttons/`.
2. Check the component API in its type declarations before using a prop. Blueprint: `packages/react/node_modules/@blueprintjs/*/lib/esm/**/*.d.ts`. Clawscale: `packages/react/src/components/`. Skip props marked `@deprecated`.
3. Write one file per example in `apps/docs/examples/<package>/<page>/`. Helper modules start with an underscore.
4. Write the page at `apps/docs/app/docs/<path>/page.mdx`: title, one or two sentences, Usage, Examples, an Interactive playground when the component has several visual props, Props interface.
5. New page? Add it to `apps/docs/lib/nav.ts`.
6. Run `pnpm --filter @clawscale/docs generate`, then `pnpm --filter @clawscale/docs test` and `pnpm --filter @clawscale/docs typecheck`.
7. With `pnpm dev` running, open the page in both themes and read it once more for crisp text.

Never use em dashes, en dashes or mid-line dots. Use realistic data-dense content.
