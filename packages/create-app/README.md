# @mohasinac/create-app

> **Layer 6** — Interactive scaffolder for new `@mohasinac/*`-powered Next.js projects. Creates a fully wired project with provider config, features config, and example pages in one command.

## Usage

```bash
npx @mohasinac/create-app my-store
```

You'll be prompted to select:
- Project name
- Which features to enable (`auth`, `products`, `blog`, `events`, `auctions`, …)
- Which providers to configure (`db-firebase`, `auth-firebase`, `email-resend`, etc.)
- Payment provider (`payment-razorpay` or none)
- Search provider (`search-algolia` or none)
- Shipping provider (`shipping-shiprocket` or none)

---

## What gets generated

```
my-store/
├── src/
│   ├── app/
│   │   ├── api/                  # Route stubs (one per enabled feature)
│   │   └── [locale]/             # Page stubs
│   ├── providers.config.ts       # DI wiring (pre-filled based on your choices)
│   └── features.config.ts        # Feature flags
├── features.config.ts
├── next.config.js                # withFeatures() pre-configured
├── tailwind.config.js
├── package.json                  # all selected @mohasinac/* packages listed
└── .env.example                  # all required env vars listed
```

---

## License

MIT — part of the `@mohasinac/*` monorepo.
