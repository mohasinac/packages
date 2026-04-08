# @mohasinac/db-firebase

> **Layer 3** — Firebase Firestore + Realtime Database implementation of the `@mohasinac/contracts` repository interfaces. Includes Sieve filter parsing and real-time subscription support.

## Install

```bash
npm install @mohasinac/db-firebase firebase-admin
```

---

## Quick start

```ts
import { registerProviders } from "@mohasinac/contracts";
import { firebaseDbProvider } from "@mohasinac/db-firebase";

registerProviders({ db: firebaseDbProvider });
```

Then anywhere on the server:

```ts
import { getProviders } from "@mohasinac/contracts";

const { db } = getProviders();
const repo = db!.getRepository<Product>("products");

const result = await repo.findAll({
  filters: "status==published,category==electronics",
  sort: "-createdAt",
  page: 1,
  perPage: 20,
});
```

---

## Repository classes

### `FirebaseRepository<T>`

Full CRUD — implements `IRepository<T>`.

```ts
import { FirebaseRepository } from "@mohasinac/db-firebase";

class ProductRepository extends FirebaseRepository<Product> {
  constructor() {
    super("products");
  }
}
```

Methods: `findAll(query)`, `findById(id)`, `create(data)`, `update(id, data)`, `delete(id)`, `count(filters)`

### `FirebaseSieveRepository<T>`

Extends `FirebaseRepository` with Sieve filter string parsing — translates `"field==value,field2>value2"` into Firestore `where()` chains.

### `FirebaseRealtimeRepository<T>`

Wraps Firebase Realtime Database. Adds `subscribe(path, cb)` and `subscribeWhere(path, field, op, val, cb)` for real-time listeners.

---

## Admin SDK helpers

```ts
import {
  getAdminApp,
  getAdminAuth,
  getAdminDb,
  getAdminStorage,
  getAdminRealtimeDb,
} from "@mohasinac/db-firebase";
```

Singletons initialized lazily from `FIREBASE_ADMIN_KEY` or `GOOGLE_APPLICATION_CREDENTIALS`.

---

## Firestore utilities

```ts
import {
  removeUndefined,
  prepareForFirestore,
  deserializeTimestamps,
} from "@mohasinac/db-firebase";
```

---

## Exports

`FirebaseRepository<T>`, `FirebaseSieveRepository<T>`, `FirebaseRealtimeRepository<T>`, `firebaseDbProvider`

Helpers: `getAdminApp()`, `getAdminAuth()`, `getAdminDb()`, `getAdminStorage()`, `getAdminRealtimeDb()`, `_resetAdminSingletons()`, `removeUndefined()`, `prepareForFirestore()`, `deserializeTimestamps()`

Types: `SieveModel`, `SieveFields`, `SieveFieldConfig`, `SieveOptions`, `SieveResult`

---

## Required environment variables

| Variable             | Description                                            |
| -------------------- | ------------------------------------------------------ |
| `FIREBASE_ADMIN_KEY` | Base64-encoded Firebase Admin SDK service account JSON |

---

## License

MIT — part of the `@mohasinac/*` monorepo.
