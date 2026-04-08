# @mohasinac/email-resend

> **Layer 3** — Resend implementation of `IEmailProvider`. Send transactional emails from server-side code using the Resend API.

## Install

```bash
npm install @mohasinac/email-resend resend
```

---

## Register with provider registry

```ts
import { registerProviders } from "@mohasinac/contracts";
import { createResendProvider } from "@mohasinac/email-resend";

registerProviders({
  email: createResendProvider({
    apiKey: process.env.RESEND_API_KEY!,
    defaultFrom: "LetItRip <no-reply@letitrip.in>",
  }),
});
```

---

## Send email

```ts
import { getProviders } from "@mohasinac/contracts";

const { email } = getProviders();

await email!.send({
  to: "customer@example.com",
  subject: "Your order has shipped",
  html: "<p>Your order #1234 is on its way.</p>",
  text: "Your order #1234 is on its way.",
  attachments: [
    {
      filename: "invoice.pdf",
      content: pdfBuffer,
    },
  ],
});
```

---

## Exports

`createResendProvider()`

Types: `ResendProviderOptions`

---

## Required environment variables

| Variable         | Description                    |
| ---------------- | ------------------------------ |
| `RESEND_API_KEY` | Resend API key from resend.com |

---

## License

MIT — part of the `@mohasinac/*` monorepo.
