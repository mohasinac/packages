# @mohasinac/feat-admin

> **Layer 5** — Admin portal feature module: dashboard stats, data tables with bulk actions, and admin-specific route handlers for products, coupons, reviews, and bids.

## Install

```bash
npm install @mohasinac/feat-admin
```

Peer dependencies: React ≥ 18, Next.js ≥ 14, next-intl ≥ 3.

---

## Add to your project

```ts
// app/api/admin/products/route.ts
import { withProviders } from "@/providers.config";
import { adminProductsGET as _GET } from "@mohasinac/feat-admin";
export const GET = withProviders(_GET);

// Similarly for coupons, reviews, bids
```

---

## Hook

```ts
import { useAdmin } from "@mohasinac/feat-admin";

const { stats, isLoading } = useAdmin();
```

---

## Components

```tsx
import { AdminDashboard, AdminTable, AdminForm, AdminStats } from "@mohasinac/feat-admin";
```

---

## Admin list hooks pattern

For admin list views, use the `createAdminListQuery` factory from `@/features/admin/hooks` in the consuming app (not directly from this package). This ensures URL-synced filters and pagination.

---

## Exports

Types · `useAdmin` · components · `manifest` · route handlers: `adminProductsGET`, `adminCouponsGET`, `adminReviewsGET`, `adminBidsGET`

---

## License

MIT — part of the `@mohasinac/*` monorepo.
