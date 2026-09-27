#!/usr/bin/env node
/**
 * Commit lint: checks commit messages and pull requests against "Commits and pull requests" in AGENTS.md.
 *
 *   node scripts/lint-commits.mjs         check the commits on this branch that origin/main (or main) lacks
 *   node scripts/lint-commits.mjs A..B    check the commits in a range
 *
 * Merge commits are skipped. When PR_TITLE or PR_BODY is set, as in .github/workflows/commits.yml,
 * the pull request title and description are checked too.
 */
import { execFileSync, spawnSync } from "node:child_process";
import { findProblems } from "./prose.mjs";

const TYPES = ["feat", "fix", "perf", "refactor", "docs", "test", "build", "ci", "chore", "revert"];
const SCOPES = ["tokens", "react", "docs", "deps"];
const MAX_TITLE = 72;
const TITLE = /^(?<type>[A-Za-z]+)(?:\((?<scope>[^()\s]+)\))?!?: (?<subject>.*)$/;
// The title Git and GitHub write when they revert a commit.
const GIT_REVERT = /^Revert ".+"$/;
// Separators between fields and commits in the git log output. Messages never contain them.
const FIELD = String.fromCharCode(0x1f);
const RECORD = String.fromCharCode(0x1e);

function lintTitle(title) {
  if (GIT_REVERT.test(title)) return [];
  const match = TITLE.exec(title);
  if (!match) return ["not type(scope): subject"];
  const { type, scope, subject } = match.groups;
  const problems = [];
  if (!TYPES.includes(type)) problems.push(`unknown type "${type}"`);
  if (scope !== undefined && !SCOPES.includes(scope)) problems.push(`unknown scope "${scope}"`);
  if (subject === "") problems.push("empty subject");
  else if (!/^[a-z]/.test(subject)) problems.push("subject does not start with a lowercase letter");
  if (subject.endsWith(".")) problems.push("period at the end");
  if (title.length > MAX_TITLE) problems.push(`${title.length} characters, over ${MAX_TITLE}`);
  return problems;
}

function lintProse(where, text) {
  return findProblems(where, text).map((p) => `${p.file}:${p.line}:${p.column}  ${p.name}  ${p.context}`);
}

function lintMessage(where, message) {
  const [title, second = ""] = message.split("\n");
  const problems = lintTitle(title);
  if (second.trim() !== "") problems.push("no blank line after the title");
  return [...problems.map((problem) => `${where}  ${problem}  ${title}`), ...lintProse(where, message)];
}

function isCommit(ref) {
  return spawnSync("git", ["rev-parse", "--verify", "--quiet", `${ref}^{commit}`]).status === 0;
}

function defaultRange() {
  const base = ["origin/main", "main"].find(isCommit);
  return base ? `${base}..HEAD` : undefined;
}

function commitsIn(range) {
  const log = execFileSync(
    "git",
    ["log", "--no-merges", "--reverse", "--format=%h%x1f%B%x1e", "--end-of-options", range, "--"],
    { encoding: "utf8" },
  );
  return log
    .split(RECORD)
    .map((record) => record.trimStart())
    .filter(Boolean)
    .map((record) => {
      const [hash, message] = record.split(FIELD);
      return { hash, message: message.trimEnd() };
    });
}

const range = process.argv[2] ?? defaultRange();
if (!range) {
  console.error("commit lint: no origin/main or main to compare with. Pass a range, for example HEAD~3..HEAD.");
  process.exit(1);
}

let commits;
try {
  commits = commitsIn(range);
} catch {
  console.error(`commit lint: git log ${range} failed`);
  process.exit(1);
}

const problems = [];
if (process.env.PR_TITLE !== undefined) problems.push(...lintMessage("pull request title", process.env.PR_TITLE));
if (process.env.PR_BODY) problems.push(...lintProse("pull request description", process.env.PR_BODY));
for (const { hash, message } of commits) problems.push(...lintMessage(`commit ${hash}`, message));

if (problems.length > 0) {
  for (const problem of problems) process.stderr.write(`${problem}\n`);
  process.stderr.write(
    `\n${problems.length} problem(s). See "Commits and pull requests" in AGENTS.md.\nA title looks like "fix(react): keep menu icons aligned": lowercase subject, no period, ${MAX_TITLE} characters at most.\nTypes: ${TYPES.join(", ")}. Scopes: ${SCOPES.join(", ")}, or none.\nNever use em dashes, en dashes or mid-line dots. Use a comma, colon, parentheses or a new sentence.\n`,
  );
  process.exit(1);
}
console.log(`commit lint: clean, ${commits.length} commit(s)`);
