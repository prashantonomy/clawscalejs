import { Fragment, type ReactNode } from "react";

/**
 * Renders the small markdown subset found in JSDoc: `code`, **bold**, *emphasis* and [links](url).
 * Never renders raw HTML.
 */
export function InlineMarkdown({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  const pattern = /`([^`]+)`|\*\*([^*]+)\*\*|\*([^*]+)\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let key = 0;
  for (let match = pattern.exec(text); match; match = pattern.exec(text)) {
    if (match.index > last) nodes.push(<Fragment key={key++}>{text.slice(last, match.index)}</Fragment>);
    const [, code, bold, em, linkText, href] = match;
    if (code !== undefined) nodes.push(<code key={key++}>{code}</code>);
    else if (bold !== undefined) nodes.push(<strong key={key++}>{bold}</strong>);
    else if (em !== undefined) nodes.push(<em key={key++}>{em}</em>);
    else if (linkText !== undefined && href !== undefined && /^(https?:\/\/|\/|#)/.test(href)) {
      nodes.push(
        <a key={key++} href={href}>
          {linkText}
        </a>,
      );
    } else nodes.push(<Fragment key={key++}>{match[0]}</Fragment>);
    last = pattern.lastIndex;
  }
  if (last < text.length) nodes.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
  return <>{nodes}</>;
}
