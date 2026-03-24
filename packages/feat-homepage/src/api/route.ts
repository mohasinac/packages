/**
 * feat-homepage — Next.js App Router API handlers (GET /api/homepage-sections)
 *
 * Consuming projects can create a 2-line stub:
 *
 * ```ts
 * // app/api/homepage-sections/route.ts
 * export { GET } from "@mohasinac/feat-homepage";
 * ```
 */

import { NextResponse } from "next/server";
import { getProviders } from "@mohasinac/contracts";
import type { HomepageSection } from "../types/index.js";

// ─── GET /api/homepage-sections ───────────────────────────────────────────────
// Supported query params:
//   type         — filter by section type (e.g. "hero", "featured_products")
//   order / sort — Sieve sort field (default: "order" asc)
//
// Note: includeDisabled (admin-only) is not supported here — implement that
// in consuming-project middleware or an overriding local route.

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const typeFilter = url.searchParams.get("type");

    const filterParts = ["enabled==true"];
    if (typeFilter) filterParts.push(`type==${typeFilter}`);

    const { db } = getProviders();
    if (!db) {
      return NextResponse.json(
        { success: false, error: "Database provider not registered" },
        { status: 503 },
      );
    }

    const repo = db.getRepository<HomepageSection>("homepageSections");
    const result = await repo.findAll({
      filters: filterParts.join(","),
      sort: "order",
      order: "asc",
      perPage: 50,
    });

    // Return the sections array directly so apiClient.get() resolves to
    // HomepageSection[] — same shape as the letitrip local route.
    return NextResponse.json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    console.error("[feat-homepage] GET /api/homepage-sections failed", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch homepage sections" },
      { status: 500 },
    );
  }
}
