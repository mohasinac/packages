# @mohasinac/feat-stores

> **Layer 5** — Stores feature module: store listings, store profile pages, nearby stores, and the stores API route handlers.

## Install

```bash
npm install @mohasinac/feat-stores
```

Peer dependencies: React ≥ 18, Next.js ≥ 14, next-intl ≥ 3.

---

## API routes

```ts
// app/api/stores/route.ts
import { withProviders } from "@/providers.config";
import { GET as _GET } from "@mohasinac/feat-stores";
export const GET = withProviders(_GET);

// app/api/stores/[storeSlug]/route.ts
import { withProviders } from "@/providers.config";
import { storeSlugGET as _GET } from "@mohasinac/feat-stores";
export const GET = withProviders(_GET);
```

---

## Components

```tsx
import { StoreList, StoreCard, StoreDetail, NearbyStores } from "@mohasinac/feat-stores";
```

---

## License

MIT — part of the `@mohasinac/*` monorepo.
