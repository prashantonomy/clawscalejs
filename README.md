<p align="center">
  <img src="apps/docs/public/favicon.svg" width="72" height="72" alt="Clawscale logo" />
</p>

<h1 align="center">Clawscale</h1>

<p align="center">A React UI system for data-dense software. Built on Blueprint.</p>

<p align="center">
  <a href="https://github.com/prashantonomy/clawscalejs/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/prashantonomy/clawscalejs/actions/workflows/ci.yml/badge.svg" /></a>
  <a href="https://www.npmjs.com/package/@clawscale/react"><img alt="npm" src="https://img.shields.io/npm/v/@clawscale/react" /></a>
  <a href="LICENSE"><img alt="License: Apache 2.0" src="https://img.shields.io/badge/license-Apache%202.0-blue" /></a>
</p>

<p align="center">
  <a href="https://prashantonomy.github.io/clawscalejs/docs/">Documentation</a> |
  <a href="https://prashantonomy.github.io/clawscalejs/showcase/">Showcase</a> |
  <a href="CONTRIBUTING.md">Contributing</a>
</p>

---

Clawscale keeps [Blueprint](https://blueprintjs.com)'s components, APIs and principles, and gives them a refined look. It is built for dashboards, consoles and tools where a screen holds a lot of data.

- **Every Blueprint component** from one package: core, select, datetime, table and icons.
- **Two themes.** Default is calm and neutral. Futuristic is a heads-up display: cut corners, cyan light, capital labels and glowing readouts.
- **Light, dark and system color schemes** for every theme, tested for WCAG AA contrast.
- **Next.js ready.** Components carry `"use client"`, render on the server and apply the theme before the first paint.
- **Patterns for dense screens:** `Metric`, `Delta`, `Sparkline`, `PropertyList` and `StatusBar`.
- **Chart tokens** with a categorical palette validated for color vision deficiency.

## Quick start

```bash
npm install @clawscale/react
```

```tsx
import "@clawscale/react/styles.css";
import "@clawscale/react/fonts.css";
import { Button, Card, ClawscaleProvider, H5 } from "@clawscale/react";

export function App() {
  return (
    <ClawscaleProvider>
      <Card>
        <H5>Nightly export</H5>
        <Button intent="primary" icon="play" text="Run now" />
      </Card>
    </ClawscaleProvider>
  );
}
```

Using Next.js? Follow the [Next.js guide](https://prashantonomy.github.io/clawscalejs/docs/nextjs/) for the theme script and server rendering.

### The futuristic theme

Load its stylesheet and pick it on the provider.

```tsx
import "@clawscale/react/styles.css";
import "@clawscale/react/themes/futuristic.css";
import "@clawscale/react/fonts.css";

<ClawscaleProvider defaultTheme="futuristic">{children}</ClawscaleProvider>;
```

See [Themes](https://prashantonomy.github.io/clawscalejs/docs/themes/) to let people switch, scope a theme or build your own.

## Packages

| Package | Contents |
| --- | --- |
| [`@clawscale/react`](packages/react) | Components, styles, themes and patterns. Subpaths: `/select`, `/datetime`, `/table`, `/icons`, `/common`, `/sync-icons`. |
| [`@clawscale/tokens`](packages/tokens) | Design tokens for every theme as CSS variables, JSON and TypeScript. |

## How it works

Clawscale is a layer on top of Blueprint, NOT a fork:

1. `@clawscale/react` re-exports Blueprint and adds `"use client"` entry points.
2. `styles.css` puts Blueprint's CSS in `@layer blueprint` and Clawscale's in `@layer clawscale`, so Clawscale wins without specificity tricks and your own CSS wins over both. Theme stylesheets add a later sublayer.
3. Blueprint's `--bp-*` tokens point at Clawscale's `--cs-*` tokens. Change a token, or the theme, and every component follows.

Blueprint versions are pinned and upgraded together with the styles, so what you install is what was tested.

## Maintained by AI agents

Clawscale is developed and maintained by AI coding agents such as Claude Code, with human review. The repository is set up for them:

- [`AGENTS.md`](AGENTS.md) holds every rule, command and workflow in one place.
- `pnpm verify` runs every check: lint, types, unit tests, the docs build and end-to-end tests.
- Tests guard contrast, export parity with Blueprint, style layer rules and every docs page.
- GitHub workflows let maintainers ask `@claude` for changes on issues and pull requests.

See [GOVERNANCE.md](GOVERNANCE.md) for how decisions and releases work.

## Development

```bash
pnpm install
pnpm dev      # packages in watch mode and the docs at http://localhost:3100
pnpm verify   # everything CI runs
```

Requires Node 22 or newer and pnpm 11.

## License

[Apache 2.0](LICENSE). Clawscale includes Blueprint by Palantir Technologies (Apache 2.0) and normalize.css (MIT). See [NOTICE](NOTICE).
