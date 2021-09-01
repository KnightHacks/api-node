import axios, { AxiosError } from 'axios';
import humps from 'humps';
import { Endpoints } from '../Endpoints';
import { APIClubEvent, ClubEvent } from '../models/event';

function transformClubEvent(event: APIClubEvent): ClubEvent {
  const renamedKeys = humps.camelizeKeys(event) as ClubEvent;

  renamedKeys.start = new Date(event.start);
  renamedKeys.end = new Date(event.end);

  return renamedKeys;
}

export class ClubManager {
  async getEvents(): Promise<ClubEvent[]> {
    console.log(Endpoints.clubEvents);
    const clubEvents = await axios
      .get<{ events: APIClubEvent[] }>(Endpoints.clubEvents)
      .then((response) => {
        console.log(response.status);
        return response.data.events;
      })
      .catch((err: AxiosError) => {
        console.error(err.message);
        return [];
      });

    return clubEvents.map(transformClubEvent);
  }
}
