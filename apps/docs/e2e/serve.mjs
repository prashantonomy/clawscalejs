/**
 * Minimal static file server for the exported docs, used by Playwright.
 *   node e2e/serve.mjs <dir> <port>
 */
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(process.argv[2] ?? "out");
const port = Number(process.argv[3] ?? 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".txt": "text/plain; charset=utf-8",
};

function resolveFile(urlPath) {
  const safe = normalize(decodeURIComponent(urlPath)).replace(/^(\.\.[/\\])+/, "");
  const candidate = join(root, safe);
  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  const index = join(candidate, "index.html");
  if (existsSync(index)) return index;
  if (existsSync(`${candidate}.html`)) return `${candidate}.html`;
  return undefined;
}

createServer((request, response) => {
  const path = new URL(request.url ?? "/", "http://localhost").pathname;
  const file = resolveFile(path);
  if (!file) {
    const notFound = join(root, "404.html");
    response.writeHead(404, { "content-type": types[".html"] });
    if (existsSync(notFound)) createReadStream(notFound).pipe(response);
    else response.end("Not found");
    return;
  }
  response.writeHead(200, { "content-type": types[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(response);
}).listen(port, "127.0.0.1", () => {
  console.log(`Serving ${root} at http://127.0.0.1:${port}`);
});
