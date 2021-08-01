import axios, { AxiosError } from 'axios';
import { Endpoints } from '../Endpoints';
import { Category } from '../models/category';

export class CategoryManager {
  /**
   * Looks up a category given the name and sponsor.
   * @param name The name to query.
   * @param sponsor The sponsor to query
   * @returns An array of categories.
   */
  async lookup(name: string, sponsor: string): Promise<Category[]> {
    const data = {
      name,
      sponsor,
    };
  
    return await axios.get<Category[]>(Endpoints.categories, { data })
      .then(response => response.data);
  }

  async all(): Promise<Category[]> {
    let categories: Category[] = [];
    try {
      categories = await axios.get<{ categories: Category[] }>(Endpoints.allCategories)
        .then(response => response.data.categories);
    } catch (error: unknown) {
      if ((error as AxiosError).code === '404') {
        return [];
      }
    }

    return categories;
  }
      
  async create(category: Category): Promise<void> {
    await axios.get(Endpoints.categories, { data: category })
      .then(response => response.data);
  }
}

