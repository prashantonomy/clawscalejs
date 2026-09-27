#!/usr/bin/env node
/**
 * Prose lint: fails when a file contains a dash or dot character this project never uses.
 *
 *   node scripts/lint-prose.mjs              check every tracked and new file
 *   node scripts/lint-prose.mjs a.md b.tsx   check these files
 *   node scripts/lint-prose.mjs --hook       Claude Code PostToolUse hook (reads JSON on stdin)
 *
 * Write "-", ":" or "," instead, or split the sentence.
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, relative, resolve } from "node:path";
import { findProblems } from "./prose.mjs";

const TEXT_EXTENSIONS = new Set([
  ".md",
  ".mdx",
  ".ts",
  ".tsx",
  ".js",
  ".mjs",
  ".cjs",
  ".json",
  ".css",
  ".yml",
  ".yaml",
  ".html",
  ".txt",
  ".svg",
  "",
]);

const SKIP = [/(^|\/)pnpm-lock\.yaml$/, /(^|\/)node_modules\//, /(^|\/)dist\//, /(^|\/)\.next\//, /(^|\/)out\//];

const root = resolve(import.meta.dirname, "..");

function listFiles() {
  const output = execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard", "-z"], {
    cwd: root,
    encoding: "utf8",
  });
  return output.split("\0").filter(Boolean);
}

function shouldCheck(file) {
  if (SKIP.some((pattern) => pattern.test(file))) return false;
  if (!TEXT_EXTENSIONS.has(extname(file))) return false;
  const path = resolve(root, file);
  return existsSync(path) && statSync(path).isFile();
}

function check(files) {
  return files.filter(shouldCheck).flatMap((file) => findProblems(file, readFileSync(resolve(root, file), "utf8")));
}

function report(problems, stream) {
  for (const p of problems) {
    stream.write(`${p.file}:${p.line}:${p.column}  ${p.name}  ${p.context}\n`);
  }
  stream.write(
    `\n${problems.length} forbidden character(s). This project never uses em dashes, en dashes or mid-line dots.\nUse a comma, colon, parentheses or a new sentence instead.\n`,
  );
}

async function readStdin() {
  let data = "";
  for await (const chunk of process.stdin) data += chunk;
  return data;
}

const args = process.argv.slice(2);

if (args.includes("--hook")) {
  const input = JSON.parse((await readStdin()) || "{}");
  const path = input.tool_input?.file_path ?? input.tool_input?.notebook_path;
  if (!path) process.exit(0);
  const file = relative(root, resolve(path));
  if (file.startsWith("..")) process.exit(0);
  const problems = check([file]);
  if (problems.length > 0) {
    report(problems, process.stderr);
    process.exit(2);
  }
  process.exit(0);
}

const problems = check(args.length > 0 ? args.map((a) => relative(root, resolve(a))) : listFiles());
if (problems.length > 0) {
  report(problems, process.stderr);
  process.exit(1);
}
console.log("prose lint: clean");
