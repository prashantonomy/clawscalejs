"use client";

import { FormGroup, NumericInput } from "@clawscale/react";
import { useState } from "react";

const INITIAL_LIMIT = 1250.5;
const usd = new Intl.NumberFormat("en-US", { currency: "USD", style: "currency" });

export default function NumericInputPrecision() {
  const [limit, setLimit] = useState(INITIAL_LIMIT);
  return (
    <FormGroup helperText={`${usd.format(limit)} per month`} label="Spend limit">
      <NumericInput
        aria-label="Spend limit in US dollars"
        clampValueOnBlur
        defaultValue={INITIAL_LIMIT}
        leftIcon="dollar"
        majorStepSize={1000}
        max={10000}
        min={0}
        minorStepSize={0.01}
        stepSize={50}
        onValueChange={(value) => setLimit(Number.isNaN(value) ? 0 : value)}
      />
    </FormGroup>
  );
}
