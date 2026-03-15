# @mohasinac/* — Pluggable Feature Library

> SOLID · DRY · Provider/Adapter pattern — swap DB, CSS, email freely.

A monorepo of **47 TypeScript packages** that form a pluggable, SOLID-compliant feature library for Next.js projects. Built from production code powering [letitrip.in](https://letitrip.in).

---

## Install any package

```bash
npm install @mohasinac/contracts
npm install @mohasinac/feat-auth
npm install @mohasinac/db-firebase
```

## Architecture

```
Layer 6 — CLI & Scaffolding         @mohasinac/cli  ·  @mohasinac/create-app
Layer 5 — Feature packages          @mohasinac/feat-*  (25 packages)
Layer 4 — Shell packages            feat-layout · feat-forms · feat-filters · feat-media
Layer 3 — Concrete providers        db-firebase · auth-firebase · email-resend · storage-firebase
Layer 2 — Primitives                core · http · ui · react · next · tokens · errors · utils …
Layer 1 — @mohasinac/contracts      ALL interfaces — IRepository, IAuthProvider, IEmailProvider …
```

Every feature package depends **only on `@mohasinac/contracts` interfaces** — never on a concrete provider. Swap Firebase for Prisma by replacing one provider, zero changes to features.

---

## Package Index

### Layer 1 — Contracts
| Package | Description |
|---------|-------------|
| `@mohasinac/contracts` | All TypeScript interfaces: IRepository, IAuthProvider, IEmailProvider, IStorageProvider, IPaymentProvider, IShippingProvider, ISearchProvider, ICacheProvider, IQueueProvider, IStyleAdapter, ProviderRegistry |

### Layer 2 — Primitives
| Package | Description |
|---------|-------------|
| `@mohasinac/core` | Logger, Queue, StorageManager, EventBus, CacheManager |
| `@mohasinac/http` | ApiClient, ApiClientError, apiClient singleton |
| `@mohasinac/next` | IAuthVerifier, createApiErrorHandler |
| `@mohasinac/react` | 10 UI hooks: useMediaQuery, useBreakpoint, useClickOutside, useKeyPress, useLongPress, useGesture, useSwipe, useCamera, usePullToRefresh, useCountdown |
| `@mohasinac/ui` | Semantic + Typography primitives with inlined design tokens |
| `@mohasinac/tokens` | CSS custom properties + TS constants for all design tokens |
| `@mohasinac/errors` | AppError subclasses, ERROR_CODES, handleApiError, isAppError |
| `@mohasinac/utils` | Date/number/string formatters, type converters, ID generators |
| `@mohasinac/validation` | 10 Zod schemas, zodErrorMap, setupZodErrorMap |
| `@mohasinac/seo` | JSON-LD helpers: productJsonLd, breadcrumbJsonLd, blogPostJsonLd … |
| `@mohasinac/monitoring` | Error tracking enums/guards, cache metrics |
| `@mohasinac/security` | generateNonce, buildCSP, rateLimit, RateLimitPresets, requireAuth/Role guards |

### Layer 3 — CSS Adapters
| Package | Description |
|---------|-------------|
| `@mohasinac/css-tailwind` | tailwindAdapter implementing IStyleAdapter |
| `@mohasinac/css-vanilla` | vanillaAdapter implementing IStyleAdapter |

### Layer 3 — Infrastructure Providers
| Package | Description |
|---------|-------------|
| `@mohasinac/db-firebase` | FirebaseRepository, FirebaseSieveRepository, FirebaseRealtimeRepository |
| `@mohasinac/auth-firebase` | firebaseAuthProvider, firebaseSessionProvider, createMiddlewareAuthChain |
| `@mohasinac/email-resend` | createResendProvider implementing IEmailProvider |
| `@mohasinac/storage-firebase` | firebaseStorageProvider implementing IStorageProvider |

### Layer 5 — Feature Packages
| Package | Description |
|---------|-------------|
| `@mohasinac/feat-layout` | Navbar, Footer, Sidebar, BottomNav, TitleBar, Breadcrumbs, LocaleSwitcher |
| `@mohasinac/feat-forms` | Form, FormGroup, Input, Textarea, Select, Checkbox, Radio, Toggle, Slider |
| `@mohasinac/feat-filters` | FilterFacetSection, RangeFilter, SwitchFilter, FilterPanel |
| `@mohasinac/feat-media` | MediaImage, MediaVideo, MediaAvatar, MediaLightbox |
| `@mohasinac/feat-search` | SearchBar, SearchResults, useSearch hook |
| `@mohasinac/feat-categories` | CategoryGrid, CategoryCard, CategoryBreadcrumb |
| `@mohasinac/feat-blog` | BlogList, BlogPost, BlogCard, BlogSidebar |
| `@mohasinac/feat-reviews` | ReviewList, ReviewCard, ReviewForm, StarRating |
| `@mohasinac/feat-faq` | FAQAccordion, FAQSearch, FAQCategory |
| `@mohasinac/feat-auth` | LoginForm, SignupForm, ForgotPasswordForm, AuthGuard |
| `@mohasinac/feat-account` | ProfilePage, AddressBook, PaymentMethods, OrderHistory |
| `@mohasinac/feat-homepage` | HeroSection, FeaturedProducts, Testimonials, NewsletterSignup |
| `@mohasinac/feat-products` | ProductCard, ProductGrid, ProductDetail, ProductVariants |
| `@mohasinac/feat-wishlist` | WishlistButton, WishlistPage, WishlistDrawer |
| `@mohasinac/feat-cart` | CartDrawer, CartItem, CartSummary, CartPage |
| `@mohasinac/feat-payments` | PaymentMethodSelector, PaymentForm, OrderSummary |
| `@mohasinac/feat-checkout` | CheckoutForm, AddressForm, ShippingOptions, OrderReview |
| `@mohasinac/feat-orders` | OrderList, OrderDetail, OrderTimeline, OrderTracking |
| `@mohasinac/feat-admin` | AdminDashboard, AdminTable, AdminForm, AdminStats |
| `@mohasinac/feat-events` | EventCard, EventList, EventDetail, TicketSelector |
| `@mohasinac/feat-auctions` | AuctionCard, BidForm, CountdownTimer, AuctionDetail |
| `@mohasinac/feat-promotions` | PromoBanner, CouponInput, SaleTag, FlashSaleTimer |
| `@mohasinac/feat-seller` | SellerDashboard, SellerProfile, SellerProducts |
| `@mohasinac/feat-stores` | StoreList, StoreCard, StoreDetail, NearbyStores |
| `@mohasinac/feat-pre-orders` | PreOrderButton, PreOrderList, PreOrderStatus |

### Layer 6 — CLI & Scaffolding
| Package | Description |
|---------|-------------|
| `@mohasinac/cli` | `mohasinac add/remove/list`, `withFeatures()`, `mergeFeatureMessages()` |
| `@mohasinac/create-app` | `npx @mohasinac/create-app` — interactive Next.js project scaffolder |
| `eslint-plugin-letitrip` | ESLint rules for @mohasinac/* architecture |

---

## Quick Start (new project)

```bash
npx @mohasinac/create-app my-store
cd my-store
npm install
npm run dev
```

## Add a feature to an existing Next.js app

```bash
npx @mohasinac/cli add feat-blog
# → installs package, generates page stubs, patches features.config.ts, adds i18n keys
```

---

## Publishing

### Automated (via GitHub Actions)

Tag a release — Actions builds + publishes all packages:

```bash
git tag v0.2.0
git push --tags
```

### Manual

```bash
# 1. Set npm token
echo "//registry.npmjs.org/:_authToken=npm_YOUR_TOKEN" >> ~/.npmrc

# 2. Build
node scripts/build-all.mjs

# 3. Publish
node scripts/publish-all.mjs

# Dry run first
node scripts/publish-all.mjs --dry-run

# Publish specific packages only
node scripts/publish-all.mjs --filter=contracts,core,errors
```

---

## Development (local monorepo)

All packages share `tsconfig.json` path aliases — no `npm link` required:

```bash
npm install           # hoists tsup + typescript to root node_modules
node scripts/build-all.mjs   # build all in dependency order
```

---

## GitHub Secrets required

| Secret | Description |
|--------|-------------|
| `NPM_TOKEN` | npm Automation token — generate at https://www.npmjs.com/settings/tokens |

---

## License

MIT
