# @mohasinac/feat-payments

> **Layer 5** — Payments feature module: payment method selector, Razorpay checkout integration, and order summary.

## Install

```bash
npm install @mohasinac/feat-payments
```

---

## Components

```tsx
import { PaymentMethodSelector, PaymentForm, OrderSummary } from "@mohasinac/feat-payments";
```

---

## Payment flow

1. Client renders `PaymentMethodSelector` and `OrderSummary`
2. On "Pay" click → Server Action creates a Razorpay order via `payment.createOrder()`
3. Client opens Razorpay checkout modal with the returned `order.id`
4. On payment success → Server Action calls `payment.capturePayment()` and finalizes the order

Mutations are Server Actions; this package contains read/display components only.

## License

MIT — part of the `@mohasinac/*` monorepo.
