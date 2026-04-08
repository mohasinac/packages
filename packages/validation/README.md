# @mohasinac/validation

> **Layer 2** — Zod schemas for common fields and a custom Zod error map aligned with the app's i18n strings.

## Install

```bash
npm install @mohasinac/validation zod
```

---

## Schemas

```ts
import {
  paginationQuerySchema,
  emailSchema,
  passwordSchema,
  phoneSchema,
  urlSchema,
  mediaUrlSchema,
  addressSchema,
  objectIdSchema,
  dateStringSchema,
} from "@mohasinac/validation";

// Use in react-hook-form + zodResolver
const schema = z.object({
  email: emailSchema,
  password: passwordSchema,
  phone: phoneSchema,
});
```

### Schema reference

| Schema                  | Validates                                       |
| ----------------------- | ----------------------------------------------- |
| `paginationQuerySchema` | `page`, `perPage`, `sort`, `filters` URL params |
| `emailSchema`           | RFC-5322 email address                          |
| `passwordSchema`        | Min 8 chars, at least one uppercase + digit     |
| `phoneSchema`           | E.164 phone number                              |
| `urlSchema`             | HTTP/HTTPS URL                                  |
| `mediaUrlSchema`        | Firebase Storage or CDN URL                     |
| `addressSchema`         | Full postal address object                      |
| `objectIdSchema`        | Non-empty string ID                             |
| `dateStringSchema`      | ISO 8601 date string                            |

---

## Zod error map

Register once at app startup to get localized, consistent validation messages:

```ts
import { setupZodErrorMap } from "@mohasinac/validation";

setupZodErrorMap(); // call in instrumentation.ts or app entry point
```

---

## Exports

`paginationQuerySchema`, `objectIdSchema`, `urlSchema`, `mediaUrlSchema`, `dateStringSchema`, `passwordSchema`, `phoneSchema`, `emailSchema`, `addressSchema`, `zodErrorMap()`, `setupZodErrorMap()`

---

## License

MIT — part of the `@mohasinac/*` monorepo.
