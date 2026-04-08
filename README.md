# @mohasinac/\* — Pluggable Feature Library

> SOLID · DRY · Provider/Adapter pattern — swap DB, CSS, email freely.

A monorepo of **58 TypeScript packages** that form a pluggable, SOLID-compliant feature library for Next.js projects. Built from production code powering [letitrip.in](https://letitrip.in).

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

| Package                | Description                                                                                                                                                                                                    |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@mohasinac/contracts` | All TypeScript interfaces: IRepository, IAuthProvider, IEmailProvider, IStorageProvider, IPaymentProvider, IShippingProvider, ISearchProvider, ICacheProvider, IQueueProvider, IStyleAdapter, ProviderRegistry |

### Layer 2 — Primitives

| Package                 | Description                                                                                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `@mohasinac/core`       | Logger, Queue, StorageManager, EventBus, CacheManager                                                                                                  |
| `@mohasinac/http`       | ApiClient, ApiClientError, apiClient singleton                                                                                                         |
| `@mohasinac/next`       | IAuthVerifier, createApiErrorHandler                                                                                                                   |
| `@mohasinac/react`      | 10 UI hooks: useMediaQuery, useBreakpoint, useClickOutside, useKeyPress, useLongPress, useGesture, useSwipe, useCamera, usePullToRefresh, useCountdown |
| `@mohasinac/ui`         | Semantic + Typography primitives with inlined design tokens                                                                                            |
| `@mohasinac/tokens`     | CSS custom properties + TS constants for all design tokens                                                                                             |
| `@mohasinac/errors`     | AppError subclasses, ERROR_CODES, handleApiError, isAppError                                                                                           |
| `@mohasinac/utils`      | Date/number/string formatters, type converters, ID generators                                                                                          |
| `@mohasinac/validation` | 10 Zod schemas, zodErrorMap, setupZodErrorMap                                                                                                          |
| `@mohasinac/seo`        | JSON-LD helpers: productJsonLd, breadcrumbJsonLd, blogPostJsonLd …                                                                                     |
| `@mohasinac/monitoring` | Error tracking enums/guards, cache metrics                                                                                                             |
| `@mohasinac/security`   | generateNonce, buildCSP, rateLimit, RateLimitPresets, requireAuth/Role guards                                                                          |

### Layer 3 — CSS Adapters

| Package                   | Description                                |
| ------------------------- | ------------------------------------------ |
| `@mohasinac/css-tailwind` | tailwindAdapter implementing IStyleAdapter |
| `@mohasinac/css-vanilla`  | vanillaAdapter implementing IStyleAdapter  |

### Layer 3 — Infrastructure Providers

| Package                       | Description                                                              |
| ----------------------------- | ------------------------------------------------------------------------ |
| `@mohasinac/db-firebase`      | FirebaseRepository, FirebaseSieveRepository, FirebaseRealtimeRepository  |
| `@mohasinac/auth-firebase`    | firebaseAuthProvider, firebaseSessionProvider, createMiddlewareAuthChain |
| `@mohasinac/email-resend`     | createResendProvider implementing IEmailProvider                         |
| `@mohasinac/storage-firebase` | firebaseStorageProvider implementing IStorageProvider                    |

### Layer 5 — Feature Packages

| Package                        | Description                                                               |
| ------------------------------ | ------------------------------------------------------------------------- |
| `@mohasinac/feat-layout`       | Navbar, Footer, Sidebar, BottomNav, TitleBar, Breadcrumbs, LocaleSwitcher |
| `@mohasinac/feat-forms`        | Form, FormGroup, Input, Textarea, Select, Checkbox, Radio, Toggle, Slider |
| `@mohasinac/feat-filters`      | FilterFacetSection, RangeFilter, SwitchFilter, FilterPanel                |
| `@mohasinac/feat-media`        | MediaImage, MediaVideo, MediaAvatar, MediaLightbox                        |
| `@mohasinac/feat-search`       | SearchBar, SearchResults, useSearch hook                                  |
| `@mohasinac/feat-categories`   | CategoryGrid, CategoryCard, CategoryBreadcrumb                            |
| `@mohasinac/feat-blog`         | BlogList, BlogPost, BlogCard, BlogSidebar                                 |
| `@mohasinac/feat-reviews`      | ReviewList, ReviewCard, ReviewForm, StarRating                            |
| `@mohasinac/feat-faq`          | FAQAccordion, FAQSearch, FAQCategory                                      |
| `@mohasinac/feat-auth`         | LoginForm, SignupForm, ForgotPasswordForm, AuthGuard                      |
| `@mohasinac/feat-account`      | ProfilePage, AddressBook, PaymentMethods, OrderHistory                    |
| `@mohasinac/feat-homepage`     | HeroSection, FeaturedProducts, Testimonials, NewsletterSignup             |
| `@mohasinac/feat-products`     | ProductCard, ProductGrid, ProductDetail, ProductVariants                  |
| `@mohasinac/feat-wishlist`     | WishlistButton, WishlistPage, WishlistDrawer                              |
| `@mohasinac/feat-cart`         | CartDrawer, CartItem, CartSummary, CartPage                               |
| `@mohasinac/feat-payments`     | PaymentMethodSelector, PaymentForm, OrderSummary                          |
| `@mohasinac/feat-checkout`     | CheckoutForm, AddressForm, ShippingOptions, OrderReview                   |
| `@mohasinac/feat-orders`       | OrderList, OrderDetail, OrderTimeline, OrderTracking                      |
| `@mohasinac/feat-admin`        | AdminDashboard, AdminTable, AdminForm, AdminStats                         |
| `@mohasinac/feat-events`       | EventCard, EventList, EventDetail, TicketSelector                         |
| `@mohasinac/feat-auctions`     | AuctionCard, BidForm, CountdownTimer, AuctionDetail                       |
| `@mohasinac/feat-promotions`   | PromoBanner, CouponInput, SaleTag, FlashSaleTimer                         |
| `@mohasinac/feat-seller`       | SellerDashboard, SellerProfile, SellerProducts                            |
| `@mohasinac/feat-stores`       | StoreList, StoreCard, StoreDetail, NearbyStores                           |
| `@mohasinac/feat-pre-orders`   | PreOrderButton, PreOrderList, PreOrderStatus                              |
| `@mohasinac/feat-preorders`    | Seller-side pre-order campaign management                                 |
| `@mohasinac/feat-collections`  | Curated product collection display                                        |
| `@mohasinac/feat-loyalty`      | RC virtual currency — balance, redemption, history                        |
| `@mohasinac/feat-consultation` | Consultation booking and session management                               |
| `@mohasinac/feat-corporate`    | B2B bulk orders and corporate account flows                               |
| `@mohasinac/feat-before-after` | Before/after image comparison slider                                      |
| `@mohasinac/feat-whatsapp-bot` | WhatsApp Business API webhook + notification flows                        |

### Layer 6 — CLI & Scaffolding

| Package                  | Description                                                             |
| ------------------------ | ----------------------------------------------------------------------- |
| `@mohasinac/cli`         | `mohasinac add/remove/list`, `withFeatures()`, `mergeFeatureMessages()` |
| `@mohasinac/create-app`  | `npx @mohasinac/create-app` — interactive Next.js project scaffolder    |
| `eslint-plugin-letitrip` | 20+ ESLint rules for @mohasinac/\* architecture                         |

### Infrastructure Providers (Layer 3)

| Package                          | Description                                                |
| -------------------------------- | ---------------------------------------------------------- |
| `@mohasinac/payment-razorpay`    | `RazorpayProvider` implementing `IPaymentProvider`         |
| `@mohasinac/search-algolia`      | Algolia search — indexing helpers + browser client         |
| `@mohasinac/shipping-shiprocket` | Shiprocket shipping — order, AWB, tracking, serviceability |

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

## GitHub Actions

Four workflows live in `.github/workflows/`:

| Workflow             | Trigger                       | What it does                                                             |
| -------------------- | ----------------------------- | ------------------------------------------------------------------------ |
| `ci.yml`             | push to `main`, pull requests | Typecheck + build all 47 packages                                        |
| `publish.yml`        | tag push `v*.*.*`             | Build + publish all packages + create GitHub Release                     |
| `manual-publish.yml` | workflow_dispatch             | Publish with optional `filter` + `dry_run` inputs                        |
| `version-bump.yml`   | workflow_dispatch             | Bump version in all `package.json` files, commit, tag (triggers publish) |

### One-time setup

**1. Add `NPM_TOKEN` secret**  
Generate an npm **Automation** token (bypasses 2FA) at:  
`https://www.npmjs.com/settings/<username>/tokens`

Add it at:  
`https://github.com/mohasinac/packages/settings/secrets/actions` → New repository secret → Name: `NPM_TOKEN`

**2. (Optional) Add `PAT_TOKEN` secret**  
The `version-bump.yml` workflow pushes a commit + tag. If you want that tag-push to  
**trigger `publish.yml`**, a Personal Access Token with `repo` scope is needed (pushes  
from `GITHUB_TOKEN` do not re-trigger workflows). Create one at:  
`https://github.com/settings/tokens` then add as `PAT_TOKEN` secret.  
If omitted, manually re-run `publish.yml` after the version bump commit.

### Release workflow (recommended)

```bash
# Option A — via GitHub UI (no local setup needed)
# 1. Actions → Version Bump → Run workflow → pick bump_type (patch/minor/major)
# 2. Version Bump commits + tags → publish.yml auto-triggers → all 47 packages published

# Option B — via git tag (local)
node scripts/bump-version.mjs 0.2.0   # updates all package.json files
git add packages/*/package.json
git commit -m "chore: bump to v0.2.0"
git tag v0.2.0
git push origin main --follow-tags     # publish.yml triggers on tag push
```

---

## Publishing (manual / local)

```bash
# 1. Set npm token
echo "//registry.npmjs.org/:_authToken=npm_YOUR_TOKEN" >> ~/.npmrc

# 2. Build
node scripts/build-all.mjs

# 3. Publish (skips already-published versions automatically)
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
npm ci                         # hoists tsup + typescript to root node_modules
node scripts/build-all.mjs     # build all in dependency order
```

---

## Required GitHub Secrets

| Secret      | Required | Description                                                                            |
| ----------- | -------- | -------------------------------------------------------------------------------------- |
| `NPM_TOKEN` | **Yes**  | npm Automation token — generate at npmjs.com/settings/tokens                           |
| `PAT_TOKEN` | Optional | GitHub PAT with `repo` scope — allows `version-bump.yml` push to trigger `publish.yml` |

---

## License

MIT
