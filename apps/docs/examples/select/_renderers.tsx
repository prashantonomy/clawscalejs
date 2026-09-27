import { MenuItem } from "@clawscale/react";
import type { ItemRenderer } from "@clawscale/react/select";
import type { Command, Dataset } from "./_data";

/** A dataset as a list option, with its owner on the right. */
export const renderDataset: ItemRenderer<Dataset> = (dataset, { handleClick, handleFocus, id, modifiers, ref }) => {
  if (!modifiers.matchesPredicate) return null;
  return (
    <MenuItem
      key={dataset.id}
      ref={ref}
      id={id}
      active={modifiers.active}
      disabled={modifiers.disabled}
      label={dataset.owner}
      onClick={handleClick}
      onFocus={handleFocus}
      roleStructure="listoption"
      text={dataset.name}
    />
  );
};

/** Ticks the chosen datasets. Clicks do not close a surrounding popover, so several picks in a row work. */
export function renderCheckedDataset(chosen: Dataset[]): ItemRenderer<Dataset> {
  return (dataset, { handleClick, handleFocus, id, modifiers, ref }) => {
    if (!modifiers.matchesPredicate) return null;
    return (
      <MenuItem
        key={dataset.id}
        ref={ref}
        id={id}
        active={modifiers.active}
        disabled={modifiers.disabled}
        label={dataset.owner}
        onClick={handleClick}
        onFocus={handleFocus}
        roleStructure="listoption"
        selected={chosen.includes(dataset)}
        shouldDismissPopover={false}
        text={dataset.name}
      />
    );
  };
}

/** A command with its icon, and its group on the right. */
export const renderCommand: ItemRenderer<Command> = (command, { handleClick, handleFocus, id, modifiers, ref }) => {
  if (!modifiers.matchesPredicate) return null;
  return (
    <MenuItem
      key={command.id}
      ref={ref}
      id={id}
      active={modifiers.active}
      icon={command.icon}
      label={command.group}
      onClick={handleClick}
      onFocus={handleFocus}
      roleStructure="listoption"
      text={command.title}
    />
  );
};
