import axios from 'axios';
import { Endpoints } from '../Endpoints';
import { APISponsor, Sponsor } from '../models/user';
import humps from 'humps';

export function transformSponsor(sponsor: APISponsor): Sponsor {
  return humps.camelizeKeys(sponsor) as Sponsor;
}

export class SponsorManager {
  async create(sponsor: Sponsor): Promise<void> {
    return await axios.post(Endpoints.createSponsor, sponsor);
  }

  async fetchAll(): Promise<Sponsor[]> {
    const apiSponsors = await axios
      .get<APISponsor[]>(Endpoints.allSponsors)
      .then((response) => response.data)
      .catch(() => []);

    return apiSponsors.map(transformSponsor);
  }
}
