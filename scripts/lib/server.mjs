/**
 * Boots the production server for the local measurement scripts.
 *
 * These scripts used to serve `dist/` from a hand-rolled static file server
 * that mimicked production's MIME types and gzip. With Next.js there is no
 * `dist/` to serve: the honest thing to measure is the server that actually
 * runs in production, so they start `next start` and point a browser at it.
 *
 * That is also why gzip is no longer emulated -- Next.js compresses responses
 * itself, so the byte counts these scripts report are the real ones.
 */
import { spawn } from "node:child_process";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

/** Asks the OS for a port nobody is using, then hands it to Next.js. */
function freePort() {
  return new Promise((resolve, reject) => {
    const probe = net.createServer();
    probe.unref();
    probe.on("error", reject);
    probe.listen(0, "127.0.0.1", () => {
      const { port } = probe.address();
      probe.close(() => resolve(port));
    });
  });
}

/**
 * Starts `next start` and resolves once it is serving.
 *
 * @param {{ port?: number }} [options] Fixed port; an ephemeral one by default.
 * @returns {Promise<{ url: string, port: number, stop: () => Promise<void> }>}
 */
export async function startServer({ port } = {}) {
  const chosen = port ?? (await freePort());

  const child = spawn(
    process.execPath,
    [
      path.join(ROOT, "node_modules", "next", "dist", "bin", "next"),
      "start",
      "--port",
      String(chosen),
    ],
    {
      cwd: ROOT,
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, NODE_ENV: "production" },
    }
  );

  const logs = [];
  const collect = (chunk) => {
    const text = String(chunk);
    logs.push(text);
    if (logs.length > 40) logs.shift();
  };
  child.stdout.on("data", collect);
  child.stderr.on("data", collect);

  const exited = new Promise((_, reject) => {
    child.once("exit", (code) =>
      reject(new Error(`next start exited with code ${code}\n${logs.join("")}`))
    );
  });

  await Promise.race([waitForReady(chosen, logs), exited]);

  return {
    url: `http://127.0.0.1:${chosen}/`,
    port: chosen,
    stop: () =>
      new Promise((resolve) => {
        if (child.exitCode !== null) return resolve();
        child.once("exit", () => resolve());
        child.kill();
      }),
  };
}

/** Polls `/` until it answers, which is what "ready" means for a page load. */
async function waitForReady(port, logs) {
  const deadline = Date.now() + 60_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/`, { redirect: "manual" });
      if (response.ok || response.status === 404) {
        await response.body?.cancel();
        return;
      }
      await response.body?.cancel();
    } catch {
      // Not listening yet.
    }
    await new Promise((resolve) => setTimeout(resolve, 200));
  }
  throw new Error(`next start did not become ready on port ${port}\n${logs.join("")}`);
}

/** LAN address, so a phone on the same wifi can load a local build. */
export function localAddresses(port) {
  const urls = [`http://localhost:${port}/`, `http://127.0.0.1:${port}/`];
  for (const entries of Object.values(networkInterfaces())) {
    for (const entry of entries ?? []) {
      if (entry.family === "IPv4" && !entry.internal) urls.push(`http://${entry.address}:${port}/`);
    }
  }
  return urls;
}

import { networkInterfaces } from "node:os";
