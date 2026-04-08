# @mohasinac/ui

> **Layer 2** — Primitive UI components: semantic HTML wrappers, typography, feedback, interactive elements, and data display. Headless by default — style via Tailwind CSS.

## Install

```bash
npm install @mohasinac/ui
```

Peer dependencies: React ≥ 18, Tailwind CSS ≥ 3.

---

## Semantic layout

```tsx
import {
  Section,
  Article,
  Main,
  Aside,
  Nav,
  BlockHeader,
  BlockFooter,
  Ul,
  Ol,
  Li,
} from "@mohasinac/ui";

<Main>
  <Section>
    <BlockHeader>...</BlockHeader>
    <Article>...</Article>
    <BlockFooter>...</BlockFooter>
  </Section>
</Main>;
```

---

## Typography

```tsx
import { Heading, Text, Label, Caption, Span } from "@mohasinac/ui";

<Heading level={2}>Product Title</Heading>
<Text size="sm" muted>Secondary description</Text>
<Label htmlFor="email">Email address</Label>
<Caption>Last updated 2 hours ago</Caption>
```

---

## Interactive

```tsx
import { Button, Badge, StatusBadge } from "@mohasinac/ui";

<Button variant="primary" size="md" onClick={...}>Add to Cart</Button>
<Badge variant="success">In Stock</Badge>
<StatusBadge status="pending" />  // order/payment/review status
```

---

## Feedback

```tsx
import { Spinner, Skeleton, Alert, Progress, IndeterminateProgress } from "@mohasinac/ui";

<Spinner size="md" />
<Skeleton lines={3} />
<Alert variant="error">Something went wrong.</Alert>
<Progress value={75} max={100} />
```

---

## Data display

```tsx
import { DataTable, TablePagination, StatsGrid, SummaryCard, PriceDisplay, CountdownDisplay } from "@mohasinac/ui";

<DataTable<Product>
  data={products}
  columns={productColumns}
  sortKey="name"
  sortDir="asc"
  onSort={(key, dir) => ...}
/>
<TablePagination page={1} perPage={20} total={100} onPageChange={...} />
<PriceDisplay amount={1299} currency="INR" />
<CountdownDisplay endDate={auction.endDate} />
```

---

## Forms

```tsx
import { Input, Textarea, Select, Slider, StarRating, TagInput } from "@mohasinac/ui";

<Input type="email" placeholder="you@example.com" error="Invalid email" />
<Select options={[{ label: "Option A", value: "a" }]} value="a" onChange={...} />
<StarRating value={4} onChange={setRating} />
<TagInput tags={tags} onAdd={...} onRemove={...} />
```

---

## Layout & navigation

```tsx
import {
  Modal,
  Drawer,
  Pagination,
  Divider,
  Breadcrumb,
  StepperNav,
  ViewToggle,
} from "@mohasinac/ui";
import {
  HorizontalScroller,
  SortDropdown,
  ActiveFilterChips,
  ItemRow,
} from "@mohasinac/ui";
```

---

## Full export list

**Semantic:** `Section`, `Article`, `Main`, `Aside`, `Nav`, `BlockHeader`, `BlockFooter`, `Ul`, `Ol`, `Li`  
**Typography:** `Heading`, `Text`, `Label`, `Caption`, `Span`  
**Feedback:** `Spinner`, `Skeleton`, `Alert`, `Progress`, `IndeterminateProgress`  
**Interactive:** `Button`, `Badge`, `StatusBadge`  
**Layout:** `Divider`, `Pagination`, `Modal`, `Drawer`  
**Forms:** `Select`, `Input`, `Textarea`, `Slider`, `StarRating`, `TagInput`  
**Display:** `Breadcrumb`, `ImageLightbox`, `StepperNav`, `ViewToggle`, `RatingDisplay`, `PriceDisplay`, `StatsGrid`, `SummaryCard`, `CountdownDisplay`, `ItemRow`, `HorizontalScroller`, `ActiveFilterChips`, `SortDropdown`  
**Table:** `TablePagination`, `DataTable`

---

## License

MIT — part of the `@mohasinac/*` monorepo.
