import { Endpoints } from '../Endpoints';
import { APIEventData, EventData, transformAPIEvent } from '../models/event';
import { emptyCollectionHandler } from '../util/api';
import { BaseManager } from './base';

export class EventManager extends BaseManager {
  /**
   * Retrieves all of the hackathon events.
   * @returns A list of the hackathon events.
   */
  async fetchAll(): Promise<EventData[]> {
    const response = (await this.rest
      .performRequest(Endpoints.getAllEvents)
      .catch(emptyCollectionHandler)) as { events: APIEventData[] };
    return response.events.map(transformAPIEvent);
  }
}
