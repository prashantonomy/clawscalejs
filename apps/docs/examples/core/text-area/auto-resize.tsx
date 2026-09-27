"use client";

import { ClawscaleClasses, FormGroup, TextArea } from "@clawscale/react";

const QUERY = `SELECT region, count(*) AS orders
FROM warehouse.orders_daily
WHERE order_date >= current_date - 7
GROUP BY region`;

export default function TextAreaAutoResize() {
  return (
    <FormGroup label="Query" labelFor="text-area-query">
      <TextArea autoResize className={ClawscaleClasses.MONOSPACE} defaultValue={QUERY} fill id="text-area-query" />
    </FormGroup>
  );
}
