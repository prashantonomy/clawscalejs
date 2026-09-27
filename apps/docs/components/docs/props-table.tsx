import props from "@/generated/props.json" with { type: "json" };
import { InlineMarkdown } from "./inline-markdown";

interface PropDoc {
  name: string;
  type: string;
  description: string;
  defaultValue?: string;
  required: boolean;
  deprecated?: string;
  inheritedFrom?: string;
}

interface InterfaceDoc {
  name: string;
  kind: "interface" | "type";
  importPath: string;
  heritage?: string;
  description: string;
  props: PropDoc[];
}

const docs = props as Record<string, InterfaceDoc>;

export interface PropsTableProps {
  /** Interface name, for example "ButtonProps". */
  name: string;
  /** Props to leave out, for example inherited ones already shown elsewhere. */
  hide?: string[];
}

/** The props of one interface, generated from its TypeScript declaration. */
export function PropsTable({ name, hide = [] }: PropsTableProps) {
  const doc = docs[name];
  if (!doc) {
    throw new Error(`PropsTable: no generated docs for "${name}". Check the name, then run pnpm generate.`);
  }
  const rows = doc.props.filter((prop) => !hide.includes(prop.name));
  return (
    <section className="docs-interface" data-interface={name}>
      <header className="docs-interface-header">
        <code className="docs-interface-signature">
          <span className="docs-interface-keyword">{doc.kind}</span> <strong>{doc.name}</strong>
          {doc.heritage && <span className="docs-interface-heritage"> {doc.heritage}</span>}
        </code>
        <span className="docs-interface-package">{doc.importPath}</span>
      </header>
      {doc.description && (
        <p className="docs-interface-description">
          <InlineMarkdown text={doc.description} />
        </p>
      )}
      <table className="docs-props-table">
        <thead>
          <tr>
            <th>Props</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((prop) => (
            <tr key={prop.name} data-prop={prop.name}>
              <td className="docs-prop-name">
                <code>{prop.name}</code>
                {prop.required && <span className="docs-prop-badge docs-prop-required">required</span>}
                {prop.deprecated !== undefined && (
                  <span className="docs-prop-badge docs-prop-deprecated">deprecated</span>
                )}
              </td>
              <td className="docs-prop-details">
                <div className="docs-prop-type">
                  <code>{prop.type}</code>
                  {prop.defaultValue && (
                    <>
                      {" = "}
                      <code className="docs-prop-default">{prop.defaultValue}</code>
                    </>
                  )}
                </div>
                {prop.description && (
                  <div className="docs-prop-description">
                    <InlineMarkdown text={prop.description} />
                  </div>
                )}
                {prop.deprecated && (
                  <div className="docs-prop-description">
                    <InlineMarkdown text={prop.deprecated} />
                  </div>
                )}
                {prop.inheritedFrom && (
                  <span className="docs-prop-inherited">
                    Inherited from <code>{prop.inheritedFrom}</code>
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
