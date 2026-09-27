import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import GithubSlugger from "github-slugger";
import { describe, expect, it } from "vitest";
import props from "../generated/props.json" with { type: "json" };
import { allPages, nav } from "../lib/nav.ts";
import { headingText, parsePage } from "../scripts/generate-docs-index.ts";
import { sanitizeDocText } from "../scripts/generate-props.ts";

const root = join(import.meta.dirname, "..");

function walk(dir: string, match: (name: string) => boolean): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return walk(path, match);
    return match(name) ? [path] : [];
  });
}

const pages = walk(join(root, "app", "docs"), (name) => name === "page.mdx").map((file) => ({
  file: relative(root, file),
  source: readFileSync(file, "utf8"),
}));

describe("docs index", () => {
  it("slugs headings like rehype-slug, skipping code fences", () => {
    const entry = parsePage(
      ["# Buttons", "## Usage", "```md", "## Not a heading", "```", "### `intent` prop", "## Usage"].join("\n"),
      "/docs/core/buttons/",
    );
    expect(entry.title).toBe("Buttons");
    expect(entry.headings).toEqual([
      { depth: 2, text: "Usage", id: "usage" },
      { depth: 3, text: "intent prop", id: "intent-prop" },
      { depth: 2, text: "Usage", id: "usage-1" },
    ]);
  });

  it("strips inline markdown from heading text", () => {
    expect(headingText("The [`Tag`](/docs/core/tag/) and **bold** part")).toBe("The Tag and bold part");
    expect(new GithubSlugger().slug(headingText("Using `useHotkeys`"))).toBe("using-usehotkeys");
  });
});

describe("prop descriptions", () => {
  it("removes characters the docs never show", () => {
    const emDash = String.fromCharCode(0x2014);
    const middleDot = String.fromCharCode(0x00b7);
    expect(sanitizeDocText(`Opens a menu ${emDash} fast`)).toBe("Opens a menu, fast");
    expect(sanitizeDocText(`a ${middleDot} b`)).toBe("a, b");
    expect(sanitizeDocText("See {@link PopoverProps.content}.")).toBe("See PopoverProps.content.");
  });
});

describe("navigation", () => {
  it("uses unique hrefs that end with a slash", () => {
    const hrefs = allPages().map((page) => page.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
    for (const href of hrefs) expect(href).toMatch(/^\/docs\/([a-z0-9-]+\/)*$/);
  });

  it("gives every package at least one page", () => {
    for (const pkg of nav) expect(pkg.groups.flatMap((g) => g.pages).length, pkg.id).toBeGreaterThan(0);
  });
});

describe("docs pages", () => {
  const exampleFiles = walk(join(root, "examples"), (name) => name.endsWith(".tsx") && !name.startsWith("_")).map(
    (file) =>
      relative(join(root, "examples"), file)
        .split(sep)
        .join("/")
        .replace(/\.tsx$/, ""),
  );
  const used = new Set<string>();

  it.each(pages)("$file references examples that exist and imports them", ({ source, file }) => {
    for (const [, name] of source.matchAll(/<Example[^>]*\sname="([^"]+)"/g)) {
      expect(exampleFiles, `${file}: example ${name}`).toContain(name);
      expect(source, `${file}: import for ${name}`).toContain(`from "@/examples/${name}"`);
      used.add(name as string);
    }
  });

  it.each(pages)("$file only uses PropsTable names that exist", ({ source, file }) => {
    for (const [, name] of source.matchAll(/<PropsTable[^>]*\sname="([^"]+)"/g)) {
      expect(Object.keys(props), `${file}: ${name}`).toContain(name);
    }
  });

  it("never hardcodes root-relative hrefs, which break under the GitHub Pages base path", () => {
    const files = [
      ...walk(join(root, "examples"), (name) => name.endsWith(".tsx")),
      ...walk(join(root, "components"), (name) => name.endsWith(".tsx")),
      ...pages.map((page) => join(root, page.file)),
    ];
    const offenders = files.filter((file) => /<a[^>]*\shref="\/(?!\/)/.test(readFileSync(file, "utf8")));
    expect(offenders.map((file) => relative(root, file))).toEqual([]);
  });

  it("shows every example file on some page", () => {
    const orphaned = exampleFiles.filter((name) => !used.has(name) && !name.startsWith("guides/"));
    const guides = pages.map((p) => p.source).join("\n");
    expect(orphaned.filter((name) => !guides.includes(`"@/examples/${name}"`))).toEqual([]);
  });
});
