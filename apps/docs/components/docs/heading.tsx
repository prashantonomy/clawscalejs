import type { ComponentProps } from "react";

type HeadingProps = ComponentProps<"h2">;

function makeHeading(level: 1 | 2 | 3 | 4) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
  function Heading({ id, children, className, ...props }: HeadingProps) {
    return (
      <Tag id={id} className={["docs-heading", `docs-h${level}`, className].filter(Boolean).join(" ")} {...props}>
        {children}
        {id && level > 1 && (
          <a className="docs-anchor" href={`#${id}`} aria-label="Link to this section" tabIndex={-1}>
            #
          </a>
        )}
      </Tag>
    );
  }
  Heading.displayName = `DocsH${level}`;
  return Heading;
}

export const H1 = makeHeading(1);
export const H2 = makeHeading(2);
export const H3 = makeHeading(3);
export const H4 = makeHeading(4);
