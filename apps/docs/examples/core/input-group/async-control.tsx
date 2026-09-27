"use client";

import { FormGroup, InputGroup } from "@clawscale/react";
import { useState } from "react";

export default function InputGroupAsyncControl() {
  const [tableName, setTableName] = useState("orders_daily");
  return (
    <FormGroup label="Table name" labelFor="input-group-table">
      <InputGroup
        asyncControl
        id="input-group-table"
        value={tableName}
        // A stand-in for a store that applies updates after the change event.
        onValueChange={(value) => setTimeout(() => setTableName(value), 0)}
      />
    </FormGroup>
  );
}
