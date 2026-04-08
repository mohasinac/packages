# @mohasinac/seo

> **Layer 2** — Schema.org JSON-LD structured data helpers for Next.js App Router `generateMetadata` and inline script tags.

## Install

```bash
npm install @mohasinac/seo
```

---

## Usage

```tsx
// In a Next.js page component
import { productJsonLd, breadcrumbJsonLd } from "@mohasinac/seo";

export default function ProductPage({ product }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            productJsonLd({
              name: product.name,
              description: product.description,
              image: product.imageUrl,
              price: product.price,
              currency: "INR",
              availability: "InStock",
              url: `https://letitrip.in/products/${product.slug}`,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", url: "/" },
              { name: "Products", url: "/products" },
              { name: product.name, url: `/products/${product.slug}` },
            ]),
          ),
        }}
      />
    </>
  );
}
```

---

## Functions

| Function                  | Schema.org type               |
| ------------------------- | ----------------------------- |
| `productJsonLd()`         | `Product`                     |
| `reviewJsonLd()`          | `Review`                      |
| `aggregateRatingJsonLd()` | `AggregateRating`             |
| `breadcrumbJsonLd()`      | `BreadcrumbList`              |
| `faqJsonLd()`             | `FAQPage`                     |
| `blogPostJsonLd()`        | `BlogPosting`                 |
| `organizationJsonLd()`    | `Organization`                |
| `searchBoxJsonLd()`       | `WebSite` with `SearchAction` |
| `auctionJsonLd()`         | `SaleEvent`                   |

---

## Exports

`productJsonLd()`, `reviewJsonLd()`, `aggregateRatingJsonLd()`, `breadcrumbJsonLd()`, `faqJsonLd()`, `blogPostJsonLd()`, `organizationJsonLd()`, `searchBoxJsonLd()`, `auctionJsonLd()`

Types: `ProductJsonLdInput`, `ReviewJsonLdInput`, `FaqJsonLdInput`, `BreadcrumbItem`, `BlogPostJsonLdInput`

---

## License

MIT — part of the `@mohasinac/*` monorepo.
