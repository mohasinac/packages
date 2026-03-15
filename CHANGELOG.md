# Changelog

All notable changes to the @mohasinac/* package library are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versions use [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
All 47 packages are versioned together.

---

## [0.1.0] — 2026-03-15

### Added — Initial release (47 packages)

**Layer 1 — Contracts**
- `@mohasinac/contracts` — IRepository, IAuthProvider, IEmailProvider, IStorageProvider, IPaymentProvider, IShippingProvider, ISearchProvider, ICacheProvider, IQueueProvider, IStyleAdapter, ProviderRegistry

**Layer 2 — Primitives**
- `@mohasinac/core` — Logger, Queue, StorageManager, EventBus, CacheManager
- `@mohasinac/http` — ApiClient, ApiClientError, apiClient singleton
- `@mohasinac/next` — IAuthVerifier, createApiErrorHandler
- `@mohasinac/react` — useMediaQuery, useBreakpoint, useClickOutside, useKeyPress, useLongPress, useGesture, useSwipe, useCamera, usePullToRefresh, useCountdown
- `@mohasinac/ui` — Semantic + Typography primitives with inlined design tokens
- `@mohasinac/tokens` — CSS custom properties + TS constants
- `@mohasinac/errors` — AppError subclasses, ERROR_CODES, handleApiError
- `@mohasinac/utils` — formatters, converters, ID generators
- `@mohasinac/validation` — Zod schemas, zodErrorMap
- `@mohasinac/seo` — JSON-LD helpers
- `@mohasinac/monitoring` — error tracking, cache metrics
- `@mohasinac/security` — CSP, rate limiting, auth guards

**Layer 3 — Adapters**
- `@mohasinac/css-tailwind` — tailwindAdapter
- `@mohasinac/css-vanilla` — vanillaAdapter

**Layer 3 — Providers**
- `@mohasinac/db-firebase` — FirebaseRepository, FirebaseSieveRepository, FirebaseRealtimeRepository
- `@mohasinac/auth-firebase` — firebaseAuthProvider, firebaseSessionProvider
- `@mohasinac/email-resend` — createResendProvider
- `@mohasinac/storage-firebase` — firebaseStorageProvider

**Layer 5 — Features (25 packages)**
- `@mohasinac/feat-layout` `feat-forms` `feat-filters` `feat-media`
- `@mohasinac/feat-search` `feat-categories` `feat-blog` `feat-reviews` `feat-faq`
- `@mohasinac/feat-auth` `feat-account` `feat-homepage` `feat-products`
- `@mohasinac/feat-wishlist` `feat-cart` `feat-payments` `feat-checkout` `feat-orders`
- `@mohasinac/feat-admin` `feat-events` `feat-auctions` `feat-promotions`
- `@mohasinac/feat-seller` `feat-stores` `feat-pre-orders`

**Layer 6 — CLI**
- `@mohasinac/cli` — `mohasinac add/remove/list`, `withFeatures()`, `mergeFeatureMessages()`
- `@mohasinac/create-app` — interactive Next.js project scaffolder
- `eslint-plugin-letitrip` — ESLint architecture rules
