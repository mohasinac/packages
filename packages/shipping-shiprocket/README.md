# @mohasinac/shipping-shiprocket

> **Layer 3** — Shiprocket shipping API client. Thin HTTP wrapper for order creation, AWB generation, pickup scheduling, and shipment tracking.

## Install

```bash
npm install @mohasinac/shipping-shiprocket
```

---

## Authentication

Shiprocket uses JWT tokens that expire. The client handles token caching automatically:

```ts
import { shiprocketAuthenticate, isShiprocketTokenExpired, SHIPROCKET_TOKEN_TTL_MS } from "@mohasinac/shipping-shiprocket";

const auth = await shiprocketAuthenticate({
  email: process.env.SHIPROCKET_EMAIL!,
  password: process.env.SHIPROCKET_PASSWORD!,
});
// auth.token — use in subsequent calls
```

---

## Create a shipment

```ts
import {
  shiprocketCreateOrder,
  shiprocketGenerateAWB,
  shiprocketGeneratePickup,
} from "@mohasinac/shipping-shiprocket";

// 1. Create order in Shiprocket
const order = await shiprocketCreateOrder(auth.token, {
  order_id: "ORD-123",
  order_date: new Date().toISOString(),
  // ... full ShiprocketCreateOrderRequest
});

// 2. Generate AWB (assign courier)
const awb = await shiprocketGenerateAWB(auth.token, {
  shipment_id: order.shipment_id,
  courier_id: "1",
});

// 3. Schedule pickup
await shiprocketGeneratePickup(auth.token, { shipment_id: [order.shipment_id] });
```

---

## Track shipment

```ts
import { shiprocketTrackByAWB } from "@mohasinac/shipping-shiprocket";

const tracking = await shiprocketTrackByAWB(auth.token, "AWB123456789");
console.log(tracking.shipment_track[0].current_status);
```

---

## Check serviceability

```ts
import { shiprocketCheckServiceability } from "@mohasinac/shipping-shiprocket";

const result = await shiprocketCheckServiceability(auth.token, {
  pickup_postcode: "400001",
  delivery_postcode: "560001",
  weight: 0.5,
  cod: 0,
});
```

---

## Pickup locations

```ts
import { shiprocketGetPickupLocations, shiprocketAddPickupLocation } from "@mohasinac/shipping-shiprocket";

const locations = await shiprocketGetPickupLocations(auth.token);
```

---

## Full export list

Constants: `SHIPROCKET_TOKEN_TTL_MS`

Functions: `shiprocketAuthenticate()`, `shiprocketGetPickupLocations()`, `shiprocketAddPickupLocation()`, `shiprocketVerifyPickupOTP()`, `shiprocketCreateOrder()`, `shiprocketGenerateAWB()`, `shiprocketGeneratePickup()`, `shiprocketTrackByAWB()`, `shiprocketCheckServiceability()`, `isShiprocketTokenExpired()`

Types: `ShiprocketAuthRequest`, `ShiprocketAuthResponse`, `ShiprocketPickupLocation`, `ShiprocketCreateOrderRequest`, `ShiprocketCreateOrderResponse`, `ShiprocketAWBResponse`, `ShiprocketTrackingResponse`, `ShiprocketCourierServiceabilityResponse`, `ShiprocketWebhookPayload` *(and more)*

---

## Required environment variables

| Variable | Description |
|----------|-------------|
| `SHIPROCKET_EMAIL` | Shiprocket account email |
| `SHIPROCKET_PASSWORD` | Shiprocket account password |

---

## License

MIT — part of the `@mohasinac/*` monorepo.
