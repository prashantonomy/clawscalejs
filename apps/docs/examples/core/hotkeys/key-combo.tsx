"use client";

import { HTMLTable, KeyComboTag } from "@clawscale/react";
import { useEffect, useState } from "react";

const SHORTCUTS = [
  { combo: "mod+s", label: "Save view" },
  { combo: "shift+r", label: "Refresh all panels" },
  { combo: "alt+up", label: "Move row up" },
  { combo: "esc", label: "Clear selection" },
];

export default function HotkeysKeyCombo() {
  // KeyComboTag output depends on the platform, so render it after mount.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <HTMLTable compact>
      <thead>
        <tr>
          <th>Action</th>
          <th>Default</th>
          <th>Minimal</th>
        </tr>
      </thead>
      <tbody>
        {SHORTCUTS.map(({ combo, label }) => (
          <tr key={combo}>
            <td>{label}</td>
            <td>{mounted && <KeyComboTag combo={combo} />}</td>
            <td>{mounted && <KeyComboTag combo={combo} minimal />}</td>
          </tr>
        ))}
      </tbody>
    </HTMLTable>
  );
}
