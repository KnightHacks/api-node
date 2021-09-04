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

### Example: Manipulate Hacker Data

```ts
const hacker = await api.hackers.get('Bob');

await hacker.setLastName('Joe');
await hacker.setSharingInfo(true);

// Or use a bulk edit...

await hacker.edit({
  lastName: 'Joe',
  canShareInfo: true,
});
```
