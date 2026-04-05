#!/usr/bin/env node
/**
 * Build all @mohasinac/* packages in dependency order.
 * Each package's own `npm run build` script (tsup) is invoked.
 *
 * Usage:
 *   node scripts/build-all.mjs
 *   node scripts/build-all.mjs --filter contracts,core
 */
import { execSync } from "child_process";
import { existsSync } from "fs";
import { join } from "path";
import { argv } from "process";

// Build order respects dependency layering:
//   Layer 1 (contracts) → Layer 2 (primitives) → Layer 3 (providers) →
//   Layer 4 (shell)     → Layer 5 (features)   → Layer 6 (CLI)
const BUILD_ORDER = [
  // Layer 1 — contracts (no deps)
  "contracts",
  // Layer 2 — primitives
  "core",
  "tokens",
  "errors",
  "utils",
  "validation",
  "http",
  "next",
  "react",
  "ui",
  "monitoring",
  "seo",
  "security",
  "css-tailwind",
  "css-vanilla",
  "instrumentation",
  // Layer 3 — infrastructure providers
  "db-firebase",
  "auth-firebase",
  "email-resend",
  "storage-firebase",
  "payment-razorpay",
  "shipping-shiprocket",
  "search-algolia",
  // Layer 4 — shell packages
  "feat-layout",
  "feat-forms",
  "feat-filters",
  "feat-media",
  // Layer 5 — shared feature packages
  "feat-search",
  "feat-categories",
  "feat-blog",
  "feat-reviews",
  "feat-faq",
  "feat-auth",
  "feat-account",
  "feat-homepage",
  "feat-products",
  "feat-wishlist",
  "feat-cart",
  "feat-payments",
  "feat-checkout",
  "feat-orders",
  "feat-admin",
  "feat-events",
  "feat-auctions",
  "feat-promotions",
  "feat-seller",
  "feat-stores",
  "feat-pre-orders",
  // Layer 5b — licorice-specific feature packages
  "feat-consultation",
  "feat-corporate",
  "feat-before-after",
  // Layer 5c — hobson-specific feature packages
  "feat-loyalty",
  "feat-collections",
  "feat-preorders",
  "feat-whatsapp-bot",
  // Layer 6 — CLI and scaffolding
  "cli",
  "eslint-plugin-letitrip",
  "create-app",
];

// --filter contracts,core  →  only build those packages
const filterArg = argv.find((a) => a.startsWith("--filter="))?.split("=")[1];
const filterSet = filterArg ? new Set(filterArg.split(",")) : null;

const ok = [];
const fail = [];
const skipped = [];

for (const pkg of BUILD_ORDER) {
  if (filterSet && !filterSet.has(pkg)) continue;

  const dir = join("packages", pkg);
  if (!existsSync(dir)) {
    skipped.push(pkg);
    console.log(`⟳  SKIP  ${pkg}  (directory not found)`);
    continue;
  }

  try {
    console.log(`▶  BUILD ${pkg}`);
    execSync("npm run build", { cwd: dir, stdio: "inherit" });
    ok.push(pkg);
    console.log(`✔  DONE  ${pkg}\n`);
  } catch {
    fail.push(pkg);
    console.error(`✖  FAIL  ${pkg}\n`);
  }
}

console.log("═══════════════════════════════════");
console.log(`Built:   ${ok.length}`);
console.log(`Skipped: ${skipped.length}`);
console.log(`Failed:  ${fail.length}`);
if (fail.length) {
  console.error("Failed packages:", fail.join(", "));
  process.exit(1);
}
