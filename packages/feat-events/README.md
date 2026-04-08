# @mohasinac/feat-events

> **Layer 5** — Events feature module: event listing, detail, ticket selector, attendee management, and API route handlers.

## Install

```bash
npm install @mohasinac/feat-events
```

Peer dependencies: React ≥ 18, Next.js ≥ 14, next-intl ≥ 3.

---

## Add to your project

```ts
// app/api/events/route.ts
import { withProviders } from "@/providers.config";
import { eventsGET as _GET } from "@mohasinac/feat-events";
export const GET = withProviders(_GET);

// app/api/events/[id]/route.ts
import { withProviders } from "@/providers.config";
import { eventIdGET as _GET } from "@mohasinac/feat-events";
export const GET = withProviders(_GET);
```

---

## Hooks

```ts
import { useEvents, useEvent } from "@mohasinac/feat-events";

const { events, isLoading } = useEvents({ filters: "status==upcoming" });
const { event } = useEvent(eventId);
```

---

## Components

```tsx
import { EventCard, EventList, EventDetail, TicketSelector } from "@mohasinac/feat-events";
```

---

## Exports

Types · `useEvents`, `useEvent` · components · schemas · columns · `EventsRepository`, `EventEntriesRepository` · `manifest` · route handlers: `eventsGET`, `GET`, `eventIdGET`

---

## License

MIT — part of the `@mohasinac/*` monorepo.
