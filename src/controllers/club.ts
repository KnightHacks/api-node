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
    const url = new URL(Endpoints.clubEvents);

    if (options) {
      Object.entries(options).forEach((option) =>
        url.searchParams.append(option[0], option[1])
      );
    }

    const pendingResponse = this.rest.performRequest(URL.toString());
    pendingResponse.catch(emptyCollectionHandler);

    const response = (await pendingResponse) as { events: APIClubEvent[] };
    return response.events.map(transformClubEvent);
  }
}
