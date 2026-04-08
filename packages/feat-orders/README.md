# @mohasinac/feat-orders

> **Layer 5** — Orders feature module: order list, order detail, order timeline, and order tracking display.

## Install

```bash
npm install @mohasinac/feat-orders
```

Peer dependencies: React ≥ 18, Next.js ≥ 14, next-intl ≥ 3.

---

## Hook

```ts
import { useOrders } from "@mohasinac/feat-orders";

const { orders, total, isLoading } = useOrders({ filters: "userId==abc", page: 1 });
```

---

## Components

```tsx
import { OrderList, OrderDetail, OrderTimeline, OrderTracking } from "@mohasinac/feat-orders";

<OrderDetail orderId={orderId} />
<OrderTimeline events={order.timeline} />
<OrderTracking awb={order.awbCode} carrier="shiprocket" />
```

---

## Repository

```ts
import { OrdersRepository } from "@mohasinac/feat-orders";
```

---

## Exports

Types · `useOrders` · components · schemas · columns · `OrdersRepository` · `manifest`

---

## License

MIT — part of the `@mohasinac/*` monorepo.
