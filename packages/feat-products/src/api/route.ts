/**
 * feat-products — Next.js App Router API handlers (GET /api/products, POST /api/products)
 *
 * These handlers are exported so consuming projects can create 2-line stubs:
 *
 * ```ts
 * // app/api/products/route.ts
 * export { GET, POST } from "@mohasinac/feat-products";
 * ```
 *
 * The db provider must be registered via providers.config.ts before the first
 * request is handled.  Every read/write goes through the IRepository<ProductItem>
 * resolved from `getProviders().db.getRepository("products")`.
 */

import { NextResponse } from "next/server";
import { getProviders } from "@mohasinac/contracts";
import type { ProductItem, ProductListResponse } from "../types/index.js";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function param(url: URL, key: string): string | null {
  return url.searchParams.get(key);
}

function numParam(url: URL, key: string, fallback: number): number {
  const v = url.searchParams.get(key);
  const n = v !== null ? Number(v) : NaN;
  return Number.isFinite(n) ? n : fallback;
}

function buildFilters(url: URL): string {
  const parts: string[] = [];
  const status = param(url, "status");
  if (status) parts.push(`status==${status}`);
  const category = param(url, "category");
  if (category) parts.push(`category==${category}`);
  const brand = param(url, "brand");
  if (brand) parts.push(`brand==${brand}`);
  const condition = param(url, "condition");
  if (condition) parts.push(`condition==${condition}`);
  const sellerId = param(url, "sellerId");
  if (sellerId) parts.push(`sellerId==${sellerId}`);
  const q = param(url, "q");
  if (q) parts.push(`title@=*${q}`);
  const minPrice = param(url, "minPrice");
  if (minPrice !== null && !Number.isNaN(Number(minPrice)))
    parts.push(`price>=${minPrice}`);
  const maxPrice = param(url, "maxPrice");
  if (maxPrice !== null && !Number.isNaN(Number(maxPrice)))
    parts.push(`price<=${maxPrice}`);
  const inStock = param(url, "inStock");
  if (inStock === "true") parts.push("stockQuantity>0");
  const isAuction = param(url, "isAuction");
  if (isAuction !== null) parts.push(`isAuction==${isAuction}`);
  const isPreOrder = param(url, "isPreOrder");
  if (isPreOrder !== null) parts.push(`isPreOrder==${isPreOrder}`);
  const featured = param(url, "featured");
  if (featured === "true") parts.push("featured==true");
  // Merge explicit raw Sieve filters string from caller
  const raw = param(url, "filters");
  if (raw) parts.push(raw);
  return parts.join(",");
}

// ─── GET /api/products ────────────────────────────────────────────────────────

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const page = numParam(url, "page", 1);
    const pageSize = numParam(url, "pageSize", 20);
    const sort = param(url, "sorts") ?? param(url, "sort") ?? "-createdAt";
    const filters = buildFilters(url);

    const { db } = getProviders();
    if (!db) {
      return NextResponse.json(
        { success: false, error: "Database provider not registered" },
        { status: 503 },
      );
    }

    const repo = db.getRepository<ProductItem>("products");
    const result = await repo.findAll({ filters, sort, page, perPage: pageSize });

    const totalPages = Math.max(1, Math.ceil(result.total / pageSize));
    const body: ProductListResponse = {
      items: result.data,
      total: result.total,
      page: result.page,
      pageSize,
      totalPages,
      hasMore: result.page < totalPages,
    };

    const response = NextResponse.json({ success: true, data: body });
    response.headers.set(
      "Cache-Control",
      "public, max-age=60, s-maxage=120, stale-while-revalidate=60",
    );
    return response;
  } catch (error) {
    console.error("[feat-products] GET /api/products failed", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 },
    );
  }
}

// ─── POST /api/products ───────────────────────────────────────────────────────

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const data = (await request.json()) as Omit<
      ProductItem,
      "id" | "createdAt" | "updatedAt"
    >;

    const { db } = getProviders();
    if (!db) {
      return NextResponse.json(
        { success: false, error: "Database provider not registered" },
        { status: 503 },
      );
    }

    const repo = db.getRepository<ProductItem>("products");
    const created = await repo.create(data);

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error("[feat-products] POST /api/products failed", error);
    return NextResponse.json(
      { success: false, error: "Failed to create product" },
      { status: 500 },
    );
  }
}
