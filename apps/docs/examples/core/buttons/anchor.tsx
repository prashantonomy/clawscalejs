"use client";

import { AnchorButton } from "@clawscale/react";

export default function ButtonsAnchor() {
  return (
    <>
      <AnchorButton href="https://github.com/clawscale/clawscale" target="_blank" endIcon="share" text="GitHub" />
      <AnchorButton disabled href="#" text="Disabled link" />
    </>
  );
}
