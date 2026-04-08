# @mohasinac/cli

> **Layer 6** — CLI and Next.js config helpers for the `@mohasinac/*` pluggable feature library. Provides the `mohasinac` binary, `withFeatures()` for `next.config.js`, and `mergeFeatureMessages()` for `next-intl`.

## Install

```bash
npm install @mohasinac/cli
# or as a dev dependency for tooling only
npm install --save-dev @mohasinac/cli
```

---

## CLI commands

```bash
npx @mohasinac/cli add products
# → installs @mohasinac/feat-products
# → generates src/app/api/products/route.ts stub
# → patches features.config.ts
# → adds "products" namespace to i18n config

npx @mohasinac/cli remove products
# → removes the package and generated stubs

npx @mohasinac/cli list
# → lists all available feat-* packages with install status
```

---

## `withFeatures()` — next.config.js

Automatically transpiles only the installed feature packages and sets `serverExternalPackages: ["firebase-admin"]`.

```js
// next.config.js
const { withFeatures } = require("@mohasinac/cli/next");
const features = require("./features.config").default;

module.exports = withFeatures(features)({
  // your other next config
});
```

---

## `mergeFeatureMessages()` — i18n

Merges each feature package's default `messages/en.json` with your project's local override messages; local files always win.

```ts
// src/i18n/request.ts
import { mergeFeatureMessages } from "@mohasinac/cli/i18n";
import features from "../../features.config";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  const messages = await mergeFeatureMessages(locale, features);
  return { locale, messages };
});
```

---

## `features.config.ts` shape

```ts
import type { FeaturesConfig } from "@mohasinac/contracts";

export default {
  auth:       true,
  products:   true,
  cart:       true,
  orders:     true,
  events:     false,
  auctions:   false,
} satisfies FeaturesConfig;
```

---

## Exports

`withFeatures()`, `resolveTranspilePackages()` (from `@mohasinac/cli/next`)  
`mergeFeatureMessages()` (from `@mohasinac/cli/i18n`)

---

## License

MIT — part of the `@mohasinac/*` monorepo.
