"use client";

import { RadioGroup } from "@clawscale/react";
import { useState } from "react";

const CODECS = [
  { label: "zstd", value: "zstd" },
  { label: "gzip", value: "gzip" },
  { label: "snappy", value: "snappy" },
  { label: "No compression", value: "none" },
];

export default function RadioBasic() {
  const [codec, setCodec] = useState("zstd");
  return (
    <RadioGroup
      name="radio-codec"
      onChange={(event) => setCodec(event.currentTarget.value)}
      options={CODECS}
      selectedValue={codec}
    />
  );
}
