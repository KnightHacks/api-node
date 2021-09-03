import { Endpoints } from '../Endpoints';
import { APISponsor, Sponsor, transformSponsor } from '../models/user';
import { RestManager } from '../RestManager';
import { emptyCollectionHandler } from '../util/api';

export class SponsorManager {
  constructor(readonly rest: RestManager) {}

  async create(sponsor: Sponsor): Promise<void> {
    await this.rest.performRequest(Endpoints.createSponsor, {
      body: JSON.stringify(sponsor),
    });
  }

  async fetchAll(): Promise<Sponsor[]> {
    const pendingResponse = this.rest.performRequest(Endpoints.allSponsors);
    pendingResponse.catch(emptyCollectionHandler);

    const response = (await pendingResponse) as APISponsor[];

    return response.map(transformSponsor);
  }
}
