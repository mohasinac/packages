# @mohasinac/feat-layout

> **Layer 4** — Generic layout shell components: navbar, footer, sidebar, bottom navigation, breadcrumbs, and locale switcher. Configurable via props — no domain data embedded.

## Install

```bash
npm install @mohasinac/feat-layout
```

Peer dependencies: React ≥ 18, Next.js ≥ 14, next-intl ≥ 3.

---

## Components

### `NavbarLayout`

```tsx
import { NavbarLayout } from "@mohasinac/feat-layout";

<NavbarLayout
  logo={<Logo />}
  items={[
    { label: t("nav.products"), href: ROUTES.products },
    { label: t("nav.stores"), href: ROUTES.stores },
  ]}
  actions={<CartButton count={cartCount} />}
  user={currentUser}
/>
```

### `FooterLayout`

```tsx
import { FooterLayout } from "@mohasinac/feat-layout";

<FooterLayout
  linkGroups={[
    { heading: "Company", links: [...] },
    { heading: "Support", links: [...] },
  ]}
  socialLinks={[...]}
  trustBar={[...]}
  copyright="© 2025 LetItRip"
/>
```

### `SidebarLayout`

```tsx
import { SidebarLayout } from "@mohasinac/feat-layout";

<SidebarLayout items={adminNavItems} collapsed={false}>
  {children}
</SidebarLayout>
```

### `BottomNavLayout`

Mobile-only bottom navigation bar.

```tsx
import { BottomNavLayout } from "@mohasinac/feat-layout";

<BottomNavLayout items={mobileNavItems} activeHref="/products" />
```

### `TitleBarLayout`

Page-level title bar with user info and action buttons.

### Breadcrumbs

```tsx
import { AutoBreadcrumbs, Breadcrumbs } from "@mohasinac/feat-layout";

<AutoBreadcrumbs />  {/* auto-generates from current pathname */}
<Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Products" }]} />
```

### `LocaleSwitcher`

```tsx
import { LocaleSwitcher } from "@mohasinac/feat-layout";

<LocaleSwitcher locales={[{ code: "en", label: "English" }, { code: "hi", label: "हिन्दी" }]} />
```

### `ListingLayout`

Two-column layout with a filter sidebar and a product grid area.

---

## Full export list

**Components:** `NavbarLayout`, `FooterLayout`, `SidebarLayout`, `BottomNavLayout`, `TitleBarLayout`, `AutoBreadcrumbs`, `Breadcrumbs`, `BreadcrumbItem`, `LocaleSwitcher`, `BackToTop`, `SkipToMain`, `ListingLayout`

**Types:** `NavbarLayoutProps`, `NavbarLayoutItem`, `FooterLayoutProps`, `FooterLinkGroup`, `FooterSocialLink`, `TrustBarItem`, `SidebarLayoutProps`, `BottomNavLayoutProps`, `TitleBarLayoutProps`, `TitleBarUser`, `AutoBreadcrumbsProps`, `BreadcrumbsProps`, `LocaleSwitcherProps`, `ListingLayoutProps`, `ListingLayoutLabels`

---

## License

MIT — part of the `@mohasinac/*` monorepo.
