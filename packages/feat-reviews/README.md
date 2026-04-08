# @mohasinac/feat-reviews

> **Layer 5** — Reviews feature module: review list, review cards, star rating display, review submission form, and the reviews API route handler.

## Install

```bash
npm install @mohasinac/feat-reviews
```

Peer dependencies: React ≥ 18, Next.js ≥ 14, next-intl ≥ 3.

---

## Add to your project

```ts
// app/api/reviews/route.ts
import { withProviders } from "@/providers.config";
import { GET as _GET } from "@mohasinac/feat-reviews";
export const GET = withProviders(_GET);
```

---

## Components

```tsx
import { ReviewList, ReviewCard, ReviewForm, StarRating } from "@mohasinac/feat-reviews";

<ReviewList productId={product.id} />
<StarRating value={4.5} readonly />
<ReviewForm productId={product.id} onSubmit={handleSubmitReview} />
```

---

## License

MIT — part of the `@mohasinac/*` monorepo.
