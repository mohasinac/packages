# @mohasinac/feat-promotions

> **Layer 5** — Promotions feature module: promo banners, coupon input, sale tags, and flash sale timers.

## Install

```bash
npm install @mohasinac/feat-promotions
```

---

## Components

```tsx
import { PromoBanner, CouponInput, SaleTag, FlashSaleTimer } from "@mohasinac/feat-promotions";

<PromoBanner message={t("promo.sitewide")} />
<CouponInput onApply={handleApplyCoupon} />
<SaleTag discount="20%" />
<FlashSaleTimer endDate={sale.endDate} />
```

## License

MIT — part of the `@mohasinac/*` monorepo.
