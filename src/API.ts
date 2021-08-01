import axios from 'axios';
import { CategoryManager } from './controllers/category';
import { EventManager } from './controllers/event';

axios.defaults.baseURL = 'https://api.knighthacks.org';

export class API {
  public readonly categories = new CategoryManager();
  public readonly events = new EventManager();
}
