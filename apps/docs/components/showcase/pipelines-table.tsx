"use client";

import { Icon, Sparkline, Tag } from "@clawscale/react";
import { Cell, Column, Regions, SelectionModes, Table } from "@clawscale/react/table";
import { formatAgo, formatDuration, formatNumber, type Pipeline } from "./data";
import { statusStyle } from "./status";

export interface PipelinesTableProps {
  pipelines: Pipeline[];
  selectedId: string | undefined;
  onSelect: (id: string) => void;
}

export function PipelinesTable({ pipelines, selectedId, onSelect }: PipelinesTableProps) {
  const selectedIndex = pipelines.findIndex((p) => p.id === selectedId);
  const at = (row: number) => pipelines[row] as Pipeline;

  return (
    <div className="showcase-table">
      <Table
        numRows={pipelines.length}
        columnWidths={[210, 124, 118, 116, 86, 92, 118, 104, 72]}
        defaultRowHeight={32}
        enableRowHeader={false}
        enableFocusedCell={false}
        numFrozenColumns={1}
        selectionModes={SelectionModes.ROWS_AND_CELLS}
        selectedRegions={selectedIndex >= 0 ? [Regions.row(selectedIndex)] : []}
        onSelection={(regions) => {
          const row = regions[0]?.rows?.[0];
          if (row !== undefined && pipelines[row]) onSelect(pipelines[row].id);
        }}
        cellRendererDependencies={[pipelines]}
      >
        <Column
          name="Pipeline"
          cellRenderer={(row) => (
            <Cell className="showcase-cell-name">
              <Icon icon="flow-linear" size={12} />
              <span>{at(row).name}</span>
            </Cell>
          )}
        />
        <Column
          name="Status"
          cellRenderer={(row) => {
            const status = statusStyle[at(row).status];
            return (
              <Cell className="showcase-cell-status">
                <Tag minimal intent={status.intent} icon={status.icon}>
                  {status.label}
                </Tag>
              </Cell>
            );
          }}
        />
        <Column name="Owner" cellRenderer={(row) => <Cell>{at(row).owner}</Cell>} />
        <Column name="Region" cellRenderer={(row) => <Cell>{at(row).region}</Cell>} />
        <Column
          name="Last run"
          cellRenderer={(row) => <Cell className="showcase-cell-muted">{formatAgo(at(row).lastRunMinutesAgo)}</Cell>}
        />
        <Column
          name="Duration"
          cellRenderer={(row) => (
            <Cell className="showcase-cell-number">{formatDuration(at(row).durationSeconds)}</Cell>
          )}
        />
        <Column
          name="Rows"
          cellRenderer={(row) => <Cell className="showcase-cell-number">{formatNumber(at(row).rows)}</Cell>}
        />
        <Column
          name="Duration trend"
          cellRenderer={(row) => (
            <Cell className="showcase-cell-spark">
              <Sparkline
                data={at(row).trend}
                width={84}
                height={18}
                label={`${at(row).name} duration, last 14 runs`}
                color={at(row).status === "failed" ? "var(--cs-color-danger)" : "var(--cs-chart-1)"}
              />
            </Cell>
          )}
        />
        <Column
          name="SLA"
          cellRenderer={(row) => <Cell className="showcase-cell-number">{`${(at(row).sla * 100).toFixed(1)}%`}</Cell>}
        />
      </Table>
    </div>
  );
}
