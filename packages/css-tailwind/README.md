# @mohasinac/css-tailwind

> **Layer 2** — Tailwind CSS implementation of `IStyleAdapter`. Provides `cn()` (twMerge + clsx) and `token()` (CSS custom property resolver).

## Install

```bash
npm install @mohasinac/css-tailwind
```

Peer dependency: `tailwindcss >= 3`.

---

## Usage

```ts
import { tailwindAdapter } from "@mohasinac/css-tailwind";

// Merge Tailwind class names safely
tailwindAdapter.cn("px-4 py-2", isActive && "bg-primary", className);
// → merged, deduplicated class string

// Resolve design token to CSS custom property
tailwindAdapter.token("primary"); // "var(--lir-primary)"
tailwindAdapter.token("radius-md"); // "var(--lir-radius-md)"
```

### Register as the style provider

```ts
import { registerProviders } from "@mohasinac/contracts";
import { tailwindAdapter } from "@mohasinac/css-tailwind";

registerProviders({
  style: tailwindAdapter,
  // ...
});
```

---

## Exports

`tailwindAdapter` (singleton implementing `IStyleAdapter`)

---

## See also

- `@mohasinac/css-vanilla` — plain CSS custom properties adapter (no Tailwind dependency)
- `@mohasinac/tokens` — the token constants that `token()` resolves

---

## License

MIT — part of the `@mohasinac/*` monorepo.
