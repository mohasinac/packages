# @mohasinac/react

> **Layer 2** — Generic React hooks. Zero domain logic, zero provider dependencies.

## Install

```bash
npm install @mohasinac/react
```

Requires React ≥ 18 as a peer dependency.

---

## Hooks

### Viewport & responsive

```ts
import { useMediaQuery, useBreakpoint } from "@mohasinac/react";

const isMobile = useMediaQuery("(max-width: 767px)");
const bp = useBreakpoint(); // "xs" | "sm" | "md" | "lg" | "xl" | "2xl"
```

### Interaction

```ts
import { useClickOutside, useKeyPress, useLongPress } from "@mohasinac/react";

const ref = useClickOutside<HTMLDivElement>(() => setOpen(false));
const isEscPressed = useKeyPress("Escape");
const longPressHandlers = useLongPress(() => openContextMenu());
```

### Touch & gestures

```ts
import { useGesture, useSwipe, usePullToRefresh } from "@mohasinac/react";

const gesture = useGesture(ref); // "tap" | "double-tap" | "pinch" | "rotate"
const swipe = useSwipe(ref); // { direction: "left" | "right" | "up" | "down" }
const { isPulling, progress } = usePullToRefresh(async () => refetch());
```

### Camera

```ts
import { useCamera } from "@mohasinac/react";

const {
  ref: videoRef,
  capture,
  stream,
  error,
} = useCamera({ facingMode: "environment" });
```

### Table state (URL-synced)

```ts
import {
  useUrlTable,
  usePendingFilters,
  usePendingTable,
} from "@mohasinac/react";

// Syncs page/sort/filters to URL search params — no useState needed
const table = useUrlTable({ defaultPerPage: 20 });
```

### Bulk selection

```ts
import { useBulkSelection } from "@mohasinac/react";

const { selected, toggle, selectAll, clearAll, isSelected } =
  useBulkSelection(items);
```

### Countdown

```ts
import { useCountdown } from "@mohasinac/react";

const { days, hours, minutes, seconds, isExpired } = useCountdown(endDate);
```

---

## Full export list

`useMediaQuery`, `useBreakpoint`, `useClickOutside`, `useKeyPress`, `useLongPress`, `useGesture`, `useSwipe`, `usePullToRefresh`, `useCountdown`, `useCamera`, `useBulkSelection`, `useUrlTable`, `usePendingFilters`, `usePendingTable`

---

## License

MIT — part of the `@mohasinac/*` monorepo.
