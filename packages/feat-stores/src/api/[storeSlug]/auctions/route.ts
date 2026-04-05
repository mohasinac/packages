/**
 * feat-stores — store auctions (GET /api/stores/[storeSlug]/auctions)
 *
 * 2-line stub:
 * ```ts
 * // app/api/stores/[storeSlug]/auctions/route.ts
 * export { storeAuctionsGET as GET } from "@mohasinac/feat-stores";
 * ```
 *
 * Returns published auction listings for a store, paginated.
 * Query params: sorts, page, pageSize, filters (extra Sieve filter string).
 *
 * Requires `db` registered in providers.config via `registerProviders()`.
 * Collections: "stores", "products"
 */

import { NextResponse } from "next/server.js";
import { getProviders } from "@mohasinac/contracts";
import type {
  StoreAuctionItem,
  StoreProductsResponse,
} from "../../../types/index.js";

type RouteContext = { params: Promise<{ storeSlug: string }> };

function param(url: URL, key: string): string | null {
  return url.searchParams.get(key);
}

function numParam(url: URL, key: string, fallback: number): number {
  const v = url.searchParams.get(key);
  const n = v !== null ? Number(v) : NaN;
  return Number.isFinite(n) ? n : fallback;
}

// ─── GET /api/stores/[storeSlug]/auctions ─────────────────────────────────────
export async function GET(
  request: Request,
  context: RouteContext,
): Promise<NextResponse> {
  try {
    const { storeSlug } = await context.params;
    const url = new URL(request.url);

    const { db } = getProviders();
    if (!db) {
      return NextResponse.json(
        { success: false, error: "Database provider not registered" },
        { status: 503 },
      );
    }

    // Resolve store by slug
    const storesRepo = db.getRepository<any>("stores");
    const storeResult = await storesRepo.findAll({
      filters: `storeSlug==${storeSlug},status==active,isPublic==true`,
      perPage: 1,
    });
    const store = storeResult.data[0];
    if (!store) {
      return NextResponse.json(
        { success: false, error: "Store not found" },
        { status: 404 },
      );
    }

    const sort = param(url, "sorts") ?? "-createdAt";
    const page = numParam(url, "page", 1);
    const pageSize = numParam(url, "pageSize", 24);

    const filterParts = [
      `sellerId==${store.ownerId}`,
      "status==published",
      "isAuction==true",
    ];
    const extra = param(url, "filters");
    if (extra) filterParts.push(extra);

    const productsRepo = db.getRepository<StoreAuctionItem>("products");
    const result = await productsRepo.findAll({
      filters: filterParts.join(","),
      sort,
      order: sort.startsWith("-") ? "desc" : "asc",
      page,
      perPage: pageSize,
    });

    const body: StoreProductsResponse = {
      items: result.data,
      total: result.total,
      page: result.page,
      pageSize: result.perPage,
      totalPages: result.totalPages,
      hasMore: result.page < result.totalPages,
    };

    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    console.error(
      "[feat-stores] GET /api/stores/[storeSlug]/auctions failed",
      error,
    );
    return NextResponse.json(
      { success: false, error: "Failed to fetch store auctions" },
      { status: 500 },
    );
  }
}
