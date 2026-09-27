/**
 * The dash and dot characters this project never uses. lint-prose.mjs checks files for them,
 * lint-commits.mjs checks commit messages and pull requests.
 */
const FORBIDDEN = new Map([
  ["\u2014", "EM DASH"],
  ["\u2013", "EN DASH"],
  ["\u00B7", "MIDDLE DOT"],
  ["\u2022", "BULLET"],
  ["\u2027", "HYPHENATION POINT"],
  ["\u2219", "BULLET OPERATOR"],
  ["\u22C5", "DOT OPERATOR"],
  ["\u30FB", "KATAKANA MIDDLE DOT"],
  ["\uFF65", "HALFWIDTH KATAKANA MIDDLE DOT"],
]);

export function findProblems(file, text) {
  const problems = [];
  text.split("\n").forEach((line, index) => {
    for (const [char, name] of FORBIDDEN) {
      let column = line.indexOf(char);
      while (column !== -1) {
        problems.push({ file, line: index + 1, column: column + 1, name, context: line.trim().slice(0, 120) });
        column = line.indexOf(char, column + 1);
      }
    }
  });
  return problems;
}
