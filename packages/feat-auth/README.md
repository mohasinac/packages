# @mohasinac/feat-auth

> **Layer 5** — Authentication feature module: login, signup, forgot-password forms, auth guards, and the `/api/auth/me` route handler.

## Install

```bash
npm install @mohasinac/feat-auth
```

Peer dependencies: React ≥ 18, Next.js ≥ 14, next-intl ≥ 3.

---

## Add to your project

```ts
// features.config.ts
export default { auth: true, ... } satisfies FeaturesConfig;
```

```ts
// app/api/auth/me/route.ts
import { withProviders } from "@/providers.config";
import { authMeGET as _GET } from "@mohasinac/feat-auth";
export const GET = withProviders(_GET);
```

---

## Components

```tsx
import { LoginForm, SignupForm, ForgotPasswordForm, AuthGuard } from "@mohasinac/feat-auth";

// Protect a page
<AuthGuard role="user">
  <AccountPage />
</AuthGuard>
```

---

## Hook

```ts
import { useAuth } from "@mohasinac/feat-auth";

const { user, isLoading, signIn, signOut, signUp } = useAuth();
```

---

## Exports

Types · schemas · `useAuth` · `LoginForm`, `SignupForm`, `ForgotPasswordForm`, `AuthGuard` · `authMeGET` route handler · `manifest`

---

## License

MIT — part of the `@mohasinac/*` monorepo.
