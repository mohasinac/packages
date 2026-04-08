# @mohasinac/feat-blog

> **Layer 5** — Blog feature module: post listing, post detail, Sieve repository, and API route handlers.

## Install

```bash
npm install @mohasinac/feat-blog
```

Peer dependencies: React ≥ 18, Next.js ≥ 14, next-intl ≥ 3.

---

## Add to your project

```ts
// features.config.ts
export default { blog: true, ... } satisfies FeaturesConfig;
```

```ts
// app/api/blog/route.ts
import { withProviders } from "@/providers.config";
import { blogGET as _GET } from "@mohasinac/feat-blog";
export const GET = withProviders(_GET);

// app/api/blog/[slug]/route.ts
import { withProviders } from "@/providers.config";
import { blogSlugGET as _GET } from "@mohasinac/feat-blog";
export const GET = withProviders(_GET);
```

---

## Hook

```ts
import { useBlog } from "@mohasinac/feat-blog";

const { posts, total, isLoading } = useBlog({ page: 1, perPage: 10 });
```

---

## Repository

```ts
import { BlogRepository } from "@mohasinac/feat-blog";

const repo = new BlogRepository(db!.getRepository("blog"));
const post = await repo.findBySlug("my-post-slug");
```

---

## Exports

Types · `BlogPostDetailResponse` · `useBlog` · components · schemas · columns · `BlogRepository` · `manifest` · route handlers: `blogGET`, `GET`, `blogSlugGET`, `GET_BLOG_SLUG`

---

## License

MIT — part of the `@mohasinac/*` monorepo.
