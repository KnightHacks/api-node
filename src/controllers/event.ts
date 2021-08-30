import axios from 'axios';
import { Endpoints } from '../Endpoints';

export class EventManager {
  async fetch(): Promise<Event[]> {
    console.log(`https://api.knighthacks.org${Endpoints.getAllEvents}`);
    return await axios
      .get<{ events: Event[] }>(Endpoints.getAllEvents)
      .then((response) => response.data.events);
  }
}
