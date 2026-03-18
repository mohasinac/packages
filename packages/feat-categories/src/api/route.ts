/**
 * feat-categories — Next.js App Router API handler (GET /api/categories)
 *
 * Consuming projects can create a 2-line stub:
 *
 * ```ts
 * // app/api/categories/route.ts
 * export { GET } from "@mohasinac/feat-categories";
 * ```
 */

import { NextResponse } from "next/server";
import { getProviders } from "@mohasinac/contracts";
import type { CategoryItem, CategoriesResponse } from "../types/index.js";

function param(url: URL, key: string): string | null {
  return url.searchParams.get(key);
}

// ─── GET /api/categories ──────────────────────────────────────────────────────

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const url = new URL(request.url);

    const parts: string[] = [];
    const type = param(url, "type");
    if (type) parts.push(`type==${type}`);
    const parentId = param(url, "parentId");
    if (parentId) parts.push(`parentIds@=${parentId}`);
    const featured = param(url, "featured");
    if (featured === "true") parts.push("isFeatured==true");
    const filters = parts.join(",");

    const { db } = getProviders();
    if (!db) {
      return NextResponse.json(
        { success: false, error: "Database provider not registered" },
        { status: 503 },
      );
    }

    const repo = db.getRepository<CategoryItem>("categories");
    const result = await repo.findAll({
      filters,
      sort: "order",
      order: "asc",
      perPage: 200,
    });

    const body: CategoriesResponse = {
      items: result.data,
      total: result.total,
    };

    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    console.error("[feat-categories] GET /api/categories failed", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch categories" },
      { status: 500 },
    );
  }
}
