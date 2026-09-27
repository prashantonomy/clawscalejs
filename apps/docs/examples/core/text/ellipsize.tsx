"use client";

import { HTMLTable, Text } from "@clawscale/react";

const FILES = [
  { path: "s3://acme-lake/raw/events/region=eu-west-1/date=2026-09-27/part-00017.parquet", size: "412 MB" },
  { path: "s3://acme-lake/curated/orders_daily/date=2026-09-27/part-00000.parquet", size: "96 MB" },
  { path: "s3://acme-lake/tmp/_SUCCESS", size: "0 B" },
];

export default function TextEllipsize() {
  return (
    <HTMLTable compact style={{ maxWidth: 440, tableLayout: "fixed", width: "100%" }}>
      <thead>
        <tr>
          <th>Path</th>
          <th style={{ width: 96 }}>Size</th>
        </tr>
      </thead>
      <tbody>
        {FILES.map((file) => (
          <tr key={file.path}>
            <td>
              <Text ellipsize>{file.path}</Text>
            </td>
            <td>{file.size}</td>
          </tr>
        ))}
      </tbody>
    </HTMLTable>
  );
}
