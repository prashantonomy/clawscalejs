"use client";

import { DateRangeInput } from "@clawscale/react/datetime";

export default function DateRangeInputBasic() {
  return (
    <DateRangeInput
      dateFnsFormat="MMM d, yyyy"
      shortcuts={false}
      defaultValue={[new Date(2026, 8, 8), new Date(2026, 8, 14)]}
    />
  );
}
