# @mohasinac/monitoring

> **Layer 2** — Error tracking integration point and cache performance metrics.

## Install

```bash
npm install @mohasinac/monitoring
```

---

## Error tracking

`@mohasinac/monitoring` provides a pluggable error tracker slot. Plug in Sentry, Datadog, or any custom sink at startup:

```ts
import { setErrorTracker } from "@mohasinac/monitoring";
import * as Sentry from "@sentry/nextjs";

setErrorTracker((err, context) => {
  Sentry.captureException(err, { extra: context });
});
```

### Tracking helpers

```ts
import {
  trackError,
  trackApiError,
  trackAuthError,
  trackValidationError,
  trackDatabaseError,
  trackPermissionError,
} from "@mohasinac/monitoring";

// In an API route
try {
  // ...
} catch (err) {
  trackApiError(err, { route: "/api/products", userId });
}
```

Each helper enriches the error with a structured `ErrorContext` before sending to the registered tracker.

---

## Cache metrics

```ts
import {
  recordCacheHit,
  recordCacheMiss,
  getCacheMetrics,
  getCacheHitRate,
  isCacheHitRateLow,
  getCacheStatistics,
  resetCacheMetrics,
} from "@mohasinac/monitoring";

// Instrument cache calls
const cached = await redis.get(key);
if (cached) {
  recordCacheHit(key);
} else {
  recordCacheMiss(key);
}

// Report
const rate = getCacheHitRate(); // 0.0–1.0
console.log(getCacheStatistics());
```

---

## Exports

`ErrorSeverity`, `ErrorCategory`  
`setErrorTracker()`, `trackError()`, `trackApiError()`, `trackAuthError()`, `trackValidationError()`, `trackDatabaseError()`, `trackPermissionError()`  
`getCacheMetrics()`, `recordCacheHit()`, `recordCacheMiss()`, `resetCacheMetrics()`, `getCacheHitRate()`, `isCacheHitRateLow()`, `getCacheStatistics()`

Types: `ErrorContext`, `TrackedError`, `ErrorTrackerFn`

---

## License

MIT — part of the `@mohasinac/*` monorepo.
