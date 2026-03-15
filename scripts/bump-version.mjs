#!/usr/bin/env node
/**
 * Bump the "version" field in all 47 packages/*/package.json files.
 *
 * Usage:
 *   node scripts/bump-version.mjs 1.2.3
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const newVersion = process.argv[2];
if (!newVersion || !/^\d+\.\d+\.\d+/.test(newVersion)) {
  console.error("Usage: node scripts/bump-version.mjs <semver>  e.g. 1.2.3");
  process.exit(1);
}

const pkgsDir = "packages";
const dirs = readdirSync(pkgsDir);
const bumped = [];
const skipped = [];

for (const dir of dirs) {
  const pkgPath = join(pkgsDir, dir, "package.json");
  if (!existsSync(pkgPath)) {
    skipped.push(dir);
    continue;
  }

  const raw = readFileSync(pkgPath, "utf8");
  let meta;
  try {
    meta = JSON.parse(raw);
  } catch {
    console.warn(`⚠  Could not parse ${pkgPath} — skipping`);
    skipped.push(dir);
    continue;
  }

  if (meta.version === newVersion) {
    console.log(`⟳  SKIP  ${dir}  (already ${newVersion})`);
    skipped.push(dir);
    continue;
  }

  meta.version = newVersion;

  // Also bump any @mohasinac/* inter-dependencies to the same version
  for (const depField of ["dependencies", "peerDependencies", "devDependencies"]) {
    if (!meta[depField]) continue;
    for (const [pkg, ver] of Object.entries(meta[depField])) {
      if (pkg.startsWith("@mohasinac/") && !ver.startsWith("npm:")) {
        meta[depField][pkg] = `^${newVersion}`;
      }
    }
  }

  // Preserve trailing newline
  const newRaw = JSON.stringify(meta, null, 4) + "\n";
  writeFileSync(pkgPath, newRaw, "utf8");
  bumped.push(dir);
  console.log(`✔  BUMP  ${dir}  →  ${newVersion}`);
}

console.log(`\n${"═".repeat(40)}`);
console.log(`Bumped:  ${bumped.length}`);
console.log(`Skipped: ${skipped.length}`);
