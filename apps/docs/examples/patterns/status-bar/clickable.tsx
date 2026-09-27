"use client";

import { StatusBar, StatusBarItem, StatusBarSpacer } from "@clawscale/react";
import { useState } from "react";

export default function StatusBarClickable() {
  const [utc, setUtc] = useState(true);
  const [unread, setUnread] = useState(3);
  return (
    <StatusBar>
      <StatusBarItem icon="tick-circle" intent="success">
        Connected
      </StatusBarItem>
      <StatusBarSpacer />
      <StatusBarItem icon="time" onClick={() => setUtc(!utc)}>
        {utc ? "UTC" : "Local time"}
      </StatusBarItem>
      <StatusBarItem icon="notifications" aria-label={`${unread} notifications`} onClick={() => setUnread(0)}>
        {unread}
      </StatusBarItem>
    </StatusBar>
  );
}
