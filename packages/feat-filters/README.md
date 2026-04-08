# @mohasinac/feat-filters

> **Layer 4** — Generic filter panel components that sync filter state to URL search params via `useUrlTable`. Domain-agnostic — configure with a `FilterConfig[]` array.

## Install

```bash
npm install @mohasinac/feat-filters
```

Peer dependencies: React ≥ 18, Next.js ≥ 14.

---

## `FilterPanel`

The top-level container. Renders a row of filter inputs based on the provided `config` array and a "Reset" button.

```tsx
import { FilterPanel } from "@mohasinac/feat-filters";
import type { FilterConfig } from "@mohasinac/feat-filters";

const filterConfig: FilterConfig[] = [
  {
    type: "facet-single",
    field: "status",
    label: "Status",
    options: [
      { label: "Published", value: "published" },
      { label: "Draft", value: "draft" },
    ],
  },
  {
    type: "range-number",
    field: "price",
    label: "Price",
    min: 0,
    max: 10000,
    unit: "₹",
  },
  {
    type: "switch",
    field: "inStock",
    label: "In Stock Only",
  },
];

<FilterPanel config={filterConfig} urlTable={table} />
```

---

## Individual filter components

```tsx
import { FilterFacetSection, RangeFilter, SwitchFilter } from "@mohasinac/feat-filters";

<FilterFacetSection
  label="Category"
  options={categories}
  selected={selected}
  onChange={setSelected}
/>

<RangeFilter min={0} max={5000} value={[100, 2000]} onChange={setRange} />

<SwitchFilter label="Free Shipping" checked={freeShipping} onChange={setFreeShipping} />
```

---

## Utilities

```ts
import { getFilterLabel, getFilterValue } from "@mohasinac/feat-filters";
```

---

## Full export list

**Components:** `FilterPanel`, `FilterFacetSection`, `RangeFilter`, `SwitchFilter`

**Utils:** `getFilterLabel()`, `getFilterValue()`, `cn()`

**Types:** `FilterPanelProps`, `FilterConfig`, `UrlTable`, `FacetSingleConfig`, `FacetMultiConfig`, `SwitchConfig`, `RangeNumberConfig`, `RangeDateConfig`, `FilterFacetSectionProps`, `FacetOption`, `RangeFilterProps`, `SwitchFilterProps`, `FilterOption`

---

## License

MIT — part of the `@mohasinac/*` monorepo.
