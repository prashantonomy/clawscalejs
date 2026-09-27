/**
 * Docs helper, not an example. Token tables rendered from @clawscale/tokens,
 * so the documented values never drift from the shipped ones.
 */
import { HTMLTable } from "@clawscale/react";
import { dark, light, sequentialBlue, shared, type ThemeTokens } from "@clawscale/tokens";
import type { CSSProperties, ReactNode } from "react";

type ThemeGroup = keyof ThemeTokens;
type SharedGroup = keyof typeof shared;

/** Every `--cs-*` group. "chart-seq" is the sequential ramp, `--cs-chart-seq-*`. */
export type TokenGroup = ThemeGroup | SharedGroup | "chart-seq";

type PreviewKind = "font" | "font-size" | "font-weight" | "radius" | "space" | "control-height";

const previews: Partial<Record<SharedGroup, PreviewKind>> = {
  font: "font",
  "font-size": "font-size",
  "font-weight": "font-weight",
  radius: "radius",
  space: "space",
  "control-height": "control-height",
};

const cell: CSSProperties = { verticalAlign: "middle" };
const mono: CSSProperties = { fontFamily: "var(--cs-font-mono)", fontSize: "var(--cs-font-size-sm)" };

function Table({ head, children }: { head: string[]; children: ReactNode }) {
  return (
    <div className="docs-table-wrapper">
      <HTMLTable compact className="docs-table">
        <thead>
          <tr>
            {head.map((label) => (
              <th key={label}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </HTMLTable>
    </div>
  );
}

function TokenName({ name }: { name: string }) {
  return <code style={{ whiteSpace: "nowrap" }}>{name}</code>;
}

/** A color chip. Translucent values sit on the theme's surface, as they do in the UI. */
function ColorValue({ value, surface = "transparent" }: { value: string; surface?: string }) {
  return (
    <span style={{ alignItems: "center", display: "flex", gap: 8 }}>
      <span
        aria-hidden="true"
        style={{
          background: `linear-gradient(${value}, ${value}), ${surface}`,
          borderRadius: "var(--cs-radius-sm)",
          boxShadow: "inset 0 0 0 1px rgba(128, 128, 128, 0.35)",
          flex: "none",
          height: 16,
          width: 16,
        }}
      />
      <span style={mono}>{value}</span>
    </span>
  );
}

/** A small raised box on the theme's canvas, with the shadow applied. */
function ShadowValue({ value, theme }: { value: string; theme: ThemeTokens }) {
  return (
    <span style={{ display: "grid", gap: 8, justifyItems: "start" }}>
      <span aria-hidden="true" style={{ background: theme.color.canvas, borderRadius: 6, padding: 12 }}>
        <span
          style={{
            background: theme.color.surface,
            borderRadius: 4,
            boxShadow: value,
            display: "block",
            height: 24,
            width: 48,
          }}
        />
      </span>
      <span style={{ ...mono, fontSize: "var(--cs-font-size-xs)" }}>{value}</span>
    </span>
  );
}

function Preview({ kind, value }: { kind: PreviewKind; value: string }) {
  switch (kind) {
    case "font":
      return <span style={{ fontFamily: value, fontSize: 15, whiteSpace: "nowrap" }}>Rows 12,480</span>;
    case "font-size":
      return <span style={{ fontSize: value, lineHeight: 1.2, whiteSpace: "nowrap" }}>Rows 12,480</span>;
    case "font-weight":
      return <span style={{ fontSize: 15, fontWeight: value, whiteSpace: "nowrap" }}>Rows 12,480</span>;
    case "radius":
      return (
        <span
          style={{
            background: "var(--cs-color-primary-subtle)",
            borderRadius: value,
            boxShadow: "inset 0 0 0 1px var(--cs-color-primary-border)",
            display: "block",
            height: 24,
            width: 48,
          }}
        />
      );
    case "space":
      return (
        <span
          style={{ background: "var(--cs-color-primary)", borderRadius: 2, display: "block", height: 12, width: value }}
        />
      );
    case "control-height":
      return (
        <span
          style={{
            background: "var(--cs-color-control)",
            borderRadius: "var(--cs-radius-md)",
            boxShadow: "inset 0 0 0 1px var(--cs-color-control-border)",
            display: "block",
            height: value,
            width: 88,
          }}
        />
      );
  }
}

function ThemeTable({ group }: { group: ThemeGroup }) {
  const lightValues: Record<string, string> = light[group];
  const darkValues: Record<string, string> = dark[group];
  const render = (value: string, theme: ThemeTokens) =>
    group === "shadow" ? (
      <ShadowValue value={value} theme={theme} />
    ) : (
      <ColorValue value={value} surface={theme.color.surface} />
    );
  return (
    <Table head={["Token", "Light", "Dark"]}>
      {Object.entries(lightValues).map(([name, value]) => (
        <tr key={name}>
          <td style={cell}>
            <TokenName name={`--cs-${group}-${name}`} />
          </td>
          <td style={cell}>{render(value, light)}</td>
          <td style={cell}>{render(darkValues[name] ?? "", dark)}</td>
        </tr>
      ))}
    </Table>
  );
}

function SharedTable({
  prefix,
  values,
  kind,
}: {
  prefix: string;
  values: Readonly<Record<string, string>>;
  kind?: PreviewKind | "color";
}) {
  const hasPreview = kind !== undefined && kind !== "color";
  return (
    <Table head={hasPreview ? ["Token", "Value", "Preview"] : ["Token", "Value"]}>
      {Object.entries(values).map(([name, value]) => (
        <tr key={name}>
          <td style={cell}>
            <TokenName name={`${prefix}-${name}`} />
          </td>
          <td style={cell}>{kind === "color" ? <ColorValue value={value} /> : <span style={mono}>{value}</span>}</td>
          {hasPreview && (
            <td style={cell}>
              <Preview kind={kind} value={value} />
            </td>
          )}
        </tr>
      ))}
    </Table>
  );
}

/** Every token in one `--cs-*` group, with its value and a preview where one helps. */
export function TokenTable({ group }: { group: TokenGroup }) {
  if (group === "color" || group === "shadow" || group === "chart") return <ThemeTable group={group} />;
  if (group === "chart-seq") return <SharedTable prefix="--cs-chart-seq" values={sequentialBlue} kind="color" />;
  if (!(group in shared)) throw new Error(`TokenTable: unknown group "${group}".`);
  return <SharedTable prefix={`--cs-${group}`} values={shared[group]} kind={previews[group]} />;
}
