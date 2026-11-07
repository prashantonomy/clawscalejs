import type { ComponentProps } from "react";

type HeadingProps = ComponentProps<"h2">;

function Heading({ level, id, children, className, ...props }: HeadingProps & { level: 1 | 2 | 3 | 4 }) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
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

export const H1 = (props: HeadingProps) => <Heading level={1} {...props} />;
export const H2 = (props: HeadingProps) => <Heading level={2} {...props} />;
export const H3 = (props: HeadingProps) => <Heading level={3} {...props} />;
export const H4 = (props: HeadingProps) => <Heading level={4} {...props} />;
