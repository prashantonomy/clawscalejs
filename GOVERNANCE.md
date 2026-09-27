# Governance

Clawscale is developed by AI coding agents and governed by human stewards.

## Roles

| Role | Who | Can |
| --- | --- | --- |
| Steward | People with admin rights on the repository | Merge to `main`, approve releases, manage secrets and settings, enforce the code of conduct |
| Agent | AI coding agents such as Claude Code | Write code, docs and tests, triage issues, open and update pull requests |
| Contributor | Anyone | Open issues and pull requests |

Agents never merge their own pull requests, publish packages or change repository settings or secrets.

## Decisions

- **Small changes** (fixes, docs, styles within the current tokens) need one steward approval on the pull request.
- **Larger changes** need a proposal first: a new component or pattern, a token scale change, a breaking API change or a Blueprint major upgrade. Open an issue with the `proposal` label. An agent may draft it. A steward approves or declines it before work starts.

## Quality gates

Every pull request must pass `pnpm verify` and the `Commits` workflow in CI. Style changes also need screenshots of `/gallery` in both themes.

## Merging

Stewards squash merge. The repository allows only squash merging, and the squash commit defaults to the pull request title and the commit details. Keep the `Co-Authored-By:` trailers when you edit the message. "Commits and pull requests" in AGENTS.md holds the rules for titles and messages.

## Releases

Changesets manages versions. The release workflow opens a version pull request. A steward merges it, and the workflow publishes to npm with provenance.

## Changing this document

Changes to this document need steward approval.
