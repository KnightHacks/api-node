import { Endpoints } from '../Endpoints';
import { APIEvent, Event, transformAPIEvent } from '../models/event';
import { RestManager } from '../RestManager';
import { emptyCollectionHandler } from '../util/api';

export class EventManager {
  constructor(readonly rest: RestManager) {}

  async fetchAll(): Promise<Event[]> {
    const pendingResponse = this.rest.performRequest(Endpoints.getAllEvents);
    pendingResponse.catch(emptyCollectionHandler);

    const response = (await pendingResponse) as { events: APIEvent[] };
    return response.events.map(transformAPIEvent);
  }
}
