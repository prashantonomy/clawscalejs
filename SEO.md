# SEO: Clawscale docs

`~/pensievelabs/seo/MASTER.md` (GitHub `prashantonomy/pensievelabs`, folder `seo/`) governs how every
Pensieve Labs property appears in Google Search. This file only adds this repo's facts. Where the two
disagree, MASTER.md wins and this file is corrected.

## The property

- Registry id: `clawscale`. Relation: company (a Pensieve Labs open source project).
- Origin and base path: `https://prashantonomy.github.io` + `/clawscalejs`. Home: `https://prashantonomy.github.io/clawscalejs/`. The URL must not move.
- Site name (`og:site_name`, WebSite `name`): `Clawscale`. WebSite `alternateName`: `clawscalejs`, `Pensieve Clawscale`.
- Hosting: GitHub Pages, static export to `apps/docs/out`. `.github/workflows/docs.yml` builds on every push to `main` and sets `DOCS_BASE_PATH` and `DOCS_SITE_URL`.
- Vendored registry and checker: `apps/docs/seo/registry.json` and `apps/docs/seo/check.mjs`. Never edit them here: change the master, then run `node ~/pensievelabs/seo/sync.mjs`.

## Keywords, in priority, and the page that owns each

1. `clawscale`: the home page (title, h1, description).
2. `clawscalejs`: the home page (description).
3. `pensieve clawscale`: the home page (description names Pensieve Labs and Clawscale).

`pensieve open source` belongs to `https://pensievelabs.org/open-source`. The home page links to it with that text and to `https://pensievelabs.org/` as "Pensieve Labs".

## Home page

- Title: `Clawscale: a React UI system for data-dense software`
- Description: `Clawscale (clawscalejs) is an open source React UI system for data-dense software, built on Blueprint and made by Pensieve Labs.`
- JSON-LD (home only): the company node in full, read from the vendored `registry.json`; the WebSite node (publisher the company `@id`); a SoftwareSourceCode node. Other pages carry none.

## Patterns

- Every other page: its own title and nothing after it (the layout template is `%s`). Never a pipe or a brand suffix.
- Docs page descriptions come from the page intro: `scripts/generate-docs-index.ts` writes `summary` (whole sentences, 155 characters at most) and `scripts/remark-page-description.mjs` adds it to the page metadata. When the intro is under 70 characters, write `description` in the page's `metadata` export; the plugin then leaves it alone.
- Canonical and `og:url`: self, absolute, from `metadataBase` (`site.url`) and `alternates.canonical: "./"` in the root layout. Trailing slash on every URL (`trailingSlash: true`).
- Internal links: markdown or Next.js `Link`, so the base path is added. A raw `<a href="/...">` breaks it.

## SEO-critical files

Each begins with an `SEO-CRITICAL` comment:

- `apps/docs/app/layout.tsx`, `apps/docs/app/page.tsx`, `apps/docs/app/sitemap.ts`, `apps/docs/app/not-found.tsx`, `apps/docs/app/gallery/page.tsx`
- `apps/docs/lib/site.ts`, `apps/docs/next.config.mjs`
- `apps/docs/scripts/generate-docs-index.ts`, `apps/docs/scripts/remark-page-description.mjs`
- `.github/workflows/docs.yml`, `apps/docs/seo/registry.json`

## Noindex

- `/gallery/`: every component on one page, for visual review. Not in the sitemap.

## How to check

- `pnpm build && pnpm build:docs`, then `pnpm seo:check` (built HTML in `apps/docs/out`, no network).
- To match production URLs locally: `DOCS_BASE_PATH=/clawscalejs DOCS_SITE_URL=https://prashantonomy.github.io/clawscalejs pnpm build:docs`.
- After a deploy: `pnpm --filter @clawscale/docs seo:check:live` (read-only crawl of the live site).
- Turbopack caches compiled MDX and does not see a change to `generated/docs-index.json` alone. If a description looks stale, delete `apps/docs/.next` and build again. CI always builds clean.

## After a deploy

- Search Console: the URL-prefix property `https://prashantonomy.github.io/clawscalejs/` (there is no domain property for github.io). Submit `https://prashantonomy.github.io/clawscalejs/sitemap.xml` once.
- After the home page changes: URL Inspection on the home URL, then Request indexing.

## Decisions

- 2026-11-07: the company node comes from the registry (`Pensieve Labs`, `@id https://pensievelabs.org/#organization`), replacing a hand-typed node named "Pensieve". Titles lost their pipe and brand suffix.

## Open items

- `robots.txt` lives at `https://prashantonomy.github.io/robots.txt`, outside this repo, and answers 404. Google then crawls everything; submit the sitemap in Search Console instead.
- The registry needs `"noindex": ["/gallery"]` for this property. Until then `seo:check` reports one error for `/gallery`, so it is not yet part of the docs build.
- `/docs/core/html/` and `/docs/core/typography/` render two h1 elements (one is a live example). A warning, left as is.
