#!/usr/bin/env node
/**
 * Publish all @mohasinac/* packages to the npm registry.
 * Skips packages that are already published at the current version.
 *
 * Prerequisites:
 *   - NPM_TOKEN env var set (or ~/.npmrc configured with auth token)
 *   - All packages already built (`node scripts/build-all.mjs`)
 *
 * Usage:
 *   node scripts/publish-all.mjs
 *   node scripts/publish-all.mjs --dry-run
 *   node scripts/publish-all.mjs --filter contracts,core
 */
import { execSync } from "child_process";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { argv } from "process";

const BUILD_ORDER = [
  "contracts",
  "core", "tokens", "errors", "utils", "validation",
  "http", "next", "react", "ui",
  "monitoring", "seo", "security",
  "css-tailwind", "css-vanilla",
  "db-firebase", "auth-firebase", "email-resend", "storage-firebase",
  "feat-layout", "feat-forms", "feat-filters", "feat-media",
  "feat-search", "feat-categories", "feat-blog", "feat-reviews",
  "feat-faq", "feat-auth", "feat-account", "feat-homepage",
  "feat-products", "feat-wishlist", "feat-cart",
  "feat-payments", "feat-checkout", "feat-orders",
  "feat-admin", "feat-events", "feat-auctions", "feat-promotions",
  "feat-seller", "feat-stores", "feat-pre-orders",
  "cli", "eslint-plugin-letitrip", "create-app",
];

const dryRun = argv.includes("--dry-run");
const filterArg = argv.find((a) => a.startsWith("--filter="))?.split("=")[1];
const filterSet = filterArg ? new Set(filterArg.split(",")) : null;

const ok = [];
const skip = [];
const fail = [];

for (const pkg of BUILD_ORDER) {
  if (filterSet && !filterSet.has(pkg)) continue;

  const dir = join("packages", pkg);
  if (!existsSync(dir)) continue;

  // Check if dist exists (must build first)
  if (!existsSync(join(dir, "dist"))) {
    console.warn(`⚠  WARN  ${pkg}: dist/ not found — run build first`);
    fail.push(pkg);
    continue;
  }

  // Read current version from package.json
  const meta = JSON.parse(readFileSync(join(dir, "package.json"), "utf8"));
  const { name, version } = meta;

  // Check if this version is already on the registry
  try {
    execSync(`npm view ${name}@${version} version`, { stdio: "pipe" });
    skip.push(pkg);
    console.log(`⟳  SKIP  ${pkg}  (${name}@${version} already published)`);
    continue;
  } catch {
    // Not published yet — proceed
  }

  if (dryRun) {
    console.log(`[dry-run] Would publish: ${name}@${version}`);
    ok.push(pkg);
    continue;
  }

  try {
    console.log(`▶  PUBLISH  ${pkg}  (${name}@${version})`);
    execSync("npm publish --access public", { cwd: dir, stdio: "inherit" });
    ok.push(pkg);
    console.log(`✔  DONE  ${pkg}\n`);
  } catch (e) {
    const msg = String(e.stdout || e.message || "");
    if (msg.includes("previously published") || msg.includes("E409")) {
      skip.push(pkg);
      console.log(`⟳  SKIP  ${pkg}  (registry reports already published)\n`);
    } else {
      fail.push(pkg);
      console.error(`✖  FAIL  ${pkg}  —  ${msg.slice(0, 200)}\n`);
    }
  }
}

console.log("═══════════════════════════════════");
console.log(`Published: ${ok.length}`);
console.log(`Skipped:   ${skip.length}  (already at this version)`);
console.log(`Failed:    ${fail.length}`);

if (fail.length) {
  console.error("Failed packages:", fail.join(", "));
  process.exit(1);
}
