"use client";

import { DatePicker } from "@clawscale/react/datetime";
import { Playground, usePlayground } from "@/components/docs/playground";

export default function DatePickerPlayground() {
  const [props, options] = usePlayground({
    shortcuts: { type: "boolean", label: "Shortcuts", default: false },
    showActionsBar: { type: "boolean", label: "Actions bar", default: false },
    canClearSelection: { type: "boolean", label: "Can clear selection", default: true },
    reverseMonthAndYearMenus: { type: "boolean", label: "Year menu first", default: false },
    precision: {
      type: "select",
      label: "Time precision",
      options: ["none", "minute", "second", "millisecond"],
      default: "none",
    },
  });
  const { precision, ...pickerProps } = props;
  return (
    <Playground options={options}>
      <DatePicker
        {...pickerProps}
        timePrecision={precision === "none" ? undefined : precision}
        defaultValue={new Date(2026, 7, 17, 2, 30)}
      />
    </Playground>
  );
}
