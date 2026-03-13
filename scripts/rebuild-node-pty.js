#!/usr/bin/env node
// Automatically rebuild node-pty from source after install
// This fixes DirectTerminal "posix_spawnp failed" errors from incompatible prebuilt binaries

import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname } from "node:path";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);

let nodePtyPath;
try {
  nodePtyPath = dirname(require.resolve("node-pty/package.json"));
} catch {
  console.log("ℹ️  node-pty not found, skipping rebuild");
  process.exit(0);
}

if (!existsSync(nodePtyPath)) {
  console.log("ℹ️  node-pty not found, skipping rebuild");
  process.exit(0);
}

console.log("🔧 Rebuilding node-pty from source...");

try {
  execSync("npx node-gyp rebuild", {
    cwd: nodePtyPath,
    stdio: "inherit",
  });
  console.log("✅ node-pty rebuilt successfully");
} catch {
  console.warn("⚠️  node-pty rebuild failed (non-critical)");
  console.warn("   DirectTerminal may not work correctly");
  console.warn(
    `   Run manually: cd ${nodePtyPath} && npx node-gyp rebuild`,
  );
  // Don't fail the install - node-pty rebuild failure is non-critical
  process.exit(0);
}
