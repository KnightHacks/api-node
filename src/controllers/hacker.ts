import { Endpoints } from '../Endpoints';
import {
  APIHackerPayload,
  Hacker,
  HackerPayload,
  transformAPIHacker,
  transformHacker,
} from '../models/user';

import FormData from 'form-data';
import { RestManager } from '../RestManager';
import { emptyCollectionHandler } from '../util/api';

export class HackerManager {
  constructor(readonly rest: RestManager) {}

  /**
   * Create a new hacker.
   * @param hacker The hacker data to upload.
   * @param resume The bugger of the resume file data.
   */
  async create(hacker: HackerPayload, resume?: Buffer): Promise<void> {
    const hackerPayload = JSON.stringify(transformHacker(hacker));
    const formData = new FormData();

    // Add hacker entry.
    formData.append('hacker', hackerPayload, {
      contentType: 'application/json',
    });

    if (resume) {
      formData.append('resume', resume);
    }

    await this.rest.performRequest(Endpoints.createHacker, {
      method: 'POST',
      body: formData,
    });
  }

  async fetchAll(): Promise<Hacker[]> {
    const response = (await this.rest
      .performRequest(Endpoints.allHackers)
      .catch(emptyCollectionHandler)) as {
      hackers: APIHackerPayload[];
    };

    return response.hackers.map(transformAPIHacker);
  }
}
