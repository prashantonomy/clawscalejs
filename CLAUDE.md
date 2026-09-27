@AGENTS.md

## Claude Code

- Skills in `.claude/skills/`: `docs-page` (write a docs page), `restyle-component`, `upgrade-blueprint`, `release`.
- A PostToolUse hook runs `scripts/lint-prose.mjs` on every file you edit. If it reports a forbidden character, fix it before continuing.
- Long-running servers (`pnpm dev`) belong in the background. Wait for http://localhost:3100 before taking screenshots.
