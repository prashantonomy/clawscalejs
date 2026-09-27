"use client";

import { Spinner } from "@clawscale/react";

export default function SpinnerIntent() {
  return (
    <>
      <Spinner />
      <Spinner intent="primary" />
      <Spinner intent="success" />
      <Spinner intent="warning" />
      <Spinner intent="danger" />
    </>
  );
}
