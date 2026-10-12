/** Watches the package for `pnpm dev`: TypeScript in watch mode, every stylesheet rebuilt on style changes. */
import { spawn } from "node:child_process";
import { watch } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { writeStyles } from "./build-css.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

spawn("pnpm", ["exec", "tsc", "-p", "tsconfig.build.json", "--watch", "--preserveWatchOutput"], {
  cwd: root,
  stdio: "inherit",
});

let timer: ReturnType<typeof setTimeout> | undefined;
function rebuildStyles() {
  try {
    console.log(`react: rebuilt ${writeStyles().join(", ")}`);
  } catch (error) {
    console.error("react: style build failed", error);
  }
}

watch(join(root, "src", "styles"), { recursive: true }, () => {
  clearTimeout(timer);
  timer = setTimeout(rebuildStyles, 150);
});
console.log("react: watching src/styles");
