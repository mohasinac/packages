# @mohasinac/feat-seller

> **Layer 5** — Seller portal feature module: seller dashboard, seller profile, product management view, and payout management.

## Install

```bash
npm install @mohasinac/feat-seller
```

Peer dependencies: React ≥ 18, Next.js ≥ 14, next-intl ≥ 3.

---

## Components

```tsx
import { SellerDashboard, SellerProfile, SellerProducts } from "@mohasinac/feat-seller";
```

---

## Access control

Seller portal pages are protected by Firebase session cookies verified server-side. Pages call `requireAuth` + `requireRole(user, "seller")` in the page's route handler.

---

## License

MIT — part of the `@mohasinac/*` monorepo.
