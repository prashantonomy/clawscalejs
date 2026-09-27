/**
 * @clawscale/react/sync-icons
 *
 * Blueprint loads icon paths asynchronously, so server-rendered HTML ships empty icons
 * that pop in after hydration. Importing this module once, from a client module that
 * wraps your app, makes every string icon render synchronously on the server and client.
 *
 * Cost: all 16px and 20px icon paths join your client bundle (about 190 kB gzipped).
 *
 *   "use client";
 *   import "@clawscale/react/sync-icons";
 */
import { getIconPaths, type IconName, IconSize, Icons } from "@blueprintjs/icons";

type GetPaths = typeof Icons.getPaths;

const marker = Symbol.for("clawscale.syncIcons");
const target = Icons as typeof Icons & { [marker]?: true };

if (!target[marker]) {
  const loadedPaths: GetPaths = Icons.getPaths.bind(Icons);
  const syncGetPaths: GetPaths = (icon: IconName, size: IconSize) =>
    loadedPaths(icon, size) ??
    (Icons.isValidIconName(icon)
      ? getIconPaths(icon, size < IconSize.LARGE ? IconSize.STANDARD : IconSize.LARGE)
      : undefined);
  Icons.getPaths = syncGetPaths;
  target[marker] = true;
}

/** True once the synchronous icon loader is installed. */
export const syncIconsInstalled = true;
