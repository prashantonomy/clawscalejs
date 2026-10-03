/**
 * Builds dist/styles.css and one stylesheet per extra theme in dist/themes:
 *
 *   @layer blueprint, clawscale.base, clawscale.themes;
 *   styles.css:          @layer blueprint { normalize.css + Blueprint, unchanged + blueprintPatches }
 *                        @layer clawscale.base { tokens + src/styles/index.css and its imports }
 *   themes/<name>.css:   @layer clawscale.themes { theme tokens + @scope (<theme>) { src/styles/themes/<name> } }
 *
 * Rules in a later layer beat rules in an earlier layer whatever their specificity,
 * so Clawscale overrides never fight Blueprint selectors, and theme rules never fight base rules.
 * Both files state the full layer order, so the order holds whichever file loads first.
 * Blueprint CSS is inlined, which is why @clawscale/react pins exact Blueprint versions.
 */
import { copyFileSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { DARK } from "@blueprintjs/core/lib/cjs/common/classes.js";
import { renderThemeCss, renderTokensCss, type ThemeDefinition, themes } from "@clawscale/tokens";
import { transform } from "lightningcss";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const require = createRequire(join(root, "package.json"));
const requireFromCore = createRequire(require.resolve("@blueprintjs/core/package.json"));

/** `[data-cs-theme="dark"]` and `[data-cs-theme="light"]` are the color scheme attributes from before 0.2. */
export const darkSelector = `.${DARK}, [data-bp-color-scheme="dark"], [data-cs-color-scheme="dark"], [data-cs-theme="dark"]`;
export const lightSelector = `[data-cs-color-scheme="light"], [data-cs-theme="light"]`;

/** Every Clawscale stylesheet starts with the full layer order. */
export const layerOrder = "@layer blueprint, clawscale.base, clawscale.themes;";

/** Theme stylesheets live in src/styles/themes/<name>/index.css, one folder per theme in @clawscale/tokens. */
export const themesDir = join(root, "src", "styles", "themes");

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

function minify(filename: string, source: string): string {
  const { code } = transform({ filename, code: Buffer.from(source), minify: true, errorRecovery: false });
  return code.toString();
}

export function buildStyles(): string {
  const blueprint = [
    ...blueprintSheets.map(readBlueprintSheet),
    ...blueprintPatches.map((path) => `/* ${relative(join(root, "src"), path)} */\n${readFileSync(path, "utf8")}`),
  ].join("\n");
  const tokens = renderTokensCss({ darkSelector, lightSelector });
  const clawscale = inlineImports(join(root, "src", "styles", "index.css"));
  return minify(
    "styles.css",
    [
      "/*! Clawscale styles. Includes Blueprint by Palantir (Apache-2.0) and normalize.css v8.0.1 (MIT, github.com/necolas/normalize.css). See NOTICE. */",
      layerOrder,
      `@layer blueprint {\n${blueprint}\n}`,
      `@layer clawscale.base {\n${tokens}\n${clawscale}\n}`,
    ].join("\n"),
  );
}

/** Theme folders in src/styles/themes. Each needs a theme of the same name in @clawscale/tokens. */
export function themeNames(): string[] {
  return readdirSync(themesDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

/**
 * The scope of a theme's rules: elements under `[data-cs-theme="<name>"]`, down to a nested
 * element of another theme. The color scheme values from before 0.2 do not end the scope.
 */
export function themeScope(name: string): string {
  return `@scope ([data-cs-theme="${name}"]) to ([data-cs-theme]:not([data-cs-theme="${name}"], [data-cs-theme="light"], [data-cs-theme="dark"]))`;
}

/** Moves `@keyframes` blocks out of a stylesheet. Not every browser accepts them inside `@scope`. */
export function liftKeyframes(css: string): { rules: string; keyframes: string[] } {
  const keyframes: string[] = [];
  let rules = css;
  for (let start = rules.indexOf("@keyframes"); start !== -1; start = rules.indexOf("@keyframes", start)) {
    let depth = 0;
    let end = rules.indexOf("{", start);
    for (; end < rules.length; end++) {
      if (rules[end] === "{") depth++;
      else if (rules[end] === "}" && --depth === 0) break;
    }
    keyframes.push(rules.slice(start, end + 1));
    rules = rules.slice(0, start) + rules.slice(end + 1);
  }
  return { rules, keyframes };
}

export function buildThemeStyles(name: string): string {
  const theme = (themes as Record<string, ThemeDefinition>)[name];
  if (!theme) throw new Error(`src/styles/themes/${name} has no theme named "${name}" in @clawscale/tokens.`);
  const { rules, keyframes } = liftKeyframes(inlineImports(join(themesDir, name, "index.css")));
  return minify(
    `themes/${name}.css`,
    [
      `/*! Clawscale ${theme.label} theme. Load it after @clawscale/react/styles.css. */`,
      layerOrder,
      `@layer clawscale.themes {\n${renderThemeCss(theme)}\n${keyframes.join("\n")}\n${themeScope(name)} {\n${rules}\n}\n}`,
    ].join("\n"),
  );
}

/** The optional fonts stylesheet. Browsers only download the fonts a page uses. */
export const fontsCss = [
  "/* Inter, JetBrains Mono and Oxanium, the Clawscale typefaces. Optional. Browsers download only the fonts a page uses. */",
  '@import "@fontsource-variable/inter/index.css";',
  '@import "@fontsource-variable/jetbrains-mono/index.css";',
  '@import "@fontsource-variable/oxanium/index.css";',
  "",
].join("\n");

/** Writes every stylesheet and returns the files it wrote with their sizes. */
export function writeStyles(): string[] {
  mkdirSync(join(dist, "themes"), { recursive: true });
  const files: Array<[string, string]> = [
    ["styles.css", buildStyles()],
    ...themeNames().map((name): [string, string] => [`themes/${name}.css`, buildThemeStyles(name)]),
    ["fonts.css", fontsCss],
  ];
  for (const [file, css] of files) writeFileSync(join(dist, file), css);
  return files.map(([file, css]) => `${file} (${Math.max(1, Math.round(css.length / 1024))} kB)`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  console.log(`react: wrote ${writeStyles().join(", ")} in dist`);
}
