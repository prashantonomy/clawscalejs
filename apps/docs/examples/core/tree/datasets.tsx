"use client";

import { Tree, type TreeNodeInfo } from "@clawscale/react";
import { useState } from "react";

const DATASETS: TreeNodeInfo[] = [
  {
    id: "raw",
    label: "raw",
    childNodes: [
      { id: "raw.events", label: "events", icon: "th", secondaryLabel: "1.2B rows" },
      { id: "raw.orders", label: "orders", icon: "th", secondaryLabel: "84M rows" },
    ],
  },
  {
    id: "curated",
    label: "curated",
    childNodes: [
      { id: "curated.orders_daily", label: "orders_daily", icon: "th", secondaryLabel: "3.4M rows" },
      { id: "curated.revenue_by_region", label: "revenue_by_region", icon: "th", secondaryLabel: "12K rows" },
    ],
  },
];

export default function TreeDatasets() {
  const [expanded, setExpanded] = useState<TreeNodeInfo["id"][]>(["curated"]);
  const [selected, setSelected] = useState<TreeNodeInfo["id"]>("curated.orders_daily");

  const withState = (nodes: TreeNodeInfo[]): TreeNodeInfo[] =>
    nodes.map((node) => ({
      ...node,
      icon: node.childNodes ? (expanded.includes(node.id) ? "folder-open" : "folder-close") : node.icon,
      isExpanded: expanded.includes(node.id),
      isSelected: node.id === selected,
      childNodes: node.childNodes && withState(node.childNodes),
    }));

  const toggle = ({ id }: TreeNodeInfo) =>
    setExpanded((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

  return (
    <div style={{ maxWidth: 360, width: "100%" }}>
      <Tree
        contents={withState(DATASETS)}
        onNodeClick={(node) => setSelected(node.id)}
        onNodeCollapse={toggle}
        onNodeExpand={toggle}
      />
    </div>
  );
}
