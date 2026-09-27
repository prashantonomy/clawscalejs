---
name: release
description: Prepare a Clawscale release with Changesets. Use when asked to release, bump versions or write release notes.
---

# Release

1. Every user-facing change needs a changeset: `pnpm changeset`. Pick `@clawscale/react` and `@clawscale/tokens` (they release together), the bump type, and one crisp sentence.
2. Merging to `main` makes `.github/workflows/release.yml` open or update the "chore: release packages" pull request.
3. A steward reviews and merges that pull request. The workflow then publishes to npm with provenance and creates GitHub releases. It publishes only when the `NPM_PUBLISH` repository variable is `true`.

Agents never publish, never merge release pull requests and never create tags by hand.
