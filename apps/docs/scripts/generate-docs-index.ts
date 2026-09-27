/**
 * Builds generated/docs-index.json: the title and h2/h3 headings of every docs page.
 * The sidebar shows the headings of the current page and search uses the whole index.
 * Also fails when lib/nav.ts and the pages under app/docs drift apart.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import GithubSlugger from "github-slugger";
import { allPages } from "../lib/nav.ts";

export interface DocsHeading {
  depth: 2 | 3;
  text: string;
  id: string;
}

export interface DocsIndexEntry {
  href: string;
  title: string;
  /** The first sentence of the page intro, as plain text. */
  description: string;
  headings: DocsHeading[];
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const docsDir = join(root, "app", "docs");

function findPages(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return findPages(path);
    return name === "page.mdx" ? [path] : [];
  });
}

/** Markdown to plain text, the same text rehype-slug sees. */
export function headingText(markdown: string): string {
  return markdown
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_]{1,2}([^*_]+)[*_]{1,2}/g, "$1")
    .trim();
}

function firstSentence(text: string): string {
  const plain = headingText(text.replace(/<[^>]+>/g, ""))
    .replace(/\s+/g, " ")
    .trim();
  const end = plain.search(/[.!?](\s|$)/);
  return end === -1 ? plain : plain.slice(0, end + 1);
}

export function parsePage(source: string, href: string): DocsIndexEntry {
  const slugger = new GithubSlugger();
  const headings: DocsHeading[] = [];
  let title = "";
  let description = "";
  let inFence = false;
  let intro: string[] | undefined;
  for (const line of source.split("\n")) {
    if (/^\s*```/.test(line)) inFence = !inFence;
    if (inFence) continue;
    if (title && !description && headings.length === 0) {
      if (intro === undefined && line.trim() && !/^(import|export|<[A-Z]|#)/.test(line.trim())) intro = [];
      if (intro !== undefined) {
        if (line.trim() === "" && intro.length > 0) description = firstSentence(intro.join(" "));
        else if (line.trim()) intro.push(line.trim());
      }
    }
    const match = /^(#{1,3})\s+(.+?)\s*$/.exec(line);
    if (!match?.[1] || !match[2]) continue;
    const text = headingText(match[2]);
    const id = slugger.slug(text);
    if (match[1].length === 1) title ||= text;
    else headings.push({ depth: match[1].length as 2 | 3, text, id });
  }
  if (!description && intro && intro.length > 0) description = firstSentence(intro.join(" "));
  return { href, title, description, headings };
}

export function buildIndex(): DocsIndexEntry[] {
  const pages = findPages(docsDir).map((file) => {
    const route = relative(join(root, "app"), dirname(file)).split(sep).join("/");
    return parsePage(readFileSync(file, "utf8"), `/${route}/`);
  });
  const byHref = new Map(pages.map((page) => [page.href, page]));
  const navHrefs = allPages().map((page) => page.href);
  const missing = navHrefs.filter((href) => !byHref.has(href));
  const orphaned = pages.map((page) => page.href).filter((href) => !navHrefs.includes(href));
  const untitled = pages.filter((page) => !page.title).map((page) => page.href);
  const problems = [
    ...missing.map((href) => `nav entry has no page: ${href}`),
    ...orphaned.map((href) => `page is missing from lib/nav.ts: ${href}`),
    ...untitled.map((href) => `page has no "# Title" heading: ${href}`),
  ];
  if (problems.length > 0) throw new Error(`Docs index problems:\n${problems.join("\n")}`);
  return navHrefs.map((href) => byHref.get(href) as DocsIndexEntry);
}
