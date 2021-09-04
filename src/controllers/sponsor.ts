import { Endpoints } from '../Endpoints';
import { APISponsor, Sponsor, transformSponsor } from '../models/user';
import { emptyCollectionHandler } from '../util/api';
import { BaseManager } from './base';

export class SponsorManager extends BaseManager {
  async create(sponsor: Sponsor): Promise<void> {
    await this.rest.performRequest(Endpoints.createSponsor, {
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
