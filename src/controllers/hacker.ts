import { Endpoints } from '../Endpoints';
import {
  APIHackerPayload,
  HackerData,
  transformAPIHacker,
  transformHacker,
} from '../models/user';

import FormData from 'form-data';
import { emptyCollectionHandler, entityNotFoundHandler } from '../util/api';
import { BaseManager } from './base';
import { RestManager } from '..';

export class Hacker implements Partial<HackerData> {
  canShareInfo?: boolean | undefined;
  eduInfo?:
    | {
        college?: string | undefined;
        graduationDate?: string | undefined;
        major?: string | undefined;
      }
    | undefined;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string | undefined;
  password?: string;
  beginner?: boolean | undefined;
  email?: string;
  ethnicity?: string | undefined;
  pronouns?: string | undefined;
  socials?:
    | {
        /**
         * Create a new hacker.
         * @param hacker The hacker data to upload.
         * @param resume The bugger of the resume file data.
         */ github: string;
        linkedin: string;
      }
    | undefined;
  username!: string;

  constructor(readonly rest: RestManager, data: HackerData) {
    this.patch(data);
  }

  private patch(data: Partial<HackerData>) {
    this.beginner = data.beginner;
    this.canShareInfo = data.canShareInfo;
    this.eduInfo = data.eduInfo;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.password = data.password;
    this.email = data.email;
    this.beginner = data.beginner;
    this.phoneNumber = data.phoneNumber;
    this.ethnicity = data.ethnicity;
    this.pronouns = data.pronouns;
    this.socials = data.socials;

    if (!data.username) {
      throw new Error('Hacker data is missing username');
    }

    this.username = data.username;
  }

  async setBeginner(beginner: boolean): Promise<void> {
    await this.edit({ beginner }, false);
    this.beginner = beginner;
  }

  async setSharingInfo(canShareInfo: boolean): Promise<void> {
    await this.edit({ canShareInfo }, false);
    this.canShareInfo = canShareInfo;
  }

  async setFirstName(firstName: string): Promise<void> {
    await this.edit({ firstName }, false);
    this.firstName = firstName;
  }

  async setLastName(lastName: string): Promise<void> {
    await this.edit({ lastName }, false);
    this.lastName = lastName;
  }

  async setPronouns(pronouns: string): Promise<void> {
    await this.edit({ pronouns }, false);
    this.pronouns = pronouns;
  }

  async setEducationInfo(eduInfo: HackerData['eduInfo']): Promise<void> {
    await this.edit({ eduInfo }, false);
    this.eduInfo = eduInfo;
  }

  async setPhoneNumber(phoneNumber: string): Promise<void> {
    await this.edit({ phoneNumber }, false);
    this.phoneNumber = phoneNumber;
  }

  async setEthnicity(ethnicity: string): Promise<void> {
    await this.edit({ ethnicity }, false);
    this.ethnicity = ethnicity;
  }

  async setSocials(socials: {
    github: string;
    linkedin: string;
  }): Promise<void> {
    await this.edit({ socials }, false);
    this.socials = socials;
  }

  async getResume(): Promise<Buffer | undefined> {
    return (await this.rest
      .performRequest(Endpoints.hackerResume(this.username))
      .catch(entityNotFoundHandler)) as Buffer;
  }

  /**
   * Performs a bulk edit of this event.
   * @param data The data to edit.
   * @param refetch Whether or not to refetch the updated resource.
   */
  async edit(data: Partial<HackerData>, refetch = true): Promise<void> {
    if (!this.username) {
      throw new Error('Invalid User');
    }

    const transformedData = transformHacker(data);

    await this.rest.performRequest(Endpoints.specificHacker(this.username), {
      method: 'PUT',
      body: JSON.stringify(transformedData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (refetch) {
      const newData = (await this.rest.performRequest(
        Endpoints.specificHacker(this.username)
      )) as HackerData;

      this.patch(newData);
    }
  }
}

export class HackerManager extends BaseManager {
  /**
   * Create a new hacker.
   * @param hacker The hacker data to upload.
   * @param resume The bugger of the resume file data.
   */
  async create(hacker: HackerData, resume?: Buffer): Promise<void> {
    const hackerPayload = JSON.stringify(transformHacker(hacker));
    const formData = new FormData();

    // Add hacker entry.
    formData.append('hacker', hackerPayload);

    if (resume) {
      formData.append('resume', resume);
    }

    await this.rest.performRequest(Endpoints.createHacker, {
      method: 'POST',
      body: formData as never,
    });
  }

  async fetch(username: string): Promise<Hacker | undefined> {
    const data = (await this.rest
      .performRequest(Endpoints.specificHacker(username))
      .catch(entityNotFoundHandler)) as { 'Hacker Profile': APIHackerPayload };

    if (!data || !data['Hacker Profile']) {
      return undefined;
    }

    const hackerData = transformAPIHacker(data['Hacker Profile']);
    return new Hacker(this.rest, hackerData);
  }

  /**
   * Gets all of the registered hackers.
   * @returns All of the registered hackers.
   */
  async fetchAll(): Promise<Hacker[]> {
    const response = (await this.rest
      .performRequest(Endpoints.allHackers)
      .catch(emptyCollectionHandler)) as {
      hackers: APIHackerPayload[];
    };

    return response.hackers.map((hacker) => {
      const data = transformAPIHacker(hacker);
      return new Hacker(this.rest, data);
    });
  }
}
