/**
 * @clawscale/react/common
 *
 * Constants that are safe in React Server Components: no React, no browser APIs.
 * They come from Blueprint's CommonJS build so they load in Node, Vite SSR and bundlers alike.
 * Client components can keep importing the same names from "@clawscale/react".
 */
export { Colors } from "@blueprintjs/colors";
export { Alignment, TextAlignment } from "@blueprintjs/core/lib/cjs/common/alignment.js";
export { Boundary } from "@blueprintjs/core/lib/cjs/common/boundary.js";
export { ButtonVariant } from "@blueprintjs/core/lib/cjs/common/buttonVariant.js";
export * as Classes from "@blueprintjs/core/lib/cjs/common/classes.js";
export { Elevation } from "@blueprintjs/core/lib/cjs/common/elevation.js";
export { Intent } from "@blueprintjs/core/lib/cjs/common/intent.js";
export { Position } from "@blueprintjs/core/lib/cjs/common/position.js";
export { Size } from "@blueprintjs/core/lib/cjs/common/size.js";
export { ClawscaleClasses } from "./components/classes.js";
export { getThemeScript, type ThemeScriptOptions } from "./theme-script.js";
