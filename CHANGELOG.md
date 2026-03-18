# Changelog

All notable changes to the @mohasinac/* package library are documented here.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versions use [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
All 47 packages are versioned together.

---

## [0.2.0] — 2026-03-18

### Added — Feature extensibility layer (schemas, columns, layout slots)

**`@mohasinac/contracts`**
- `ColumnExtensionOpts<T>` — shared `{ overrides?, extras?, omit? }` descriptor for all column factories
- `LayoutSlots<T>` — render-prop overrides: `renderCard`, `renderRow`, `renderEmptyState`, `renderHeader`, `renderFooter`
- `FeatureExtension<TBase, TExtended>` — unified bundle of `schema + columns + slots + transform` for consumer-app customisation
- `TableColumn<T>` — new `hidden?: boolean` field

**New `schemas/` in every feat-* package** (Zod base objects, extensible via `.extend()`):
- `feat-products` — `productItemSchema`, `productListParamsSchema`
- `feat-blog` — `blogPostSchema`, `blogListParamsSchema`
- `feat-events` — `eventItemSchema`, `saleConfigSchema`, `offerConfigSchema`, `pollConfigSchema`, `eventListParamsSchema`
- `feat-stores` — `storeListItemSchema`, `storeListParamsSchema`
- `feat-categories` — `categoryItemSchema`, `categoryMetricsSchema`, `categoryListParamsSchema`
- `feat-orders` — `orderSchema`, `orderItemSchema`, `orderTimelineSchema`, `orderListParamsSchema`
- `feat-reviews` — `reviewSchema`, `reviewListParamsSchema`
- `feat-faq` — `faqSchema`, `faqListParamsSchema`
- `feat-seller` — `sellerStoreSchema`, `payoutRecordSchema`, `sellerListParamsSchema`, `payoutListParamsSchema`
- `feat-auctions` — `auctionItemSchema`, `bidRecordSchema`, `auctionListParamsSchema`
- `feat-auth` — `loginSchema`, `registerSchema`, `forgotPasswordSchema`, `resetPasswordSchema`, `authUserSchema`
- `feat-account` — `userProfileSchema`, `userAddressSchema`, `notificationPreferencesSchema`, `updateProfileSchema`
- `feat-promotions` — `couponItemSchema`, `promotionsListParamsSchema`
- `feat-wishlist` — `wishlistItemSchema`
- `feat-loyalty` — `loyaltyBalanceSchema`, `coinHistoryEntrySchema`, `loyaltyConfigSchema`
- `feat-before-after` — `beforeAfterItemSchema`
- `feat-consultation` — `consultationBookingSchema`, `bookConsultationSchema`
- `feat-collections` — `collectionItemSchema`, `collectionListItemSchema`
- `feat-payments` — `paymentRecordSchema`, `paymentGatewayConfigSchema`
- `feat-pre-orders` — `preOrderItemSchema`, `preOrderListParamsSchema`
- `feat-preorders` — `preorderItemSchema`
- `feat-search` — `searchProductItemSchema`, `searchQuerySchema`
- `feat-corporate` — `corporateInquirySchema`, `submitCorporateInquirySchema`
- `feat-cart` — `cartItemSchema`, `cartItemMetaSchema`, `cartSummarySchema`

**New `columns/` in every feat-* package** (`buildXxxColumns<T>(opts?: ColumnExtensionOpts<T>)` factories):
- All 24 feat-* packages above now export typed default column arrays and `buildXxxColumns<T>` factories
- `feat-auctions` exports two independent pairs: auction columns + bid columns
- `feat-seller` exports two independent pairs: seller columns + payout columns

**List-view components updated with `LayoutSlots<T>`**:
- `feat-products/ProductGrid` — generic `<T>`, `slots?: LayoutSlots<T>`, `total/currentPage/totalPages` props
- `feat-blog/BlogListView` — generic `<T extends BlogPost>`, `slots?: LayoutSlots<T>`
- `feat-events/EventsListView` — **new component**, generic `<T extends EventItem>`, `slots?: LayoutSlots<T>`
- `feat-stores/StoresListView` — generic `<T extends StoreListItem>`, `slots?: LayoutSlots<T>`

### Changed
- All 24 feat-* packages with new schemas gained `"zod": ">=3.0.0"` peerDependency

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
