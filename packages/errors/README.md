# @mohasinac/errors

> **Layer 2** — Application error classes, numeric error codes, and a typed API error handler for Next.js route handlers.

## Install

```bash
npm install @mohasinac/errors
```

---

## Error classes

All errors extend `AppError` which carries `statusCode`, `code`, and an optional `details` payload.

```ts
import {
  AppError,
  ApiError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  DatabaseError,
} from "@mohasinac/errors";

throw new NotFoundError("Product not found");
throw new AuthorizationError("Insufficient permissions");
throw new ValidationError("Invalid input", { field: "email" });
throw new DatabaseError("Write failed");
```

| Class                 | Default status |
| --------------------- | -------------- |
| `AppError`            | 500            |
| `ApiError`            | 502            |
| `ValidationError`     | 400            |
| `AuthenticationError` | 401            |
| `AuthorizationError`  | 403            |
| `NotFoundError`       | 404            |
| `DatabaseError`       | 503            |

---

## `handleApiError`

Converts any caught error into a typed `NextResponse`:

```ts
import { handleApiError } from "@mohasinac/errors";

export async function GET(request: Request) {
  try {
    // ...
  } catch (err) {
    return handleApiError(err);
    // AppError subclasses → correct status + code
    // Unknown errors    → 500
  }
}
```

---

## `isAppError` / `logError`

```ts
import { isAppError, logError, ERROR_CODES } from "@mohasinac/errors";

if (isAppError(err)) {
  logError(err); // structured log output
}
```

---

## Exports

`AppError`, `ApiError`, `ValidationError`, `AuthenticationError`, `AuthorizationError`, `NotFoundError`, `DatabaseError`, `ERROR_CODES`, `ERROR_MESSAGES`, `handleApiError()`, `logError()`, `isAppError()`

Types: `ErrorCode`

---

## License

MIT — part of the `@mohasinac/*` monorepo.
