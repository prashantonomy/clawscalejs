"use client";

import { Spinner, SpinnerSize } from "@clawscale/react";

export default function SpinnerSizeExample() {
  return (
    <>
      <Spinner size={SpinnerSize.SMALL} />
      <Spinner size={SpinnerSize.STANDARD} />
      <Spinner size={SpinnerSize.LARGE} />
    </>
  );
}
