/**
 * feat-reviews — GET /api/reviews/[id]
 *
 * Public single-review lookup. Consuming projects can create a hybrid stub:
 *
 * ```ts
 * // app/api/reviews/[id]/route.ts
 * export { reviewItemGET as GET } from "@mohasinac/feat-reviews";
 * export const PATCH = createApiHandler<...>({ ... }); // keep local
 * export const DELETE = createApiHandler<...>({ ... }); // keep local
 * ```
 */

import { NextResponse } from "next/server";
import { getProviders } from "@mohasinac/contracts";
import type { Review } from "../../types/index.js";

// ──── GET /api/reviews/[id] ───────────────────────────────────────────────────

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  try {
    const { id } = await context.params;

    const { db } = getProviders();
    if (!db) {
      return NextResponse.json(
        { success: false, error: "Database provider not registered" },
        { status: 503 },
      );
    }

    const repo = db.getRepository<Review>("reviews");
    const review = await repo.findById(id);
    if (!review) {
      return NextResponse.json(
        { success: false, error: "Review not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: review });
  } catch (error) {
    console.error("[feat-reviews] GET /api/reviews/[id] failed", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch review" },
      { status: 500 },
    );
  }
}
