"use client";

import { StatusBar, StatusBarItem, StatusBarSpacer } from "@clawscale/react";

export default function StatusBarWithSpacer() {
  return (
    <StatusBar>
      <StatusBarItem icon="tick-circle" intent="success">
        Connected
      </StatusBarItem>
      <StatusBarItem icon="git-branch">main</StatusBarItem>
      <StatusBarSpacer />
      <StatusBarItem>12,480 rows</StatusBarItem>
      <StatusBarItem>UTF-8</StatusBarItem>
      <StatusBarItem>UTC</StatusBarItem>
    </StatusBar>
  );
}
