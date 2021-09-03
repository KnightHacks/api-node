import qs from 'qs';
import { Endpoints } from '../Endpoints';
import { APIClubEvent, ClubEvent, transformClubEvent } from '../models/event';
import { RestManager } from '../RestManager';
import { emptyCollectionHandler } from '../util/api';

export type RelativeDate = 'Today' | 'NextWeek' | 'NextMonth' | 'NextYear';

export interface ClubEventOptions {
  count?: number;
  confirmed?: boolean;
  rdate?: RelativeDate;
}

export class ClubManager {
  constructor(readonly rest: RestManager) {}

  async getEvents(options?: ClubEventOptions): Promise<ClubEvent[]> {
    const params = qs.stringify(options);
    const path = `${Endpoints.clubEvents}?${params}`;

    const response = (await this.rest
      .performRequest(path)
      .catch(emptyCollectionHandler)) as { events: APIClubEvent[] };

    return response.events.map(transformClubEvent);
  }
}
