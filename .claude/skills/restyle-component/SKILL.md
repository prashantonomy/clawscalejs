---
name: restyle-component
description: Change how a Blueprint component looks in Clawscale through tokens, the bridge, a precise override in the clawscale CSS layer or a theme's own rules. Use for any visual change to buttons, inputs, menus, tables or other components.
---

# Restyle a component

1. Read "How the style layer works" in AGENTS.md. Any rule in the clawscale layer beats every Blueprint rule.
2. Prefer, in order: a token in `packages/tokens/src/tokens.ts` (or a theme file such as `futuristic.ts`), a mapping in `packages/react/src/styles/bridge.css`, an override in `packages/react/src/styles/components/<area>.css`. A change for one theme only goes in `packages/react/src/styles/themes/<name>/`.
3. Find the Blueprint rules you are overriding:
   `grep -o '[^}]*bp6-<class>[^{]*{[^}]*}' packages/react/node_modules/@blueprintjs/core/lib/css/blueprint.css`
4. Mirror Blueprint's variant selectors (intent, minimal, outlined, active, disabled, dark). Never style a base class broadly, never set `border-radius` on `.bp6-button`, never use `!important`, only use `--cs-*` values.
5. Check the futuristic theme's rules for the component in `packages/react/src/styles/themes/futuristic/`. Theme rules sit in a later layer and win over base overrides.
6. `pnpm build`, then `pnpm --filter @clawscale/react test` (it checks token names, the class namespace and bare element selectors, in the base layer and every theme).
7. Visual review: `pnpm dev`, open http://localhost:3100/gallery/ and the component's docs page, take full-page screenshots in both themes and both color schemes and look at them.
8. `pnpm build:docs && pnpm test:audit`. The color audit catches colors Blueprint derives for its own palette, which can wash out Clawscale's.
9. Add a changeset: `pnpm changeset`.
