import axios, { AxiosError } from 'axios';
import { Endpoints } from '../Endpoints';
import { Category, CategoryPayload } from '../models/category';

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

  /**
   * Fetches all of the categories.
   * @returns An array of category objects.
   */
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
      
  /**
   * Creates a new category.
   * @param category The category to create.
   */
  async create(category: CategoryPayload): Promise<void> {
    await axios.post(Endpoints.categories, category)
      .then(response => response.data);
  }

  /**
   * Updates a given category.
   * @param toUpdate The data used for updating the category.
   * @param category The data to update with.
   */
  async update(toUpdate: Omit<CategoryPayload, 'description'>, category: CategoryPayload): Promise<void> {
    await axios.put(Endpoints.specificCategory(toUpdate.name, toUpdate.sponsor), category);
  }

  /**
   * Deletes a given category.
   * @param toDelete The data use for deleting the category.
   */
  async delete(toDelete: Omit<CategoryPayload, 'description'>): Promise<void> {
    await axios.delete(Endpoints.specificCategory(toDelete.name, toDelete.sponsor));
  }
}

