"use client";

import { Button, Menu, MenuItem, PopoverNext, useTheme } from "@clawscale/react";
import { themes } from "@clawscale/tokens";

const options = Object.values(themes);

export default function ThemesPicker() {
  const { theme, setTheme } = useTheme();
  const current = options.find((option) => option.name === theme)?.label ?? theme;
  return (
    <PopoverNext
      placement="bottom-start"
      content={
        <Menu aria-label="Theme">
          {options.map(({ name, label }) => (
            <MenuItem
              key={name}
              role="menuitemradio"
              aria-checked={name === theme}
              icon={name === theme ? "tick" : "blank"}
              text={label}
              onClick={() => setTheme(name)}
            />
          ))}
        </Menu>
      }
    >
      <Button aria-label={`Theme: ${current}`} icon="style" endIcon="caret-down" text={current} />
    </PopoverNext>
  );
}
