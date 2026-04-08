# @mohasinac/storage-firebase

> **Layer 3** — Firebase Storage (Admin SDK) implementation of `IStorageProvider`. Handles file uploads, signed URL generation, and deletions from server-side code.

## Install

```bash
npm install @mohasinac/storage-firebase firebase-admin
```

---

## Register with provider registry

```ts
import { registerProviders } from "@mohasinac/contracts";
import { firebaseStorageProvider } from "@mohasinac/storage-firebase";

registerProviders({
  storage: firebaseStorageProvider,
});
```

---

## Upload files

```ts
import { getProviders } from "@mohasinac/contracts";

const { storage } = getProviders();

const file = await storage!.upload(buffer, {
  path: "products/abc/image.jpg",
  contentType: "image/jpeg",
  isPublic: true,
});

console.log(file.url); // public download URL
```

---

## Delete files

```ts
await storage!.delete("products/abc/image.jpg");
```

---

## Upload flow (browser → server)

Files are **never** uploaded from the browser directly to Firebase Storage. The flow is:

1. Browser captures file → sends `FormData` to a Next.js API route
2. API route validates the file (magic bytes, MIME type, size)
3. API route calls `storage.upload(buffer, opts)` server-side
4. Returns the public URL to the client

---

## Exports

`firebaseStorageProvider` (singleton implementing `IStorageProvider`)

---

## Required environment variables

| Variable                              | Description                                        |
| ------------------------------------- | -------------------------------------------------- |
| `FIREBASE_ADMIN_KEY`                  | Base64-encoded Firebase Admin service account JSON |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Storage bucket name                       |

---

## License

MIT — part of the `@mohasinac/*` monorepo.
