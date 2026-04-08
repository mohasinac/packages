# @mohasinac/feat-cart

> **Layer 5** — Cart and checkout read-side feature module: cart drawer, cart items, cart summary, and checkout data hooks.

## Install

```bash
npm install @mohasinac/feat-cart
```

Peer dependencies: React ≥ 18, Next.js ≥ 14, next-intl ≥ 3.

---

## Hooks

```ts
import { useCart, useCartQuery, useCheckoutReadQueries, useOrder } from "@mohasinac/feat-cart";

const { items, itemCount, subtotal, addItem, removeItem, updateQuantity } = useCart();
const { cartData, isLoading } = useCartQuery();
```

---

## Components

```tsx
import { CartDrawer, CartItem, CartSummary, CartPage } from "@mohasinac/feat-cart";

<CartDrawer open={isOpen} onClose={() => setOpen(false)} />
```

---

## Mutations

Cart mutations (add/remove/update) are handled via Server Actions imported from `@/actions`, not from this package. This package contains read-side hooks and display components only.

---

## Exports

Types · schemas · columns · `useCart`, `useCartQuery`, `useCheckoutReadQueries`, `useOrder` · components · `CartRepository` · `manifest`

---

## License

MIT — part of the `@mohasinac/*` monorepo.
