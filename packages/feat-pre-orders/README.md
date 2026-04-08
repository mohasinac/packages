# @mohasinac/feat-pre-orders

> **Layer 5** — Pre-orders feature module: pre-order button, pre-order listing, status tracking, and pre-orders API route handler.

## Install

```bash
npm install @mohasinac/feat-pre-orders
```

---

## Add to your project

```ts
// app/api/pre-orders/route.ts
import { withProviders } from "@/providers.config";
import { GET as _GET } from "@mohasinac/feat-pre-orders";
export const GET = withProviders(_GET);
```

---

## Components

```tsx
import { PreOrderButton, PreOrderList, PreOrderStatus } from "@mohasinac/feat-pre-orders";

<PreOrderButton product={product} />
<PreOrderStatus preOrderId={id} />
```

## License

MIT — part of the `@mohasinac/*` monorepo.
