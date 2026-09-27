"use client";

import { Button, ButtonGroup, Icon, InputGroup, NonIdealState } from "@clawscale/react";
import { type IconName, IconNames } from "@clawscale/react/icons";
import { type CSSProperties, useDeferredValue, useMemo, useState } from "react";

// IconNames has two keys per icon (DataLineage and DATA_LINEAGE), so dedupe the values.
const ICONS = [...new Set<IconName>(Object.values(IconNames))].sort();
const PAGE_SIZE = 180;

const grid: CSSProperties = {
  display: "grid",
  gap: 8,
  gridTemplateColumns: "repeat(auto-fill, minmax(124px, 1fr))",
};

const card: CSSProperties = {
  alignItems: "center",
  background: "var(--cs-color-surface-raised)",
  border: "1px solid var(--cs-color-border-subtle)",
  borderRadius: "var(--cs-radius-md)",
  display: "flex",
  flexDirection: "column",
  gap: 10,
  padding: "16px 8px 12px",
};

const label: CSSProperties = {
  color: "var(--cs-color-text-muted)",
  fontFamily: "var(--cs-font-mono)",
  fontSize: "var(--cs-font-size-xs)",
  overflowWrap: "anywhere",
  textAlign: "center",
  userSelect: "all",
};

export default function IconsGallery() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const deferredQuery = useDeferredValue(query);
  const matches = useMemo(() => {
    const terms = deferredQuery
      .toLowerCase()
      .split(/[\s-]+/)
      .filter(Boolean);
    return ICONS.filter((name) => terms.every((term) => name.includes(term)));
  }, [deferredQuery]);
  const pageCount = Math.ceil(matches.length / PAGE_SIZE);
  const visible = matches.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  return (
    <>
      <InputGroup
        type="search"
        leftIcon="search"
        aria-label="Filter icons"
        placeholder={`Filter ${ICONS.length} icons, for example "chart" or "arrow up"`}
        value={query}
        onValueChange={(value) => {
          setQuery(value);
          setPage(0);
        }}
      />
      {visible.length === 0 ? (
        <NonIdealState icon="search" title="No matching icons" description="Try a shorter or different word." />
      ) : (
        <div style={grid}>
          {visible.map((name) => (
            <div key={name} style={card}>
              <Icon icon={name} size={20} />
              <span style={label}>{name}</span>
            </div>
          ))}
        </div>
      )}
      {pageCount > 1 && (
        <div style={{ alignItems: "center", display: "flex", gap: 12, justifyContent: "space-between" }}>
          <span>
            Page {page + 1} of {pageCount}, {matches.length} icons
          </span>
          <ButtonGroup>
            <Button icon="chevron-left" text="Previous" disabled={page === 0} onClick={() => setPage(page - 1)} />
            <Button
              endIcon="chevron-right"
              text="Next"
              disabled={page + 1 >= pageCount}
              onClick={() => setPage(page + 1)}
            />
          </ButtonGroup>
        </div>
      )}
    </>
  );
}
