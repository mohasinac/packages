/**
 * feat-pre-orders — Next.js App Router API handlers (GET/POST /api/pre-orders)
 *
 * 2-line stub:
 * ```ts
 * // app/api/pre-orders/route.ts
 * export { GET, POST } from "@mohasinac/feat-pre-orders";
 * ```
 *
 * GET: Lists pre-orders. Requires auth-level filtering in production (callers
 *   should add middleware or verify tokens before delegating to this handler).
 *   Publicly returns pre-orders filtered by customerId/sellerId/status.
 *
 * POST: Creates a new pre-order record. Returns 201 with the created item.
 *   Does NOT validate payment — payment processing is handled separately.
 *
 * Requires `db` registered in providers.config via `registerProviders()`.
 * Collection: "preOrders"
 */

import { NextResponse } from "next/server.js";
import { getProviders } from "@mohasinac/contracts";
import type {
  PreOrderItem,
  PreOrderListResponse,
  CreatePreOrderInput,
} from "../types/index.js";

function param(url: URL, key: string): string | null {
  return url.searchParams.get(key);
}

function numParam(url: URL, key: string, fallback: number): number {
  const v = url.searchParams.get(key);
  const n = v !== null ? Number(v) : NaN;
  return Number.isFinite(n) ? n : fallback;
}

// ─── GET /api/pre-orders ──────────────────────────────────────────────────────
// Query params:
//   customerId — filter by buyer
//   sellerId   — filter by seller
//   status     — filter by PreOrderStatus
//   sort       — Sieve sort field (default: "-createdAt")
//   page / pageSize — pagination
export async function GET(request: Request): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const sort = param(url, "sort") ?? "-createdAt";
    const page = numParam(url, "page", 1);
    const pageSize = numParam(url, "pageSize", 20);

    const parts: string[] = [];
    const customerId = param(url, "customerId");
    if (customerId) parts.push(`customerId==${customerId}`);
    const sellerId = param(url, "sellerId");
    if (sellerId) parts.push(`sellerId==${sellerId}`);
    const status = param(url, "status");
    if (status) parts.push(`status==${status}`);
    const filters = parts.join(",");

    const { db } = getProviders();
    if (!db) {
      return NextResponse.json(
        { success: false, error: "Database provider not registered" },
        { status: 503 },
      );
    }

    const repo = db.getRepository<PreOrderItem>("preOrders");
    const result = await repo.findAll({
      filters,
      sort,
      page,
      perPage: pageSize,
    });

    const totalPages = Math.max(1, Math.ceil(result.total / pageSize));
    const body: PreOrderListResponse = {
      items: result.data,
      total: result.total,
      page: result.page,
      pageSize,
      totalPages,
      hasMore: result.page < totalPages,
    };

    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    console.error("[feat-pre-orders] GET /api/pre-orders failed", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch pre-orders" },
      { status: 500 },
    );
  }
}

// ─── POST /api/pre-orders ─────────────────────────────────────────────────────
// Body: CreatePreOrderInput
// Returns: 201 with the created PreOrderItem
// Note: Add auth middleware in your application to restrict creation to
//   authenticated users. This handler does NOT verify tokens.
export async function POST(request: Request): Promise<NextResponse> {
  try {
    const input = (await request.json()) as CreatePreOrderInput & {
      customerId: string;
      customerEmail: string;
      productTitle: string;
      productSlug: string;
      unitPrice: number;
      totalAmount: number;
    };

    const { db } = getProviders();
    if (!db) {
      return NextResponse.json(
        { success: false, error: "Database provider not registered" },
        { status: 503 },
      );
    }

    const repo = db.getRepository<PreOrderItem>("preOrders");
    const created = await repo.create({
      ...input,
      status: "pending",
    } as Omit<PreOrderItem, "id" | "createdAt" | "updatedAt">);

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (error) {
    console.error("[feat-pre-orders] POST /api/pre-orders failed", error);
    return NextResponse.json(
      { success: false, error: "Failed to create pre-order" },
      { status: 500 },
    );
  }
}
