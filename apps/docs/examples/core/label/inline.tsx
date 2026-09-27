"use client";

import { Classes, HTMLSelect, Label } from "@clawscale/react";

export default function LabelInline() {
  return (
    <>
      <Label className={Classes.INLINE}>
        Region
        <HTMLSelect options={["eu-west-1", "us-east-1", "ap-southeast-2"]} />
      </Label>
      <Label className={Classes.INLINE}>
        Owner
        <input className={Classes.INPUT} placeholder="data-platform" />
      </Label>
    </>
  );
}
