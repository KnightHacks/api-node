import axios from 'axios';
import { Endpoints } from './Endpoints';
import { Category } from './models/category';
import { Event } from './models/event';

axios.defaults.baseURL = 'https://api.knighthacks.org';

export const API = {
  categories: {
    async lookup(name: string, sponsor: string): Promise<Category[]> {
      const data = {
        name,
        sponsor,
      };

      return await axios.get<Category[]>(Endpoints.categories, { data })
        .then(response => response.data);
    },
    async create(category: Category): Promise<void> {
      await axios.get(Endpoints.categories, { data: category })
        .then(response => response.data);
    }
  },

  events: {
    async fetch(): Promise<Event[]> {
      console.log(`https://api.knighthacks.org${Endpoints.getAllEvents}`);
      return await axios.get<{ events: Event[] }>(Endpoints.getAllEvents)
        .then(response => response.data.events);
    }
  }

};
