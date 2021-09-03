import qs from 'qs';
import { Endpoints } from '../Endpoints';
import { APIClubEvent, ClubEvent, transformClubEvent } from '../models/event';
import { RestManager } from '../RestManager';
import { emptyCollectionHandler } from '../util/api';

export type RelativeDate = 'Today' | 'NextWeek' | 'NextMonth' | 'NextYear';
/**
 * Defines options for fetching club events.
 */
export interface ClubEventOptions {
  /**
   * The max number of club events to return.
   */
  count?: number;

  /**
   * Filter by whether a given event is confirmed or not.
   */
  confirmed?: boolean;

  /**
   * The date range for which you want fetch club events.
   */
  rdate?: RelativeDate;
}

export class ClubManager {
  constructor(readonly rest: RestManager) {}

  /**
   * Fetches all of the club events.
   * @param options The options for fetching the events.
   * @returns All of the club events with respect to the given options.
   */
  async getEvents(options?: ClubEventOptions): Promise<ClubEvent[]> {
    const params = qs.stringify(options);
    const path = `${Endpoints.clubEvents}?${params}`;

    const response = (await this.rest
      .performRequest(path)
      .catch(emptyCollectionHandler)) as { events: APIClubEvent[] };

    return response.events.map(transformClubEvent);
  }
}
