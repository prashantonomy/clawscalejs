import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { ReactNode } from "react";
import { highlight } from "@/lib/highlight";
import { repoFileUrl } from "@/lib/site";
import { CopyButton } from "./copy-button";

export interface ExampleProps {
  /** Path under apps/docs/examples without the extension, for example "core/buttons/basic". */
  name: string;
  /** The rendered example. Import the same file in the MDX page. */
  children: ReactNode;
  /** "playground" drops the code and uses the split layout with an options panel. */
  variant?: "default" | "playground";
  /** Align the demo to the start instead of centering it. */
  align?: "center" | "start";
}

/** Strips framework lines that add nothing to a copied example. */
export function displaySource(source: string): string {
  return source.replace(/^"use client";\s*\n+/, "").trimEnd();
}

/** A live example with its source, like the example frames on blueprintjs.com. */
export async function Example({ name, children, variant = "default", align = "center" }: ExampleProps) {
  const file = `apps/docs/examples/${name}.tsx`;
  const source = displaySource(await readFile(join(process.cwd(), "examples", `${name}.tsx`), "utf8"));
  const sourceUrl = repoFileUrl(file);

  if (variant === "playground") {
    return (
      <figure className="docs-example docs-example-playground" data-example={name}>
        <div className="docs-example-frame">{children}</div>
        <a className="docs-example-source-bar" href={sourceUrl} target="_blank" rel="noreferrer">
          <span aria-hidden="true" className="docs-code-glyph">
            {"</>"}
          </span>
          View source on GitHub
        </a>
      </figure>
    );
  }

  const html = await highlight(source, "tsx");
  return (
    <figure className="docs-example" data-example={name}>
      <div className="docs-example-frame" data-align={align}>
        {children}
      </div>
      <div className="docs-example-actions">
        <a className="docs-example-link" href={sourceUrl} target="_blank" rel="noreferrer">
          {name}.tsx
        </a>
        <CopyButton text={source} />
      </div>
      <div className="docs-code docs-example-code">
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: shiki output from our own example files. */}
        <div className="docs-code-body" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </figure>
  );
}
