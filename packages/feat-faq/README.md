# @mohasinac/feat-faq

> **Layer 5** — FAQ feature module: accordion display, category grouping, and the FAQs API route handler.

## Install

```bash
npm install @mohasinac/feat-faq
```

Peer dependencies: React ≥ 18, Next.js ≥ 14, next-intl ≥ 3.

---

## Components

```tsx
import { FAQAccordion, FAQSearch, FAQCategory } from "@mohasinac/feat-faq";

<FAQCategory category="shipping" />
<FAQAccordion faqs={faqs} />
<FAQSearch placeholder={t("faq.search")} />
```

---

## License

MIT — part of the `@mohasinac/*` monorepo.
