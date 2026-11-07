/**
 * SEO-CRITICAL: sets the meta description of every docs page. Read SEO.md and ~/pensievelabs/seo/MASTER.md before changing it, then run pnpm --filter @clawscale/docs seo:check.
 *
 * Remark plugin: adds a meta description to the metadata of every docs page.
 * A page exports `metadata = { title }` and this adds its summary from generated/docs-index.json,
 * so each page gets its own description without writing one by hand.
 * next.config.mjs loads it by path. Run `pnpm generate` first; `next dev` and `next build` do.
 */
import { readFileSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const appDir = join(root, "app");
const indexFile = join(root, "generated", "docs-index.json");

/** The route of an app/docs page file, for example "/docs/core/tag/". */
function routeOf(file) {
  const route = relative(appDir, dirname(file)).split(sep).join("/");
  return route.startsWith("docs") ? `/${route}/` : undefined;
}

/** The object literal of `export const metadata = { ... }` in an ESM node, if there is one. */
function metadataObject(program) {
  for (const statement of program?.body ?? []) {
    const declarations = statement.type === "ExportNamedDeclaration" ? (statement.declaration?.declarations ?? []) : [];
    for (const declarator of declarations) {
      if (declarator.id?.name === "metadata" && declarator.init?.type === "ObjectExpression") return declarator.init;
    }
  }
  return undefined;
}

export default function remarkPageDescription() {
  return (tree, file) => {
    const route = file.path && file.basename === "page.mdx" ? routeOf(file.path) : undefined;
    if (!route) return;
    const index = JSON.parse(readFileSync(indexFile, "utf8"));
    const summary = index.find((entry) => entry.href === route)?.summary;
    if (!summary) return;
    for (const node of tree.children) {
      if (node.type !== "mdxjsEsm") continue;
      const metadata = metadataObject(node.data?.estree);
      if (!metadata) continue;
      if (metadata.properties.some((property) => property.key?.name === "description")) return;
      metadata.properties.push({
        type: "Property",
        kind: "init",
        method: false,
        shorthand: false,
        computed: false,
        key: { type: "Identifier", name: "description" },
        value: { type: "Literal", value: summary, raw: JSON.stringify(summary) },
      });
      return;
    }
  };
}
