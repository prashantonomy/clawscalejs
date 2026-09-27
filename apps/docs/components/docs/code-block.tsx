import { highlight } from "@/lib/highlight";
import { CopyButton } from "./copy-button";

export interface CodeBlockProps {
  code: string;
  lang?: string;
  /** Shows a file name above the code. */
  title?: string;
}

/** Highlighted code with a copy button. Renders on the server. */
export async function CodeBlock({ code, lang = "tsx", title }: CodeBlockProps) {
  const html = await highlight(code, lang);
  return (
    <div className="docs-code">
      {title && <div className="docs-code-title">{title}</div>}
      <div className="docs-code-actions">
        <CopyButton text={code.trimEnd()} />
      </div>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: shiki output from our own source files. */}
      <div className="docs-code-body" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
