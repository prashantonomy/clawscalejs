import "server-only";
import { createHighlighter, type Highlighter } from "shiki";

const languages = ["tsx", "ts", "jsx", "js", "css", "scss", "bash", "json", "html", "mdx", "md", "yaml"] as const;
export type CodeLanguage = (typeof languages)[number];

let highlighter: Promise<Highlighter> | undefined;

function getHighlighter(): Promise<Highlighter> {
  highlighter ??= createHighlighter({ themes: ["github-light", "github-dark-dimmed"], langs: [...languages] });
  return highlighter;
}

const aliases: Record<string, CodeLanguage> = {
  sh: "bash",
  shell: "bash",
  zsh: "bash",
  typescript: "ts",
  javascript: "js",
};

/** Highlights code to HTML with light and dark colors as CSS variables. */
export async function highlight(code: string, lang = "tsx"): Promise<string> {
  const resolved = (aliases[lang] ?? lang) as CodeLanguage;
  const language = languages.includes(resolved) ? resolved : "tsx";
  const instance = await getHighlighter();
  return instance.codeToHtml(code.replace(/\n$/, ""), {
    lang: language,
    themes: { light: "github-light", dark: "github-dark-dimmed" },
    defaultColor: false,
    // Theme colors below 4.5:1 on Clawscale code surfaces in any theme, replaced with passing ones.
    colorReplacements: {
      "github-light": {
        "#e36209": "#b34a00",
        "#d73a49": "#c8303f",
        "#22863a": "#1e7b35",
        "#6a737d": "#5f6873",
        "#fafbfc": "#24292e",
        "#f6f8fa": "#24292e",
      },
      "github-dark-dimmed": { "#2d333b": "#adbac7" },
    },
  });
}
