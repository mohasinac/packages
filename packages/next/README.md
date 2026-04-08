# @mohasinac/next

> **Layer 2** — Next.js App Router utilities: auth verification interface, API error handler, typed route handler factory, and response caching helpers.

## Install

```bash
npm install @mohasinac/next
```

---

## `createApiErrorHandler`

Wraps `handleApiError` with optional logging.

```ts
import { createApiErrorHandler } from "@mohasinac/next";
import { serverLogger } from "@/lib/server-logger";

const handleError = createApiErrorHandler({ logger: serverLogger });

export async function GET(request: Request) {
  try {
    // ...
  } catch (err) {
    return handleError(err);
  }
}
```

---

## `createApiHandlerFactory`

Factory for creating typed, middleware-aware route handlers.

```ts
import { createApiHandlerFactory } from "@mohasinac/next";

const createHandler = createApiHandlerFactory({
  verifyAuth: async (request) => {
    /* return AuthVerifiedUser | null */
  },
  logger: serverLogger,
});

export const GET = createHandler({
  auth: "required", // "required" | "optional" | "none"
  rateLimit: RateLimitPresets.api,
  handler: async ({ request, user }) => {
    return NextResponse.json({ user });
  },
});
```

---

## `createRouteHandler`

Simpler factory for single-file endpoints.

---

## Search param helpers

```ts
import {
  getStringParam,
  getNumberParam,
  getBooleanParam,
  getSearchParams,
} from "@mohasinac/next";

const url = new URL(request.url);
const page = getNumberParam(url.searchParams, "page", 1);
const q = getStringParam(url.searchParams, "q", "");
const active = getBooleanParam(url.searchParams, "active", false);
```

---

## Response caching

```ts
import { withCache, invalidateCache } from "@mohasinac/next";

const data = await withCache("site-settings", () => fetchSiteSettings(), {
  ttl: 60,
});
await invalidateCache("site-settings");
```

---

## Auth helpers

```ts
import {
  getRequiredSessionCookie,
  getOptionalSessionCookie,
} from "@mohasinac/next";
```

---

## Exports

`createApiErrorHandler()`, `createRouteHandler()`, `createApiHandlerFactory()`, `getSearchParams()`, `getOptionalSessionCookie()`, `getRequiredSessionCookie()`, `getBooleanParam()`, `getStringParam()`, `getNumberParam()`, `withCache()`, `invalidateCache()`

Types: `IAuthVerifier`, `AuthVerifiedUser`, `IApiErrorLogger`, `ApiErrorHandlerOptions`, `RouteUser`, `ApiHandlerOptions`, `ApiHandlerFactoryDeps`, `ApiRateLimitResult`, `CacheConfig`

---

## License

MIT — part of the `@mohasinac/*` monorepo.
