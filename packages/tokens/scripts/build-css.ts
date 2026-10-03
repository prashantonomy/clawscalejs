/** Writes dist/tokens.css, dist/themes/<name>.css and dist/tokens.json from src. */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { defaultTheme, renderThemeCss, renderTokensCss, themes, tokens } from "../src/index.ts";

const dist = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
mkdirSync(join(dist, "themes"), { recursive: true });
writeFileSync(join(dist, "tokens.css"), `${renderTokensCss()}\n`);
const extra = Object.values(themes).filter((theme) => theme.name !== defaultTheme.name);
for (const theme of extra) writeFileSync(join(dist, "themes", `${theme.name}.css`), `${renderThemeCss(theme)}\n`);
writeFileSync(join(dist, "tokens.json"), `${JSON.stringify({ ...tokens, themes }, null, 2)}\n`);
console.log(`tokens: wrote dist/tokens.css, dist/tokens.json and ${extra.length} theme stylesheet(s) in dist/themes`);
