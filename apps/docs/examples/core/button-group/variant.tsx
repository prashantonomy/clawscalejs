"use client";

import { Button, ButtonGroup } from "@clawscale/react";

export default function ButtonGroupVariant() {
  return (
    <>
      <ButtonGroup>
        <Button text="Day" />
        <Button active text="Week" />
        <Button text="Month" />
      </ButtonGroup>
      <ButtonGroup variant="outlined">
        <Button text="Day" />
        <Button active text="Week" />
        <Button text="Month" />
      </ButtonGroup>
      <ButtonGroup variant="minimal">
        <Button text="Day" />
        <Button active text="Week" />
        <Button text="Month" />
      </ButtonGroup>
    </>
  );
}
