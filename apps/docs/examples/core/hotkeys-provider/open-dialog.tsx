"use client";

import { Button, HotkeysContext } from "@clawscale/react";
import { useContext } from "react";

export default function HotkeysProviderOpenDialog() {
  const [, dispatch] = useContext(HotkeysContext);
  return <Button icon="key-command" text="Keyboard shortcuts" onClick={() => dispatch({ type: "OPEN_DIALOG" })} />;
}
