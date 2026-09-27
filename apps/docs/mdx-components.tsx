import { Callout, Tag } from "@clawscale/react";
import { Classes } from "@clawscale/react/common";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import type { ComponentProps, ReactElement, ReactNode } from "react";
import { CodeBlock } from "@/components/docs/code-block";
import { Example } from "@/components/docs/example";
import { H1, H2, H3, H4 } from "@/components/docs/heading";
import { PropsTable } from "@/components/docs/props-table";

type CodeElement = ReactElement<{ className?: string; children?: unknown }>;

function Pre({ children }: ComponentProps<"pre">) {
  const code = children as CodeElement;
  const lang = /language-(\S+)/.exec(code?.props?.className ?? "")?.[1] ?? "tsx";
  const text = typeof code?.props?.children === "string" ? code.props.children : "";
  return <CodeBlock code={text} lang={lang} />;
}

function Anchor({ href = "", children, ...props }: ComponentProps<"a">) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  const external = /^https?:\/\//.test(href);
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} {...props}>
      {children}
    </a>
  );
}

/** Larger intro text under a page title. Renders a div so MDX paragraphs nest validly. */
function Lead({ children }: { children: ReactNode }) {
  return <div className="docs-lead">{children}</div>;
}

function Table(props: ComponentProps<"table">) {
  return (
    <div className="docs-table-wrapper">
      <table className={`${Classes.HTML_TABLE} ${Classes.COMPACT} docs-table`} {...props} />
    </div>
  );
}

/** Components available in every MDX page without an import. */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    pre: Pre,
    a: Anchor,
    table: Table,
    Callout,
    Example,
    Lead,
    PropsTable,
    Tag,
    ...components,
  };
}
