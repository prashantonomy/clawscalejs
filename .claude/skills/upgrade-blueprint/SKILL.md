---
name: upgrade-blueprint
description: Upgrade the pinned Blueprint packages in Clawscale, regenerate the re-exports and fix any style or docs drift. Use when a new Blueprint version is available or when the blueprint-upgrade workflow runs.
---

# Upgrade Blueprint

1. `node scripts/check-blueprint.mjs` lists the new versions.
2. In `packages/react/package.json`, set every `@blueprintjs/*` dependency to its latest exact version. Keep `@blueprintjs/colors` in step with what `@blueprintjs/core` depends on.
3. `pnpm install && pnpm generate && pnpm build`.
4. `pnpm --filter @clawscale/react test`. Failures point at drift:
   - generated exports changed: already regenerated, review the diff for new components;
   - class namespace changed (for example `bp6-` to `bp7-`): replace the prefix in `packages/react/src/styles`, `apps/docs` and tests;
   - a bridged `--bp-*` token disappeared: update `bridge.css`.
5. Read Blueprint's changelog for the new versions. For each new or changed component, check `/gallery` and its docs page in both themes, and add or update docs pages and nav entries for new components.
6. `pnpm verify`, then `pnpm test:audit`. The color audit flags any new Blueprint color derived for Blueprint's palette. Fix each with an override, or regenerate and review `generated/dark-text.css`.
7. Add a changeset that names the new Blueprint version, then open a pull request titled `chore(deps): upgrade Blueprint to <version>`.
