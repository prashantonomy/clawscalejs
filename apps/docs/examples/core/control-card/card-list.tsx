"use client";

import { CardList, SwitchCard } from "@clawscale/react";

export default function ControlCardList() {
  return (
    <CardList role="group" aria-label="Pipeline options" style={{ maxWidth: 400 }}>
      <SwitchCard defaultChecked>Run on schedule</SwitchCard>
      <SwitchCard defaultChecked>Retry failed steps</SwitchCard>
      <SwitchCard>Notify on success</SwitchCard>
      <SwitchCard>Keep intermediate files</SwitchCard>
    </CardList>
  );
}
