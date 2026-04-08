# @mohasinac/contracts

> **Layer 1** — The single source of truth for all TypeScript interfaces across the `@mohasinac/*` monorepo. Zero runtime dependencies — pure types only.

## Install

```bash
npm install @mohasinac/contracts
```

## Overview

`@mohasinac/contracts` defines all provider interfaces, repository patterns, and shared domain types used by every other package in the monorepo. Feature packages (`feat-*`) and concrete providers both depend on this package — never on each other.

---

## Provider Registry

The DI container that wires concrete implementations to abstract interfaces at app startup.

```ts
import { registerProviders, getProviders } from "@mohasinac/contracts";

// Call ONCE at startup (e.g. Next.js instrumentation.ts)
registerProviders({
  db:      firebaseDbProvider,
  auth:    new FirebaseAuthProvider(),
  session: new FirebaseAuthProvider(),
  email:   new ResendEmailProvider(process.env.RESEND_API_KEY!),
  storage: firebaseStorageProvider,
  style:   tailwindAdapter,
  // optional:
  payment: new RazorpayProvider({ ... }),
  shipping: shiprocketProvider,
  search:  algoliaSearchProvider,
  cache:   redisCache,
  queue:   jobQueue,
  eventBus: myEventBus,
});

// Use anywhere (server-side only)
const { db, auth, email } = getProviders();
```

**Exports:** `registerProviders()`, `getProviders()`, `_resetProviders()`, `ProviderRegistry` (type)

---

## Repository Interfaces

Sieve-based repository pattern for all data access.

```ts
import type { IRepository, SieveQuery, PagedResult } from "@mohasinac/contracts";

// Sieve query descriptor
const query: SieveQuery = {
  filters: "status==published,category==electronics",
  sort: "-createdAt",
  page: 1,
  perPage: 20,
};

// IRepository<T> — full CRUD
const repo: IRepository<Product> = db.getRepository("products");
const result: PagedResult<Product> = await repo.findAll(query);
const item = await repo.findById("abc");
await repo.create({ ... });
await repo.update("abc", { price: 100 });
await repo.delete("abc");
```

**Sieve filter operators:** `==` `!=` `<` `<=` `>` `>=` `array-contains` `in` `not-in` `array-contains-any` `@=*` (case-insensitive contains)

**Exports:** `IReadRepository<T>`, `IWriteRepository<T>`, `IRepository<T>`, `IRealtimeRepository<T>`, `IDbProvider`, `SieveQuery`, `PagedResult<T>`, `WhereOp`

---

## Auth Interfaces

```ts
import type {
  IAuthProvider,
  ISessionProvider,
  AuthUser,
  AuthPayload,
} from "@mohasinac/contracts";
```

**Exports:** `IAuthProvider`, `ISessionProvider`, `AuthUser`, `AuthPayload`, `CreateUserInput`

---

## Email Interface

```ts
import type { IEmailProvider, EmailOptions } from "@mohasinac/contracts";
```

**Exports:** `IEmailProvider`, `EmailOptions`, `EmailResult`, `EmailAttachment`

---

## Storage Interface

```ts
import type {
  IStorageProvider,
  UploadOptions,
  StorageFile,
} from "@mohasinac/contracts";
```

**Exports:** `IStorageProvider`, `UploadOptions`, `StorageFile`

---

## Payment Interface

```ts
import type {
  IPaymentProvider,
  PaymentOrder,
  PaymentCapture,
  Refund,
} from "@mohasinac/contracts";
```

**Exports:** `IPaymentProvider`, `PaymentOrder`, `PaymentCapture`, `Refund`

---

## Shipping Interface

```ts
import type {
  IShippingProvider,
  CreateShipmentInput,
  TrackingInfo,
} from "@mohasinac/contracts";
```

**Exports:** `IShippingProvider`, `ShippingAddress`, `CreateShipmentInput`, `Shipment`, `TrackingEvent`, `TrackingInfo`, `ServiceabilityResult`

---

## Search Interface

```ts
import type {
  ISearchProvider,
  SearchOptions,
  SearchResult,
} from "@mohasinac/contracts";
```

**Exports:** `ISearchProvider<T>`, `SearchOptions`, `SearchHit<T>`, `SearchResult<T>`, `SuggestOptions`

---

## Infrastructure Interfaces

```ts
import type {
  ICacheProvider,
  IQueueProvider,
  IEventBus,
} from "@mohasinac/contracts";
```

**Exports:** `ICacheProvider`, `IQueueProvider`, `QueueJob<T>`, `IEventBus`, `EventHandler<T>`

---

## Style Adapter Interface

```ts
import type { IStyleAdapter } from "@mohasinac/contracts";
```

Implemented by `@mohasinac/css-tailwind` and `@mohasinac/css-vanilla`.

---

## Feature Manifest

Used by `@mohasinac/cli` to auto-wire routes and i18n.

```ts
import type { FeatureManifest, FeaturesConfig } from "@mohasinac/contracts";
```

**Exports:** `FeatureManifest`, `RouteStub`, `ApiRouteStub`, `FeaturesConfig`

---

## Table Config

Shared configuration types for `DataTable` in `@mohasinac/ui`.

**Exports:** `TableConfig`, `PaginationConfig`, `StickyConfig`, `TableViewMode`, `DEFAULT_TABLE_CONFIG`, `mergeTableConfig()`

---

## Extension Utilities

Generic extension types for customizing feat-\* packages.

**Exports:** `WithTransformOpts<Base, Target>`, `GenericListResponse<T>`, `TableColumn<T>`, `ColumnExtensionOpts<T>`, `LayoutSlots<T>`, `FeatureExtension<TBase, TExtended>`

---

## License

MIT — part of the `@mohasinac/*` monorepo.
