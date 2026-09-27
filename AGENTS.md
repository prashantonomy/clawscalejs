# AGENTS.md

Guide for AI agents (and humans) working on Clawscale. Read it fully before changing anything.

## What Clawscale is

Clawscale is an open source React UI system for data-dense software. It is a **layer on top of Blueprint** (Palantir, Apache-2.0), never a fork:

- `@clawscale/react` re-exports every Blueprint component, adds `"use client"` for Next.js and ships a stylesheet that restyles Blueprint.
- `@clawscale/tokens` holds the design tokens (`--cs-*` CSS variables).
- Blueprint renders every component. Clawscale owns the tokens, the style layer, the import paths and a few original patterns.

## Hard rules

1. **No em dashes, en dashes or mid-line dots.** Not in docs, comments, UI copy, commit messages or PR text. `scripts/lint-prose.mjs` enforces it for files in CI and in a Claude Code hook, and `scripts/lint-commits.mjs` for commit messages and pull requests. Use a comma, colon, parentheses or a new sentence.
2. **Crisp text.** Short sentences. No filler, no marketing, no emoji.
3. **Never fork Blueprint.** Do not copy Blueprint source into this repo. Change behavior only through props, wrappers or CSS in the Clawscale layer.
4. **Users import from `@clawscale/*` only.** Docs, examples and the showcase never import `@blueprintjs/*` directly.
5. **Blueprint versions are pinned exactly** in `packages/react/package.json`, because its CSS is inlined into `dist/styles.css`. Upgrade them together (see "Upgrade Blueprint").
6. **TypeScript stays on 6.x.** `apps/docs/scripts/generate-props.ts` and Next.js type checking use the TypeScript JavaScript API, which TypeScript 7 does not ship.
7. **Run `pnpm check` before you finish.** Run `pnpm verify` when you touched styles, docs or the showcase.

## Repository map

```
packages/tokens/          @clawscale/tokens: src/tokens.ts is the source of truth for every --cs-* variable
packages/react/           @clawscale/react
  src/generated/          Generated "use client" re-exports of Blueprint. Do not edit. Run pnpm generate.
  src/components/         Clawscale components: provider, theme script, Metric, Delta, Sparkline, PropertyList, StatusBar
  src/styles/             The clawscale CSS layer. index.css lists every file in order.
  src/styles/generated/   Generated from Blueprint CSS (table grid lines, dark text colors). Do not edit. Run pnpm generate.
  src/common.ts           Server-safe constants (Classes, Intent, ...) for React Server Components
  src/sync-icons.ts       Opt-in synchronous icon loading for server rendering
  scripts/build-css.ts    Builds dist/styles.css: Blueprint in @layer blueprint, Clawscale in @layer clawscale
apps/docs/                Next.js 16 docs site (static export), showcase and gallery
  app/docs/**/page.mdx    Docs pages. lib/nav.ts orders them.
  examples/               One file per live example, shown with its source
  components/docs/        Docs UI: Example, Playground, PropsTable, CodeBlock, sidebar, search
  scripts/generate*.ts    Builds generated/docs-index.json and generated/props.json
  e2e/                    Playwright tests against the static export
scripts/prose.mjs         The forbidden characters, shared by both lints
scripts/lint-prose.mjs    Forbidden character lint for files
scripts/lint-commits.mjs  Commit message and pull request lint (see "Commits and pull requests")
.claude/                  Claude Code settings, hooks and skills
```

## Commands

| Command | What it does |
| --- | --- |
| `pnpm install` | Install everything. Node 22 or newer, pnpm 11. |
| `pnpm dev` | Build packages, then watch them and run the docs at http://localhost:3100 |
| `pnpm build` | Build `@clawscale/tokens` and `@clawscale/react` |
| `pnpm generate` | Regenerate Blueprint re-exports and docs data |
| `pnpm lint` | Biome plus the prose lint |
| `pnpm lint:commits` | Check the commit messages on your branch. Pass a range to check others, for example `pnpm lint:commits HEAD~3..HEAD`. |
| `pnpm typecheck` | TypeScript in every package |
| `pnpm test` | Unit tests (Vitest) |
| `pnpm check` | lint, build, typecheck and unit tests |
| `pnpm build:docs` | Static export of the docs to `apps/docs/out` |
| `pnpm test:e2e` | Playwright against the static export (run `pnpm build:docs` first) |
| `pnpm verify` | Everything above. CI runs this. |
| `pnpm test:audit` | Slower audits of every page in the static export: accessibility with axe, and colors Blueprint derived for its own palette in both themes. Run after a restyle or a Blueprint upgrade. |
| `pnpm clean` | Delete build output and caches. The Next.js dev cache in `apps/docs/.next` grows to several GB. |

Use `pnpm --filter <package> <script>` to target one package, for example `pnpm --filter @clawscale/docs dev`.

## How the style layer works

`dist/styles.css` declares two cascade layers: `blueprint` (normalize.css and all Blueprint CSS, unchanged) and then `clawscale`. A rule in a later layer beats every rule in an earlier layer, whatever the specificity.

That power cuts both ways. **Any rule in the clawscale layer beats every Blueprint rule**, including far more specific variant rules. So:

- Target Blueprint classes precisely. Restate variants instead of styling a base class broadly. Example: style `.bp6-button:not([class*="bp6-intent-"]):not(.bp6-minimal):not(.bp6-outlined)`, not `.bp6-button`.
- Never set properties Blueprint varies by context (for example `border-radius` on `.bp6-button`, which button groups override). Change the token instead.
- Never style bare elements that Blueprint components render (`a`, `button`, `input`, `li`, `table`). Exclude Blueprint classes, for example `a:not([class*="bp6-"])`.
- Only use `--cs-*` tokens for values. Both themes then work with one rule.
- Blueprint's own `!important` declarations beat every clawscale rule, because layer order flips for important declarations. A normal override of such a property is dead code. Set the `--bp-*` variable it reads instead, or leave it.
- Check third-party rules in Blueprint's sheets too. The datetime sheet includes react-day-picker's CSS, which fades days with `opacity`, not only `color`.
- Watch for colors Blueprint derives with a lightness shift, such as `oklch(from var(--bp-intent-warning-rest) calc(l + 0.19) c h)`. The shift suits Blueprint's palette, not always ours. Examples: Clawscale's amber turned warning tags almost white, and Blueprint's dark rules lighten typography colors that the bridge already themes. `generated/dark-text.css` restates the dark typography rules without the shift, inside the blueprint layer. Fix any other case with an override. A computed color in `oklch()` on a page usually means a derived color leaked through: our tokens compute to `rgb()`.

Order of precedence for a visual change:

1. Change a token in `packages/tokens/src/tokens.ts`.
2. Map a Blueprint token to a Clawscale token in `packages/react/src/styles/bridge.css`.
3. Add an override in `packages/react/src/styles/components/<area>.css`.

Consumers' own unlayered CSS always wins over both layers. That is a feature. Never use `!important`.

Dark mode: the `bp6-dark` class or `data-cs-theme="dark"` on an ancestor, usually `<html>`. `ClawscaleProvider` and `ThemeScript` manage both.

## Tasks

### Change a token

1. Edit `packages/tokens/src/tokens.ts`.
2. `pnpm --filter @clawscale/tokens test`. The tests enforce WCAG AA contrast for text and intents.
3. `pnpm build`, then review `/gallery` in both themes (see "Visual review").

### Restyle a Blueprint component

1. Find Blueprint's rules: `grep -o '[^}]*bp6-menu-item[^{]*{[^}]*}' packages/react/node_modules/@blueprintjs/core/lib/css/blueprint.css`.
2. Add precise overrides to the matching file in `packages/react/src/styles/components/`. Add a new file to `src/styles/index.css` if needed.
3. `pnpm build`, then review `/gallery` and the component's docs page in both themes.

### Add a Clawscale component

1. `packages/react/src/components/<name>.tsx` with `"use client"`, a props interface with JSDoc on every prop, and `ClawscaleClasses` constants.
2. Export it from `src/components/index.ts`. Styles go in `src/styles/clawscale/<name>.css` and `src/styles/index.css`.
3. Tests in `packages/react/test/`.
4. A docs page under `apps/docs/app/docs/patterns/`, an entry in `apps/docs/lib/nav.ts`, and a gallery entry.
5. A changeset: `pnpm changeset`.

### Replace a Blueprint export

Only for a real server rendering or accessibility bug, never for looks. Keep the name and the props type, so the change is drop-in. Example: `KeyComboTag`, which reads the platform while rendering.

1. Write the component in `packages/react/src/components/` and export it from `src/components/index.ts`.
2. Add the name to `replacedExports` in `scripts/generate-exports.ts`, then `pnpm generate`.
3. Name it in the explicit export line of `src/index.ts`. That beats the type-only copy from the generated file.
4. A test that fails when Blueprint fixes or changes the behavior you work around.

### Write or update a docs page

Pages mirror blueprintjs.com. Keep the structure:

````mdx
import TagBasic from "@/examples/core/tag/basic";
import TagPlayground from "@/examples/core/tag/playground";

export const metadata = { title: "Tag" };

# Tag

One or two sentences: what it is and when to use it.

## Usage

```tsx
import { Tag } from "@clawscale/react";
```

## Examples

### Basic

One sentence about what this example shows.

<Example name="core/tag/basic">
  <TagBasic />
</Example>

## Interactive playground

<Example name="core/tag/playground" variant="playground">
  <TagPlayground />
</Example>

## Props interface

<PropsTable name="TagProps" />
````

Rules for pages:

- The `# Title` matches the title in `lib/nav.ts`. Headings are sentence case.
- `Example`, `PropsTable`, `Callout` and `Tag` need no import in MDX. Examples do.
- `PropsTable` names must exist in `apps/docs/generated/props.json`. Run `pnpm --filter @clawscale/docs generate` and check.
- Link other pages with absolute paths that end in a slash, for example `[Popover](/docs/core/popover/)`.
- For a larger intro paragraph, wrap it in `<Lead>`. Never nest a multi-line `<p>` in MDX: MDX adds its own `<p>` inside, which breaks hydration.
- Write internal links as markdown or with Next.js `Link`. A raw `<a href="/...">` breaks under the GitHub Pages base path.

Rules for examples (`apps/docs/examples/<package>/<page>/<name>.tsx`):

- First line `"use client";`, then imports, then one default-exported component. The docs show the file without the directive.
- Import only from `@clawscale/react` (and its subpaths), `react` and, for playgrounds, `@/components/docs/playground`.
- Use realistic data-dense content: pipelines, regions, datasets, metrics. No "foo", no lorem ipsum.
- Keep examples under about 40 lines. One idea per example.
- Use `PopoverNext`, not the deprecated `Popover`.
- Overlays (Dialog, Drawer, Alert, Toast, Omnibar, Popover) open from a button with `useState`.
- Pass an explicit `name` to RadioGroup and label it with a FormGroup or `aria-label`, not its `label` prop, or React logs hydration warnings in development. Do not pass `id` to NumericInput: Blueprint keeps its step buttons' `aria-controls` on the generated id. Label it with `aria-label` instead. Section always generates its own ids; that dev warning is expected.
- Wide content (tables, forms, lists) uses `<Example name="..." align="start">`.
- Playgrounds use `usePlayground` and `Playground` from `@/components/docs/playground`.

### Upgrade Blueprint

1. Bump every `@blueprintjs/*` version in `packages/react/package.json` together, exact versions only.
2. `pnpm install && pnpm generate`.
3. If Blueprint changed its class namespace (for example `bp6-` to `bp7-`), replace the prefix across `packages/react/src/styles` and the docs, then fix `test/styles.test.ts`.
4. `pnpm verify`, then review `/gallery` and a few docs pages in both themes. Blueprint may have changed CSS we override.
5. Add a changeset that names the Blueprint version.

### Release

Changesets drives versions. Add one with `pnpm changeset` for any user-facing change. The release workflow opens a version PR; merging it publishes to npm. Publishing runs only when a steward has set the `NPM_PUBLISH` repository variable to `true`.

## Visual review

Run `pnpm dev`, open http://localhost:3100/gallery/ and toggle the theme with the navbar button. Take full-page screenshots in light and dark and look at them. Wait two seconds after load: tables and sliders measure the DOM after mount.

Without a browser tool: `pnpm build:docs && pnpm --filter @clawscale/docs screenshots` writes full-page PNGs of the gallery, showcase, landing page and a docs page in both themes to `apps/docs/screenshots/`. Open and inspect them.

## Commits and pull requests

Stewards squash merge every pull request. The title becomes the commit title on `main`, and the branch's commit messages become its body. Titles and commit messages share one format, based on [Conventional Commits](https://www.conventionalcommits.org):

```text
fix(react): render KeyComboTag the same on server and client

Blueprint reads navigator.platform while rendering. On Node 22 and
newer that is the build machine's platform, so the server and the
client rendered different keys. Render a fixed platform on the
server and during hydration, then switch to the visitor's.

Co-Authored-By: Claude <noreply@anthropic.com>
```

| Type | Use for |
| --- | --- |
| `feat` | A new component, prop, token or docs feature |
| `fix` | A bug fix, including a visual fix in the style layer |
| `perf` | The same behavior, faster or smaller |
| `refactor` | Code that changes no behavior |
| `docs` | Docs pages, examples, READMEs and guides such as this one |
| `test` | Tests only |
| `build` | Build scripts and package configuration |
| `ci` | GitHub workflows |
| `chore` | Dependencies, tooling, releases and anything else |
| `revert` | Undoing an earlier commit. The `Revert "..."` title Git writes also passes. |

There is no `style` type. A CSS change is a `feat` or a `fix`.

| Scope | Use for |
| --- | --- |
| `tokens` | `packages/tokens` |
| `react` | `packages/react` |
| `docs` | Code in `apps/docs`. Docs content takes the `docs` type and no scope. |
| `deps` | Dependency updates, for example `chore(deps): bump vitest from 4.1.1 to 4.1.2` |

Leave the scope out when a change spans the repository.

- **Title.** The subject after the colon is a lowercase command: `add`, not `Added` or `adds`. No period at the end. The whole title is 72 characters or fewer.
- **Breaking change.** Add `!` before the colon, for example `feat(react)!: rename the Metric value prop`, and explain the migration in the body. The changeset, not the commit, sets the version bump.
- **Body.** Leave a blank line after the title. Say what changed and why, not how. Wrap lines at 72 characters. Skip the body when the title says it all.
- **Attribution.** An agent ends every commit message with a `Co-Authored-By:` trailer that names it.
- **Commits.** One logical change each. Commit generated files, such as `packages/react/src/generated/`, with the change that regenerated them. Never commit to `main` directly.
- **Pull requests.** One change each. Update the title when the change grows. Fill in the template and link the issue, for example `Closes #123`. A user-facing change needs a changeset in the same pull request.

Run `pnpm lint:commits` before you push. It checks the commits on your branch that `main` lacks: type, scope, lowercase subject, final period, title length, the blank line and forbidden characters. After a push, rewording a commit takes a force push. On every pull request, `.github/workflows/commits.yml` runs the same checks on the commits and the title, and scans the description for forbidden characters. Dependabot pull requests skip it, because `.github/dependabot.yml` gives them the `chore(deps)` prefix.

Agents never merge. A steward squash merges and keeps the `Co-Authored-By:` trailers.

## Next.js notes

The docs use Next.js 16.3. It differs from older versions in your training data. Read the relevant guide in `apps/docs/node_modules/next/dist/docs/` before changing Next.js code. `next dev` writes `apps/docs/AGENTS.md` and `apps/docs/CLAUDE.md` when it detects an agent; both are git-ignored on purpose.

If a docs page that exists returns 404 in development after many files changed at once, the dev server lost track of it. Restart `pnpm dev`.

## Known limitations

- Some Blueprint components generate ids with a module counter (NumericInput, RadioGroup, Section, Select, Suggest, MultiSelect, QueryList, DateInput, TimePicker, Dialog). In development, React logs attribute mismatch warnings after server rendering. They are harmless and do not appear in production.
- Blueprint's legacy `Popover` mispositions under React 19. Use `PopoverNext`. Blueprint's own components already do.
