/**
 * Extracts documented props from the built @clawscale/react type declarations,
 * which re-export Blueprint's types. Only props declared by Blueprint or Clawscale
 * are kept; inherited DOM attributes are dropped, like on blueprintjs.com.
 *
 * Uses the TypeScript 6 compiler API. TypeScript 7 does not ship this API,
 * which is why the repository pins TypeScript 6.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

export interface PropDoc {
  name: string;
  type: string;
  description: string;
  defaultValue?: string;
  required: boolean;
  deprecated?: string;
  inheritedFrom?: string;
}

export interface InterfaceDoc {
  name: string;
  kind: "interface" | "type";
  importPath: string;
  heritage?: string;
  description: string;
  props: PropDoc[];
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const generatedDir = join(root, "generated");

export const entryModules = [
  "@clawscale/react",
  "@clawscale/react/select",
  "@clawscale/react/datetime",
  "@clawscale/react/table",
  "@clawscale/react/icons",
] as const;

const INCLUDE = /(Props|Info|Config|Options)$/;

/** Removes characters the docs never show and resolves JSDoc link tags. */
export function sanitizeDocText(text: string): string {
  return text
    .replace(/\{@link\s+([^}\s|]+)(?:[\s|]+([^}]+))?\}/g, (_match, target: string, label?: string) =>
      (label ?? target).trim(),
    )
    .replace(/\s*\u2014\s*/g, ", ")
    .replace(/\u2013/g, "-")
    .replace(/\s*[\u00B7\u2022\u2027\u22C5]\s*/g, ", ")
    .trim();
}

function firstParagraph(text: string): string {
  return sanitizeDocText(text.split(/\n\s*\n/)[0] ?? "").replace(/\s*\n\s*/g, " ");
}

function importPathFor(fileName: string): string {
  const match = /@blueprintjs\/(core|select|datetime|table|icons)\//.exec(fileName);
  if (!match || match[1] === "core") return "@clawscale/react";
  return `@clawscale/react/${match[1]}`;
}

function isDocumentedSource(fileName: string): boolean {
  return /[\\/]@blueprintjs[\\/]|[\\/]@clawscale[\\/]|[\\/]packages[\\/]react[\\/]/.test(fileName);
}

function ownerName(node: ts.Node): string | undefined {
  const parent = node.parent;
  if (parent && ts.isInterfaceDeclaration(parent)) return parent.name.text;
  if (parent && ts.isTypeLiteralNode(parent) && ts.isTypeAliasDeclaration(parent.parent)) {
    return parent.parent.name.text;
  }
  return undefined;
}

function oneLine(text: string): string {
  return text.replace(/\s+/g, " ").trim();
}

function typeText(checker: ts.TypeChecker, prop: ts.Symbol, decl: ts.Declaration): string {
  if ((ts.isPropertySignature(decl) || ts.isPropertyDeclaration(decl)) && decl.type) {
    return oneLine(decl.type.getText(decl.getSourceFile()));
  }
  if (ts.isMethodSignature(decl) || ts.isMethodDeclaration(decl)) {
    const signature = checker.getSignatureFromDeclaration(decl);
    if (signature) return oneLine(checker.signatureToString(signature));
  }
  return oneLine(
    checker.typeToString(checker.getTypeOfSymbolAtLocation(prop, decl), undefined, ts.TypeFormatFlags.NoTruncation),
  );
}

function describeProps(checker: ts.TypeChecker, type: ts.Type, interfaceName: string): PropDoc[] {
  const props: PropDoc[] = [];
  for (const prop of checker.getPropertiesOfType(type)) {
    // Keys renamed by a mapped type (BlueprintProvider's hotkeysProvider* props) have no declarations.
    // Their docs live on the original property.
    const origin = prop.declarations?.length ? prop : (checker.getRootSymbols(prop)[0] ?? prop);
    const decl = origin.valueDeclaration ?? origin.declarations?.[0];
    if (!decl || !isDocumentedSource(decl.getSourceFile().fileName)) continue;
    const tags = origin.getJsDocTags(checker);
    const tagText = (name: string) => {
      const tag = tags.find((t) => t.name === name);
      return tag ? sanitizeDocText(ts.displayPartsToString(tag.text)) : undefined;
    };
    const owner = ownerName(decl);
    const doc: PropDoc = {
      name: prop.getName(),
      type: sanitizeDocText(typeText(checker, origin, decl)),
      description: firstParagraph(ts.displayPartsToString(origin.getDocumentationComment(checker))),
      required: (prop.flags & ts.SymbolFlags.Optional) === 0,
    };
    const defaultValue = tagText("default");
    if (defaultValue) doc.defaultValue = defaultValue;
    const deprecated = tags.some((t) => t.name === "deprecated") ? (tagText("deprecated") ?? "") : undefined;
    if (deprecated !== undefined) doc.deprecated = deprecated;
    if (owner && owner !== interfaceName) doc.inheritedFrom = owner;
    props.push(doc);
  }
  return props.sort((a, b) => a.name.localeCompare(b.name));
}

export function buildProps(): Record<string, InterfaceDoc> {
  mkdirSync(generatedDir, { recursive: true });
  const entryPath = join(generatedDir, "props-entry.ts");
  writeFileSync(
    entryPath,
    `${entryModules.map((m, i) => `import type * as m${i} from "${m}";`).join("\n")}\nexport type { ${entryModules.map((_m, i) => `m${i}`).join(", ")} };\n`,
  );
  const program = ts.createProgram([entryPath], {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    jsx: ts.JsxEmit.ReactJSX,
    strict: true,
    skipLibCheck: true,
    noEmit: true,
    types: [],
  });
  const checker = program.getTypeChecker();
  const source = program.getSourceFile(entryPath);
  if (!source) throw new Error("props: entry file did not load");

  const docs: Record<string, InterfaceDoc> = {};
  for (const statement of source.statements) {
    if (!ts.isImportDeclaration(statement)) continue;
    const moduleSymbol = checker.getSymbolAtLocation(statement.moduleSpecifier);
    if (!moduleSymbol) {
      throw new Error(`props: cannot resolve ${statement.moduleSpecifier.getText(source)}. Build the packages first.`);
    }
    for (const exported of checker.getExportsOfModule(moduleSymbol)) {
      const name = exported.getName();
      if (!INCLUDE.test(name) || docs[name]) continue;
      const symbol = exported.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(exported) : exported;
      const decl = symbol.declarations?.find((d) => ts.isInterfaceDeclaration(d) || ts.isTypeAliasDeclaration(d));
      if (!decl || !(ts.isInterfaceDeclaration(decl) || ts.isTypeAliasDeclaration(decl))) continue;
      const type = ts.isInterfaceDeclaration(decl)
        ? checker.getDeclaredTypeOfSymbol(symbol)
        : checker.getTypeAtLocation(decl.name);
      const props = describeProps(checker, type, decl.name.text);
      if (props.length === 0) continue;
      const heritage = ts.isInterfaceDeclaration(decl)
        ? decl.heritageClauses?.map((clause) => oneLine(clause.getText())).join(" ")
        : undefined;
      docs[name] = {
        name,
        kind: ts.isInterfaceDeclaration(decl) ? "interface" : "type",
        importPath: importPathFor(decl.getSourceFile().fileName),
        ...(heritage ? { heritage } : {}),
        description: firstParagraph(ts.displayPartsToString(symbol.getDocumentationComment(checker))),
        props,
      };
    }
  }
  return docs;
}
