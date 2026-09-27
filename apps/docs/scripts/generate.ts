/** Writes everything under generated/. Runs before `next dev`, `next build` and `tsc`. */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { nav } from "../lib/nav.ts";
import { site } from "../lib/site.ts";
import { buildIndex, type DocsIndexEntry } from "./generate-docs-index.ts";
import { buildProps } from "./generate-props.ts";

const appDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const generatedDir = join(appDir, "generated");
mkdirSync(generatedDir, { recursive: true });

const index = buildIndex();
writeFileSync(join(generatedDir, "docs-index.json"), `${JSON.stringify(index, null, 2)}\n`);

/** llms.txt: a plain index of the docs for AI tools. See https://llmstxt.org */
function renderLlmsTxt(entries: DocsIndexEntry[]): string {
  const byHref = new Map(entries.map((entry) => [entry.href, entry]));
  const line = (href: string) => {
    const entry = byHref.get(href);
    return entry ? `- [${entry.title}](${site.url}${href}): ${entry.description}` : "";
  };
  const sections = nav.map((pkg) =>
    [`## ${pkg.title}`, "", line(pkg.href), ...pkg.groups.flatMap((g) => g.pages.map((p) => line(p.href)))].join("\n"),
  );
  return [`# ${site.name}`, "", `> ${site.tagline} ${site.description}`, "", ...sections.flatMap((s) => [s, ""])].join(
    "\n",
  );
}
writeFileSync(join(appDir, "public", "llms.txt"), renderLlmsTxt(index));

const props = buildProps();
writeFileSync(join(generatedDir, "props.json"), `${JSON.stringify(props, null, 2)}\n`);

console.log(`docs: indexed ${index.length} pages and ${Object.keys(props).length} prop interfaces`);
