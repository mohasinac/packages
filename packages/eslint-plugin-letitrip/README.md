# eslint-plugin-letitrip

> **Layer 6** — ESLint plugin enforcing the `@mohasinac/*` architecture rules (barrel imports, cross-feature boundaries, Firebase access, styling conventions).

## Install

```bash
npm install --save-dev eslint-plugin-letitrip
```

---

## Configure

```js
// eslint.config.mjs
import letitrip from "eslint-plugin-letitrip";

export default [
  letitrip.configs.recommended,
];
```

---

## Rules

### Architecture

| Rule | Code | Description |
|------|------|-------------|
| `lir/no-deep-barrel-import` | ARCH-001 | Import from package root, not deep internal paths |
| `lir/no-cross-feature-import` | ARCH-002 | `feat-*` packages must not import other `feat-*` packages |
| `lir/no-fat-page` | ARCH-003 | Page components must not exceed 150 lines |
| `lir/no-tier1-feature-import` | ARCH-004 | Shell packages (Layer 4) cannot import domain features (Layer 5) |

### Firebase

| Rule | Code | Description |
|------|------|-------------|
| `lir/no-firebase-client-in-ui` | FIREBASE-001/002 | No Firebase client SDK in components or pages |
| `lir/no-firebase-admin-outside-backend` | FIREBASE-003 | Admin SDK only in API routes / Server Actions |
| `lir/no-direct-firestore-query` | FIREBASE-004 | Use repository pattern, not raw `getFirestore()` |

### Services

| Rule | Code | Description |
|------|------|-------------|
| `lir/no-fetch-in-ui` | SVC-001 | No `fetch()` calls in components/pages |
| `lir/no-apiclient-outside-services` | SVC-002 | `apiClient` only inside hooks or contexts |
| `lir/no-hardcoded-api-path` | SVC-003 | No `/api/...` string literals directly in hooks |

### Components

| Rule | Code | Description |
|------|------|-------------|
| `lir/no-raw-html-elements` | COMP-001–009 | Use `@mohasinac/ui` wrappers instead of `<div>`, `<p>`, `<button>` etc. |
| `lir/no-raw-media-elements` | MEDIA-001–003 | Use `@mohasinac/feat-media` wrappers instead of `<img>`, `<video>` |

### Styling

| Rule | Code | Description |
|------|------|-------------|
| `lir/require-xl-breakpoints` | STYL-001 | Include `xl:` Tailwind breakpoint classes |
| `lir/no-inline-static-style` | STYL-002 | No inline `style={{ }}` with static values |

### i18n

| Rule | Code | Description |
|------|------|-------------|
| `lir/use-i18n-navigation` | I18N-001/002 | Use `next-intl` navigation, not `next/navigation` |
| `lir/no-module-scope-translations` | I18N-003 | No `useTranslations()` at module scope |

### Constants

| Rule | Code | Description |
|------|------|-------------|
| `lir/no-hardcoded-route` | CNST-001 | No inline route strings — use `ROUTES` |
| `lir/no-raw-date` | CNST-002 | No `new Date()` in components |
| `lir/no-hardcoded-collection` | CNST-003 | No inline Firestore collection names |

---

## License

MIT — part of the `@mohasinac/*` monorepo.
