# @mohasinac/instrumentation

> **Layer 2** — Minimal Next.js instrumentation hook factory. Ensures `registerProviders()` completes before the first request is served — eliminating cold-start race conditions.

## Install

```bash
npm install @mohasinac/instrumentation
```

---

## The cold-start problem

Next.js `instrumentation.ts` calls `register()` asynchronously. On Vercel cold starts, the first incoming request can arrive ~0.5s before `register()` completes. If any route calls `getProviders()` before `registerProviders()` runs, it throws:

```
Error: [contracts] Call registerProviders() before getProviders()
```

`@mohasinac/instrumentation` exposes `createInstrumentation()` which creates a **guarded** registration that any route can `await` before calling `getProviders()`.

---

## Usage

```ts
// instrumentation.ts (Next.js project root)
import { createInstrumentation } from "@mohasinac/instrumentation";
import { initProviders } from "@/providers.config";

export const { register } = createInstrumentation({
  onRegister: initProviders,
});
```

```ts
// providers.config.ts
let initialized = false;
let initPromise: Promise<void> | null = null;

export async function initProviders() {
  if (initialized) return;
  if (initPromise) return initPromise;

  initPromise = _doRegister().then(() => { initialized = true; });
  return initPromise;
}
```

Then in any route that might be hit before instrumentation finishes:

```ts
// app/api/products/route.ts
import { withProviders } from "@/providers.config";
import { GET as _GET } from "@mohasinac/feat-products";

export const GET = withProviders(_GET);
```

---

## Exports

`createInstrumentation()`

Types: `InstrumentationConfig`, `InstrumentationHook`

---

## License

MIT — part of the `@mohasinac/*` monorepo.
