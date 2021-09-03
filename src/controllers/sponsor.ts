import { Endpoints } from '../Endpoints';
import { APISponsor, Sponsor, transformSponsor } from '../models/user';
import { RestManager } from '../RestManager';
import { emptyCollectionHandler } from '../util/api';

export class SponsorManager {
  constructor(readonly rest: RestManager) {}

  async create(sponsor: Sponsor): Promise<void> {
    await this.rest.performRequest(Endpoints.createSponsor, {
      method: 'GET',
      body: JSON.stringify(sponsor),
    });
  }

  async fetchAll(): Promise<Sponsor[]> {
    const response = (await this.rest
      .performRequest(Endpoints.allSponsors)
      .catch(emptyCollectionHandler)) as APISponsor[];
    return response.map(transformSponsor);
  }
}
