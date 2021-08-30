import axios from 'axios';
import { Endpoints } from '../Endpoints';
import { Hacker } from '../models/user';

export class HackerManager {
  async all(): Promise<Hacker[]> {
    return axios
      .get<{ hackers: Hacker[] }>(Endpoints.allHackers)
      .then((response) => response.data.hackers);
  }
}
