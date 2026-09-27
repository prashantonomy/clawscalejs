"use client";

import { FileInput } from "@clawscale/react";

export default function FileInputBasic() {
  return <FileInput inputProps={{ accept: ".csv" }} text="Choose a CSV export" />;
}
