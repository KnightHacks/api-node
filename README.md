# KnightHacks Node API

This package provides a simple interface for interacting with the knighthacks backend

### Getting up and running is easy:

```ts
import { API } from '@knighthacks/hackathon';

// Create api instance.
const api = new API();
```

### Example: Fetch Club Events

```ts
const clubEvents: ClubEvent[] = await api.club.getEvents();

// Dates are automatically serialized.
console.log(clubEvents[0].start.toLocaleString());
```

### Example: Get Hackers

```ts
const sponsors: Hacker[] = await api.hackers.fetchAll();
```
