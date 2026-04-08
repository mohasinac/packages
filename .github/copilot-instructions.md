# GitHub Copilot Instructions — @mohasinac/packages

## Project identity

- **npm scope**: `@mohasinac/*` — never `@lir/*`
- **Monorepo root**: `d:\proj\packages` (npm workspaces, `packages/` dir)
- **Description**: Pluggable feature library for Next.js — SOLID + Provider/Adapter pattern
- **Three consumer projects**: `letitrip.in` (marketplace), `licorice` (Ayurvedic e-commerce), `hobson` (collectibles)

---

## Layer architecture (strict dependency order)

```
Layer 1  contracts          — pure TS interfaces, zero runtime deps
Layer 2  primitives         — core, tokens, errors, utils, validation, http, next, react, ui,
                              monitoring, seo, security, css-tailwind, css-vanilla
Layer 3  providers          — db-firebase, auth-firebase, email-resend, storage-firebase,
                              payment-razorpay, search-algolia, shipping-shiprocket
Layer 4  shell features     — feat-layout, feat-forms, feat-filters, feat-media
Layer 5  domain features    — feat-auth, feat-account, feat-products, feat-cart, feat-checkout,
                              feat-orders, feat-payments, feat-events, feat-auctions, feat-seller,
                              feat-stores, feat-pre-orders, feat-consultation, feat-loyalty,
                              feat-collections, feat-blog, feat-reviews, feat-faq, feat-search,
                              feat-homepage, feat-admin, feat-promotions, feat-wishlist,
                              feat-categories, feat-corporate, feat-before-after,
                              feat-preorders, feat-whatsapp-bot
Layer 6  tooling            — cli, create-app, eslint-plugin-letitrip
```

**Critical rule**: Higher layers NEVER import from lower layers. feat-* packages import
ONLY from `@mohasinac/contracts` plus Layer 2 primitives. They NEVER import a concrete
provider (e.g. `@mohasinac/db-firebase`) directly.

**Reuse-first rule (mandatory)**: Before adding any new implementation in any package,
check existing `@mohasinac/*` packages and reuse/extend what already exists. Do NOT
reimplement behavior already provided by another internal package.

**Generic code placement rule (mandatory)**: If logic is generic (not domain-specific),
move it to a common package (`@mohasinac/core`, `@mohasinac/react`, `@mohasinac/ui`,
`@mohasinac/utils`, or another appropriate primitive package) and consume it from there.
Do not keep duplicate generic utilities inside feat-* packages.

---

## @mohasinac/contracts

The single source of truth for all interfaces. Build this FIRST before any other package.

### Exported interfaces

| File | Exports |
|---|---|
| `repository.ts` | `IReadRepository<T>`, `IWriteRepository<T>`, `IRepository<T>`, `IRealtimeRepository<T>`, `IDbProvider`, `SieveQuery`, `PagedResult<T>`, `WhereOp` |
| `auth.ts` | `IAuthProvider`, `ISessionProvider`, `AuthPayload`, `AuthUser`, `CreateUserInput` |
| `email.ts` | `IEmailProvider`, `EmailOptions`, `EmailResult`, `EmailAttachment` |
| `storage.ts` | `IStorageProvider`, `UploadOptions`, `StorageFile` |
| `payment.ts` | `IPaymentProvider`, `PaymentOrder`, `PaymentCapture`, `Refund` |
| `shipping.ts` | `IShippingProvider`, `ShippingAddress`, `CreateShipmentInput`, `Shipment`, `TrackingInfo`, `ServiceabilityResult` |
| `search.ts` | `ISearchProvider`, `SearchOptions`, `SearchHit`, `SearchResult`, `SuggestOptions` |
| `infra.ts` | `ICacheProvider`, `IQueueProvider`, `IEventBus`, `QueueJob`, `EventHandler` |
| `style.ts` | `IStyleAdapter` |
| `registry.ts` | `ProviderRegistry`, `registerProviders()`, `getProviders()`, `_resetProviders()` |
| `feature.ts` | `FeatureManifest`, `RouteStub`, `ApiRouteStub`, `FeaturesConfig` |
| `config.ts` | `SiteConfig` |

### Provider registry pattern

```ts
// providers.config.ts — consumer project startup (call ONCE)
import { registerProviders } from "@mohasinac/contracts";
import { firebaseDbProvider } from "@mohasinac/db-firebase";
import { FirebaseAuthProvider } from "@mohasinac/auth-firebase";
import { ResendEmailProvider } from "@mohasinac/email-resend";
import { tailwindStyleAdapter } from "@mohasinac/css-tailwind";

registerProviders({
  db: firebaseDbProvider,
  auth: new FirebaseAuthProvider(),
  session: new FirebaseAuthProvider(),
  email: new ResendEmailProvider(process.env.RESEND_API_KEY!),
  storage: new FirebaseStorageProvider(),
  style: tailwindStyleAdapter,
  // optional: payment, shipping, search, cache, queue, eventBus
});
```

```ts
// Inside a feat-* route handler — DI via getProviders()
import { getProviders } from "@mohasinac/contracts";

const { db } = getProviders();
const repo = db!.getRepository<ProductItem>("products");
const result = await repo.findAll({ filters: "status==published", page: 1 });
```

---

## Sieve query system

All repositories use a provider-agnostic `SieveQuery` descriptor. DB adapters translate
the Sieve filter string into native query predicates (Firestore, Postgres, etc.).

```ts
interface SieveQuery {
  filters?: string;  // "field==value,field2>value2" — comma = AND
  sort?: string;     // field name; prefix with "-" for descending
  order?: "asc" | "desc";
  page?: number;     // 1-based (default: 1)
  perPage?: number;  // (default: 20)
}
```

### Sieve operator reference

| Operator | Meaning |
|---|---|
| `==` | equals |
| `!=` | not equals |
| `<` `<=` `>` `>=` | numeric / date comparison |
| `array-contains` | array field contains value |
| `in` | field value is in array |
| `not-in` | field value not in array |
| `array-contains-any` | array field contains any of array |
| `@=*` | case-insensitive contains (text search) |

### Example patterns

```ts
// Simple filter
repo.findAll({ filters: "status==published", sort: "-createdAt" });

// Compound filter (AND)
repo.findAll({ filters: "status==published,category==electronics,price>=100" });

// Text search
repo.findAll({ filters: `title@=*${q}` });

// Pagination
repo.findAll({ page: 2, perPage: 20 });
```

---

## feat-* package structure

Every feature package follows this exact directory layout:

```
packages/feat-<name>/
├── manifest.ts            ← FeatureManifest (name, envKeys, routes, apiRoutes)
├── package.json
├── tsconfig.json
└── src/
    ├── index.ts           ← re-exports everything public
    ├── types/
    │   └── index.ts       ← domain types (no imports from concrete providers)
    ├── repository/
    │   └── <name>.repository.ts  ← wraps IRepository<T>, Sieve-based methods
    ├── api/
    │   ├── route.ts       ← GET/POST handlers (collection endpoint)
    │   └── [id]/
    │       └── route.ts   ← GET/PATCH/DELETE handlers (item endpoint)
    ├── components/
    │   ├── index.ts
    │   └── <FeatureName>View.tsx   ← page-level view components
    ├── hooks/
    │   └── use<Feature>.ts  ← TanStack Query hooks, apiClient calls
    └── messages/
        └── en.json        ← default English strings for next-intl namespace
```

### Feature manifest

```ts
// manifest.ts
import type { FeatureManifest } from "@mohasinac/contracts";

export const manifest: FeatureManifest = {
  name: "products",              // must match FeaturesConfig key
  i18nNamespace: "products",    // next-intl namespace
  envKeys: [],                  // required env var names (documentation)
  routes: [
    { segment: "[locale]/products", exports: { default: "ProductsListView" } },
    { segment: "[locale]/products/[slug]", exports: { default: "ProductDetailView" } },
  ],
  apiRoutes: [
    { segment: "api/products", methods: ["GET", "POST"] },
    { segment: "api/products/[slug]", methods: ["GET", "PATCH", "DELETE"] },
  ],
};
```

### API route pattern (2-line stubs in consumer project)

```ts
// app/api/products/route.ts  ← consumer project
export { GET, POST } from "@mohasinac/feat-products";

// app/api/products/[id]/route.ts
export { productItemGET as GET, productItemPATCH as PATCH, productItemDELETE as DELETE }
  from "@mohasinac/feat-products";
```

### Repository pattern

```ts
// src/repository/<name>.repository.ts
import type { IRepository, PagedResult, SieveQuery } from "@mohasinac/contracts";
import type { MyEntity } from "../types";

export class MyRepository {
  constructor(private readonly repo: IRepository<MyEntity>) {}

  async findAll(query?: SieveQuery): Promise<PagedResult<MyEntity>> {
    return this.repo.findAll(query ?? {});
  }

  async findBySlug(slug: string): Promise<MyEntity | null> {
    const result = await this.repo.findAll({ filters: `slug==${slug}`, perPage: 1 });
    return result.data[0] ?? null;
  }
}
```

### Client hook pattern (TanStack Query)

```ts
// src/hooks/useMyFeature.ts
"use client";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@mohasinac/http";
import type { MyListResponse, MyListParams } from "../types";

export function useMyFeature(params: MyListParams = {}, opts?: { enabled?: boolean }) {
  const sp = new URLSearchParams();
  // ...map params to query string
  const qs = sp.toString();

  const query = useQuery<MyListResponse>({
    queryKey: ["my-feature", qs],
    queryFn: () => apiClient.get<MyListResponse>(`/api/my-feature${qs ? `?${qs}` : ""}`),
    enabled: opts?.enabled,
  });

  return {
    items: query.data?.items ?? [],
    total: query.data?.total ?? 0,
    isLoading: query.isLoading,
    error: query.error,
  };
}
```

---

## @mohasinac/cli

Two distinct surfaces:

### 1. CLI commands (binary)

```bash
npx @mohasinac/cli add products     # install feature, generate route stubs
npx @mohasinac/cli remove products  # remove feature
npx @mohasinac/cli list             # list available features
```

### 2. Node API (imported in consumer project config)

```ts
// next.config.js
const { withFeatures } = require("@mohasinac/cli/next");
const features = require("./features.config").default;

module.exports = withFeatures(features)({
  serverExternalPackages: ["firebase-admin"],
  // ...other Next.js config
});
```

```ts
// src/i18n/request.ts
import { mergeFeatureMessages } from "@mohasinac/cli/i18n";
import features from "../../features.config";

export default async function getRequestConfig({ locale }) {
  const messages = await mergeFeatureMessages(locale, features);
  return { locale, messages };
}
```

### features.config.ts shape

```ts
// features.config.ts in consumer project
export default {
  auth: true,
  products: true,
  cart: true,
  orders: true,
  events: false,
  auctions: false,
} satisfies FeaturesConfig;  // FeaturesConfig = Record<string, boolean>
```

### Feature → package map

| Config key | Package |
|---|---|
| `auth` | `@mohasinac/feat-auth` |
| `account` | `@mohasinac/feat-account` |
| `products` | `@mohasinac/feat-products` |
| `categories` | `@mohasinac/feat-categories` |
| `cart` | `@mohasinac/feat-cart` |
| `wishlist` | `@mohasinac/feat-wishlist` |
| `checkout` | `@mohasinac/feat-checkout` |
| `orders` | `@mohasinac/feat-orders` |
| `payments` | `@mohasinac/feat-payments` |
| `blog` | `@mohasinac/feat-blog` |
| `reviews` | `@mohasinac/feat-reviews` |
| `faq` | `@mohasinac/feat-faq` |
| `search` | `@mohasinac/feat-search` |
| `homepage` | `@mohasinac/feat-homepage` |
| `admin` | `@mohasinac/feat-admin` |
| `events` | `@mohasinac/feat-events` |
| `auctions` | `@mohasinac/feat-auctions` |
| `seller` | `@mohasinac/feat-seller` |
| `stores` | `@mohasinac/feat-stores` |
| `loyalty` | `@mohasinac/feat-loyalty` |
| `collections` | `@mohasinac/feat-collections` |
| `consultation` | `@mohasinac/feat-consultation` |
| `corporate` | `@mohasinac/feat-corporate` |
| `before-after` | `@mohasinac/feat-before-after` |
| `pre-orders` | `@mohasinac/feat-pre-orders` |
| `preorders` | `@mohasinac/feat-preorders` |
| `whatsapp-bot` | `@mohasinac/feat-whatsapp-bot` |

---

## Infrastructure packages

### @mohasinac/db-firebase

Concrete Firestore implementation of `IDbProvider` and `IRepository`.

```ts
import { FirebaseRepository } from "@mohasinac/db-firebase";
import type { Product } from "@/types";

// Extend for domain-specific helpers:
export class ProductRepository extends FirebaseRepository<Product> {
  constructor() { super("products"); }
}

// Or use the pre-built IDbProvider directly:
import { firebaseDbProvider } from "@mohasinac/db-firebase";
registerProviders({ db: firebaseDbProvider, ... });
```

- `FirebaseRepository<T>` — full CRUD (`IRepository<T>`)
- `FirebaseSieveRepository<T>` — adds Sieve filter parsing
- `FirebaseRealtimeRepository<T>` — adds `subscribe()` / `subscribeWhere()`
- `firebaseDbProvider` — `IDbProvider` singleton wired to `FirebaseRepository`

### @mohasinac/auth-firebase

Implements `IAuthProvider` + `ISessionProvider` using Firebase Admin SDK.

### @mohasinac/email-resend

Implements `IEmailProvider` using the Resend API.

### @mohasinac/storage-firebase

Implements `IStorageProvider` using Firebase Storage (Admin SDK).

### @mohasinac/payment-razorpay

Implements `IPaymentProvider` using the Razorpay API. Handles order creation, payment capture, and refunds.

### @mohasinac/search-algolia

Algolia integration for product/category/store indexing and browser search. Exports indexing helpers (server-side) and `algoliaSearch()` (browser/server).

### @mohasinac/shipping-shiprocket

Thin HTTP client for the Shiprocket REST API. Handles authentication, order creation, AWB generation, pickup scheduling, and tracking.

---

## Primitive packages

### @mohasinac/core

Pure utility classes with no framework dependencies:

- `Logger` / `logger` — structured logging with levels
- `Queue` / `EventBus` / `CacheManager` — in-memory fallbacks for infra interfaces
- `StorageManager` / `storageManager` — localStorage/sessionStorage wrapper

### @mohasinac/http

```ts
import { apiClient } from "@mohasinac/http";  // singleton with baseURL auto-detected
// or
import { ApiClient } from "@mohasinac/http";
const client = new ApiClient({ baseURL: "https://api.example.com" });

await apiClient.get<T>("/api/products");
await apiClient.post<T>("/api/products", body);
await apiClient.patch<T>(`/api/products/${id}`, body);
await apiClient.delete("/api/products/${id}");
```

### @mohasinac/errors

```ts
import { AppError, ApiError, NotFoundError, ValidationError,
         AuthenticationError, AuthorizationError, DatabaseError,
         handleApiError } from "@mohasinac/errors";

// In API route handler:
try { ... }
catch (err) { return handleApiError(err); }
```

### @mohasinac/validation

Zod schemas for common fields:

```ts
import { paginationQuerySchema, emailSchema, passwordSchema,
         phoneSchema, urlSchema, addressSchema } from "@mohasinac/validation";
```

### @mohasinac/security

```ts
import { requireAuth, requireRole, requireOwnership, rateLimit,
         RateLimitPresets, generateNonce, buildCSP } from "@mohasinac/security";

// Middleware:
const user = await requireAuth(request);         // throws AuthenticationError
await requireRole(user, "admin");                // throws AuthorizationError
const result = await rateLimit(identifier, RateLimitPresets.api);
```

### @mohasinac/tokens

Design token constants mirroring CSS custom properties (`--lir-*`).
Brand colours: `COLORS.primary` (#84e122), `COLORS.secondary` (#e91e8c), `COLORS.cobalt` (#3570fc).

### @mohasinac/css-tailwind / @mohasinac/css-vanilla

Implementations of `IStyleAdapter`:
- `css-tailwind` → `twMerge(clsx(...))` for `cn()`, `var(--lir-*)` for `token()`
- `css-vanilla` → plain string join

### @mohasinac/react

Generic browser/React hooks (no domain logic):
`useMediaQuery`, `useBreakpoint`, `useClickOutside`, `useKeyPress`,
`useLongPress`, `useGesture`, `useSwipe`, `usePullToRefresh`,
`useCountdown`, `useCamera`

### @mohasinac/ui

Primitive UI components (semantic HTML wrappers + headless primitives):
`Section`, `Article`, `Main`, `Aside`, `Nav`, `Heading`, `Text`,
`Button`, `Badge`, `Alert`, `Spinner`, `Skeleton`, `Divider`, `Progress`

### @mohasinac/next

```ts
import { createApiErrorHandler } from "@mohasinac/next";
import type { IAuthVerifier } from "@mohasinac/next";

const handleError = createApiErrorHandler({ logger: myLogger });
```

### @mohasinac/monitoring

```ts
import { setErrorTracker, trackError, trackApiError,
         getCacheMetrics, recordCacheHit } from "@mohasinac/monitoring";
```

### @mohasinac/seo

SEO utilities and meta tag helpers for Next.js App Router.

---

## Build system

```bash
node scripts/build-all.mjs                    # build all packages in dependency order
node scripts/build-all.mjs --filter=contracts,core  # build specific packages only
npm run build                                 # alias for build-all.mjs
npm run typecheck                             # tsc --noEmit (root)
npm run clean                                 # remove all dist/ directories
npm run bump                                  # bump version across packages
npm run publish:all                           # publish all public packages to npm
```

Individual package builds use `tsup`:

```bash
cd packages/contracts && npm run build        # tsup src/index.ts --format esm,cjs --dts
```

### package.json conventions

```json
{
  "name": "@mohasinac/feat-<name>",
  "version": "0.1.0",
  "private": false,
  "publishConfig": { "access": "public" },
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  },
  "files": ["dist"],
  "scripts": {
    "build": "tsup src/index.ts --format esm,cjs --dts",
    "dev": "tsup --watch",
    "typecheck": "tsc --noEmit"
  }
}
```

All `@mohasinac/*` internal cross-dependencies use `"workspace:*"` version constraint.

---

## TypeScript

Root `tsconfig.json` sets:
- `target: ES2017`, `module: esnext`, `moduleResolution: bundler`
- `strict: true`, `isolatedModules: true`, `jsx: react-jsx`
- Path aliases for all workspace packages (e.g. `@mohasinac/contracts → ./packages/contracts/src`)

Each package has its own `tsconfig.json` that `extends` the root config.

---

## ESLint rules (@mohasinac/eslint-plugin-letitrip)

Custom rules enforcing architectural boundaries:

| Rule | Code | Description |
|---|---|---|
| `lir/no-deep-barrel-import` | ARCH-001 | Import from package root, not deep paths |
| `lir/no-cross-feature-import` | ARCH-002 | feat-* must not import other feat-* |
| `lir/no-fat-page` | ARCH-003 | Page components must stay thin |
| `lir/no-tier1-feature-import` | ARCH-004 | Layer 4 shell cannot import Layer 5 features |
| `lir/no-firebase-client-in-ui` | FIREBASE-001/002 | No Firebase client SDK in components |
| `lir/no-firebase-admin-outside-backend` | FIREBASE-003 | Admin SDK only in server routes/actions |
| `lir/no-direct-firestore-query` | FIREBASE-004 | Use repository, not raw Firestore |
| `lir/no-fetch-in-ui` | SVC-001 | No `fetch()` in components/pages |
| `lir/no-apiclient-outside-services` | SVC-002 | `apiClient` only in hooks/contexts |
| `lir/no-hardcoded-api-path` | SVC-003 | No `/api/...` string literals in hooks |
| `lir/no-raw-html-elements` | COMP-001–009 | Use `@mohasinac/ui` wrappers |
| `lir/no-raw-media-elements` | MEDIA-001–003 | Use `@mohasinac/feat-media` wrappers |
| `lir/no-inline-static-style` | STYL-002 | No inline `style={}` with static values |
| `lir/require-xl-breakpoints` | STYL-001 | Include xl: breakpoint classes |
| `lir/use-i18n-navigation` | I18N-001/002 | Use `next-intl` navigation, not `next/navigation` |
| `lir/no-module-scope-translations` | I18N-003 | No `useTranslations` at module scope |
| `lir/no-hardcoded-route` | CNST-001 | No inline route strings |
| `lir/no-raw-date` | CNST-002 | No `new Date()` in components |
| `lir/no-hardcoded-collection` | CNST-003 | No inline Firestore collection names |
| `lir/no-firebase-trigger-in-api` | QUAL-004 | No Firestore triggers in API routes |

---

## Adding a new feat-* package

1. Create `packages/feat-<name>/` with the standard directory layout above
2. Write `manifest.ts` exporting a `FeatureManifest`
3. Define domain types in `src/types/index.ts` — no concrete provider imports
4. Create `src/repository/<name>.repository.ts` accepting `IRepository<T>` in constructor
5. Create `src/api/route.ts` using `getProviders().db` — never import a provider directly
6. Create `src/hooks/use<Name>.ts` using `apiClient` from `@mohasinac/http`
7. Add default messages to `src/messages/en.json`
8. Export everything from `src/index.ts`
9. Add `package.json` with `"peerDependencies": { "react": ">=18", "next": ">=14", "next-intl": ">=3" }`
10. Add to `BUILD_ORDER` in `scripts/build-all.mjs` (Layer 5)
11. Add to `FEATURE_PACKAGE_MAP` in `packages/cli/src/next.ts`
12. Add to `FEATURE_NAMESPACE_MAP` in `packages/cli/src/i18n.ts`
13. Add path alias to root `tsconfig.json`

---

## Adding a new infrastructure provider

1. Create `packages/<type>-<vendor>/` (e.g. `payment-razorpay`)
2. Implement the relevant interface from `@mohasinac/contracts` (e.g. `IPaymentProvider`)
3. Export the concrete class + a pre-built singleton where applicable
4. Dependency: `"@mohasinac/contracts": "workspace:*"` — no other `@mohasinac/*` deps unless needed
5. Add to `BUILD_ORDER` in `scripts/build-all.mjs` (Layer 3)

---

## i18n conventions

- Messages live in `src/messages/en.json` inside each feat-* package
- Namespace key must match `manifest.i18nNamespace` and the `FEATURE_NAMESPACE_MAP` entry in cli
- Default provider's messages are **always overridden** by consumer project's own message files
- Use `mergeFeatureMessages(locale, features)` in `src/i18n/request.ts` — local messages win
- Never call `useTranslations()` at module scope (ESLint rule I18N-003)

---

## Common patterns to follow

### API route handler skeleton

```ts
import { NextResponse } from "next/server";
import { getProviders } from "@mohasinac/contracts";
import { handleApiError } from "@mohasinac/errors";

export async function GET(request: Request): Promise<NextResponse> {
  try {
    const { db } = getProviders();
    if (!db) return NextResponse.json({ error: "DB not configured" }, { status: 503 });

    const repo = db.getRepository<MyEntity>("my-collection");
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page") ?? 1);
    const filters = /* build Sieve filter string */ "";

    const result = await repo.findAll({ filters, sort: "-createdAt", page, perPage: 20 });
    return NextResponse.json({ success: true, ...result });
  } catch (err) {
    return handleApiError(err);
  }
}
```

### Using optional providers safely

```ts
const { payment, shipping, search, cache, queue, eventBus } = getProviders();

// Optional providers must be checked before use:
if (!payment) {
  return NextResponse.json({ error: "Payment provider not configured" }, { status: 503 });
}

// Cache with fallback:
const cached = cache ? await cache.get<MyType>(cacheKey) : null;
```

### Style adapter usage in components

```ts
import { getProviders } from "@mohasinac/contracts";

// Server component — call getProviders() directly
// Client component — receive `cn` as a prop or use a context provider
const { style } = getProviders();
const className = style.cn("base-class", isActive && "active", className);
```

---

## What NOT to do

- Do NOT import `@mohasinac/db-firebase` (or any concrete provider) from inside a `feat-*` package
- Do NOT use `@lir/*` package names anywhere
- Do NOT cross-import between feat-* packages (ARCH-002)
- Do NOT reimplement code that already exists in another `@mohasinac/*` package; reuse or extend it
- Do NOT create duplicate generic helpers/components/hooks inside domain packages; move them to common packages
- Do NOT call `getProviders()` before `registerProviders()` at app startup
- Do NOT use raw `<img>`, `<video>`, `<a>`, `<button>` elements in components — use `@mohasinac/ui` wrappers
- Do NOT use `next/navigation` for routing in i18n apps — use `next-intl` navigation
- Do NOT hardcode Firestore collection names inline — use constants
- Do NOT use `fetch()` directly in components/pages — use `apiClient` from `@mohasinac/http`
