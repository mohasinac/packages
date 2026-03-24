/**
 * feat-homepage — Next.js App Router API handlers (GET /api/homepage-sections)
 *
 * Consuming projects can create a hybrid stub:
 *
 * ```ts
 * // app/api/homepage-sections/route.ts
 * export { GET } from "@mohasinac/feat-homepage";
 * export const POST = createApiHandler<...>({ ... }); // keep local
 * ```
 *
 * Supports:
 *   - Public GET: returns enabled sections only
 *   - `?includeDisabled=true`: admin only, returns all sections (verified via session cookie)
 */

import { NextResponse } from "next/server";
import { getProviders } from "@mohasinac/contracts";
import type { HomepageSection } from "../types/index.js";

/** Read `__session` cookie from request headers (HTTP cookie string). */
function getSessionCookie(request: Request): string | null {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader.match(/(?:^|;\s*)__session=([^;]+)/);
  return match ? match[1] : null;
}

/** Returns the role from the session cookie, or null if invalid / no session provider. */
async function getRoleFromSession(request: Request): Promise<string | null> {
  try {
    const { session } = getProviders();
    if (!session) return null;
    const cookie = getSessionCookie(request);
    if (!cookie) return null;
    const payload = await session.verifySession(cookie);
    return payload.role ?? null;
  } catch {
    return null;
  }
}

// ─── GET /api/homepage-sections ───────────────────────────────────────────────

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const typeFilter = url.searchParams.get("type");
    const includeDisabled = url.searchParams.get("includeDisabled") === "true";

    // Admin auth guard for includeDisabled
    if (includeDisabled) {
      const role = await getRoleFromSession(request);
      if (role !== "admin") {
        return NextResponse.json(
          { success: false, error: "Admin access required" },
          { status: 403 },
        );
      }
    }

    const filterParts = includeDisabled ? [] : ["enabled==true"];
    if (typeFilter) filterParts.push(`type==${typeFilter}`);

    const { db } = getProviders();
    if (!db) {
      return NextResponse.json(
        { success: false, error: "Database provider not registered" },
        { status: 503 },
      );
    }

    const repo = db.getRepository<HomepageSection>("homepageSections");
    const result = await repo.findAll({
      filters: filterParts.join(",") || undefined,
      sort: "order",
      order: "asc",
      perPage: 50,
    });

    const sections = result.data.sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0),
    );

    const res = NextResponse.json({ success: true, data: sections });
    res.headers.set(
      "Cache-Control",
      includeDisabled
        ? "private, no-cache"
        : "public, max-age=300, s-maxage=600, stale-while-revalidate=120",
    );
    return res;
  } catch (error) {
    console.error("[feat-homepage] GET /api/homepage-sections failed", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch homepage sections" },
      { status: 500 },
    );
  }
}
