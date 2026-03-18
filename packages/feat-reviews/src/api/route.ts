/**
 * feat-reviews — Next.js App Router API handler (GET /api/reviews)
 *
 * 2-line stub:
 * ```ts
 * // app/api/reviews/route.ts
 * export { GET } from "@mohasinac/feat-reviews";
 * ```
 */

import { NextResponse } from "next/server";
import { getProviders } from "@mohasinac/contracts";
import type { Review, ReviewListResponse } from "../types/index.js";

function param(url: URL, key: string): string | null {
  return url.searchParams.get(key);
}

function numParam(url: URL, key: string, fallback: number): number {
  const v = url.searchParams.get(key);
  const n = v !== null ? Number(v) : NaN;
  return Number.isFinite(n) ? n : fallback;
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const page = numParam(url, "page", 1);
    const pageSize = numParam(url, "pageSize", 10);
    const sort = param(url, "sorts") ?? param(url, "sort") ?? "-createdAt";

    const parts: string[] = [];
    const productId = param(url, "productId");
    if (productId) parts.push(`productId==${productId}`);
    const status = param(url, "status") ?? "approved";
    parts.push(`status==${status}`);
    const filters = parts.join(",");

    const { db } = getProviders();
    if (!db) {
      return NextResponse.json(
        { success: false, error: "Database provider not registered" },
        { status: 503 },
      );
    }

    const repo = db.getRepository<Review>("reviews");
    const result = await repo.findAll({ filters, sort, page, perPage: pageSize });

    const totalPages = Math.max(1, Math.ceil(result.total / pageSize));
    const body: ReviewListResponse = {
      items: result.data,
      total: result.total,
      page: result.page,
      pageSize,
      totalPages,
      hasMore: result.page < totalPages,
    };

    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    console.error("[feat-reviews] GET /api/reviews failed", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch reviews" },
      { status: 500 },
    );
  }
}
