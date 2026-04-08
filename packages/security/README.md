# @mohasinac/security

> **Layer 2** — CSP nonce generation, in-memory rate limiter, and server-side authorization guards.

## Install

```bash
npm install @mohasinac/security
```

---

## CSP helpers

```ts
import { generateNonce, buildCSP } from "@mohasinac/security";

const nonce = generateNonce(); // cryptographically random base64 string

const cspHeader = buildCSP({
  nonce,
  reportUri: "https://example.com/csp-report",
});
// Returns a full Content-Security-Policy header value
```

---

## Rate limiting

In-memory rate limiter using sliding window. Works in Vercel Edge and Node.js runtimes.

```ts
import {
  rateLimit,
  applyRateLimit,
  rateLimitByIdentifier,
  RateLimitPresets,
  clearRateLimitStore,
} from "@mohasinac/security";

// Preset configs
RateLimitPresets.api; // 60 req/min
RateLimitPresets.auth; // 10 req/min
RateLimitPresets.upload; // 5 req/min
RateLimitPresets.public; // 200 req/min

// Apply in a route handler
const result = await rateLimit(clientIp, RateLimitPresets.auth);
if (!result.allowed) {
  return new Response("Too Many Requests", { status: 429 });
}

// Or use applyRateLimit which throws RateLimitError
await applyRateLimit(clientIp, RateLimitPresets.api);
```

---

## Authorization guards

```ts
import {
  requireAuth,
  requireRole,
  requireOwnership,
  requireEmailVerified,
  requireActiveAccount,
  canChangeRole,
  getRoleLevel,
} from "@mohasinac/security";

const user = await requireAuth(request); // throws AuthenticationError if no session
await requireRole(user, "admin"); // throws AuthorizationError if wrong role
await requireOwnership(user, resource.ownerId); // throws AuthorizationError if not owner
```

---

## PII redaction

```ts
import { redactPii } from "@mohasinac/security";

const safe = redactPii({ email: "user@example.com", name: "John" });
// → { email: "u***@***.com", name: "John" }
```

---

## Exports

`generateNonce()`, `buildCSP()`, `rateLimit()`, `applyRateLimit()`, `rateLimitByIdentifier()`, `RateLimitPresets`, `clearRateLimitStore()`, `requireAuth()`, `requireRole()`, `requireOwnership()`, `requireEmailVerified()`, `requireActiveAccount()`, `canChangeRole()`, `getRoleLevel()`, `redactPii()`

Types: `RateLimitConfig`, `RateLimitResult`, `UserRole`

---

## License

MIT — part of the `@mohasinac/*` monorepo.
