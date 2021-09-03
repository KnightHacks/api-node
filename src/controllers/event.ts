import { Endpoints } from '../Endpoints';
import { APIEvent, Event, transformAPIEvent } from '../models/event';
import { RestManager } from '../RestManager';
import { emptyCollectionHandler } from '../util/api';

export class EventManager {
  constructor(readonly rest: RestManager) {}

  /**
   * Retrieves all of the hackathon events.
   * @returns A list of the hackathon events.
   */
  async fetchAll(): Promise<Event[]> {
    const response = (await this.rest
      .performRequest(Endpoints.getAllEvents)
      .catch(emptyCollectionHandler)) as { events: APIEvent[] };
    return response.events.map(transformAPIEvent);
  }
}
