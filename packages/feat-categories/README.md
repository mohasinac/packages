# @mohasinac/feat-categories

> **Layer 5** — Categories feature module: category grid, breadcrumbs, Sieve repository, and full CRUD API routes.

## Install

```bash
npm install @mohasinac/feat-categories
```

Peer dependencies: React ≥ 18, Next.js ≥ 14, next-intl ≥ 3.

---

## Add to your project

```ts
// app/api/categories/route.ts
import { withProviders } from "@/providers.config";
import { categoriesGET as _GET, POST as _POST } from "@mohasinac/feat-categories";
export const GET = withProviders(_GET);
export const POST = withProviders(_POST);

// app/api/categories/[id]/route.ts
import { categoryItemGET as _GET, categoryItemPATCH as _PATCH, categoryItemDELETE as _DELETE } from "@mohasinac/feat-categories";
```

---

## Hook

```ts
import { useCategories } from "@mohasinac/feat-categories";

const { categories, isLoading } = useCategories();
```

---

## Components

```tsx
import { CategoryGrid, CategoryCard, CategoryBreadcrumb } from "@mohasinac/feat-categories";
```

---

## Exports

Types · `useCategories` · components · schemas · columns · `CategoriesRepository` · `manifest` · route handlers: `categoriesGET`, `GET`, `POST`, `categoryItemGET`, `categoryItemPATCH`, `categoryItemDELETE`

---

## License

MIT — part of the `@mohasinac/*` monorepo.
