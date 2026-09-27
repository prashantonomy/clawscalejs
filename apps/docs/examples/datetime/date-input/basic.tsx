"use client";

import { FormGroup } from "@clawscale/react";
import { DateInput } from "@clawscale/react/datetime";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const formatDate = (date: Date) => `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;

function parseDate(text: string) {
  const [day = "", month = "", year = ""] = text.trim().split(/\s+/);
  const date = new Date(Number(year), MONTHS.indexOf(month), Number(day));
  // Reject unknown months and days that overflow, such as 31 Sep.
  return MONTHS.includes(month) && date.getDate() === Number(day) ? date : false;
}

export default function DateInputBasic() {
  return (
    <FormGroup label="Retain audit logs until" labelFor="retain-until">
      <DateInput
        formatDate={formatDate}
        parseDate={parseDate}
        placeholder="D Mon YYYY"
        defaultValue="2026-12-31"
        inputProps={{ id: "retain-until" }}
      />
    </FormGroup>
  );
}
