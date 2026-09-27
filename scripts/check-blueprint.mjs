#!/usr/bin/env node
/**
 * Compares the pinned Blueprint versions in packages/react/package.json with the
 * latest versions on npm. Prints GitHub Actions outputs:
 *
 *   outdated=true
 *   summary=@blueprintjs/core 6.20.0 to 6.21.0
 */
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const manifest = JSON.parse(readFileSync(resolve(import.meta.dirname, "../packages/react/package.json"), "utf8"));
const pinned = Object.entries(manifest.dependencies).filter(([name]) => name.startsWith("@blueprintjs/"));

const updates = [];
for (const [name, version] of pinned) {
  const response = await fetch(`https://registry.npmjs.org/${name}/latest`);
  if (!response.ok) throw new Error(`npm registry returned ${response.status} for ${name}`);
  const { version: latest } = await response.json();
  if (latest !== version) updates.push(`${name} ${version} to ${latest}`);
}

console.log(`outdated=${updates.length > 0}`);
console.log(`summary=${updates.join(", ") || "none"}`);
