# @mohasinac/http

> **Layer 2** — Framework-agnostic HTTP client with automatic base URL detection, error normalization, and TypeScript generics.

## Install

```bash
npm install @mohasinac/http
```

---

## Quick Start

```ts
import { apiClient } from "@mohasinac/http";

// GET
const products = await apiClient.get<ProductListResponse>("/api/products?page=1");

// POST
const order = await apiClient.post<Order>("/api/orders", { items: [...] });

// PATCH
const updated = await apiClient.patch<Product>(`/api/products/${id}`, { price: 99 });

// DELETE
await apiClient.delete(`/api/products/${id}`);
```

`apiClient` auto-detects `baseURL`:

- Browser: uses `window.location.origin`
- Server (Next.js SSR): reads `NEXT_PUBLIC_BASE_URL` → falls back to `http://localhost:3000`

---

## Custom instance

```ts
import { ApiClient } from "@mohasinac/http";

const client = new ApiClient({
  baseURL: "https://api.example.com",
  headers: { "X-Api-Key": process.env.API_KEY! },
  timeout: 10_000,
});
```

---

## Error handling

All non-2xx responses throw `ApiClientError`:

```ts
import { ApiClientError } from "@mohasinac/http";

try {
  await apiClient.get("/api/protected");
} catch (err) {
  if (err instanceof ApiClientError) {
    console.log(err.status); // HTTP status code
    console.log(err.message); // server error message
  }
}
```

---

## Exports

`ApiClient`, `ApiClientError`, `apiClient` (singleton)  
Types: `ApiClientOptions`, `RequestConfig`, `ApiResponse`

---

## License

MIT — part of the `@mohasinac/*` monorepo.
