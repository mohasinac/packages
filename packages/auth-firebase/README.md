# @mohasinac/auth-firebase

> **Layer 3** — Firebase Auth (Admin SDK) implementation of `IAuthProvider` + `ISessionProvider`. Handles ID token verification, session cookie creation, and Next.js middleware auth chains.

## Install

```bash
npm install @mohasinac/auth-firebase firebase-admin
```

---

## Register with provider registry

```ts
import { registerProviders } from "@mohasinac/contracts";
import {
  firebaseAuthProvider,
  firebaseSessionProvider,
} from "@mohasinac/auth-firebase";

registerProviders({
  auth: firebaseAuthProvider,
  session: firebaseSessionProvider,
});
```

---

## Verify tokens in API routes

```ts
import { verifyIdToken, verifySessionCookie } from "@mohasinac/auth-firebase";

// Verify Firebase ID token (from Authorization header)
const user = await verifyIdToken(idToken);

// Verify session cookie (from httpOnly cookie)
const user = await verifySessionCookie(sessionCookie);
```

---

## Create session cookies

```ts
import { createSessionCookieFromToken } from "@mohasinac/auth-firebase";

// Exchange ID token for a long-lived session cookie
const cookie = await createSessionCookieFromToken(idToken, {
  expiresIn: 14 * 24 * 60 * 60 * 1000, // 14 days in ms
});
```

---

## Middleware auth chain

```ts
import { createMiddlewareAuthChain } from "@mohasinac/auth-firebase";

// In Next.js middleware.ts
const authChain = createMiddlewareAuthChain({
  publicPaths: ["/", "/products", "/blog"],
  authPaths: ["/checkout", "/account"],
  adminPaths: ["/admin"],
  sellerPaths: ["/seller"],
});

export function middleware(request: NextRequest) {
  return authChain(request);
}
```

---

## Role guards (server-side)

```ts
import { requireAuth, requireRole } from "@mohasinac/auth-firebase";

const user = await requireAuth(request);
await requireRole(user, "admin");
```

---

## Exports

`firebaseAuthProvider`, `firebaseSessionProvider`, `createSessionCookieFromToken()`, `verifyIdToken()`, `verifySessionCookie()`, `createMiddlewareAuthChain()`, `requireAuth()`, `requireRole()`

---

## Required environment variables

| Variable             | Description                                        |
| -------------------- | -------------------------------------------------- |
| `FIREBASE_ADMIN_KEY` | Base64-encoded Firebase Admin service account JSON |

---

## License

MIT — part of the `@mohasinac/*` monorepo.
