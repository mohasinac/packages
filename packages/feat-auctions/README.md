# @mohasinac/feat-auctions

> **Layer 5** — Auctions feature module: real-time bidding, countdown timers, auction listings, and bid management.

## Install

```bash
npm install @mohasinac/feat-auctions
```

Peer dependencies: React ≥ 18, Next.js ≥ 14, next-intl ≥ 3.

---

## Components

```tsx
import { AuctionCard, BidForm, CountdownTimer, AuctionDetail } from "@mohasinac/feat-auctions";

<AuctionCard auction={auction} />
<AuctionDetail auctionId={auctionId} />
<BidForm auctionId={auctionId} currentBid={auction.currentBid} onBid={handleBid} />
<CountdownTimer endDate={auction.endDate} />
```

---

## Real-time bids

Bid updates come via Firebase Realtime Database using `FirebaseRealtimeRepository` from `@mohasinac/db-firebase`. The hook subscribes to the auction's bid stream.

---

## Stores API route

```ts
// app/api/stores/[storeSlug]/auctions/route.ts
import { withProviders } from "@/providers.config";
import { GET as _GET } from "@mohasinac/feat-auctions";
export const GET = withProviders(_GET);
```

---

## License

MIT — part of the `@mohasinac/*` monorepo.
