import axios, { AxiosError } from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import { AuthenticationManager } from './controllers/auth';
import { CategoryManager } from './controllers/category';
import { ClubManager } from './controllers/club';
import { EventManager } from './controllers/event';
import { HackerManager } from './controllers/hacker';
import { SponsorManager } from './controllers/sponsor';

axios.defaults.baseURL = 'https://api.knighthacks.org';
axios.interceptors.response.use(
  (response) => {
    if (!response.data) {
      return response;
    }

    response.data = camelcaseKeys(response.data, { deep: true });
    return response;
  },
  (error: AxiosError) => {
    console.error(error.response?.data);
    throw error;
  }
);

axios.interceptors.request.use((request) => {
  if (!request.data) {
    return request;
  }

  request.data = snakecaseKeys(request.data, { deep: true });
  return request;
});

export class API {
  public readonly categories = new CategoryManager(this);
  public readonly events = new EventManager();
  public readonly sponsors = new SponsorManager();
  public readonly hackers = new HackerManager();
  public readonly club = new ClubManager();

  public token: string | undefined;

  public async login(username: string, password: string): Promise<string> {
    this.token = await AuthenticationManager.login({ username, password });
    return this.token;
  }
}
