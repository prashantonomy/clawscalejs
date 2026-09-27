"use client";

import { Tag } from "@clawscale/react";
import { useState } from "react";

const REGIONS = ["us-east-1", "us-west-2", "eu-west-1", "ap-southeast-2"];

export default function TagInteractive() {
  const [selected, setSelected] = useState(["eu-west-1"]);
  const toggle = (region: string) =>
    setSelected((current) =>
      current.includes(region) ? current.filter((item) => item !== region) : [...current, region],
    );
  return (
    <>
      {REGIONS.map((region) => (
        <Tag key={region} interactive active={selected.includes(region)} onClick={() => toggle(region)}>
          {region}
        </Tag>
      ))}
    </>
  );
}
