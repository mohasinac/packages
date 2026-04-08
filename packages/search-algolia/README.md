# @mohasinac/search-algolia

> **Layer 3** — Algolia search integration: indexing helpers for products, categories, and stores, plus a browser search client for instant search UI.

## Install

```bash
npm install @mohasinac/search-algolia algoliasearch
```

---

## Configuration check

```ts
import {
  isAlgoliaConfigured,
  isAlgoliaBrowserConfigured,
} from "@mohasinac/search-algolia";

if (!isAlgoliaConfigured()) {
  console.warn("Algolia admin client not configured — skipping indexing");
}
```

---

## Search (browser / server)

```ts
import { algoliaSearch } from "@mohasinac/search-algolia";

const results = await algoliaSearch({
  query: "running shoes",
  indexName: ALGOLIA_INDEX_NAME,
  page: 0,
  hitsPerPage: 20,
  filters: "status:published",
});
```

---

## Indexing (server-side only)

```ts
import {
  indexProducts,
  deleteProductFromIndex,
  clearAlgoliaIndex,
} from "@mohasinac/search-algolia";
import {
  indexCategories,
  indexStores,
  indexNavPages,
} from "@mohasinac/search-algolia";

// Called after product create/update
await indexProducts([product]);

// Called after product delete
await deleteProductFromIndex(productId);
```

---

## Index names

```ts
import {
  ALGOLIA_INDEX_NAME, // "products"
  ALGOLIA_CATEGORIES_INDEX_NAME, // "categories"
  ALGOLIA_STORES_INDEX_NAME, // "stores"
} from "@mohasinac/search-algolia";
```

---

## Full export list

Constants: `ALGOLIA_INDEX_NAME`, `ALGOLIA_CATEGORIES_INDEX_NAME`, `ALGOLIA_STORES_INDEX_NAME`

Functions: `isAlgoliaConfigured()`, `isAlgoliaBrowserConfigured()`, `getAlgoliaAdminClient()`, `algoliaSearch()`, `searchNavPages()`, `indexProducts()`, `deleteProductFromIndex()`, `clearAlgoliaIndex()`, `indexNavPages()`, `indexCategories()`, `deleteCategoryFromIndex()`, `indexStores()`, `deleteStoreFromIndex()`, `productToAlgoliaRecord()`, `categoryToAlgoliaRecord()`, `storeToAlgoliaRecord()`

Types: `ProductLike`, `CategoryLike`, `StoreLike`, `AlgoliaProductRecord`, `AlgoliaNavRecord`, `AlgoliaCategoryRecord`, `AlgoliaStoreRecord`, `AlgoliaSearchParams`, `AlgoliaSearchResult`

---

## Required environment variables

| Variable                         | Description                   |
| -------------------------------- | ----------------------------- |
| `ALGOLIA_APP_ID`                 | Algolia application ID        |
| `ALGOLIA_ADMIN_API_KEY`          | Admin API key (server-only)   |
| `NEXT_PUBLIC_ALGOLIA_APP_ID`     | Same app ID (browser)         |
| `NEXT_PUBLIC_ALGOLIA_SEARCH_KEY` | Search-only API key (browser) |

---

## License

MIT — part of the `@mohasinac/*` monorepo.
