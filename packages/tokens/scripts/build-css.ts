/** Writes dist/tokens.css and dist/tokens.json from src/tokens.ts. */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { renderTokensCss, tokens } from "../src/index.ts";

const dist = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
mkdirSync(dist, { recursive: true });
writeFileSync(join(dist, "tokens.css"), `${renderTokensCss()}\n`);
writeFileSync(join(dist, "tokens.json"), `${JSON.stringify(tokens, null, 2)}\n`);
console.log("tokens: wrote dist/tokens.css and dist/tokens.json");
