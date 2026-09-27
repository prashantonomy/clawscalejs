"use client";

import { Button, MenuItem } from "@clawscale/react";
import { type ItemRenderer, Select } from "@clawscale/react/select";
import { useState } from "react";
import { REGIONS } from "../_data";

export default function SelectFilterable() {
  const [region, setRegion] = useState("us-east-1");
  const renderRegion: ItemRenderer<string> = (item, { handleClick, handleFocus, id, modifiers, ref }) => (
    <MenuItem
      key={item}
      ref={ref}
      id={id}
      active={modifiers.active}
      onClick={handleClick}
      onFocus={handleFocus}
      roleStructure="listoption"
      selected={item === region}
      text={item}
    />
  );
  return (
    <Select<string> filterable={false} items={REGIONS} itemRenderer={renderRegion} onItemSelect={setRegion}>
      <Button endIcon="caret-down" icon="globe" text={region} />
    </Select>
  );
}
