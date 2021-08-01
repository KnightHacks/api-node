import axios from 'axios';
import { Endpoints } from '../Endpoints';
import { Sponsor } from '../models/user';

export class SponsorManager {
  async create(sponsor: Sponsor): Promise<void> {
    return await axios.post(Endpoints.createSponsor, sponsor);
  }
}
