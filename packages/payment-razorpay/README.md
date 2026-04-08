# @mohasinac/payment-razorpay

> **Layer 3** — Razorpay implementation of `IPaymentProvider`. Handles order creation, payment capture, and refunds server-side.

## Install

```bash
npm install @mohasinac/payment-razorpay razorpay
```

---

## Register with provider registry

```ts
import { registerProviders } from "@mohasinac/contracts";
import { RazorpayProvider } from "@mohasinac/payment-razorpay";

registerProviders({
  payment: new RazorpayProvider({
    keyId: process.env.RAZORPAY_KEY_ID!,
    keySecret: process.env.RAZORPAY_KEY_SECRET!,
  }),
});
```

---

## Create a payment order

```ts
import { getProviders } from "@mohasinac/contracts";

const { payment } = getProviders();
if (!payment) throw new Error("Payment provider not configured");

const order = await payment.createOrder({
  amount: 149900, // in paise (₹1499.00)
  currency: "INR",
  receipt: "order_abc",
  notes: { userId: "user_123" },
});

// Return order.id to the client to open Razorpay checkout
```

---

## Capture / verify payment

```ts
const capture = await payment.capturePayment({
  paymentId: "pay_xyz",
  orderId: "order_abc",
  signature: razorpaySignature,
  amount: 149900,
});
```

---

## Refund

```ts
const refund = await payment.refund({
  paymentId: "pay_xyz",
  amount: 149900,
  reason: "Customer request",
});
```

---

## Exports

`RazorpayProvider` (class implementing `IPaymentProvider`)

Types: `RazorpayConfig`

---

## Required environment variables

| Variable              | Description             |
| --------------------- | ----------------------- |
| `RAZORPAY_KEY_ID`     | Razorpay API key ID     |
| `RAZORPAY_KEY_SECRET` | Razorpay API key secret |

---

## License

MIT — part of the `@mohasinac/*` monorepo.
