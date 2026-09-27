"use client";

import { Card } from "@clawscale/react";

export default function CardElevation() {
  return (
    <>
      <Card elevation={0}>Elevation 0</Card>
      <Card elevation={1}>Elevation 1</Card>
      <Card elevation={2}>Elevation 2</Card>
      <Card elevation={3}>Elevation 3</Card>
      <Card elevation={4}>Elevation 4</Card>
    </>
  );
}
