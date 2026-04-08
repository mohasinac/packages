# @mohasinac/feat-homepage

> **Layer 5** — Homepage feature module: hero section, featured products, carousel, homepage sections API.

## Install

```bash
npm install @mohasinac/feat-homepage
```

Peer dependencies: React ≥ 18, Next.js ≥ 14, next-intl ≥ 3.

---

## Components

```tsx
import { HeroSection, FeaturedProducts, Testimonials, NewsletterSignup } from "@mohasinac/feat-homepage";

<HeroSection slides={carouselSlides} />
<FeaturedProducts products={featuredProducts} />
<Testimonials testimonials={testimonials} />
<NewsletterSignup onSubmit={handleSubscribe} />
```

---

## API routes

```ts
// app/api/homepage-sections/route.ts
import { withProviders } from "@/providers.config";
import { GET as _GET } from "@mohasinac/feat-homepage";
export const GET = withProviders(_GET);

// app/api/carousel/route.ts
import { withProviders } from "@/providers.config";
import { carouselGET as _GET } from "@mohasinac/feat-homepage";
export const GET = withProviders(_GET);
```

---

## License

MIT — part of the `@mohasinac/*` monorepo.
