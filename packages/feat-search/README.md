# @mohasinac/feat-search

> **Layer 5** — Search feature module: search bar, results rendering, Algolia integration, and search API route handler.

## Install

```bash
npm install @mohasinac/feat-search
```

Peer dependencies: React ≥ 18, Next.js ≥ 14, next-intl ≥ 3.

---

## Add to your project

```ts
// app/api/search/route.ts
import { withProviders } from "@/providers.config";
import { searchGET as _GET } from "@mohasinac/feat-search";
export const GET = withProviders(_GET);
```

---

## Hook

```ts
import { useSearch } from "@mohasinac/feat-search";

const { results, isLoading, query, setQuery } = useSearch();
```

---

## Components

```tsx
import { SearchBar, SearchResults } from "@mohasinac/feat-search";

<SearchBar placeholder={t("search.placeholder")} />
<SearchResults results={results} />
```

---

## Exports

Types · schemas · columns · `useSearch` · components · `SearchRepository` · `manifest` · route handler: `searchGET`, `GET`

---

## License

MIT — part of the `@mohasinac/*` monorepo.
