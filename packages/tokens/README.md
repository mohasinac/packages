# @mohasinac/tokens

> **Layer 2** — Design tokens as typed TypeScript constants, mirroring the `--lir-*` CSS custom properties.

## Install

```bash
npm install @mohasinac/tokens
```

---

## Usage

```ts
import { COLORS, RADIUS, SHADOWS, Z_INDEX, token } from "@mohasinac/tokens";

// Brand colours
COLORS.primary; // "#84e122"
COLORS.secondary; // "#e91e8c"
COLORS.cobalt; // "#3570fc"

// Resolve to CSS custom property string
token("primary"); // "var(--lir-primary)"
token("radius-md"); // "var(--lir-radius-md)"

// Shadows
SHADOWS.card; // box-shadow value
SHADOWS.modal;

// Z-index scale
Z_INDEX.modal; // 300
Z_INDEX.toast; // 400
```

---

## In Tailwind config

Tokens are consumed automatically by `@mohasinac/css-tailwind` — no manual config needed. For a custom Tailwind config:

```js
// tailwind.config.js
const { COLORS } = require("@mohasinac/tokens");

module.exports = {
  theme: {
    extend: {
      colors: {
        primary: COLORS.primary,
        secondary: COLORS.secondary,
      },
    },
  },
};
```

---

## Exports

`COLORS`, `RADIUS`, `SHADOWS`, `Z_INDEX`, `token()`

---

## License

MIT — part of the `@mohasinac/*` monorepo.
