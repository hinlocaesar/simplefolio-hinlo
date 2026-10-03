/**
 * Starts the production server.
 *
 *   npm run build && npm start
 *   npm start -- --port 8080
 *
 * This is `next start` against the normal `.next` build output, which serves
 * `public/` and `.next/static` where they already are. The `standalone` output in
 * `.next/standalone` is the same build with its dependencies pruned to the
 * minimum a server needs, and that is what the Dockerfile ships.
 */
import { localAddresses, startServer } from "./lib/server.mjs";

const portFlag = process.argv.indexOf("--port");
const port = portFlag === -1 ? 3000 : Number(process.argv[portFlag + 1]);

const server = await startServer({ port });

console.log(`\n  Ready on:\n`);
for (const url of localAddresses(server.port)) {
  console.log(`    ${url}`);
}
console.log(`\n  Press Ctrl+C to stop.\n`);

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, async () => {
    await server.stop();
    process.exit(0);
  });
}
