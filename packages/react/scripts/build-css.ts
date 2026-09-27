/**
 * Builds dist/styles.css:
 *
 *   @layer blueprint, clawscale;
 *   @layer blueprint { normalize.css + every Blueprint stylesheet, unchanged + blueprintPatches }
 *   @layer clawscale { tokens + src/styles/index.css and its imports }
 *
 * Rules in a later layer beat rules in an earlier layer whatever their specificity,
 * so Clawscale overrides never fight Blueprint selectors.
 * Blueprint CSS is inlined, which is why @clawscale/react pins exact Blueprint versions.
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DARK } from "@blueprintjs/core/lib/cjs/common/classes.js";
import { renderTokensCss } from "@clawscale/tokens";
import { transform } from "lightningcss";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const require = createRequire(join(root, "package.json"));
const requireFromCore = createRequire(require.resolve("@blueprintjs/core/package.json"));

export const darkSelector = `.${DARK}, [data-bp-color-scheme="dark"], [data-cs-theme="dark"]`;
export const lightSelector = `[data-cs-theme="light"]`;

const blueprintSheets = [
  requireFromCore.resolve("normalize.css/normalize.css"),
  require.resolve("@blueprintjs/core/lib/css/blueprint.css"),
  require.resolve("@blueprintjs/icons/lib/css/blueprint-icons.css"),
  require.resolve("@blueprintjs/select/lib/css/blueprint-select.css"),
  require.resolve("@blueprintjs/datetime/lib/css/blueprint-datetime.css"),
  require.resolve("@blueprintjs/table/lib/css/table.css"),
];

/**
 * Generated rules that restate Blueprint rules with the same selectors. They go at the end of
 * the blueprint layer, so they replace those declarations without changing Blueprint's cascade.
 */
export const blueprintPatches = [join(root, "src", "styles", "generated", "dark-text.css")];

/** Icon fonts are rewritten to woff2 only and copied next to the stylesheet. */
function rewriteIconFonts(css: string, sheetPath: string): string {
  return css.replace(/@font-face\s*\{[^}]*font-family:\s*"(blueprint-icons-\d+)"[^}]*\}/g, (_block, family: string) => {
    const file = `${family}.woff2`;
    mkdirSync(join(dist, "assets"), { recursive: true });
    copyFileSync(join(dirname(sheetPath), file), join(dist, "assets", file));
    return `@font-face{font-family:"${family}";src:url("./assets/${file}") format("woff2");font-display:block}`;
  });
}

function readBlueprintSheet(path: string): string {
  const css = readFileSync(path, "utf8").replace(/@charset\s+"[^"]*";\s*/g, "");
  const withFonts = path.includes("blueprint-icons") ? rewriteIconFonts(css, path) : css;
  return `/* ${relative(root, path).replace(/^.*node_modules\//, "")} */\n${withFonts.replace(/\/\*# sourceMappingURL=.*\*\//g, "")}`;
}

/** Inlines `@import "./file.css";` lines, recursively and in order. */
export function inlineImports(path: string, seen = new Set<string>()): string {
  if (seen.has(path)) throw new Error(`Circular @import: ${path}`);
  seen.add(path);
  const css = readFileSync(path, "utf8");
  return css.replace(/@import\s+"(\.[^"]+)";/g, (_line, spec: string) => {
    const child = resolve(dirname(path), spec);
    return `/* ${relative(join(root, "src"), child)} */\n${inlineImports(child, seen)}`;
  });
}

export function buildStyles(): string {
  const blueprint = [
    ...blueprintSheets.map(readBlueprintSheet),
    ...blueprintPatches.map((path) => `/* ${relative(join(root, "src"), path)} */\n${readFileSync(path, "utf8")}`),
  ].join("\n");
  const tokens = renderTokensCss({ darkSelector, lightSelector });
  const clawscale = inlineImports(join(root, "src", "styles", "index.css"));
  const source = [
    "/*! Clawscale styles. Includes Blueprint by Palantir (Apache-2.0) and normalize.css v8.0.1 (MIT, github.com/necolas/normalize.css). See NOTICE. */",
    "@layer blueprint, clawscale;",
    `@layer blueprint {\n${blueprint}\n}`,
    `@layer clawscale {\n${tokens}\n${clawscale}\n}`,
  ].join("\n");
  const { code } = transform({
    filename: "styles.css",
    code: Buffer.from(source),
    minify: true,
    errorRecovery: false,
  });
  return code.toString();
}

function main() {
  mkdirSync(dist, { recursive: true });
  const css = buildStyles();
  writeFileSync(join(dist, "styles.css"), css);
  writeFileSync(
    join(dist, "fonts.css"),
    [
      "/* Inter and JetBrains Mono, the Clawscale typefaces. Optional. */",
      '@import "@fontsource-variable/inter/index.css";',
      '@import "@fontsource-variable/jetbrains-mono/index.css";',
      "",
    ].join("\n"),
  );
  console.log(`react: wrote dist/styles.css (${Math.round(css.length / 1024)} kB) and dist/fonts.css`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main();
