"use client";

import { FileInput } from "@clawscale/react";

export default function FileInputFill() {
  return <FileInput fill inputProps={{ accept: ".parquet" }} text="Choose a Parquet file to backfill orders_daily" />;
}
