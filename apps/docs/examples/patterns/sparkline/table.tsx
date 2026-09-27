"use client";

import { ClawscaleClasses, HTMLTable, Sparkline } from "@clawscale/react";

const endpoints = [
  { path: "/v1/orders", rpm: 8412, trend: [6120, 5480, 5010, 5890, 7240, 8120, 8650, 8930, 8810, 8560, 8390, 8412] },
  { path: "/v1/search", rpm: 5307, trend: [3980, 3620, 3410, 3890, 4620, 5140, 5480, 5620, 5510, 5390, 5280, 5307] },
  { path: "/v1/invoices", rpm: 1186, trend: [1420, 1380, 1310, 1290, 1250, 1240, 1220, 1210, 1200, 1195, 1190, 1186] },
  { path: "/v1/auth/token", rpm: 942, trend: [620, 580, 560, 690, 840, 910, 960, 990, 970, 950, 945, 942] },
];

const count = new Intl.NumberFormat("en-US");

export default function SparklineTable() {
  return (
    <HTMLTable compact>
      <thead>
        <tr>
          <th>Endpoint</th>
          <th style={{ textAlign: "right" }}>Requests/min</th>
          <th>Last 24 hours</th>
        </tr>
      </thead>
      <tbody>
        {endpoints.map((endpoint) => (
          <tr key={endpoint.path}>
            <td className={ClawscaleClasses.MONOSPACE}>{endpoint.path}</td>
            <td className={ClawscaleClasses.NUMERIC} style={{ textAlign: "right" }}>
              {count.format(endpoint.rpm)}
            </td>
            <td>
              <Sparkline data={endpoint.trend} width={96} height={18} label={`Requests per minute, ${endpoint.path}`} />
            </td>
          </tr>
        ))}
      </tbody>
    </HTMLTable>
  );
}
