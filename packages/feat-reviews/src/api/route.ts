/**
 * feat-reviews — Next.js App Router API handler (GET /api/reviews)
 *
 * 2-line stub:
 * ```ts
 * // app/api/reviews/route.ts
 * export { GET } from "@mohasinac/feat-reviews";
 * ```
 *
 * Query modes:
 *   ?featured=true         → returns flat Review[] (for testimonial sections)
 *   ?latest=true           → paginated approved reviews, no productId required
 *   ?productId=<id>        → paginated + aggregate stats (averageRating, ratingDistribution)
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

function computeAggregates(reviews: Review[]): {
  averageRating: number;
  ratingDistribution: Record<number, number>;
} {
  const dist: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let total = 0;
  let count = 0;
  for (const r of reviews) {
    if (r.status === "approved") {
      dist[r.rating] = (dist[r.rating] ?? 0) + 1;
      total += r.rating;
      count++;
    }
  }
  return {
    averageRating: count > 0 ? total / count : 0,
    ratingDistribution: dist,
  };
}

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const featured = param(url, "featured") === "true";
    const latest = param(url, "latest") === "true";
    const page = numParam(url, "page", 1);
    const pageSize = numParam(url, "pageSize", 10);
    const sort = param(url, "sorts") ?? param(url, "sort") ?? "-createdAt";

    const { db } = getProviders();
    if (!db) {
      return NextResponse.json(
        { success: false, error: "Database provider not registered" },
        { status: 503 },
      );
    }

    const repo = db.getRepository<Review>("reviews");

    // ── ?featured=true ────────────────────────────────────────────────────────
    // Returns flat Review[] for homepage testimonial sections.
    if (featured) {
      const result = await repo.findAll({
        filters: "featured==true,status==approved",
        sort,
        perPage: Math.min(pageSize, 50),
      });
      const response = NextResponse.json({ success: true, data: result.data });
      response.headers.set(
        "Cache-Control",
        "public, max-age=300, s-maxage=600, stale-while-revalidate=120",
      );
      return response;
    }

    // ── ?latest=true ──────────────────────────────────────────────────────────
    // Paginated latest approved reviews, no productId required.
    if (latest) {
      const latestPageSize = numParam(url, "pageSize", 24);
      const result = await repo.findAll({
        filters: "status==approved",
        sort,
        page,
        perPage: latestPageSize,
      });
      const totalPages = Math.max(1, Math.ceil(result.total / latestPageSize));
      const body: ReviewListResponse = {
        items: result.data,
        total: result.total,
        page: result.page,
        pageSize: latestPageSize,
        totalPages,
        hasMore: result.page < totalPages,
      };
      const response = NextResponse.json({ success: true, data: body });
      response.headers.set(
        "Cache-Control",
        "public, max-age=120, s-maxage=300, stale-while-revalidate=60",
      );
      return response;
    }

    // ── ?productId=<id> ───────────────────────────────────────────────────────
    // Paginated reviews for a product with aggregate rating stats.
    const productId = param(url, "productId");
    if (!productId) {
      return NextResponse.json(
        { success: false, error: "productId query parameter is required" },
        { status: 400 },
      );
    }

    // Fetch all approved reviews for aggregate computation (no pagination)
    const allResult = await repo.findAll({
      filters: `productId==${productId},status==approved`,
      perPage: 1000,
    });
    const { averageRating, ratingDistribution } = computeAggregates(
      allResult.data,
    );

    // Fetch the current page for display
    const pagedResult = await repo.findAll({
      filters: `productId==${productId},status==approved`,
      sort,
      page,
      perPage: pageSize,
    });

    const totalPages = Math.max(1, Math.ceil(pagedResult.total / pageSize));
    const body: ReviewListResponse = {
      items: pagedResult.data,
      total: pagedResult.total,
      page: pagedResult.page,
      pageSize,
      totalPages,
      hasMore: pagedResult.page < totalPages,
      averageRating,
      ratingDistribution,
    };

    const response = NextResponse.json({ success: true, data: body });
    response.headers.set(
      "Cache-Control",
      "public, max-age=120, s-maxage=300, stale-while-revalidate=60",
    );
    return response;
  } catch (error) {
    console.error("[feat-reviews] GET /api/reviews failed", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch reviews" },
      { status: 500 },
    );
  }
}
