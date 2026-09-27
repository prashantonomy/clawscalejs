"use client";

import { KeyComboTag as BlueprintKeyComboTag, type KeyComboTagProps } from "@blueprintjs/core";
import { type ComponentType, useSyncExternalStore } from "react";

// Blueprint reads platformOverride but only types it internally. test/key-combo-tag.test.tsx fails if that changes.
const PlatformKeyComboTag = BlueprintKeyComboTag as ComponentType<KeyComboTagProps & { platformOverride: string }>;

const subscribe = () => () => {};
const clientPlatform = () => navigator.platform;
// Not a Mac, and not undefined: undefined makes Blueprint read navigator.platform, which Node also has.
const serverPlatform = () => "";

/**
 * Blueprint's KeyComboTag, safe to server render. Blueprint picks Mac or PC keys from
 * `navigator.platform` while rendering, and on Node 22+ that is the build machine's platform,
 * so a page built on Linux fails to hydrate for Mac visitors. This version renders PC keys
 * on the server and during hydration, then switches to the visitor's platform.
 */
export function KeyComboTag(props: KeyComboTagProps) {
  const platform = useSyncExternalStore(subscribe, clientPlatform, serverPlatform);
  return <PlatformKeyComboTag {...props} platformOverride={platform} />;
}
