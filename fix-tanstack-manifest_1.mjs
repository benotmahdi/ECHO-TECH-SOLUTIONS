#!/usr/bin/env node
// Workaround for an upstream bug in this pinned @tanstack/react-start /
// @tanstack/router-plugin / nitro (v3 beta) combination: the production
// build emits TWO copies of the "tanstack-start-manifest:v" virtual module —
//   1. `_tanstack-start-manifest_v-<hash>.mjs`  → correct, references the
//      real built client bundle (e.g. /assets/index-XXXX.js)
//   2. `_tanstack-start-manifest_v.mjs`         → broken, still points at
//      the dev-only virtual module `/@id/virtual:tanstack-start-dev-client-entry`
//
// The server-rendered HTML's <Scripts/> tag is produced from whichever copy
// the bundled @tanstack/react-start core code happens to import at runtime,
// which in this build is the BROKEN one — so the client bundle never loads,
// the app never hydrates, and every client-only feature (3D hero scene,
// interactive UI demo, language switcher, forms) silently does nothing.
//
// This script runs after `vite build` / nitro build and copies the correct
// manifest content over the broken file so the server always serves the
// real client entry script. See AGENTS.md / project README for context if
// this ever needs revisiting after a dependency upgrade.

import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const SEARCH_ROOTS = [".vercel/output", ".output", "dist"];
const BROKEN_NAME = "_tanstack-start-manifest_v.mjs";
const DEV_MARKER = "virtual:tanstack-start-dev-client-entry";

function walk(dir, found = []) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return found;
  }
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full, found);
    } else if (entry.isFile() && /^_tanstack-start-manifest_v.*\.mjs$/.test(entry.name)) {
      found.push(full);
    }
  }
  return found;
}

let manifestFiles = [];
for (const root of SEARCH_ROOTS) {
  try {
    statSync(root);
    manifestFiles = manifestFiles.concat(walk(root));
  } catch {
    // root doesn't exist, skip
  }
}

if (manifestFiles.length === 0) {
  console.log("[fix-tanstack-manifest] No manifest files found — nothing to do (skipping).");
  process.exit(0);
}

let fixedCount = 0;

// Group by directory: within each server output dir there should be a broken
// unhashed file plus one or more correct hashed files.
const byDir = new Map();
for (const file of manifestFiles) {
  const dir = file.slice(0, file.length - BROKEN_NAME.length - 1);
  const dirKey = file.replace(/\/[^/]+$/, "");
  if (!byDir.has(dirKey)) byDir.set(dirKey, []);
  byDir.get(dirKey).push(file);
}

for (const [dir, files] of byDir) {
  const brokenPath = files.find((f) => f.endsWith("/" + BROKEN_NAME) || f === BROKEN_NAME);
  const correctPath = files.find((f) => {
    if (f === brokenPath) return false;
    const content = readFileSync(f, "utf8");
    return !content.includes(DEV_MARKER) && content.includes("tsrStartManifest");
  });

  if (!brokenPath) continue;

  const brokenContent = readFileSync(brokenPath, "utf8");
  const isBroken = brokenContent.includes(DEV_MARKER);

  if (!isBroken) {
    console.log(`[fix-tanstack-manifest] ${brokenPath} already looks correct, skipping.`);
    continue;
  }

  if (!correctPath) {
    console.warn(
      `[fix-tanstack-manifest] WARNING: ${brokenPath} references the dev client entry, ` +
        `but no corrected hashed manifest was found alongside it in ${dir}. ` +
        `The deployed app's client bundle may not load. This usually means the client ` +
        `build didn't run in the same pass — check the build logs.`,
    );
    continue;
  }

  const correctContent = readFileSync(correctPath, "utf8");
  writeFileSync(brokenPath, correctContent);
  fixedCount++;
  console.log(`[fix-tanstack-manifest] Fixed ${brokenPath} using ${correctPath}`);
}

if (fixedCount === 0) {
  console.warn(
    "[fix-tanstack-manifest] No files needed fixing (or none could be fixed — see warnings above).",
  );
} else {
  console.log(`[fix-tanstack-manifest] Done. Patched ${fixedCount} file(s).`);
}
