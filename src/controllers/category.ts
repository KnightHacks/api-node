import axios from 'axios';
import { API } from '../API';
import { Endpoints } from '../Endpoints';
import { Category, CategoryPayload } from '../models/category';
import { emptyCollectionHandler } from '../util/api';

export class CategoryManager {
  constructor(readonly api: API) {}

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

    return await axios
      .get<Category[]>(Endpoints.categories, { data })
      .then((response) => response.data)
      .catch((error) => emptyCollectionHandler<Category>(error));
  }

  /**
   * Fetches all of the categories.
   * @returns An array of category objects.
   */
  async all(): Promise<Category[]> {
    return await axios
      .get<{ categories: Category[] }>(Endpoints.allCategories)
      .then((response) => response.data.categories)
      .catch((error) => emptyCollectionHandler<Category>(error));
  }

  /**
   * Creates a new category.
   * @param category The category to create.
   */
  async create(category: CategoryPayload): Promise<void> {
    await axios
      .post(Endpoints.categories, category)
      .then((response) => response.data);
  }

  /**
   * Updates a given category.
   * @param toUpdate The data used for updating the category.
   * @param category The data to update with.
   */
  async update(
    toUpdate: Omit<CategoryPayload, 'description'>,
    category: CategoryPayload
  ): Promise<void> {
    await axios.put(
      Endpoints.specificCategory(toUpdate.name, toUpdate.sponsor),
      category
    );
  }

  /**
   * Deletes a given category.
   * @param toDelete The data use for deleting the category.
   */
  async delete(toDelete: Omit<CategoryPayload, 'description'>): Promise<void> {
    await axios.delete(
      Endpoints.specificCategory(toDelete.name, toDelete.sponsor),
      {
        headers: {
          Cookie: this.api.token,
        },
      }
    );
  }
}
