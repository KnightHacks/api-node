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

export type RelativeDate = 'Today' | 'NextWeek' | 'NextMonth' | 'NextYear';

export interface ClubEventOptions {
  count?: number;
  confirmed?: boolean;
  rdate?: RelativeDate;
}

export class ClubManager {
  async getEvents(options: ClubEventOptions): Promise<ClubEvent[]> {
    const clubEvents = await axios
      .get<{ events: APIClubEvent[] }>(Endpoints.clubEvents, {
        params: options,
      })
      .then((response) => response.data.events)
      .catch((err: AxiosError) => {
        console.error(err.message);
        return [];
      });

    return clubEvents.map(transformClubEvent);
  }
}
