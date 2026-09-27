/** Rebuilds the package whenever a source file changes. Used by `pnpm dev`. */
import { execFileSync } from "node:child_process";
import { watch } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
let timer: ReturnType<typeof setTimeout> | undefined;

function build() {
  try {
    execFileSync("pnpm", ["run", "build"], { cwd: root, stdio: "inherit" });
  } catch {
    console.error("tokens: build failed, waiting for the next change");
  }
}

watch(join(root, "src"), { recursive: true }, () => {
  clearTimeout(timer);
  timer = setTimeout(build, 150);
});
console.log("tokens: watching src/");
