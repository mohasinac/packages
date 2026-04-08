# @mohasinac/utils

> **Layer 2** — Shared utility functions: date/number/string formatters, ID generators, DOM event helpers, and the `buildSieveFilters` query builder.

## Install

```bash
npm install @mohasinac/utils
```

---

## Date utilities

```ts
import {
  formatDate,
  formatRelativeTime,
  formatDateRange,
  isToday,
  isPast,
  nowISO,
} from "@mohasinac/utils";

formatDate(new Date()); // "12 Jun 2025"
formatRelativeTime(pastDate); // "3 hours ago"
formatDateRange(start, end); // "12 Jun – 15 Jun 2025"
isToday(someDate); // true / false
nowISO(); // current ISO string
```

Full list: `resolveDate`, `formatDate`, `formatDateTime`, `formatTime`, `formatRelativeTime`, `formatMonthYear`, `formatDateRange`, `formatCustomDate`, `isToday`, `isPast`, `isFuture`, `nowMs`, `isSameMonth`, `currentYear`, `nowISO`

---

## Number utilities

```ts
import {
  formatCurrency,
  formatNumber,
  formatPercentage,
  formatFileSize,
  formatCompactNumber,
} from "@mohasinac/utils";

formatCurrency(1299, "INR"); // "₹1,299.00"
formatCompactNumber(1_500_000); // "1.5M"
formatFileSize(2048); // "2 KB"
formatPercentage(0.756); // "75.6%"
```

Full list: `formatCurrency`, `formatNumber`, `formatPercentage`, `formatFileSize`, `formatCompactNumber`, `formatDecimal`, `formatOrdinal`, `parseFormattedNumber`

---

## String utilities

```ts
import { slugify, truncate, stripHtml, capitalize } from "@mohasinac/utils";

slugify("Hello World!"); // "hello-world"
truncate("Long text", 10); // "Long text…"
stripHtml("<p>text</p>"); // "text"
```

Full list: `capitalize`, `capitalizeWords`, `truncate`, `truncateWords`, `stripHtml`, `escapeHtml`, `slugify`, `maskString`, `randomString`, `isEmptyString`, `proseMirrorToHtml`

---

## Sieve filter builder

```ts
import { buildSieveFilters } from "@mohasinac/utils";

const filters = buildSieveFilters([
  { field: "status", op: "==", value: "published" },
  { field: "price", op: ">=", value: 100 },
  { field: "title", op: "@=*", value: searchQuery },
]);
// → "status==published,price>=100,title@=*searchQuery"
```

Always use `buildSieveFilters` instead of manual string concatenation.

---

## Domain ID generators

```ts
import {
  generateProductId,
  generateOrderId,
  generateUserId,
} from "@mohasinac/utils";

const id = generateProductId(); // "prod_xxxxxxxx"
```

Full list: `generateCategoryId`, `generateUserId`, `generateProductId`, `generateAuctionId`, `generatePreOrderId`, `generateReviewId`, `generateOrderId`, `generateFAQId`, `generateCouponId`, `generateCarouselId`, `generateHomepageSectionId`, `generateBidId`, `generateBlogPostId`, `generatePayoutId`

---

## DOM / event helpers

```ts
import {
  throttle,
  debounce,
  isMobileDevice,
  smoothScrollTo,
  getViewportDimensions,
} from "@mohasinac/utils";
import { GlobalEventManager, globalEventManager } from "@mohasinac/utils";
```

Full list: `GlobalEventManager`, `globalEventManager`, `throttle`, `debounce`, `addGlobalScrollHandler`, `addGlobalResizeHandler`, `addGlobalClickHandler`, `addGlobalKeyHandler`, `removeGlobalHandler`, `isMobileDevice`, `hasTouchSupport`, `getViewportDimensions`, `isInViewport`, `smoothScrollTo`, `preventBodyScroll`

---

## License

MIT — part of the `@mohasinac/*` monorepo.
