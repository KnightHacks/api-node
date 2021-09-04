import { Headers } from 'cross-fetch';
import { API } from '../API';
import { Endpoints } from '../Endpoints';
import { KnightHacksAPIError } from '../KnightHacksAPIError';
import { Category, CategoryPayload } from '../models/category';
import { RestManager } from '../RestManager';
import { emptyCollectionHandler } from '../util/api';
import { BaseManager } from './base';

export class CategoryManager extends BaseManager {
  constructor(readonly api: API, rest: RestManager) {
    super(rest);
  }

  /**
   * Looks up a category given the name and sponsor.
   * @param name The name to query.
   * @param sponsor The sponsor to query
   * @returns An array of categories.
   */
  async lookup(name: string, sponsor: string): Promise<Category[] | undefined> {
    const data = {
      name,
      sponsor,
    };

    const categories = (await this.rest
      .performRequest(Endpoints.specificCategory(name, sponsor), {
        body: JSON.stringify(data),
      })
      .catch((e: KnightHacksAPIError) => {
        if (e.code === 404) {
          return undefined;
        }

        throw e;
      })) as Category[] | undefined;

    return categories;
  }

  /**
   * Fetches all of the categories.
   * @returns An array of category objects.
   */
  async fetchAll(): Promise<Category[]> {
    const response = (await this.rest
      .performRequest(Endpoints.allCategories)
      .catch(emptyCollectionHandler)) as Category[];

    return response;
  }

  /**
   * Creates a new category.
   * @param category The category to create.
   */
  async create(category: CategoryPayload): Promise<void> {
    await this.rest.performRequest(Endpoints.categories, {
      body: JSON.stringify(category),
    });
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
    await this.rest.performRequest(
      Endpoints.specificCategory(toUpdate.name, toUpdate.sponsor),
      {
        body: JSON.stringify(category),
      }
    );
  }

  /**
   * Deletes a given category.
   * @param toDelete The data use for deleting the category.
   */
  async delete(toDelete: Omit<CategoryPayload, 'description'>): Promise<void> {
    await this.rest.performRequest(
      Endpoints.specificCategory(toDelete.name, toDelete.sponsor),
      {
        headers: new Headers({ Cookie: 'application/json' }),
      }
    );
  }
}
