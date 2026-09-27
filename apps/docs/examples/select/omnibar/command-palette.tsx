"use client";

import { Button, KeyComboTag, MenuItem, useHotkeys } from "@clawscale/react";
import { Omnibar } from "@clawscale/react/select";
import { useMemo, useState } from "react";
import { COMMANDS, type Command } from "../_data";
import { renderCommand } from "../_renderers";

export default function OmnibarCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [lastCommand, setLastCommand] = useState<Command>();
  const hotkeys = useMemo(
    () => [{ combo: "shift+p", global: true, label: "Open the command palette", onKeyDown: () => setIsOpen(true) }],
    [],
  );
  useHotkeys(hotkeys);
  return (
    <>
      <Button icon="search" text="Command palette" onClick={() => setIsOpen(true)} />
      <KeyComboTag combo="shift+p" />
      <Omnibar<Command>
        isOpen={isOpen}
        items={COMMANDS}
        itemPredicate={(query, command) => command.title.toLowerCase().includes(query.trim().toLowerCase())}
        itemRenderer={renderCommand}
        noResults={<MenuItem disabled text="No commands match." roleStructure="listoption" />}
        onClose={() => setIsOpen(false)}
        onItemSelect={(command) => {
          setLastCommand(command);
          setIsOpen(false);
        }}
        resetOnSelect
      />
      {lastCommand && <span>Last command: {lastCommand.title}</span>}
    </>
  );
}
