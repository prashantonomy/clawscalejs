"use client";

import { Divider, FormGroup, HTMLSelect, SegmentedControl, Slider, Switch } from "@clawscale/react";
import { type ReactNode, useId, useMemo, useState } from "react";

/**
 * Interactive playgrounds, like blueprintjs.com's "Interactive Playground".
 *
 *   const [props, options] = usePlayground({
 *     disabled: { type: "boolean", label: "Disabled", default: false },
 *     intent: { type: "select", label: "Intent", options: INTENTS, default: "none" },
 *   });
 *   return <Playground options={options}><Button {...props} text="Save" /></Playground>;
 */
export type PlaygroundOption =
  | { type: "boolean"; label: string; default: boolean }
  | { type: "select"; label: string; options: readonly string[]; default: string }
  | { type: "segmented"; label: string; options: readonly string[]; default: string }
  | { type: "number"; label: string; min: number; max: number; step?: number; default: number }
  | { type: "heading"; label: string };

type ValueOf<O> = O extends { type: "boolean" }
  ? boolean
  : O extends { type: "number" }
    ? number
    : O extends { options: readonly (infer V)[] }
      ? V
      : never;

type ValuesOf<S> = { [K in keyof S as S[K] extends { type: "heading" } ? never : K]: ValueOf<S[K]> };

export const INTENTS = ["none", "primary", "success", "warning", "danger"] as const;
export const SIZES = ["small", "medium", "large"] as const;

export function usePlayground<const S extends Record<string, PlaygroundOption>>(schema: S): [ValuesOf<S>, ReactNode] {
  const idPrefix = useId();
  const [values, setValues] = useState(() => {
    const initial: Record<string, unknown> = {};
    for (const [key, option] of Object.entries(schema)) {
      if (option.type !== "heading") initial[key] = option.default;
    }
    return initial;
  });

  const options = useMemo(() => {
    const set = (key: string, value: unknown) => setValues((current) => ({ ...current, [key]: value }));
    return Object.entries(schema).map(([key, option]) => {
      const id = `${idPrefix}-${key}`;
      switch (option.type) {
        case "heading":
          return (
            <div key={key} className="docs-playground-heading">
              <Divider />
              <div className="docs-playground-title">{option.label}</div>
            </div>
          );
        case "boolean":
          return (
            <Switch
              key={key}
              checked={Boolean(values[key])}
              label={option.label}
              onChange={(event) => set(key, event.currentTarget.checked)}
            />
          );
        case "select":
          return (
            <FormGroup key={key} label={option.label} labelFor={id}>
              <HTMLSelect
                id={id}
                fill
                options={[...option.options]}
                value={String(values[key])}
                onChange={(event) => set(key, event.currentTarget.value)}
              />
            </FormGroup>
          );
        case "segmented":
          return (
            <FormGroup key={key} label={option.label}>
              <SegmentedControl
                fill
                size="small"
                options={option.options.map((value) => ({ label: value, value }))}
                value={String(values[key])}
                onValueChange={(value) => set(key, value)}
              />
            </FormGroup>
          );
        case "number": {
          const decimals = String(option.step ?? 1).split(".")[1]?.length ?? 0;
          return (
            <FormGroup key={key} label={`${option.label}: ${Number(values[key]).toFixed(decimals)}`}>
              <Slider
                handleHtmlProps={{ "aria-label": option.label }}
                min={option.min}
                max={option.max}
                stepSize={option.step ?? 1}
                labelStepSize={option.max - option.min}
                value={Number(values[key])}
                onChange={(value) => set(key, Number(value.toFixed(decimals)))}
              />
            </FormGroup>
          );
        }
        default:
          return null;
      }
    });
  }, [schema, values, idPrefix]);

  return [values as ValuesOf<S>, options];
}

export function Playground({ options, children }: { options: ReactNode; children: ReactNode }) {
  return (
    <div className="docs-playground">
      <div className="docs-playground-demo">{children}</div>
      <div className="docs-playground-options">
        <div className="docs-playground-title">Props</div>
        {options}
      </div>
    </div>
  );
}

/** Maps the playground's "none" intent to `undefined` and sizes to component props. */
export function intentProp(intent: string) {
  return intent === "none" ? undefined : (intent as "primary" | "success" | "warning" | "danger");
}
