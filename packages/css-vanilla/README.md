# @mohasinac/css-vanilla

> **Layer 2** — Plain CSS custom properties implementation of `IStyleAdapter`. Zero Tailwind dependency — suitable for non-Tailwind projects.

## Install

```bash
npm install @mohasinac/css-vanilla
```

---

## Usage

```ts
import { vanillaAdapter } from "@mohasinac/css-vanilla";

// Join class names (no deduplication)
vanillaAdapter.cn("card", isActive && "card--active");

// Resolve design token to CSS custom property
vanillaAdapter.token("primary"); // "var(--lir-primary)"
```

### Register as the style provider

```ts
import { registerProviders } from "@mohasinac/contracts";
import { vanillaAdapter } from "@mohasinac/css-vanilla";

registerProviders({
  style: vanillaAdapter,
  // ...
});
```

---

## Exports

`vanillaAdapter` (singleton implementing `IStyleAdapter`)

---

## See also

- `@mohasinac/css-tailwind` — Tailwind-aware adapter with twMerge

---

## License

MIT — part of the `@mohasinac/*` monorepo.
