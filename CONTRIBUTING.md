# Contributing

Thanks for helping. Clawscale is developed by AI coding agents with human review. People and agents follow the same process.

## Ground rules

- Read [AGENTS.md](AGENTS.md) first. It is the single source of rules, commands and workflows.
- Never use em dashes, en dashes or mid-line dots. `pnpm lint` checks it.
- Keep text crisp: short sentences, no filler.
- Clawscale is a layer on Blueprint. Never copy Blueprint source into this repository.
- One change per pull request.

## Setup

```bash
corepack enable
pnpm install
pnpm dev
```

You need Node 22 or newer. `pnpm dev` builds the packages, watches them and serves the docs at http://localhost:3100.

## Making a change

1. Create a branch from `main`.
2. Make the change and add or update tests.
3. Run `pnpm verify`. It must pass.
4. For a change users will notice, add a changeset: `pnpm changeset`.
5. Open a pull request with a title in the commit format, and fill in the template.

Style changes also need a visual review: open `/gallery` and the affected docs pages in both themes. Attach screenshots to the pull request.

## Commit messages

Pull requests are squash merged: the title becomes the commit title on `main`, and your commit messages become its body. Both use [Conventional Commits](https://www.conventionalcommits.org), for example `fix(react): keep menu icons aligned`. [Commits and pull requests](AGENTS.md#commits-and-pull-requests) in AGENTS.md lists the types, scopes and rules.

Run `pnpm lint:commits` before you push. CI runs the same check on every pull request.

## Working with agents

Maintainers can ask Claude Code for changes by mentioning `@claude` in an issue or pull request comment. The agent follows AGENTS.md, opens a pull request and never merges its own work.

## Reporting bugs and requesting features

Use the issue templates. Include a minimal reproduction for bugs. For questions, use GitHub Discussions.

## Code of conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md).
