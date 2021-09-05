import { Endpoints } from '../Endpoints';
import {
  APISponsorData,
  SponsorData,
  transformAPISponsor,
  transformSponsor,
} from '../models/user';
import { emptyCollectionHandler, entityNotFoundHandler } from '../util/api';
import { BaseManager } from './base';

export class SponsorManager extends BaseManager {
  async create(sponsor: Required<SponsorData>): Promise<void> {
    const transformedData = transformSponsor(sponsor);
    console.log(transformedData);
    await this.rest.performRequest(Endpoints.createSponsor, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(transformedData),
    });
  }

  async fetchAll(): Promise<SponsorData[]> {
    const response = (await this.rest
      .performRequest(Endpoints.allSponsors)
      .catch(emptyCollectionHandler)) as { sponsors: APISponsorData[] };
    return response.sponsors.map(transformAPISponsor);
  }

  async get(sponsorName: string): Promise<SponsorData | undefined> {
    const response = (await this.rest
      .performRequest(Endpoints.specificSponsor(sponsorName))
      .catch(entityNotFoundHandler)) as { Sponsor: [APISponsorData] };

    if (!response || !response.Sponsor) {
      return;
    }

    return transformAPISponsor(response.Sponsor[0]);
  }
}
