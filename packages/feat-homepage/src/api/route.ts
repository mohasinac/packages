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

export async function GET(): Promise<NextResponse> {
  try {
    const { db } = getProviders();
    if (!db) {
      return NextResponse.json(
        { success: false, error: "Database provider not registered" },
        { status: 503 },
      );
    }

    const repo = db.getRepository<HomepageSection>("homepage_sections");
    const result = await repo.findAll({
      filters: "isVisible==true",
      sort: "order",
      order: "asc",
      perPage: 50,
    });

    return NextResponse.json({
      success: true,
      data: { sections: result.data },
    });
  } catch (error) {
    console.error("[feat-homepage] GET /api/homepage-sections failed", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch homepage sections" },
      { status: 500 },
    );
  }
}
