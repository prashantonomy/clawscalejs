import { readdirSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { blueprintEntries, renderEntry, replacedExports, runtimeExports } from "../scripts/generate-exports.ts";

const root = join(import.meta.dirname, "..");
const require = createRequire(join(root, "package.json"));

describe("generated Blueprint re-exports", () => {
  it.each(blueprintEntries)("src/generated/$file.ts is up to date with $pkg", ({ file, pkg }) => {
    const current = readFileSync(join(root, "src", "generated", `${file}.ts`), "utf8");
    expect(current, "Run: pnpm --filter @clawscale/react generate").toBe(renderEntry(pkg));
  });

  it.each(blueprintEntries)("the $file entry exposes every runtime export of $pkg", async ({ file, pkg }) => {
    const entry = file === "core" ? "../src/index.ts" : `../src/${file}.ts`;
    const ours = await import(entry);
    const theirs = require(pkg) as Record<string, unknown>;
    const replaced = replacedExports[pkg] ?? [];
    for (const name of runtimeExports(pkg)) {
      if (replaced.includes(name)) continue;
      expect(ours[name], `${name} from ${pkg}`).toBe(theirs[name]);
    }
  });

  it("exports the Clawscale version of every replaced Blueprint export", async () => {
    const components = await import("../src/components/index.ts");
    for (const [pkg, names] of Object.entries(replacedExports)) {
      const entry = pkg === "@blueprintjs/core" ? "../src/index.ts" : `../src/${pkg.split("/")[1]}.ts`;
      const ours = await import(entry);
      const theirs = require(pkg) as Record<string, unknown>;
      for (const name of names) {
        expect(theirs[name], `${name} still exists in ${pkg}`).toBeDefined();
        expect(ours[name], name).toBe((components as Record<string, unknown>)[name]);
        expect(ours[name], name).not.toBe(theirs[name]);
      }
    }
  });
});

describe("use client directives", () => {
  const firstStatement = (path: string) => readFileSync(path, "utf8").trimStart().split("\n")[0];

  it("marks every generated entry as a client module", () => {
    for (const { file } of blueprintEntries) {
      expect(firstStatement(join(root, "src", "generated", `${file}.ts`))).toBe('"use client";');
    }
  });

  it("marks every React component module as a client module", () => {
    const dir = join(root, "src", "components");
    const components = readdirSync(dir).filter((name) => name.endsWith(".tsx"));
    expect(components.length).toBeGreaterThan(0);
    for (const name of components) {
      expect(firstStatement(join(dir, name)), name).toBe('"use client";');
    }
  });

  it("keeps the package entry points free of the directive", () => {
    for (const name of ["index.ts", "select.ts", "datetime.ts", "table.ts", "icons.ts", "common.ts"]) {
      const lines = readFileSync(join(root, "src", name), "utf8").split("\n");
      expect(lines, name).not.toContain('"use client";');
    }
  });
});
