# @mohasinac/core

> **Layer 2** — Pure utility classes. No framework dependencies, no concrete providers.

## Install

```bash
npm install @mohasinac/core
```

---

## Logger

Structured logger with configurable levels. Console output in development; silent in test environments.

```ts
import { logger, Logger } from "@mohasinac/core";

logger.info("Server started", { port: 3000 });
logger.warn("Cache miss", { key: "products:list" });
logger.error("DB write failed", { error });

// Custom instance
const myLogger = new Logger({ level: "debug", prefix: "[MyService]" });
```

**Exports:** `Logger`, `logger` (singleton), `LogLevel`, `LogEntry`, `LoggerOptions`

---

## EventBus

In-memory pub/sub. Use for decoupled communication between modules.

```ts
import { eventBus } from "@mohasinac/core";

eventBus.on("order:created", (payload) => { ... });
eventBus.emit("order:created", { orderId: "123" });
eventBus.off("order:created", handler);
```

**Exports:** `EventBus`, `eventBus` (singleton), `EventSubscription`

---

## Queue

In-memory FIFO task queue with concurrency control and retry support.

```ts
import { Queue } from "@mohasinac/core";

const queue = new Queue({ concurrency: 3, retries: 2 });
queue.enqueue(async () => sendEmail(...));
```

**Exports:** `Queue`, `QueueOptions`, `Task`

---

## CacheManager

In-memory TTL cache. Use as a fallback when no `ICacheProvider` is registered.

```ts
import { cacheManager } from "@mohasinac/core";

await cacheManager.set("key", value, { ttl: 60_000 });
const val = await cacheManager.get("key");
await cacheManager.delete("key");
```

**Exports:** `CacheManager`, `cacheManager` (singleton), `CacheOptions`, `CacheEntry`

---

## StorageManager

`localStorage` / `sessionStorage` wrapper with JSON serialization, TTL, and SSR safety.

```ts
import { storageManager } from "@mohasinac/core";

storageManager.set("user_pref", { theme: "dark" }, { ttl: 86400_000 });
const pref = storageManager.get<{ theme: string }>("user_pref");
storageManager.remove("user_pref");
```

**Exports:** `StorageManager`, `storageManager` (singleton), `StorageType`, `StorageOptions`

---

## License

MIT — part of the `@mohasinac/*` monorepo.
