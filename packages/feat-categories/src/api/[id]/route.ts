/**
 * feat-categories — GET /api/categories/[id]
 *
 * Public single-category lookup by ID.
 *
 * ```ts
 * // app/api/categories/[id]/route.ts
 * export { categoryItemGET as GET } from "@mohasinac/feat-categories";
 * export const PATCH = createApiHandler<...>({ ... }); // keep local
 * export const DELETE = createApiHandler<...>({ ... }); // keep local
 * ```
 */

import { NextResponse } from "next/server";
import { getProviders } from "@mohasinac/contracts";
import type { CategoryItem } from "../../types/index.js";

// ──── GET /api/categories/[id] ────────────────────────────────────────────────

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

    const repo = db.getRepository<CategoryItem>("categories");
    const category = await repo.findById(id);
    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    console.error("[feat-categories] GET /api/categories/[id] failed", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch category" },
      { status: 500 },
    );
  }
}
