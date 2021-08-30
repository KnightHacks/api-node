import axios from 'axios';
import { Endpoints } from '../Endpoints';
import { APIEvent, Event } from '../models/event';
import humps from 'humps';
import { transformSponsor } from './sponsor';
import { APISponsor } from '../models/user';

function transformEvent(event: APIEvent): Event {
  const renamedKeys = humps.camelizeKeys(event) as Event;

  renamedKeys.dateTime = new Date(event.date_time);
  renamedKeys.endDateTime = new Date(event.end_date_time);
  renamedKeys.sponsors = (renamedKeys.sponsors as unknown as APISponsor[]).map(
    transformSponsor
  );

  return renamedKeys;
}

export class EventManager {
  async fetchAll(): Promise<Event[]> {
    console.log(`https://api.knighthacks.org${Endpoints.getAllEvents}`);
    const apiEvents = await axios
      .get<{ events: APIEvent[] }>(Endpoints.getAllEvents)
      .then((response) => response.data.events)
      .catch(() => []);

    return apiEvents.map(transformEvent);
  }
}
