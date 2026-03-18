/**
 * feat-products — single-item route handlers (GET/PATCH/DELETE /api/products/[id])
 *
 * Consuming projects can create a 2-line stub:
 *
 * ```ts
 * // app/api/products/[id]/route.ts
 * export { GET, PATCH, DELETE } from "@mohasinac/feat-products/api-item";
 * ```
 *
 * Or re-export via the main package barrel with aliased names (see index.ts).
 */

import { NextResponse } from "next/server";
import { getProviders } from "@mohasinac/contracts";
import type { ProductItem } from "../../types/index.js";

type RouteContext = { params: Promise<{ id: string }> | { id: string } };

function getRepo() {
  const { db } = getProviders();
  if (!db) return null;
  return db.getRepository<ProductItem>("products");
}

// ─── GET /api/products/[id] ───────────────────────────────────────────────────

export async function GET(
  _request: Request,
  context: RouteContext,
): Promise<NextResponse> {
  try {
    const { id } =
      context.params instanceof Promise
        ? await context.params
        : context.params;

    const repo = getRepo();
    if (!repo) {
      return NextResponse.json(
        { success: false, error: "Database provider not registered" },
        { status: 503 },
      );
    }

    const item = await repo.findById(id);
    if (!item) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error("[feat-products] GET /api/products/[id] failed", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch product" },
      { status: 500 },
    );
  }
}

// ─── PATCH /api/products/[id] ─────────────────────────────────────────────────

export async function PATCH(
  request: Request,
  context: RouteContext,
): Promise<NextResponse> {
  try {
    const { id } =
      context.params instanceof Promise
        ? await context.params
        : context.params;
    const data = (await request.json()) as Partial<ProductItem>;

    const repo = getRepo();
    if (!repo) {
      return NextResponse.json(
        { success: false, error: "Database provider not registered" },
        { status: 503 },
      );
    }

    const updated = await repo.update(id, data);
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("[feat-products] PATCH /api/products/[id] failed", error);
    return NextResponse.json(
      { success: false, error: "Failed to update product" },
      { status: 500 },
    );
  }
}

// ─── DELETE /api/products/[id] ────────────────────────────────────────────────

export async function DELETE(
  _request: Request,
  context: RouteContext,
): Promise<NextResponse> {
  try {
    const { id } =
      context.params instanceof Promise
        ? await context.params
        : context.params;

    const repo = getRepo();
    if (!repo) {
      return NextResponse.json(
        { success: false, error: "Database provider not registered" },
        { status: 503 },
      );
    }

    await repo.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[feat-products] DELETE /api/products/[id] failed", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete product" },
      { status: 500 },
    );
  }
}
