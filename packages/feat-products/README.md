# @mohasinac/feat-products

> **Layer 5** — Products feature module: product listing, detail, variants, Sieve-based repository, and full CRUD API routes.

## Install

```bash
npm install @mohasinac/feat-products
```

Peer dependencies: React ≥ 18, Next.js ≥ 14, next-intl ≥ 3.

---

## Add to your project

```ts
// features.config.ts
export default { products: true, ... } satisfies FeaturesConfig;
```

```ts
// app/api/products/route.ts
import { withProviders } from "@/providers.config";
import { GET as _GET, POST as _POST } from "@mohasinac/feat-products";
export const GET = withProviders(_GET);
export const POST = withProviders(_POST);

// app/api/products/[id]/route.ts
import { withProviders } from "@/providers.config";
import { productItemGET as _GET, productItemPATCH as _PATCH, productItemDELETE as _DELETE } from "@mohasinac/feat-products";
export const GET = withProviders(_GET);
export const PATCH = withProviders(_PATCH);
export const DELETE = withProviders(_DELETE);
```

---

## Hooks

```ts
import { useProducts, useProductDetail } from "@mohasinac/feat-products";

const { items, total, isLoading } = useProducts({ filters: "status==published", page: 1 });
const { product, isLoading } = useProductDetail(slug);
```

---

## Repository

```ts
import { ProductsRepository } from "@mohasinac/feat-products";
import { getProviders } from "@mohasinac/contracts";

const { db } = getProviders();
const repo = new ProductsRepository(db!.getRepository("products"));

const result = await repo.findAll({ filters: "status==published", sort: "-createdAt" });
const product = await repo.findBySlug("blue-sneakers");
```

---

## Domain types

```ts
import type { ProductItem, ProductStatus, ProductCondition, ListingType } from "@mohasinac/feat-products";
```

`ListingType`: `"buy-now"` | `"auction"` | `"pre-order"`  
`ProductStatus`: `"published"` | `"draft"` | `"archived"`

---

## Exports

Types · `useProducts`, `useProductDetail` · all components · `productItemSchema`, `buildProductColumns` · `ProductsRepository` · `manifest` · route handlers: `GET`, `POST`, `productItemGET`, `productItemPATCH`, `productItemDELETE`

---

## License

MIT — part of the `@mohasinac/*` monorepo.
